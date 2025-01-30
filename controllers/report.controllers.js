const express = require('express');
const router = express.Router();
const { marks, report } = require('../models'); 


exports.PrintReport = async (req, res) => {
    try {
        const allMarks = await marks.findAll();

        // Mapping marks to reports
        const reports = allMarks.map(mark => ({
            pupils_name: mark.pupils_name,
            eng: mark.eng,
            eng_grade: mark.eng_grade,
            math: mark.math,
            math_grade: mark.math_grade,
            sci: mark.sci,
            sci_grade: mark.sci_grade,
            sst: mark.sst,
            sst_grade: mark.sst_grade,
            total: mark.total,
            average: mark.average,
        }));

        // Bulk creating reports
        await report.bulkCreate(reports);

        return res.status(201).json({
            status: "success",
            message: "Reports created successfully",
            count: reports.length,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "Error copying marks to reports",
            error: err.message,
        });
    }
};

