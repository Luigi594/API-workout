import userModel from "../model/userModel.js";
import jwt from 'jsonwebtoken';

const createToken = (_id) => {

    return jwt.sign({_id: _id}, process.env.SECRET, {
        expiresIn: '1h'
    })
}

// login user
const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try{
        
        const user = await userModel.login(email, password)

        // create a token
        const token = createToken(user._id)
        
        res.json({email, token});
    }
    catch(err){
        res.status(400).json({ error: err.message})
    }
}

// signup user
const signupUser = async (req, res) => {

    const { email, password } = req.body;

    try{

        // calling my method to hash the password
        const user = await userModel.signup(email, password);

        // create a token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    }
    catch(err){
        res.status(400).json({ error: err.message })
    }    
}

export { loginUser, signupUser }