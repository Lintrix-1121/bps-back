const db =  require("../models");
const Image =  db.images

exports.AddImage = (req, res) => {
    if (!req.body.image_url) {
        res.status(202).send({
            message: "Image URL is required"
        });
        return;
    }

    const image_info = {
        image_url: req.body.image_url,
        description: req.body.description,
        alt_text: req.body.alt_text
    };

    Image.create(image_info)
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
                message: err.message || "Failed to add image"
            });
        });
};
