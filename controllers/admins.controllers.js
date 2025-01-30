const db = require("../models");
const Admin = db.admins;
const Op = db.Sequelize.Op;
const bcrypt =require("bcrypt");
const jwt = require('jsonwebtoken');
const { where } = require("sequelize");


exports.RegisterAdmin = (req, res) => {  
    if(req.body.name){
        res.status(202).send({
            message: "Admin name is required"
        });
        return;
    }
    if(!req.body.email){
        res.status(203).send({
            message: "Admin email is required"
        });
        return;
    }
    if(!req.body.password){
        res.status(205).send({
            message: "Admin password id required"
        });
        return;
    }
    if(!req.body.department){
        res.sta(206).send({
            message: "Admin departmen tis required"
        });
        return;
    }

    const admin_info = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        department: req.body.department
    }
    /*const existingUser = await Admin.findOne({
        where: {
            name: {
                [Op.like]: name
            }
        }
    });
    if (existingUser) {
        return res.status(400).send({ message: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);
*/

    Admin.create(admin_info)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err =>{
        res.send({
            status: "Error",
            status_code: 201,
            message: err.message || "failed to register admin"
        });
    });
}

exports.GetAdmins = (req, res) => {
    Admin.findAll()
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Admins retrieved success",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "Error",
            status_code: 201,
            message: err.message || "Failed to retrieve admins"
        });
    });
}

exports.SearchAdmins = async(req, res) => {
    const name = req.query.name;
    var condition = name ? {name: {[Op.like]: `%{name}%` }} : null;


    Admin.findAll({where: condition})
      .then(data => {
        res.status(200).send(data);
      })
      .then(err => {
        res.status(201).send({
            message: err.message || "Error finding admin"
        });
      });
}


exports.Signup = async (req, res) => {
    const { name, email, password, deparment } = req.body;

    try{
        const existingUser = await Admin.findOne({
            where: {
                name: {
                    [Op.like]: name
                }
            }
        });

        if (existingUser) {
            return res.status(400).send({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const newAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            deparment
        });
        const token = jwt.sign({ id: newAdmin.id, name: newAdmin.name }, process.env.JWT_SECRET, {
            expiresIn: 86400 
        });    
        res.status(201).send({
            id: newAdmin.id,
            name: newAdmin.name,
            email: newAdmin.email,
            deparment:newAdmin.deparment,
            accessToken: token
        });
    }catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while signing up."
        });
    }
};


exports.Login = async (req, res) => {
    const { name, password } = req.body;

    try {
        const admin = await Admin.findOne({
            where: {
                name: {
                    [Op.like]: name
                }
            }
        });
        if (!admin) {
            return res.status(401).send({ message: "User not found" });
        }
        const passwordIsValid = await bcrypt.compare(password, admin.password); // Use admin.password here
        
        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
        }
        const token = jwt.sign({ id: admin.id, name: admin.name }, process.env.JWT_SECRET, {
            expiresIn: 86400 
        });
        res.status(200).send({
            id: admin.id,
            username: admin.name,
            accessToken: token
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while logging in."
        });
    }
};
