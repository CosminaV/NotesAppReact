let express = require('express');
const {Op} = require("sequelize");
let router = express.Router();
const Student = require("../models/student");
const Note = require('../models/note');
const Group = require('../models/group');

Student.hasMany(Note);
Student.belongsToMany(Group, {through:"StudentGroups"});

//ruta pt get
router.route('/getStudents').get(async (req,res) => {
    try{
        const students = await Student.findAll();
        res.status(200).json(students);
    }
    catch (error){
        console.log(error);
        res.status(500).json(error);
    }
});

//ruta pt add
router.route('/addStudent').post(async (req,res)=>{
    try{
        const newStudent = await Student.create(req.body);
        res.status(200).json(newStudent);
    }
    catch (error){
        res.status(500).json(error);
    }
});

//obtine grupurile unui student cu un anume id
router.route('/students/:studentId/groups').get(async (req, res) => {
    try{
        const student = await Student.findByPk(req.params.studentId);
        if(student){
            const groups = await student.getGroups({attributes: ['id']});
            if(groups.length > 0){
                res.status(200).json(groups);
            }
            else{
                res.status(400).json({error: "this student doesn't have groups"});
            }
        }
        else{
            res.status(400).json({error: `Student with id ${req.params.studentId} not found`});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;