const db = require("../models");
const Marks = db.marks;
const Marks2 = db.marks2;
const Op = db.Sequelize.Op;


exports.RegisterMarks = (req, res) => {
    if (!req.body.pupils_name) {
        return res.status(400).send("Pupil's name is required");
    }
   
    const mark_sheet = {
        pupils_name: req.body.pupils_name, bot_eng: req.body.bot_eng, mid_eng: req.body.mid_eng, eng: req.body.eng, eng_remarks: req.body.eng_remarks, bot_math: req.body.mid_math,
        mid_math: req.body.mid_math, math: req.body.math, math_remarks: req.body.math_remarks,    bot_lit1: req.body.bot_lit1,    mid_lit1: req.body.mid_lit1, lit1: req.body.lit1,
        lit1_remarks: req.body.lit1_remarks, bot_lit2: req.body.bot_lit2, mid_lit2: req.body.mid_lit2, lit2: req.body.lit2, lit2_remarks: req.body.lit2_remarks, bot_re: req.body.bot_re,
        mid_re: req.body.mid_re, re: req.body.re, re_remarks: req.body.re_remarks, level: req.body.level, age: req.body.age, term: req.body.term, year: req.body.year,
        fees_bal: req.body.fees_bal, next_fees: req.body.next_fees, class_day: req.body.class_day, visitation: req.body.visitation, sports_day: req.body.sports_day,
        next_b: req.body.next_b, ends: req.body.ends
    };


    Marks.create(mark_sheet)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                status: "Error",
                status_code: 500,
                message: err.message || "Failed to register marks"
            });
        });
};
exports.RegisterMarks2 = (req, res) => {
    if (!req.body.pupils_name) {
        return res.status(400).send("Pupil's name is required");
    }
   
    const mark_sheet = {
        pupils_name: req.body.pupils_name, bot_eng: req.body.bot_eng, mid_eng: req.body.mid_eng, eng: req.body.eng, eng_remarks: req.body.eng_remarks, bot_math: req.body.mid_math,
        mid_math: req.body.mid_math, math: req.body.math, math_remarks: req.body.math_remarks,    bot_sci: req.body.bot_sci,    mid_sci: req.body.mid_sci, sci: req.body.sci,
        sci_remarks: req.body.sci_remarks, bot_sst: req.body.bot_sst, mid_sst: req.body.mid_sst, sst: req.body.sst, sst_remarks: req.body.sst_remarks, 
        level: req.body.level, age: req.body.age, term: req.body.term, year: req.body.year,
        fees_bal: req.body.fees_bal, next_fees: req.body.next_fees, class_day: req.body.class_day, visitation: req.body.visitation, sports_day: req.body.sports_day,
        next_b: req.body.next_b, ends: req.body.ends
    };


    Marks2.create(mark_sheet)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                status: "Error",
                status_code: 500,
                message: err.message || "Failed to register marks"
            });
        });
};

//Get Marks
exports.GetMarkSheet = (req, res) => {
    Marks.findAll()
    .then (data => {
        res.send({
            status: "Success",
            status_code: 200,
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "Failed to retrieve marks"
        });
    });
}

exports.GetMarkSheet1 = (req, res) => {
    Marks.findAll({
        where: {
            level: 'P1'  
        }
    })
    .then(data => {
        data.sort((a, b) => b.total - a.total);
        data.forEach((pupil, index) => {
            pupil.position = index + 1;  
        });

        res.send({
            status: "Success",
            status_code: 200,
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "Failed to retrieve marks"
        });
    });
};
exports.GetMarkSheet2 = (req, res) => {
    Marks.findAll({
        where: {
            level: 'P2'  
        }
    })
    .then(data => {
        data.sort((a, b) => b.total - a.total);
        data.forEach((pupil, index) => {
            pupil.position = index + 1;  
        });

        res.send({
            status: "Success",
            status_code: 200,
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "Failed to retrieve marks"
        });
    });
};
exports.GetMarkSheet3 = (req, res) => {
    Marks.findAll({
        where: {
            level: 'P3'  
        }
    })
    .then(data => {
        data.sort((a, b) => b.total - a.total);
        data.forEach((pupil, index) => {
            pupil.position = index + 1;  
        });

        res.send({
            status: "Success",
            status_code: 200,
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "Failed to retrieve marks"
        });
    });
};
exports.GetMarkSheet4 = (req, res) => {
    Marks2.findAll({
        where: {
            level: 'P4'  
        }
    })
    .then(data => {
        data.sort((a, b) => b.total - a.total);
        data.forEach((pupil, index) => {
            pupil.position = index + 1;  
        });

        res.send({
            status: "Success",
            status_code: 200,
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "Failed to retrieve marks"
        });
    });
};
exports.GetMarkSheet5 = (req, res) => {
    Marks2.findAll({
        where: {
            level: 'P5'  
        }
    })
    .then(data => {
        data.sort((a, b) => b.total - a.total);
        data.forEach((pupil, index) => {
            pupil.position = index + 1;  
        });

        res.send({
            status: "Success",
            status_code: 200,
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "Failed to retrieve marks"
        });
    });
};
exports.GetMarkSheet6 = (req, res) => {
    Marks2.findAll({
        where: {
            level: 'P6'  
        }
    })
    .then(data => {
        data.sort((a, b) => b.total - a.total);
        data.forEach((pupil, index) => {
            pupil.position = index + 1;  
        });

        res.send({
            status: "Success",
            status_code: 200,
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "Failed to retrieve marks"
        });
    });
};
exports.GetMarkSheet7 = (req, res) => {
    Marks2.findAll({
        where: {
            level: 'P7'  
        }
    })
    .then(data => {
        data.sort((a, b) => b.total - a.total);
        data.forEach((pupil, index) => {
            pupil.position = index + 1;  
        });

        res.send({
            status: "Success",
            status_code: 200,
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "Failed to retrieve marks"
        });
    });
};

exports.DeleteMarks = (req, res) => {
    const id = req.params.id;

    Marks.destroy({
        where: { id: id }
    })
    .then(result => {
        if (result === 0) {
            return res.status(404).send("Marks not found");
        }
        res.status(200).send("Marks deleted successfully");
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            status_code: 500,
            message: err.message || "Error deleting marks"
        });
    });
}
exports.DeleteMarks2 = (req, res) => {
    const id = req.params.id;

    Marks2.destroy({
        where: { id: id }
    })
    .then(result => {
        if (result === 0) {
            return res.status(404).send("Marks not found");
        }
        res.status(200).send("Marks deleted successfully");
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            status_code: 500,
            message: err.message || "Error deleting marks"
        });
    });
}

exports.SearchMarks = (req, res) => {
    const pupils_name = req.query.pupils_name;
    var condition = pupils_name ? { pupils_name: { [Op.like]: `%${pupils_name}%` } } : null;

    Marks.findAll({ where: condition })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.send({
                status: "error",
                status_code: 201,
                message: err.message || "Failed to find the student's marks"
            });
        });
}
exports.SearchMarks2 = (req, res) => {
    const pupils_name = req.query.pupils_name;
    var condition = pupils_name ? { pupils_name: { [Op.like]: `%${pupils_name}%` } } : null;

    Marks2.findAll({ where: condition })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.send({
                status: "error",
                status_code: 201,
                message: err.message || "Failed to find the student's marks"
            });
        });
}
exports.UpdateMarks = async (req, res) => {
    const param_id = req.params.id;

    try {
        const existingMarks = await Marks.findByPk(param_id);
        if (!existingMarks) {
            return res.status(404).send({
                status: "Error",
                status_code: 404,
                message: `Marks with id ${param_id} was not found.`,
                result: null
            });
        }

        const [updatedRows] = await Marks.update(req.body, {
            where: { id: param_id }
        });

        if (updatedRows === 1) { 
            res.send({
                status: "Success",
                status_code: 200,
                message: "Marks updated successfully",
                result: updatedRows
            });
        } else {
            res.send({
                status: "Error",
                status_code: 201,
                message: `No changes made to with with id ${param_id}.`,
                result: updatedRows
            });
        }
    } catch (err) {
        res.status(500).send({
            status: "Error",
            status_code: 101,
            message: err.message || "Error occurred while updating the marks"
        });
    }
}
exports.UpdateMarks2 = async (req, res) => {
    const param_id = req.params.id;

    try {
        const existingMarks = await Marks2.findByPk(param_id);
        if (!existingMarks) {
            return res.status(404).send({
                status: "Error",
                status_code: 404,
                message: `Marks with id ${param_id} was not found.`,
                result: null
            });
        }

        const [updatedRows] = await Marks2.update(req.body, {
            where: { id: param_id }
        });

        if (updatedRows === 1) { 
            res.send({
                status: "Success",
                status_code: 200,
                message: "Marks updated successfully",
                result: updatedRows
            });
        } else {
            res.send({
                status: "Error",
                status_code: 201,
                message: `No changes made to with with id ${param_id}.`,
                result: updatedRows
            });
        }
    } catch (err) {
        res.status(500).send({
            status: "Error",
            status_code: 101,
            message: err.message || "Error occurred while updating the marks"
        });
    }
}

exports.GetMarksById = (req, res) => {
    const param_id = req.params.id;

   
    Marks.findByPk(param_id)
        .then(marks => {
            if (!marks) {
                return res.status(404).send({
                    status: "Error",
                    status_code: 404,
                    message: `Marks with id ${param_id} was not found.`,
                    result: null
                });
            }
            res.send({
                status: "Success",
                status_code: 200,
                message: "Marks retrieved successfully",
                result: marks
            });
        })
        .catch(err => {
            res.status(500).send({
                status: "Error",
                status_code: 101,
                message: err.message || "Error occurred while retrieving the marks"
            });
        });
}

exports.GetMarksById2 = (req, res) => {
    const param_id = req.params.id;

   
    Marks2.findByPk(param_id)
        .then(marks => {
            if (!marks) {
                return res.status(404).send({
                    status: "Error",
                    status_code: 404,
                    message: `Marks with id ${param_id} was not found.`,
                    result: null
                });
            }
            res.send({
                status: "Success",
                status_code: 200,
                message: "Marks retrieved successfully",
                result: marks
            });
        })
        .catch(err => {
            res.status(500).send({
                status: "Error",
                status_code: 101,
                message: err.message || "Error occurred while retrieving the marks"
            });
        });
}
