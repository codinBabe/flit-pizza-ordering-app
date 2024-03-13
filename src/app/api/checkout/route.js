import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Order } from "@/models/Order";
//import paypal

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);

    const { cartItems, details } = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDoc = await Order.create({
        userEmail,
        ...details,
        cartItems,
        paid: false,
    })
    // const payPalSession = await paypal.checkout.sessions.create({
    //     line_items:[],
    //     mode:'payment',
    //     customer_email:userEmail,
    //     success_url:process.env.NEXTAUTH_URL + 'cart?success=1',
    //     cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
    //     metadata:{orderId:orderDoc._id},
    //     shippig_options:[
    //         {
    //             shipping_rate_data:{
    //                 display_name:'Delivery fee',
    //                 type:'fixed_amount',
    //                 fixed_amount:{amount:500, currency:'USD'}
    //             }
    //         }
    //     ]
    // })

}