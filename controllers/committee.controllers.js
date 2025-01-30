const db = require("../models");
Mgt_committee = db.mgt_committee;
PTA_committee = db.pta_committee;

exports.RegisterMgtCommittee = (req, res) =>{
    const mgt_info = {
        committee_member: req.body.committee_member
    }

    Mgt_committee.create(mgt_info)
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
            message: err.message || "Error registering committee member"
        });
    });
}

exports.RegisterPTACommittee = (req, res) =>{
    const pta_info ={
        name: req.body.name
    }
    PTA_committee.create(pta_info)
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
            message: err.message || "Error registering pta committee member"
        });
    });
}

exports.GetMgt =  (req, res) =>{
    Mgt_committee.findAll()
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
            message: err.message || "error retrieving management committe members"
        });
    });
}

exports.GetPta =  (req, res) =>{
    PTA_committee.findAll()
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
            message: err.message || "error retrieving PTA committe members"
        });
    });
}

exports.DeleteMgt = (req, res) =>{
    const id = req.params.id;

    Mgt_committee.destroy({
        where: {id: id}
    })
    .then(result =>{
        if(result ===0){
            res.status(404).send("Member not found");
        }
        res.status(200).send("Member deleted successfully");
    })
    .catch(err =>{
        res.send({
            status: "error",
            status_code: 201,
            message: err.message ||"error deleting member"
        });
    });
}

exports.DeletePta =(req, res) =>{
    const id = req.params.id;

    PTA_committee.destroy({
        where: {id : id}
    })
    .then(result =>{
        if(result ===0 ){
            res.status(404).send("Member not found");
        }
        res.status(200).send("Member deleted successfully");
    })
    .catch(err =>{
        res.send({
            status: "error",
            status_code: 201,
            message: err.message ||"error deleting member"
        });
    });
}


