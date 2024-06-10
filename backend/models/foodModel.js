import mongoose from "mongoose";

const foodSchems = new mongoose.Schema({
    name:{type:String,required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:String, required:true},
    category: {type:String, required:true}
})

const foodModel = mongoose.models.foodModel || mongoose.model("food",foodSchems)

export default foodModel