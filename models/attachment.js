const { DataTypes } = require("sequelize")
const sequelize = require("../sequelize")

const ATTACHMENT_TYPE = Object.freeze({
    IMAGE: "Image",
    DOCUMENT: "Document"
})

const Attachment = sequelize.define(
    "Attachment",
    {
        attachmentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        attachmentType: {
            type: DataTypes.ENUM.ATTACHMENT_TYPE
        },
        content: {
            type: DataTypes.BLOB
        },
        noteId: {
            type: DataTypes.INTEGER
        }
    },
    {
        tableName: "Attachments"
    }
);

module.exports=Attachment;