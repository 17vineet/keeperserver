import mongoose from 'mongoose';

import UserNotes from '../models/notes.js' ;

export const getNotes = async (req,res)=>{

    try {
        const notes = await UserNotes.find({creator : req.userid}) ;

        res.status(200).json({data : notes}) ;
    } catch (error) {
        res.status(404).json({message : error}) ;
    }

} ;

export const createNote = async (req, res)=>{
    const note = req.body ;
    const newNote = new UserNotes({ ...note, creator : req.userid }) ;
    try {
        await newNote.save() ; 

        const notes = await UserNotes.find({creator : req.userid}) ;

        res.status(200).json({data : notes}) ;
    } catch (error) {
        res.status(404).json({message : error}) ;
    }
} ;

export const deleteNote = async (req,res)=>{
    const { id } = req.params ; 

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

        await UserNotes.findByIdAndRemove(id) ;

        res.json({ message: 'Post deleted successfull' });
    } catch (error) {
        console.log(error);
    }
}

export const updateNote  = async (req,res)=>{
    try {
        const { id : _id } = req.params ; 
        const note = req.body ; 
        
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

        const updatedNote = await UserNotes.findByIdAndUpdate(_id, { ...note, _id }, { new: true });
        
        res.json(updatedNote);
        
    } catch (error) {
        console.log(error);
    } 
}