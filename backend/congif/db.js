// logic to connect with the database

import mangoose from "mongoose"

export const connectDB = async () => {
    await mangoose.connect('mongodb+srv://onepiece:12532500@cluster0.r5u56vo.mongodb.net/food-del').then(()=>console.log("DB Connected !!"))
}



