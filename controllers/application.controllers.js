const { stack } = require('sequelize/lib/utils');
const db = require('../models');
const Application = db.applications;
const Op = db.Sequelize.Op;


exports.Apply = (req, res) => {
    if(!req.body.pupils_name){
        res.send({
            message: "Pupil's name is required"
        });
        return;
    }
    if(!req.body.class){
        res.send({
            message: "Pupil's class is required"
        });
        return;
    }
    if(!req.body.previous_school){
        res.send({
            message: "Pupil's previous school is required"
        });
        return;
    }
    if(!req.body.age){
        res.send({
            message: "Pupil's age is required"
        });
        return;
    }
    if(!req.body.parents_name){
        res.send({
            message: "Pupil's parent/guardian's name is required"
        });
        return;
    }
    if(!req.body.contact){
        res.send({
            message: "Parent/guardian's contact is required"
        });
        return;
    }
    const application_details = {
        pupils_name: req.body.pupils_name,
        class: req.body.class,
        previous_school: req.body.previous_school,
        age: req.body.age,
        parents_name: req.body.parents_name,
        contact: req.body.contact
    }

    Application.create(application_details)
      .then(data => {
         res.send({
            status: "success",
            status_code: 200,
            result: data
         });
      })
      .catch(err => {
        res.send({
            status: "Error",
            status_code: 201,
            message: err.message || "Failed to load application"
        });
      });
}

exports.GetApplications = (req, res) => {
    Application.findAll()
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
            message: err.message || "Failed to retrieve applications"
        });
    });
}

exports.SearchApplication = (req, res) => {
    const pupils_name = req.query.pupils_name;
    var condition = pupils_name ? { pupils_name: { [Op.like]: `%${pupils_name}%` } } : null;

    Application.findAll({ where: condition })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.send({
                status: "error",
                status_code: 201,
                message: err.message || "Failed to find application"
            });
        });
}

exports.DeleteApplication = (req, res) => {
    const id = req.params.id;

    Application.destroy({
        where: { id: id }
    })
    .then(result => {
        if (result === 0) {
            return res.status(404).send("Application not found");
        }
        res.status(200).send("Application deleted successfully");
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            status_code: 500,
            message: err.message || "Error deleting application"
        });
    });
}

exports.UpdateApplication = async (req, res) => {
    const param_id = req.params.id;

    try {
        const existingApplication = await Application.findByPk(param_id);
        if (!existingApplication) {
            return res.status(404).send({
                status: "Error",
                status_code: 404,
                message: `Application with id ${param_id} was not found.`,
                result: null
            });
        }

        const [updatedRows] = await Application.update(req.body, {
            where: { id: param_id }
        });

        if (updatedRows === 1) { 
            res.send({
                status: "Success",
                status_code: 200,
                message: "Application updated successfully",
                result: updatedRows
            });
        } else {
            res.send({
                status: "Error",
                status_code: 201,
                message: `No changes made to application with id ${param_id}.`,
                result: updatedRows
            });
        }
    } catch (err) {
        res.status(500).send({
            status: "Error",
            status_code: 101,
            message: err.message || "Error occurred while updating the application"
        });
    }
}

exports.GetApplicationById = (req, res) => {
    const param_id = req.params.id;

    Application.findByPk(param_id)
        .then(application => {
            if (!application) {
                return res.status(404).send({
                    status: "Error",
                    status_code: 404,
                    message: `Application with id ${param_id} was not found.`,
                    result: null
                });
            }

            res.send({
                status: "Success",
                status_code: 200,
                message: "Application retrieved successfully",
                result: application
            });
        })
        .catch(err => {
            res.status(500).send({
                status: "Error",
                status_code: 101,
                message: err.message || "Error occurred while retrieving the application"
            });
        });
}