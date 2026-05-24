const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route 1 Get  'localhost:5000/api/notes/fetchallnotes'  for fetch notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
          console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    // router.get('/fetchallnotes', fetchuser, async (req, res) => {

    // const notes = await Notes.find();

    // res.json(notes);
});
//});

//Route 2  Post 'localhost:5000/api/notes/addnotes'  for add notes
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const {title,description,tag} = req.body;
    //if error return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()});
    }
    const note = new Notes({
        title,description,tag,user:req.user.id
    })
    const savedNotes = await note.save()
     res.json(savedNotes);
    }  catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
});

//Route 3 update notes Put 'localhost:5000/api/notes/updatenotes'  for update notes
router.put('/updatenotes/:id', fetchuser,async (req,res)=>{
    const{title,description,tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString()!= req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
});

//Route 3 delete notes delete 'localhost:5000/api/notes/deletenotes'  for delete notes
router.delete('/deletenotes/:id', fetchuser,async (req,res)=>{
  //  const{title,description,tag} = req.body;
   
    //find note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString()!= req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deletes",note:note})
})
module.exports = router;