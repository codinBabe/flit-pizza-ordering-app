
import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Order } from "@/models/Order";
import PaypalClient from "@/components/utils/PayPal";
import { MenuItem } from "@/models/Menu";
import paypal from '@paypal/checkout-server-sdk';

export async function POST(req, res) {
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
            quantity: 1,
            price_data: {
                currency: 'USD',
                product_data: {
                    name: cartProduct.name,
                },
                unit_amount: productPrice * 100,
            },
        })
    }

    const PayPalClient = PaypalClient();
    const createRequest = new paypal.orders.OrdersCreateRequest();
    createRequest.headers['prefer'] = 'return=representation'
    createRequest.requestBody({
        intent: 'CAPTURE',
        purchase_units: paypalLineItems,
    })
    const createResponse = await PayPalClient.execute(createRequest);

    // Extract approval URL from createResponse and return it to the frontend
    const approvalUrl = createResponse.result.links.find(link => link.rel === 'approve').href;
    return res.status(200).json({ success: true, approvalUrl });
}
