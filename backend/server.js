import express from 'express'
import cors from 'cors'
import { connectDB } from './congif/db.js'
import foodRouter from './routes/foodRoutes.js'
import userRouter from './routes/userRoutes.js'
import 'dotenv/config.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'

//app config
const app = express()
const port = 4000

//middleware

app.use(express.json()) // using this middleware whenever we get request from front to backend that will pass using this json
app.use(cors()) // using this cors we can access backend from any frontend


//db connection
connectDB();


// API endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/", (req,res)=>{
    res.send("API Working")
} ) // this is http method we can use to get data from the server


//to runn the express server we euse app.listen, passing an call back function,
// when server is running we log below text
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})


// mongodb+srv://onepiece:12532500@cluster0.r5u56vo.mongodb.net/?

// mongodb+srv://onepiece:12532500@cluster0.r5u56vo.mongodb.net/?
// retryWrites=true&w=majority&appName=Cluster0