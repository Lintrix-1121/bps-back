const db = require("../models");
const Teaching_staff = db.teaching_staff;
const Ntstaff = db.ntstaff;


exports.AddTeachingStaff = (req, res) =>{
    if(!req.body.teachers_name){
        res.status(202).send({
            message: "teacher's name is required"
        });
        return;
    }
    const staff_info = {
        teachers_name: req.body.teachers_name,
        qualification: req.body.qualification
    }

    Teaching_staff.create(staff_info)
      .then(data =>{
        res.send({
            status: "sucess",
            status_code: 200,
            result: data
        });
      })
      .catch(err =>{
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "Failed to add staff"
        });
      });
}



exports.DeleteStaff = (req, res) =>{
    const id = req.params.id;

    Teaching_staff.destroy({
        where: {id: id}
    })
    .then(result =>{
        if(result ===0){
            return res.status(404).send("staff not found");
        }
        res.status(200).send("staff deleted successfully");
    })
    .catch(err =>{
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "failed to delete staff"
        });
    });
}

exports.GetTstaff = (req, res) =>{
    Teaching_staff.findAll()
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
            message: err.message || "error retrieving staff"
        });
    });
}

exports.AddNtstaff = (req, res) => {
    const ntstaff_info = {
        ntstaff_name: req.body.ntstaff_name
    }
    Ntstaff.create(ntstaff_info)
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
            message: err.message || "error adding staff"
        });
    });
}

exports.DeleteNtstaff = (req, res) =>{
    const id = req.params.id;

    Ntstaff.destroy({
        where: {id: id}
    })
    .then(result =>{
        if(id ===0){
            res.status(404).send("staff not found");
        }
        res.status(200).send("staff deleted successfully");
    })
    .catch(err =>{
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "error deleting staff"
        });
    });
}

exports.GetNtstaff = (req, res) =>{
    Ntstaff.findAll()
    .then(data =>{
        res.send({
            status: "success",
            status_code:200,
            result: data
        });
    })
    .catch(err =>{
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "error retrieving staff"
        });
    });
}

