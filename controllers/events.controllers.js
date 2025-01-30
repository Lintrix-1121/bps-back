const db = require("../models");
const Event =db.events;

exports.AddEvent = (req, res) =>{
    if(!req.body.event_name){
        res.send({
            message: "event title is required"
        });
        return;
    }
    if(!req.body.venue){
        res.send({
            message: "event venue is required"
        });
        return;
    }
    if(!req.body.date){
        res.send({
            message: "Event date is required"
        });
        return;
    }
   const event_info ={
    event_name: req.body.event_name,
    venue: req.body.venue,
    date: req.body.date
   }

   Event.create(event_info)
     .then(data =>{
        res.status(200).send(data);
     })
     .catch(err => {
        res.status(201).send({
            message: err.message || "Error adding the event"
        });
     });
}

exports.GetEvents = (req, res) => {
    Event.findAll()
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


exports.DeleteEvent = (req, res) => {
    const id = req.params.id;

    Event.destroy({
        where: { id: id }
    })
    .then(result => {
        if (result === 0) {
            return res.status(404).send("Event not found");
        }
        res.status(200).send("Event deleted successfully");
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            status_code: 500,
            message: err.message || "Error deleting event"
        });
    });
}

exports.SearchEvent = (req, res) => {
    const event_name = req.query.event_name;
    var condition = event_name ? { event_name: { [Op.like]: `%${event_name}%` } } : null;

    Event.findAll({ where: condition })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.send({
                status: "error",
                status_code: 201,
                message: err.message || "Failed to find event"
            });
        });
}

exports.UpdateEvent = async (req, res) => {
    const param_id = req.params.id;

    try {
        const existingEvent = await Event.findByPk(param_id);
        if (!existingEvent) {
            return res.status(404).send({
                status: "Error",
                status_code: 404,
                message: `Event with id ${param_id} was not found.`,
                result: null
            });
        }

        const [updatedRows] = await Event.update(req.body, {
            where: { id: param_id }
        });

        if (updatedRows === 1) { 
            res.send({
                status: "Success",
                status_code: 200,
                message: "Event updated successfully",
                result: updatedRows
            });
        } else {
            res.send({
                status: "Error",
                status_code: 201,
                message: `No changes made to event with id ${param_id}.`,
                result: updatedRows
            });
        }
    } catch (err) {
        res.status(500).send({
            status: "Error",
            status_code: 101,
            message: err.message || "Error occurred while updating the events"
        });
    }
}

exports.GetEventById = (req, res) => {
    const param_id = req.params.id;

    Event.findByPk(param_id)
        .then(event => {
            if (!event) {
                return res.status(404).send({
                    status: "Error",
                    status_code: 404,
                    message: `Event with id ${param_id} was not found.`,
                    result: null
                });
            }

            res.send({
                status: "Success",
                status_code: 200,
                message: "Event retrieved successfully",
                result: event
            });
        })
        .catch(err => {
            res.status(500).send({
                status: "Error",
                status_code: 101,
                message: err.message || "Error occurred while retrieving the event"
            });
        });
}