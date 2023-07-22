import express from 'express' ;

import { getNotes, createNote, deleteNote, updateNote } from '../controller/notes.js';
import auth from '../middlewares/notes.js' ;

const router = express.Router() ;

router.get('/',auth,getNotes) ;
router.post('/',auth,createNote) ;
router.delete('/:id',auth,deleteNote) ;
router.patch('/:id',auth,updateNote) ;

export default router ;
