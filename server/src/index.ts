import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
dotenv.config()
import ocrRoute from './routes/ocrRoute'
const URL = process.env.URL as string;
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: [URL, 'http://localhost:5173'],
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use('/api/parse-aadhaar',ocrRoute)

app.get('/',(req,res)=>{
    res.send('server is working')
})

app.listen(process.env.PORT,()=>{
    console.log(`server is started at http://localhost:${process.env.PORT}`)
})