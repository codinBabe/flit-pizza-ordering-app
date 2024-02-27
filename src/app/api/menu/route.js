import { MenuItem } from "@/models/Menu";
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const menuDoc = await MenuItem.create(data);
    return Response.json(menuDoc);
}

export async function GET(){
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
        await MenuItem.find()
    );
}