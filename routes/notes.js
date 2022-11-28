let express = require('express');
let router = express.Router();
const Note = require("../models/note");

const checkID = (req, res, next) => {
    if(req.params.id && isNaN(req.params.id)){
        res.status(400).json({"error":"wrong input for id"});
    }
    else{
        next();
    }
}

//get pt o notita cu un anumit id
router.route('/getNote/:id').get(checkID, async (req, res)=>{
    try{
        const note = await Note.findByPk(req.params.id);
        if(note){
            res.status(200).json(note);
        }
        else{
            res.status(400).json({error: `Note with id ${req.params.id} is not found`});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

//get pt toate notitele
router.route('/getNotes').get(async (req, res)=>{
    try{
        const notes = await Note.findAll();
        res.status(200).json(notes);
    }
    catch(error){
        res.status(500).json(error);
    }
});

//adauga o notita
router.route('/addNote').post(async (req, res)=>{
    try{
        const newNote = await Note.create(req.body);
        res.status(200).json(newNote);
    }
    catch(error){
        res.status(500).json(error);
    }
});

//update la o notita
router.route('/modifyNote/:id').put(async (req,res)=>{
    try{
        const note = await Note.findByPk(req.params.id);
        if(note){
            const updatedNote = await note.update(req.body);
            res.status(200).json(updatedNote);
        }
        else{
            res.status(400).json({error:`Note with id ${req.params.id} is not found`});
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

//sterge o notita
router.route('/deleteNote/:id').delete(async (req,res)=>{
    try{
        Note.destroy({
            where : {id:req.params.id}
        }).then((rows) => {
            if(rows == 1){
                res.status(400).json({status: "note was deleted"});
            }
            else{
                res.status(400).status({status: "note was not found"});
            }
        })
    }
    catch(error){
        res.status(500).json(error);
    }
})

module.exports=router;