import { User } from '@/models/User';
import { authOptions } from '../auth/[...nextauth]/route';
// const { default: mongoose } = require("mongoose");
// const { getServerSession } = require("next-auth");
import getServerSession from 'next-auth';

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    if ('name' in data) {
       await User.updateOne({email}, {name: data.name})
    }
    return Response.json(true);
}