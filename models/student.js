const { DataTypes } = require("sequelize")
const sequelize = require("../sequelize")

const Student = sequelize.define(
    "Student",
    {
        studentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nume: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        }
    },
    {
        tableName:"Students"
    }
);

module.exports=Student;