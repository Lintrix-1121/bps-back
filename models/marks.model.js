module.exports = (sequelize_config, Sequelize) => {

    const marks = sequelize_config.define("marks", {
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
        bot_lit1: {type: Sequelize.INTEGER},
        bot_lit2: {type: Sequelize.INTEGER},
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
        mid_lit1: {type: Sequelize.INTEGER},
        mid_lit2: {type: Sequelize.INTEGER},
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

        lit1: { type: Sequelize.INTEGER },
        lit1_grade: { 
            type: Sequelize.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9'), 
        },
        lit1_remarks: { type: Sequelize.STRING },

        lit2: { type: Sequelize.INTEGER },
        lit2_grade: { 
            type: Sequelize.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9'), 
        },
        lit2_remarks: { type: Sequelize.STRING },

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

                instance.total = (instance.eng + instance.math + instance.lit1 + instance.lit2 + instance.re);
                instance.average = calculateAverage(instance.eng, instance.math, instance.lit1, instance.lit2, instance.re);
                console.log('Before Create:', {
                    eng: instance.eng,
                    math: instance.math,
                    lit1: instance.lit1,
                    lit2: instance.lit2,
                    re: instance.re,
                    total: instance.total,
                    average: instance.average,
                });

                // Assign grades
                instance.eng_grade = assignGrade(instance.eng);
                instance.math_grade = assignGrade(instance.math);
                instance.lit1_grade = assignGrade(instance.lit1);
                instance.lit2_grade = assignGrade(instance.lit2);
                instance.re_grade = assignGrade(instance.re);

                // Assign remarks
                instance.eng_remarks = assignRemarks(instance.eng);
                instance.math_remarks = assignRemarks(instance.math);
                instance.lit1_remarks = assignRemarks(instance.lit1);
                instance.lit2_remarks = assignRemarks(instance.lit2);
                instance.re_remarks = assignRemarks(instance.re);

                const totalGrades = parseInt(instance.eng_grade) + 
                                    parseInt(instance.math_grade) + 
                                    parseInt(instance.lit1_grade) + 
                                    parseInt(instance.lit2_grade) +
                                    parseInt(instance.re_grade);

                instance.division = assignDivision(totalGrades, instance);
            },
            beforeUpdate: (instance) => {
                if (isAnyMarkMissing(instance)) {
                    instance.division = 'X'; 
                    return;
                }

                instance.total = (instance.eng + instance.math + instance.lit1 + instance.lit2 + instance.re);
                instance.average = calculateAverage(instance.eng, instance.math, instance.lit1, instance.lit2, instance.re);
                console.log('Before Update:', {
                    eng: instance.eng,
                    math: instance.math,
                    lit1: instance.lit1,
                    lit2: instance.lit2,
                    re: instance.re,
                    total: instance.total,
                    average: instance.average,
                });

                // Assign grades
                instance.eng_grade = assignGrade(instance.eng);
                instance.math_grade = assignGrade(instance.math);
                instance.lit1_grade = assignGrade(instance.lit1);
                instance.lit2_grade = assignGrade(instance.lit2);
                instance.re_grade = assignGrade(instance.re);

                // Assign remarks
                instance.eng_remarks = assignRemarks(instance.eng);
                instance.math_remarks = assignRemarks(instance.math);
                instance.lit1_remarks = assignRemarks(instance.lit1);
                instance.lit2_remarks = assignRemarks(instance.lit2);
                instance.re_remarks = assignRemarks(instance.re);

                const totalGrades = parseInt(instance.eng_grade) + 
                                    parseInt(instance.math_grade) + 
                                    parseInt(instance.lit1_grade) + 
                                    parseInt(instance.lit2_grade)+
                                    parseInt(instance.re_grade);

                instance.division = assignDivision(totalGrades, instance);
            }
        },
    });

    const isAnyMarkMissing = (instance) => {
        return instance.eng == null || instance.math == null || instance.lit1 == null || instance.lit2 == null || instance.re == null;
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

    const calculateAverage = (eng, math, lit1, lit2, re) => {
        const totalSubjects = 5; 
        return (eng + math + lit1 + lit2 + re) / totalSubjects;
    };

    const assignDivision = (totalGrades, instance) => {
        if (totalGrades < 15 && (instance.eng_grade === '9' || 
                                  instance.math_grade === '9' || 
                                  instance.lit1_grade === '9' || 
                                  instance.lit2_grade === '9' ||
                                  instance.re_grade === '9')) {
            return 3; 
        }
        if (totalGrades < 15) return 1;
        if (totalGrades < 30) return 2;
        if (totalGrades < 35) return 3;
        if (totalGrades < 40) return 4;
        if (totalGrades < 45) return 5;
        return null; 
    };

    return marks;
};

