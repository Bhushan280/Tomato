import express from 'express'
import cors from 'cors'




//app config

const app = express()
const port = 4000

//middleware

app.use(express.json()) // using this middleware whenever we get request from front to backend that will pass using this json
app.use(cors()) // using this cors we can access backend from any frontend


app.get("/", (req,res)=>{
    res.send("API Working")
} ) // this is http method we can use to get data from the server


//to runn the express server we euse app.listen, passing an call back function,
// when server is running we log below text
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})