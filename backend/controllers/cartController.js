import userModel from '../models/userModel.js'

//add to cart function
const addToCart = async (req,res) => {
    try {
        // let userData = await userModel.findOne({_id:req.body.userId}); both are same as below:
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData}); // update cart data into the database
        res.json({success:true, message:"Added To Cart"})
        //  if their no entry in the cart in that case we will create the cartdata 
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove items from user cart
const removeFromCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1; 
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//fetch user cart data
const getCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {addToCart,removeFromCart,getCart}