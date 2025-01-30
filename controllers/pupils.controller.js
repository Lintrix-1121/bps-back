const db = require("../models");
const Pupil = db.pupils;
const Marks = db.marks;
const Marks2 = db.marks2;
const Op = db.Sequelize.Op;
const bcrypt =require("bcrypt");
const jwt = require('jsonwebtoken');
const { where } = require("sequelize");



exports.RegisterPupil = async (req, res) => {
    const { pupils_name, level, gender, age, LIN, contact, status } = req.body;

    try{
        const existingPupil = await Pupil.findOne({
            where: {
                pupils_name: {
                    [Op.like]: pupils_name
                }
            }
        });

        if (existingPupil) {
            return res.status(400).send({ message: "Pupil already exists!" });
        }

        const newPupil = await Pupil.create({
            pupils_name,
            level,
            gender,
            age,
            LIN,
            contact,
            status
        });
    
        res.status(201).send({
            id: newPupil.id,
            pupils_name: newPupil.pupils_name,
            level: newPupil.level,
            gender:newPupil.gender,
            age: newPupil.age,
            LIN: newPupil.LIN,
            contact: newPupil.contact,
            status:newPupil.status
        });
    }catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while adding pupil."
        });
    }
};
exports.GetPupils = (req, res) => {
    Pupil.findAll()
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Pupils retrieved success",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "Error",
            status_code: 201,
            message: err.message || "Failed to retrieve pupils"
        });
    });
}

exports.SearchPupils = async(req, res) => {
    const pupils_name = req.query.pupils_name;
    var condition = pupils_name ? {pupils_name: {[Op.like]: `%{pupils_name}%` }} : null;


    Pupil.findAll({where: condition})
      .then(data => {
        res.status(200).send(data);
      })
      .then(err => {
        res.status(201).send({
            message: err.message || "Error finding pupil"
        });
      });
}

  

exports.Login = async (req, res) => {
    const { contact } = req.body;

    try {
        const pupil = await Pupil.findOne({
            where: {
                contact: {
                    [Op.like]: contact
                }
            }
        });

        if (!pupil) {
            return res.status(401).send({ message: "Contact not associated with any pupil" });
        }

        const contactIsValid = await bcrypt.compare(contact, pupil.contact); 

        if (!contactIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid contact!" });
        }

        const marks = await Marks.findOne({
            where: {
                pupils_name: pupil.pupils_name,
                level: pupil.level
            }
        });
        const marks2 = await Marks2.findOne({
            where: {
                pupils_name: pupil.pupils_name,
                level: pupil.level
            }
        });


        if (!marks) {
            return res.status(404).send({ message: "Marks not found for this pupil" });
        }

        const token = jwt.sign({ id: pupil.id, pupils_name: pupil.pupils_name }, process.env.JWT_SECRET, {
            expiresIn: 86400  
        });

       
        res.status(200).send({
            id: pupil.id,
            pupils_name: pupil.pupils_name,
            level: pupil.level,
            marks: marks || null,
            marks2: marks2 || null,  
            accessToken: token
        });
        
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while logging in."
        });
    }
};


/*
exports.Login = async (req, res) => {
    const { contact } = req.body;

    try {
        const pupil = await Pupil.findOne({
            where: {
                contact: {
                    [Op.like]: contact
                }
            }
        });
        if (!pupil) {
            return res.status(401).send({ message: "Contact not associated t any pupil" });
        }
        const contactIsValid = await bcrypt.compare(contact, pupil.contact); 
        
        if (!contactIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid contact!" });
        }
        const token = jwt.sign({ id: pupil.id, pupils_name: pupil.pupils_name }, process.env.JWT_SECRET, {
            expiresIn: 86400 
        });
        res.status(200).send({
            id: pupil.id,
            pupils_name: pupil.pupils_name,
            accessToken: token
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || " Error occurred while logging in."
        });
    }
};
*/

exports.DeletePupil = (req, res) => {
    const id = req.params.id;

    Pupil.destroy({
        where: { id: id }
    })
    .then(result => {
        if (result === 0) {
            return res.status(404).send("Pupil not found");
        }
        res.status(200).send("Pupil deleted successfully");
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            status_code: 500,
            message: err.message || "Error deleting pupil"
        });
    });
}

exports.UpdatePupil = async (req, res) => {
    const param_id = req.params.id;

    try {
        const existingPupil = await Pupil.findByPk(param_id);
        if (!existingPupil) {
            return res.status(404).send({
                status: "Error",
                status_code: 404,
                message: `Pupil with id ${param_id} was not found.`,
                result: null
            });
        }

        const [updatedRows] = await Pupil.update(req.body, {
            where: { id: param_id }
        });

        if (updatedRows === 1) { 
            res.send({
                status: "Success",
                status_code: 200,
                message: "Pupil updated successfully",
                result: updatedRows
            });
        } else {
            res.send({
                status: "Error",
                status_code: 201,
                message: `No changes made to pupil with id ${param_id}.`,
                result: updatedRows
            });
        }
    } catch (err) {
        res.status(500).send({
            status: "Error",
            status_code: 101,
            message: err.message || "Error occurred while updating the pupil's data"
        });
    }
}

exports.GetPupil1 = (req, res) => {
    Pupil.findAll({
        where: {
            level: 'P1' 
        }
    })
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Pupils retrieved successfully",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "Error",
            status_code: 500, 
            message: err.message || "Failed to retrieve pupils"
        });
    });
}
exports.GetPupil2 = (req, res) => {
    Pupil.findAll({
        where: {
            level: 'P2' 
        }
    })
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Pupils retrieved successfully",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "Error",
            status_code: 500, 
            message: err.message || "Failed to retrieve pupils"
        });
    });
}
exports.GetPupil3 = (req, res) => {
    Pupil.findAll({
        where: {
            level: 'P3' 
        }
    })
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Pupils retrieved successfully",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "Error",
            status_code: 500, 
            message: err.message || "Failed to retrieve pupils"
        });
    });
}
exports.GetPupil4 = (req, res) => {
    Pupil.findAll({
        where: {
            level: 'P4' 
        }
    })
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Pupils retrieved successfully",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "Error",
            status_code: 500, 
            message: err.message || "Failed to retrieve pupils"
        });
    });
}
exports.GetPupil5 = (req, res) => {
    Pupil.findAll({
        where: {
            level: 'P5' 
        }
    })
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Pupils retrieved successfully",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "Error",
            status_code: 500, 
            message: err.message || "Failed to retrieve pupils"
        });
    });
}
exports.GetPupil6 = (req, res) => {
    Pupil.findAll({
        where: {
            level: 'P6' 
        }
    })
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Pupils retrieved successfully",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "Error",
            status_code: 500, 
            message: err.message || "Failed to retrieve pupils"
        });
    });
}
exports.GetPupil7 = (req, res) => {
    Pupil.findAll({
        where: {
            level: 'P7' 
        }
    })
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Pupils retrieved successfully",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "Error",
            status_code: 500, 
            message: err.message || "Failed to retrieve pupils"
        });
    });
}