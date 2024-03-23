import PaypalClient from "@/components/utils/PayPal";
import { MenuItem } from "@/models/Menu";
import { Order } from "@/models/Order";
import paypal from '@paypal/checkout-server-sdk'
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function Handler(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { cartItems, details } = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDoc = await Order.create({
        userEmail,
        ...details,
        cartItems,
        paid: false,
    });

    const paypalLineItems = [];
    for (const cartProduct of cartItems) {
        const productInfo = await MenuItem.findById(cartProduct._id);
        let productPrice = productInfo.price;
        if (cartProduct.size) {
            const size = productInfo.sizes.find(size => size._id.toString() === cartProduct.size._id.toString());
            productPrice += size.price;
        }
        if (cartProduct.extras?.length > 0) {
            for (const extraThing of cartProduct.extras) {
                const extraThingInfo = productInfo.extraIngredientPrices.find(extra => extra._id.toString() === extraThing._id.toString());
                productPrice += extraThingInfo.price;
            }
        }

        paypalLineItems.push({
            amount: {
                currency: 'USD',
                value: productPrice * 100,
            }
        })
    }

    const PayPalClient = PaypalClient()
    const request = new paypal.orders.OrdersCreateRequest()
    request.headers['prefer'] = 'return=representation'
    request.requestBody({
        intent: 'CAPTURE',
        paypalLineItems
    })
    const response = await PayPalClient.execute(request)
    return Response.json({orderDoc, response})
}