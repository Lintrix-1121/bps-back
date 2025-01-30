const db  = require("../models");
const Results = db.results;

exports.RegisterResults = (req, res) =>{
    const results_data = {
        pupils_name: req.body.pupils_name,
        eng: req.body.eng,
        math: req.body.math,
        sci: req.body.sci,
        sst: req.body.sst,
        aggregate: req.body.aggregate,
        division: req.body.division
    }
    Results.create(results_data)
    .then(data =>{
        res.send({
            status: "success",
            status_code: 200,
            result: data
        });
    })
    .catch(err =>{
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "failed to register results data"
        });
    });
}

exports.DeleteResults = (req, res) => {
    const id = req.params.id;
    
    Results.destroy({
        where: {id: id}
    })
    .then(result =>{
        if(result ===0){
            return res.status(404).send("results details not found");
        }
        res.status(200).send("results data deleted successfully");
    })
    .catch(err =>{
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "Error deleting results data"
        });
    });
}

exports.GetResults =(req, res) =>{
    Results.findAll()
    .then(data =>{
        res.send({
            status: "success",
            status_code: 200,
            result: data
        });
    })
    .catch(err =>{
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "failed to retrieve results list"
        });
    });
}