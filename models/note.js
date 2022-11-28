const { DataTypes } = require("sequelize")
const sequelize = require("../sequelize")

const Note = sequelize.define(
    "Note",
    {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING
        },
        isCreated : {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING
        },
        date : {
            type: DataTypes.DATE
        }, 
        tag: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: "Notes"
    }
)

module.exports=Note;