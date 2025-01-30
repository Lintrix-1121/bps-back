const db  = require("../models");
const Performance = db.performance;

exports.RegisterPerformance = (req, res) =>{
    const performance_data = {
        year: req.body.year,
        total: req.body.total,
        div1: req.body.div1,
        div2: req.body.div2,
        div3: req.body.div3,
        div4: req.body.div4,
        U: req.body.U,
        X: req.body.X
    }
    Performance.create(performance_data)
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
            message: err.message || "failed to register performance data"
        });
    });
}

exports.DeletePerformance = (req, res) => {
    const id = req.params.id;
    
    Performance.destroy({
        where: {id: id}
    })
    .then(result =>{
        if(result ===0){
            return res.status(404).send("performance details not found");
        }
        res.status(200).send("performance data ddeleted successfully");
    })
    .catch(err =>{
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "Error deleting performance data"
        });
    });
}

exports.GetPerformance =(req, res) =>{
    Performance.findAll()
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
            message: err.message || "failed to retrieve performance list"
        });
    });
}