import Jwt from 'jsonwebtoken';

export const authMiddleware = async(req , res, next) => {

    try{

        const authHeaders = req.headers.authorization;

        if(!authHeaders){
            console.log(error);
        }


        const token = authHeaders.split(" ")[1];

        const tokenVerify = Jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = tokenVerify;
        next();

    }
    catch(error){
        console.log(error)
    }

}