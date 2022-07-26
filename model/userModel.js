import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({

    email:{

        type: String,
        required: true,
        unique: true // cannot be the same from another user
    },
    password:{

        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

    if(!email || !password){
        throw Error('All fields must be filled')
    }

    // if the email already exists
    const existingEmail = await this.findOne({ email })

    if(existingEmail){
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(password, salt); // hashing the password

    const user = await this.create({
        email: email, 
        password: hash
    })

    return user
}

// static login method
userSchema.statics.login = async function(email, password){

    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if(!user){
        throw Error('Incorrect Email')
    }

    // compare the plain text and the hashed password stored in the database
    const matchPassword = await bcrypt.compare(password, user.password);

    if(!matchPassword){
        throw Error('Incorrect password')
    }

    return user

}

export default mongoose.model("user", userSchema);