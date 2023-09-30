import express from 'express'
import {Worker} from 'worker_threads'
const app = express();

app.use(express.json());

 const PORT = process.env.PORT || 8000;

app.get('/non-blocking', (req,res)=>{
    res.status(200).json(`This is non blocking one.`)
})


app.get('/blocking', (req,res)=>{
   const worker = new Worker('./worker.js');

   worker.on('message', (data)=>{
    res.status(200).send(`This is blocking one result: ${data}`)
   });

   worker.on('error', (error)=>{
    res.status(400).send(`error: ${error}`)
   })
   
})



app.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`)
})