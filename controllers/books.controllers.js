const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;


exports.RegisterBook = async (req, res) => {
    const { title, author, quantity, description } = req.body;

    try{
        const existingBook = await Book.findOne({
            where: {
                title: {
                    [Op.like]: title
                }
            }
        });

        if (existingBook) {
            return res.status(400).send({ message: "Book already exists!" });
        }

        const newBook = await Book.create({
            title,
            author,
            quantity,
            description,
            
        });
    
        res.status(201).send({
            id: newBook.id,
            title: newBook.title,
            author:newBook.author,
            quantity: newBook.quantity,
            description: newBook.description,
            
        });
    }catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while adding the book."
        });
    }
};
exports.GetBooks = (req, res) => {
    Book.findAll()
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Books retrieved successfully",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "Error",
            status_code: 201,
            message: err.message || "Failed to retrieve books"
        });
    });
}

exports.SearchBooks = async(req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {[Op.like]: `%{title}%` }} : null;


    Book.findAll({where: condition})
      .then(data => {
        res.status(200).send(data);
      })
      .then(err => {
        res.status(201).send({
            message: err.message || "Error finding the book"
        });
      });
}

exports.DeleteBook = (req, res) => {
    const id = req.params.id;

    Book.destroy({
        where: { id: id }
    })
    .then(result => {
        if (result === 0) {
            return res.status(404).send("Book not found");
        }
        res.status(200).send("Book deleted successfully");
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            status_code: 500,
            message: err.message || "Error deleting book"
        });
    });
}

exports.UpdateBook = async (req, res) => {
    const param_id = req.params.id;

    try {
        const existingBook = await Book.findByPk(param_id);
        if (!existingBook) {
            return res.status(404).send({
                status: "Error",
                status_code: 404,
                message: `Book with id ${param_id} was not found.`,
                result: null
            });
        }

        const [updatedRows] = await Book.update(req.body, {
            where: { id: param_id }
        });

        if (updatedRows === 1) { 
            res.send({
                status: "Success",
                status_code: 200,
                message: "Book updated successfully",
                result: updatedRows
            });
        } else {
            res.send({
                status: "Error",
                status_code: 201,
                message: `No changes made to book with id ${param_id}.`,
                result: updatedRows
            });
        }
    } catch (err) {
        res.status(500).send({
            status: "Error",
            status_code: 101,
            message: err.message || "Error occurred while updating the book"
        });
    }
}



