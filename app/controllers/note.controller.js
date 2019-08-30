const Note = require('../models/note.model');

exports.create =  (req,res)=> {
//validate
    if(!req.body.content){
        return res.status(400).send({
            message:"note content cannot be empty"
        })
    }

        const note = new Note({
            title : req.body.title || 'untitled Note',
            content:req.body.content
        })

        note.save()
        .then((data)=>{
        res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:err.message || "some error occured while creating note"
            });
        })
    }

 //Retrieve and return all notes from database
exports.findAll =  (req,res)=> {
Note.find()
.then(notes => {
    res.send(notes);
})
.catch(err => {
    res.status(500).send({
        message:err.message || "some error occurred"
    })
})
}
exports.findOne =  (req,res)=> {
const noteId = req.params.noteId;
Note.findById(noteId)
.then(note => {
    if(!note){
        return res.status(404).send({
            message:'Note not found with id' + noteId
        })
    }
    res.send(note);
})
.catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
        });                
    }
    return res.status(500).send({
        message: "Error retrieving note with id " + req.params.noteId
    });
});
}

exports.update =  (req,res)=> {
  //validate request
if(!req.body.content) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}

Note.findByIdAndUpdate(req.params.noteId,{
    title: req.body.title || "Untitled Note",
    content: req.body.content
},{new:true})
.then(note =>{
    if(!note) {
        return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
        });
    }
    res.send(note);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
        });                
    }

    return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId
    });

})
}

exports.delete =  (req,res)=> {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note =>{
    if(!note){
        return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
        });
    }
    res.send({message: "Note deleted successfully!"});
    })
    .catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    })
}
