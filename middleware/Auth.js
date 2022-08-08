import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js'

const Auth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({ error: "Authorization required" })        
    }

    const token = authorization.split(' ')[1]

    try{
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await userModel.findOne({ _id }).select('_id')
        next();
    }
    catch(err){
        res.status(401).json({ error: "Request is not authorized" })
    }
}

export default Auth