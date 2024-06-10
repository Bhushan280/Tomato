import foodModel from "../models/foodModel.js";
import fs from 'fs' // fileSystem in-build uin node js


// add food item
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })
    try {
        await food.save(); // using this method food item will be saved in the database
        res.json({success:true, message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

//all food list
const listFood = async (req,res) =>{
    try {
        const foods = await foodModel.find({}); // get all the data of food items
        res.json({success:true, data:foods})// response using json method
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }
}
//s

//remove food item 
const removeFood = async (req, res) =>{
    try {
        // find food item to delete
        const food = await foodModel.findById(req.body.id) // find the food model using id
        fs.unlink(`uploads/${food.image}`,()=>{}) // image delete from the folder

        await foodModel.findByIdAndDelete(req.body.id);
        //food data deleted from the database

        res.json({success:true,message:"Food Removed"})

    } catch (error) {
        console.log(error)
        res.json({success:true,message:"Error"})
    }
}

export { addFood , listFood ,removeFood}