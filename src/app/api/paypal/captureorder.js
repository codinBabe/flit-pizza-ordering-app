import PaypalClient from "@/components/utils/PayPal";
import { Order } from "@/models/Order";
import paypal from '@paypal/checkout-server-sdk'
import mongoose from "mongoose";


export default async function Handler(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { orderID} = await req.json();
   

    //Capture order to complete payment
    const PayPalClient = PaypalClient()
    const request = new paypal.orders.OrdersCaptureRequest(orderID)
    request.requestBody({})
    const response = await PayPalClient.execute(request)
  
    await Order.findByIdAndUpdate(orderID, {paid:true})
    return Response.json({ ...response })
}