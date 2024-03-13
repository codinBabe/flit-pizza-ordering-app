import { Schema, models, model } from "mongoose";

const OrderSchema = new Schema({
    customer: { type: String, maxLength: 200 },
    streetAddress: { type: String, required: true, maxLength: 200 },
    postalCode: { type: String, required: true, maxLength: 200 },
    city: { type: String, required: true, maxLength: 200 },
    country: { type: String, required: true, maxLength: 200 },
    cartItems: Object,
    paid: { type: Boolean, default: false },
}, { timestamps: true });

export const Order = models?.Order || model('Order', OrderSchema);