const db = require("../models");
const Resources = db.resources; 
const path = require('path');
const fs = require('fs');

exports.UploadFile = (req, res) => {
    if (!req.file) {
        return res.status(202).send({
            message: "No file uploaded."
        });
    }

    const file_info = {
        file_name: req.file.originalname,
        file_path: req.file.path,
        file_size: req.file.size
    };

    Resources.create(file_info)
        .then(data => {
            res.send({
                status: "success",
                status_code: 200,
                result: data
            });
        })
        .catch(err => {
            res.send({
                status: "error",
                status_code: 201,
                message: err.message || "Failed to save file information."
            });
        });
};

exports.GetFiles = (req, res) =>{
    Resources.findAll()
    .then(data =>{
        res.send({
            status: "succes",
            status_code: 200,
            result: data
        });
    })
    .catch(err =>{
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "error retrieving files"
        });
    });
}



const mime = require('mime-types');

exports.DownloadFile = async (req, res) => {
    const fileId = req.params.id;
    console.log("Fetching file with ID:", fileId);

    try {
        const file = await Resources.findByPk(fileId);
        console.log("File found:", file);
        
        if (!file) {
            return res.status(404).send({
                status: "error",
                message: "File not found.",
            });
        }

        const filePath = path.join(__dirname, '../', file.file_path);
        console.log("Resolved file path:", filePath);

        if (!fs.existsSync(filePath)) {
            return res.status(404).send({
                status: "error",
                message: "File does not exist.",
            });
        }

        const mimeType = mime.lookup(file.file_name) || 'application/octet-stream';
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `attachment; filename="${file.file_name}"`);

        // Sending file directly to the client
        res.download(filePath, (err) => {
            if (err) {
                console.error("Download error:", err);
                return res.status(500).send({
                    status: "error",
                    message: "Failed to download file.",
                });
            }
            console.log("File downloaded successfully.");
        });
    } catch (err) {
        console.error("Error occurred:", err);
        if (!res.headersSent) {
            return res.status(500).send({
                status: "error",
                message: err.message || "Failed to retrieve file information.",
            });
        }
    }
};

