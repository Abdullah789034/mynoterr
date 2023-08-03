const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');



//Route 1: Get all notes : localhost:5000/api/notes/fetchallnotes 

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
    res.json(notes)
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
})

//Route 2: Add note :POST= localhost:5000/api/notes/addnote 

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description atleast 10 charachters').isLength({ min: 10 }),
], async (req, res) => {
      try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note =  new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote= await note.save();
        res.json(savedNote)
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})


//Route 3: Update note :PUT= localhost:5000/api/notes/updatenote  -- LOGIN REQUIRED
router.put('/updatenote/:id', fetchuser, async (req, res) => {
   try {
    const {title, description, tag} = req.body;
    //Create new Note obj
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //Find note to update
    let note= await Note.findById(req.params.id);
    if(!note){
       return res.status(404).send("Not found.");
    }
    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not Allowed.");
    }
    note= await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true});
    res.json({note});
   } catch (error) {
    console.error(error);
        res.status(500).send("Internal Server Error");
   }
   
    

})

//Route 4: Delete note :Delete= localhost:5000/api/notes/deletenote  -- LOGIN REQUIRED

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   try {
    const {title, description, tag} = req.body;

    //Find note to update
    let note= await Note.findById(req.params.id);
    if(!note){
       return res.status(404).send("Not found.");
    }
    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not Allowed.");
    }
    note= await Note.findByIdAndDelete(req.params.id);
    res.json({"Success" : "Note Deleted" , note :note});
   } catch (error) {
    console.error(error);
        res.status(500).send("Internal Server Error");
   }
   
    

})


module.exports = router