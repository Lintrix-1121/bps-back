module.exports = (sequelize_config, Sequelize) => {

    const marks2 = sequelize_config.define("marks2", {
        pupils_name: { type: Sequelize.STRING, allowNull: false },
        level: {type: Sequelize.ENUM('P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7')},
        age: {type: Sequelize.INTEGER},
        term: {type: Sequelize.ENUM('1', '2', '3')},
        year: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        bot_eng: {type: Sequelize.INTEGER},
        bot_math: {type: Sequelize.INTEGER},
        bot_sci: {type: Sequelize.INTEGER},
        bot_sst: {type: Sequelize.INTEGER},
        bot_reading: {type: Sequelize.INTEGER},
        bot_cape1: {type: Sequelize.INTEGER},
        bot_cape2: {type: Sequelize.INTEGER},
        bot_news: {type: Sequelize.INTEGER},
        bot_writing: {type: Sequelize.INTEGER},
        bot_oral_lit: {type: Sequelize.INTEGER},
        bot_art_tec: {type: Sequelize.INTEGER},
        bot_kiswahili: {type: Sequelize.INTEGER},
        mid_eng: {type: Sequelize.INTEGER},
        mid_math: {type: Sequelize.INTEGER},
        mid_sci: {type: Sequelize.INTEGER},
        mid_sst: {type: Sequelize.INTEGER},
        mid_reading: {type: Sequelize.INTEGER},
        mid_cape1: {type: Sequelize.INTEGER},
        mid_cape2: {type: Sequelize.INTEGER},
        mid_news: {type: Sequelize.INTEGER},
        mid_writing: {type: Sequelize.INTEGER},
        mid_oral_lit: {type: Sequelize.INTEGER},
        mid_art_tec: {type: Sequelize.INTEGER},
        mid_kiswahili: {type: Sequelize.INTEGER},
        
        eng: { type: Sequelize.INTEGER },
        eng_grade: { 
            type: Sequelize.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9'), 
        },
        eng_remarks: { type: Sequelize.STRING },

        math: { type: Sequelize.INTEGER},
        math_grade: { 
            type: Sequelize.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9'), 
        },
        math_remarks: { type: Sequelize.STRING },

        sci: { type: Sequelize.INTEGER },
        sci_grade: { 
            type: Sequelize.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9'), 
        },
        sci_remarks: { type: Sequelize.STRING },

        sst: { type: Sequelize.INTEGER },
        sst_grade: { 
            type: Sequelize.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9'), 
        },
        sst_remarks: { type: Sequelize.STRING },

        reading: {type: Sequelize.INTEGER},
        cape1: {type: Sequelize.INTEGER},
        cape2: {type: Sequelize.INTEGER},
        news: {type: Sequelize.INTEGER},
        writing: {type: Sequelize.INTEGER},
        oral_lit: {type: Sequelize.INTEGER},
        art_tec: {type: Sequelize.INTEGER},
        kiswahili: {type: Sequelize.INTEGER},
        fees_bal: {type: Sequelize.DECIMAL(10,2)},
        next_fees: {type: Sequelize.DECIMAL (10,2)},
        class_day: {
            type: Sequelize.DATEONLY,
            allowNull: false,
           
        },
        visitation: {
            type: Sequelize.DATEONLY,
            allowNull: false,
           
        },
        sports_day: {
            type: Sequelize.DATEONLY,
            allowNull: false,
           
        },
        next_b: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            
        },
        ends: {
            type: Sequelize.DATEONLY,
            allowNull: false,
           
        },
        
        total: { 
            type: Sequelize.INTEGER, 
            allowNull: false, 
            defaultValue: 0 
        },
        average: { 
            type: Sequelize.FLOAT, 
            allowNull: false, 
            defaultValue: 0 
        },
        stream: {type: Sequelize.ENUM('Blue', 'Red')},
        stream_position: {type: Sequelize.INTEGER },
        position: { type: Sequelize.INTEGER },
        division: { type: Sequelize.STRING}
        
    }, {
        hooks: {
            beforeCreate: (instance) => {
                if (isAnyMarkMissing(instance)) {
                    instance.division = 'X'; 
                    return;
                }

                instance.total = (instance.eng + instance.math + instance.sci + instance.sst);
                instance.average = calculateAverage(instance.eng, instance.math, instance.sci, instance.sst);
                console.log('Before Create:', {
                    eng: instance.eng,
                    math: instance.math,
                    sci: instance.sci,
                    sst: instance.sst,
                    total: instance.total,
                    average: instance.average,
                });

                // Assign grades
                instance.eng_grade = assignGrade(instance.eng);
                instance.math_grade = assignGrade(instance.math);
                instance.sci_grade = assignGrade(instance.sci);
                instance.sst_grade = assignGrade(instance.sst);

                // Assign remarks
                instance.eng_remarks = assignRemarks(instance.eng);
                instance.math_remarks = assignRemarks(instance.math);
                instance.sci_remarks = assignRemarks(instance.sci);
                instance.sst_remarks = assignRemarks(instance.sst);

                const totalGrades = parseInt(instance.eng_grade) + 
                                    parseInt(instance.math_grade) + 
                                    parseInt(instance.sci_grade) + 
                                    parseInt(instance.sst_grade);

                instance.division = assignDivision(totalGrades, instance);
            },
            beforeUpdate: (instance) => {
                if (isAnyMarkMissing(instance)) {
                    instance.division = 'X'; 
                    return;
                }

                instance.total = (instance.eng + instance.math + instance.sci + instance.sst);
                instance.average = calculateAverage(instance.eng, instance.math, instance.sci, instance.sst);
                console.log('Before Update:', {
                    eng: instance.eng,
                    math: instance.math,
                    sci: instance.sci,
                    sst: instance.sst,
                    total: instance.total,
                    average: instance.average,
                });

                // Assign grades
                instance.eng_grade = assignGrade(instance.eng);
                instance.math_grade = assignGrade(instance.math);
                instance.sci_grade = assignGrade(instance.sci);
                instance.sst_grade = assignGrade(instance.sst);

                // Assign remarks
                instance.eng_remarks = assignRemarks(instance.eng);
                instance.math_remarks = assignRemarks(instance.math);
                instance.sci_remarks = assignRemarks(instance.sci);
                instance.sst_remarks = assignRemarks(instance.sst);

                const totalGrades = parseInt(instance.eng_grade) + 
                                    parseInt(instance.math_grade) + 
                                    parseInt(instance.sci_grade) + 
                                    parseInt(instance.sst_grade);

                instance.division = assignDivision(totalGrades, instance);
            }
        },
    });

    const isAnyMarkMissing = (instance) => {
        return instance.eng == null || instance.math == null || instance.sci == null || instance.sst == null;
    };

    const assignGrade = (marks) => {
        if (marks >= 95) return '1';
        if (marks >= 85) return '2';
        if (marks >= 75) return '3';
        if (marks >= 65) return '4';
        if (marks >= 60) return '5';
        if (marks >= 55) return '6';
        if (marks >= 50) return '7';
        if (marks >= 45) return '8';
        return '9'; 
    };

    const assignRemarks = (marks) => {
        if (marks >= 90) return 'Excellent';
        if (marks >= 80) return 'Very Good';
        if (marks >= 70) return 'Good';
        if (marks >= 60) return 'Fair';
        return 'Need Improvement';
    };

    const calculateAverage = (eng, math, sci, sst) => {
        const totalSubjects = 4; 
        return (eng + math + sci + sst ) / totalSubjects;
    };

    const assignDivision = (totalGrades, instance) => {
        if (totalGrades < 15 && (instance.eng_grade === '9' || 
                                  instance.math_grade === '9' || 
                                  instance.sci_grade === '9' || 
                                  instance.sst_grade === '9')) {
            return 3; 
        }
        if (totalGrades < 15) return 1;
        if (totalGrades < 30) return 2;
        if (totalGrades < 35) return 3;
        if (totalGrades < 40) return 4;
        if (totalGrades < 45) return 5;
        return null; 
    };

    return marks2;
};




/*module.exports = (sequelize_config, Sequelize) => {
    
    const p4 = sequelize_config.define("p4_marks", {
        pupils_name: { type: Sequelize.STRING, allowNull: false },
        level: {type: Sequelize.STRING, defaultValue: 'P4'},
        age: {type: Sequelize.INTEGER},
        term: {type: Sequelize.STRING},
        year: {
            type:Sequelize.DATEONLY,
            allowNull: false
        },
        bot_eng: {type: Sequelize.INTEGER},
        bot_math: {type: Sequelize.INTEGER},
        bot_sci: {type: Sequelize.INTEGER},
        bot_sst: {type: Sequelize.INTEGER},
        bot_re: {type: Sequelize.INTEGER},
        bot_reading: {type: Sequelize.INTEGER},
        bot_cape1: {type: Sequelize.INTEGER},
        bot_cape2: {type: Sequelize.INTEGER},
        bot_news: {type: Sequelize.INTEGER},
        bot_writing: {type: Sequelize.INTEGER},
        bot_oral_lit: {type: Sequelize.INTEGER},
        bot_art_tec: {type: Sequelize.INTEGER},
        bot_kiswahili: {type: Sequelize.INTEGER},
        mid_eng: {type: Sequelize.INTEGER},
        mid_math: {type: Sequelize.INTEGER},
        mid_sci: {type: Sequelize.INTEGER},
        mid_sst: {type: Sequelize.INTEGER},
        mid_re: {type: Sequelize.INTEGER},
        mid_reading: {type: Sequelize.INTEGER},
        mid_cape1: {type: Sequelize.INTEGER},
        mid_cape2: {type: Sequelize.INTEGER},
        mid_news: {type: Sequelize.INTEGER},
        mid_writing: {type: Sequelize.INTEGER},
        mid_oral_lit: {type: Sequelize.INTEGER},
        mid_art_tec: {type: Sequelize.INTEGER},
        mid_kiswahili: {type: Sequelize.INTEGER},

        eng: { type: Sequelize.INTEGER },
        eng_grade: { 
            type: Sequelize.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9'), 
        },
        eng_remarks: { type: Sequelize.STRING },

        math: { type: Sequelize.INTEGER},
        math_grade: { 
            type: Sequelize.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9'), 
        },
        math_remarks: { type: Sequelize.STRING },

        sci: { type: Sequelize.INTEGER },
        sci_grade: { 
            type: Sequelize.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9'), 
        },
        sci_remarks: { type: Sequelize.STRING },

        sst: { type: Sequelize.INTEGER },
        sst_grade: { 
            type: Sequelize.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9'), 
        },
        sst_remarks: { type: Sequelize.STRING },

        re: { type: Sequelize.INTEGER },
        re_grade: { 
            type: Sequelize.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9'), 
        },
        re_remarks: { type: Sequelize.STRING },

        reading: {type: Sequelize.INTEGER},
        cape1: {type: Sequelize.INTEGER},
        cape2: {type: Sequelize.INTEGER},
        news: {type: Sequelize.INTEGER},
        writing: {type: Sequelize.INTEGER},
        oral_lit: {type: Sequelize.INTEGER},
        art_tec: {type: Sequelize.INTEGER},
        kiswahili: {type: Sequelize.INTEGER},
        fees_bal: {type: Sequelize.DECIMAL(10, 2)},
        next_fees: {type: Sequelize.DECIMAL(10, 2)},
        class_day: {
            type:Sequelize.DATEONLY,
            allowNull: false
        },
        visitation: {
            type:Sequelize.DATEONLY,
            allowNull: false
        },
        sports_day: {
            type:Sequelize.DATEONLY,
            allowNull: false
        },
        next_b: {
            type:Sequelize.DATEONLY,
            allowNull: false
        },
        ends: {
            type:Sequelize.DATEONLY,
            allowNull: false
        },

        total: { 
            type: Sequelize.INTEGER, 
            allowNull: false, 
            defaultValue: 0 
        },
        average: { 
            type: Sequelize.FLOAT, 
            allowNull: false, 
            defaultValue: 0 
        },
        
        position: { type: Sequelize.INTEGER },
        division: { type: Sequelize.STRING}
        
    }, {
        hooks: {
            beforeCreate: (instance) => {
                if (isAnyMarkMissing(instance)) {
                    instance.division = 'X'; 
                    return;
                }

                instance.total = (instance.eng + instance.math + instance.sci + instance.sst);
                instance.average = calculateAverage(instance.eng, instance.math, instance.sci, instance.sst );
                console.log('Before Create:', {
                    eng: instance.eng,
                    math: instance.math,
                    sci: instance.sci,
                    sst: instance.sst,
                    total: instance.total,
                    average: instance.average,
                });
                instance.eng_grade = assignGrade(instance.eng);
                instance.math_grade = assignGrade(instance.math);
                instance.sci_grade = assignGrade(instance.sci);
                instance.sst_grade = assignGrade(instance.sst);


                const totalGrades = parseInt(instance.eng_grade) + 
                                    parseInt(instance.math_grade) + 
                                    parseInt(instance.sci_grade) + 
                                    parseInt(instance.sst_grade);
                                   

                instance.division = assignDivision(totalGrades, instance);
            },
            beforeUpdate: (instance) => {
                if (isAnyMarkMissing(instance)) {
                    instance.division = 'X'; 
                    return;
                }

                instance.total = (instance.eng + instance.math + instance.sci + instance.sst );
                instance.average = calculateAverage(instance.eng, instance.math, instance.sci, instance.sst);
                console.log('Before Update:', {
                    eng: instance.eng,
                    num: instance.math,
                    sci: instance.sci,
                    sst: instance.sst,
                    total: instance.total,
                    average: instance.average,
                });
                instance.eng_grade = assignGrade(instance.eng);
                instance.math_grade = assignGrade(instance.math);
                instance.sci_grade = assignGrade(instance.sci);
                instance.sst_grade = assignGrade(instance.sst);

                const totalGrades = parseInt(instance.eng_grade) + 
                                    parseInt(instance.math_grade) + 
                                    parseInt(instance.sci_grade) + 
                                    parseInt(instance.sst_grade);

                instance.division = assignDivision(totalGrades, instance);
            }
        },
    });

    const isAnyMarkMissing = (instance) => {
        return instance.eng == null || instance.math == null || instance.sci == null || instance.sst == null;
    };

    const assignGrade = (marks) => {
        if (marks >= 95) return '1';
        if (marks >= 85) return '2';
        if (marks >= 75) return '3';
        if (marks >= 65) return '4';
        if (marks >= 60) return '5';
        if (marks >= 55) return '6';
        if (marks >= 50) return '7';
        if (marks >= 45) return '8';
        return '9'; 
    };

    const calculateAverage = (eng, math, sci, sst )=> {
        const totalSubjects = 4; 
        return (eng + math + sci + sst) / totalSubjects;
    };

    const assignDivision = (totalGrades, instance) => {
        if (totalGrades < 15 && (instance.eng_grade === '9' || 
                                  instance.math_grade === '9' || 
                                  instance.sci_grade === '9' || 
                                  instance.sst_grade === '9')) {
            return 3; 
        }
        if (totalGrades < 15) return 1;
        if (totalGrades < 30) return 2;
        if (totalGrades < 35) return 3;
        if (totalGrades < 40) return 4;
        if (totalGrades < 45) return 5;
        return null; 
    };

    return p4;
};*/



