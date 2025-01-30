const db = require("../models");
const Happening = db.happenings;

exports.AddHappening = (req, res) =>{
    const happening_info = {
        title: req.body.title,
        date: req.body.date,
        description: req.body.description
    }

    Happening.create(happening_info)
    .then(data =>{
        res.send({
            status: "success",
            status_code: 200,
            result: data
        });
    })
    .catch(error =>{
        res.send({
            status: "error",
            status_code: 201,
            message: error.message || "error adding happening"
        });
    });
}

exports.GetHappening = (req, res) =>{
    Happening.findAll()
    .then(data =>{
        res.send({
            status: "success",
            status_code: 200,
            result: data
        });
    })
    .catch(error =>{
        res.send({
            status: "error",
            status_code: 201,
            message: error.message || "error retrieving happenings"
        });
    });
}