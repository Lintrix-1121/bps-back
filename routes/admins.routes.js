const { Router } = require("express");
const multer = require('multer');
const path = require('path');

module.exports = app => {
    const admins_controller = require ("../controllers/admins.controllers");
    const admission_controller = require("../controllers/admission.controllers");
    const application_controler = require("../controllers/application.controllers.js");
    const marks_controller = require("../controllers/marks.controllers.js");
    const marks2_controller = require("../controllers/marks.controllers.js");
    const events_controller = require("../controllers/events.controllers.js");
    const emails_controller = require("../controllers/emails.controllers.js");
    const report_controller = require("../controllers/report.controllers.js");
    const staff_controller = require("../controllers/staff.controllers.js");
    const committee_controller = require("../controllers/committee.controllers.js");
    const performance_controller = require("../controllers/performance.controlers.js");
    const chalgenAchive_controller = require("../controllers/chalgenAchive.controllers.js");
    const image_controller = require("../controllers/image.controllers.js");
    const { UploadFile } = require('../controllers/resources.controller.js');
    const resources_controller = require('../controllers/resources.controller.js');
    const pupils_controller = require("../controllers/pupils.controller.js");
    const books_controller = require("../controllers/books.controllers.js");
    const results_controller = require("../controllers/results.controllers.js");
    const signature_controller = require("../controllers/signature.controller.js");
    
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });
    const upload = multer({ storage: storage });
    
    var router = require("express").Router();

    router.post("/regadmin", admins_controller.RegisterAdmin);
    router.get("/admins", admins_controller.GetAdmins);
    router.get("/searchadmin", admins_controller.SearchAdmins);
    router.post("/signup", admins_controller.Signup);
    router.post("/login", admins_controller.Login);
    router.get("/admiss", admission_controller.GetAdmission);
    router.post("/admit", admission_controller.GrantAdmission);
    router.post("/admitall", admission_controller.Admit);
    router.delete("/deladmis/:id", admission_controller.DeleteAdmission);
    router.get("/srchadmis", admission_controller.SearchAdmission);
    router.post("/acceptappn", admission_controller.VerifyAdmission);
    router.post("/apply", application_controler.Apply);
    router.get("/appns", application_controler.GetApplications);
    router.get("/appns/:id", application_controler.GetApplicationById);
    router.delete("/delappn/:id", application_controler.DeleteApplication);
    router.get("/srchappn", application_controler.SearchApplication);
    router.put("/updappn/:id", application_controler.UpdateApplication);
    router.get("/events", events_controller.GetEvents);
    router.get("/events/:id", events_controller.GetEventById);
    router.post("/adevent", events_controller.AddEvent);
    router.put("/updevent/:id", events_controller.UpdateEvent);
    router.delete("/delevent/:id", events_controller.DeleteEvent);
    router.get("/srchevent", events_controller.SearchEvent);
    router.post("/admarks", marks_controller.RegisterMarks);
    router.post("/admarks2", marks2_controller.RegisterMarks2);
    
    router.get("/marks", marks_controller.GetMarkSheet);
    router.get("/marks1", marks_controller.GetMarkSheet1);
    router.get("/marks2", marks_controller.GetMarkSheet2);
    router.get("/marks3", marks_controller.GetMarkSheet3);
    router.get("/marks4", marks2_controller.GetMarkSheet4);
    router.get("/marks5", marks2_controller.GetMarkSheet5);
    router.get("/marks6", marks2_controller.GetMarkSheet6);
    router.get("/marks7", marks2_controller.GetMarkSheet7);
    router.get("/marks/:id", marks_controller.GetMarksById);
    router.get("/marks2/:id", marks2_controller.GetMarksById2);

    router.put("/updmarks/:id", marks_controller.UpdateMarks);
    router.put("/updmarks2/:id", marks2_controller.UpdateMarks2);

    router.delete("/delmarks/:id", marks_controller.DeleteMarks);
    router.delete("/delmarks2/:id", marks2_controller.DeleteMarks2);

    router.get("/srchmarks", marks_controller.SearchMarks);
    router.get("/srchmarks2", marks2_controller.SearchMarks2);
    
    router.get("/srchmarks", marks_controller.SearchMarks);
    
    router.post('/send-email', emails_controller.SendEmail); 

    router.post('/report', report_controller.PrintReport);
    router.post('/addtstaff', staff_controller.AddTeachingStaff);
    router.post('/addntstaff', staff_controller.AddNtstaff);
    router.get("/tstaff", staff_controller.GetTstaff);
    router.get("/ntstaff", staff_controller.GetNtstaff);
    router.delete('/deltstaff/:id', staff_controller.DeleteStaff );
    router.delete('/delntstaff/:id', staff_controller.DeleteNtstaff);
    router.post('/addmgt', committee_controller.RegisterMgtCommittee);
    router.post('/addpta', committee_controller.RegisterPTACommittee);
    router.get('/getmgt', committee_controller.GetMgt);
    router.get('/getpta', committee_controller.GetPta);
    router.delete('/delmgt/:id', committee_controller.DeleteMgt);
    router.delete('/delpta/:id', committee_controller.DeletePta);
    router.get('/achve', chalgenAchive_controller.GetAchievements);
    router.get('/chal', chalgenAchive_controller.GetChallenges);
    router.post('/addchal', chalgenAchive_controller.AddChallenge);
    router.delete('/delchal/:id', chalgenAchive_controller.DeleteChallenge);
    router.post('/addachve', chalgenAchive_controller.AddAchievement);
    router.delete('/delachve/:id', chalgenAchive_controller.DeleteAchievement);
    router.post('/addperf', performance_controller.RegisterPerformance);
    router.get('/perf', performance_controller.GetPerformance);
    router.delete('/delperf/:id', performance_controller.DeletePerformance);
    router.post('/addimage', image_controller.AddImage);
    router.post('/upload', upload.single('file'), UploadFile);
    router.get('/files', resources_controller.GetFiles);
    router.get('/download/:id', resources_controller.DownloadFile);
//pupils
    router.post("/adpupil", pupils_controller.RegisterPupil);
    router.get("/pupils", pupils_controller.GetPupils);
    router.delete("/delpupil/:id", pupils_controller.DeletePupil);
    router.get("/srchpupil", pupils_controller.SearchPupils);
    router.put("/updpupil/:id", pupils_controller.UpdatePupil);

    router.get("/p1pil", pupils_controller.GetPupil1);
    router.get("/p2pil", pupils_controller.GetPupil2);
    router.get("/p3pil", pupils_controller.GetPupil3);
    router.get("/p4pil", pupils_controller.GetPupil4);
    router.get("/p5pil", pupils_controller.GetPupil5);
    router.get("/p6pil", pupils_controller.GetPupil6);
    router.get("/p7pil", pupils_controller.GetPupil7);
    router.post("/loginprt", pupils_controller.Login);
//books    
    router.post("/adbk", books_controller.RegisterBook);
    router.get("/books", books_controller.GetBooks);
    router.delete("/delbk/:id", books_controller.DeleteBook);
    router.get("/srchbk", books_controller.SearchBooks);
    router.put("/updbk/:id", books_controller.UpdateBook);

//Results
    router.post("/adple", results_controller.RegisterResults);
    router.get("/results", results_controller.GetResults);

    router.post("/sign", signature_controller.RegisterSignature);
    router.get("/signature", signature_controller.GetSignature);

    




    app.use('/school', router);
}