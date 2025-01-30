const db = require("../models");
Challenge = db.challenges;
Achievement = db.achievements;

exports.AddChallenge = (req, res) =>{
    const challenge_info = {
        challenge: req.body.challenge
    }

    Challenge.create(challenge_info)
    .then(data =>{
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
            message: err.message || "Error adding challenge"
        });
    });
}

exports.GetChallenges =(req, res) =>{
    Challenge.findAll()
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
            message: err.message || "error retrieving challenges"
        });
    });
}

exports.DeleteChallenge = (req, res) =>{
    const id = req.params.id;

    Challenge.destroy({
        where: {id: id}
    })
    .then(result =>{
        if(result ===0){
            req.status(404).send("Challenge not found");
        }
        res.status(200).send("challenge deleted successfully");
    })
    .catch(err =>{
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "error deleting challenge"
        });
    });
}

exports.AddAchievement = (req, res) =>{
    const achievement_info = {
        achievement: req.body.achievement
    }
    Achievement.create(achievement_info)
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
            message: err.message || "error adding achievement"
        });
    });

}

exports.GetAchievements =(req, res) =>{
    Achievement.findAll()
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
            message: err.message || "error retrieving achievements"
        });
    });
}

exports.DeleteAchievement = (req, res) =>{
    const id = req.params.id

    Achievement.destroy({
        where: {id: id}
    })
    .then(result => {
        if(result ===0){
            res.status(404).send("achievement not found");
        }
        res.status(200).send("achievement deleted successfully");
    })
    .catch(err =>{
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "error deleting achievement"
        });
    });
}