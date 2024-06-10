import orderModel from "../models/ordersModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order form front end
const placeOrder = async (req,res) =>{

    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            // all of these came from the midleware authentication usint token
        })
        await newOrder.save(); // save new order in the database 
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}}); // (clean user cart data) set cartData with empty as object so that it will clear the cart data
// creating line_items which is nessary fior the stripe payment 
        const line_Items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_Items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })         

        const session = await stripe.checkout.sessions.create({
            line_items:line_Items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId==${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId==${newOrder._id}`
        })
        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const verifyOrder = async (req,res) =>{
    const { orderId, success} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,success:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { placeOrder,verifyOrder }