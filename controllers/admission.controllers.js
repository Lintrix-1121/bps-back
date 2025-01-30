const db = require('../models');
const Application = db.applications;
const Admission = db.admissions;
const Op = db.Sequelize.Op;

// Registering admission by the administrators
exports.GrantAdmission = (req, res) => {
    if(!req.body.pupils_name){
        res.send("Pupil's name is required");
        return;
    }
    if(!req.body.class){
        res.send("Pupil's class is required");
        return;
    }
    if(!req.body.contact){
        res.send("Parent/Guardian contact if required");
        return;
    }

    const admission = {
        pupils_name: req.body.pupils_name,
        class: req.body.class,
        contact: req.body.contact
    }

    Admission.create(admission)
       .then(data => {
          res.status(200).send(data);
       })
       .catch(err => {
        res.send({
            status: "Error",
            status_code: 201,
            message: err.message || "Failed to grant admission"
        });
       });
}

//Granting amision from list of applicants
exports.VerifyAdmission = (req, res) =>{
    const {applications, admissions} = req.body;

    const admiss = 'INSERT INTO ?? (SELECT * FROM ??)';
    db.query(admiss, [applications, admissions])
    .then(data => {
        res.status(200).send(`Copied ${result.affectedRows} records from ${applications} to ${admissions}`);
    })
    .catch(err =>{
        res.status(201).send("Error verifying admission");
    });
}


exports.GetAdmission = (req, res) => {
    Admission.findAll()
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
            message: err.message || "Failed to retrieve admission"
        });
    });
}

exports.DeleteAdmission = (req, res) => {
    const id = req.params.id;

    Admission.destroy({
        where: { id: id }
    })
    .then(result => {
        if (result === 0) {
            return res.status(404).send("Admission not found");
        }
        res.status(200).send("Admission deleted successfully");
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            status_code: 500,
            message: err.message || "Error deleting admission"
        });
    });
}

exports.SearchAdmission = (req, res) => {
    const pupils_name = req.query.pupils_name;
    var condition = pupils_name ? { pupils_name: { [Op.like]: `%${pupils_name}%` } } : null;

    Admission.findAll({ where: condition })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.send({
                status: "error",
                status_code: 201,
                message: err.message || "Failed to find admission"
            });
        });
}

exports.Admit = async (req, res) => {
    try {
        const applications = await Application.findAll();

        // Mapping applications to admissions
        const admissions = applications.map(app => ({
            pupils_name: app.pupils_name,
            class: app.class,
            contact: app.contact
        }));

        // Creating admissions in the database
        await Admission.bulkCreate(admissions);

        res.status(200).send({
            status: "success",
            message: "Applications copied to admissions successfully.",
            count: admissions.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: "error",
            message: "Failed to copy applications to admissions.",
            error: error.message
        });
    }
}
