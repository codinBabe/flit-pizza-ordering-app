import bcrypt from 'bcrypt';
import {model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: {
        type: String, 
        required: true,
        validate: {
            validator: function(password) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\\/"!@#%&~,><':;|_`])[\w\d\^$*.[\]{}()?\\/"!@#%&~,><':;|_`]{8,}$/;
                return passwordRegex.test(password);
            },
            message: props => `${props.value} is not a valid password. Password must contain at least one lowercase letter, one digit, and one special character, and have a minimum length of 8 characters.`
        }
    },
}, { timestamps: true });

UserSchema.post('validate', function(user){
    const passToHash = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(passToHash, salt);
    
})
export const User = models?.User || model('User', UserSchema);