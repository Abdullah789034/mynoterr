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

module.exports = router