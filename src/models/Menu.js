import { Schema, models, model } from "mongoose";

const ExtraPriceSchema = new Schema({
    name:String,
    price:Number,
});

const MenuItemSchema = new Schema({
    image: { type: String , required: true },
    name: { type: String, required: true, maxLength:60 },
    description: { type: String, required: true, maxLength:250 },
    price: { type: Number, required: true, maxLength:60 },
    sizes:{type: [ExtraPriceSchema]},
    extraIngredientPrices: { type:[ExtraPriceSchema]},
}, { timestamps: true });

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);