import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv' ;

import noteRoutes from './routes/noteRoutes.js' ;

const app = express() ;
dotenv.config() ;

app.use(bodyParser.urlencoded({limit: "30mb", extended: true})) ;
app.use(bodyParser.json({limit: "30mb", extended: true})) ;
app.use(cors()) ;
// It enables CORS (cross-origin resource sharing). In order for your server to be accessible by other origins (domains).
// https://stackoverflow.com/questions/46024363/what-does-app-usecors-do

app.use('/notes',noteRoutes) ;
app.get('/',(req,res)=>{
    res.send('App is running') ;
})

const PORT = process.env.PORT || 7788 ;

const conn = async ()=>{

    try {
        await mongoose.connect(process.env.CONNECTION_URL) ;
        
        app.listen(PORT,()=>{
            console.log('Server started on port '+PORT);
        })

    } catch (error) {
        console.log(error) ;
    }
}

conn() ;
