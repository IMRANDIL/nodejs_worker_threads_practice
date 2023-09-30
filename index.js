import express from 'express'

const app = express()

const PORT = process.env.PORT || 6000;

app.get('/non-blocking', (req,res)=>{
    res.status(200).send(`This is non blocking one.`)
})


app.get('/blocking', (req,res)=>{
    let counter = 0;
    for(let i=0; i< 20_000_000_000; i++){
        counter ++
    }
    res.status(200).send(`This is blocking one result: ${counter}`)
})



app.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`)
})