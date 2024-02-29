import { Schema, models, model } from "mongoose";

const OrderSchema = new Schema({
    customer: { type: String, required: true, maxLength: 200 },
    address: { type: String, required: true, maxLength: 200 },
    total: { type: Number, required: true},
    status: { type: Number, required: true, default: 0 },
    method:{ type: Number, required: true,}
}, { timestamps: true });

export const Order = models?.Order || model('Order', OrderSchema);