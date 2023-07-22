import mongoose from "mongoose";

const Notes = new mongoose.Schema({
    creator : String,
    title : String, 
    content : String
}) ; 

const UserNotes = new mongoose.model('Notes', Notes) ;

export default UserNotes ;