import userModel from "../model/userModel.js";

// login user
const loginUser = async (req, res) => {
    res.json({msg: "login user"});
}

// signup user
const signupUser = async (req, res) => {

    const { email, password } = req.body;

    try{

        // calling my method to hash the password
        const user = await userModel.signup(email, password);

        res.status(200).json({ email, user});
    }
    catch(err){
        res.status(400).json({ error: err.message})
    }    
}

export { loginUser, signupUser }