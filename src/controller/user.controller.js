import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "../lib/prisma.js"

export const userRegister = async(req, res) => {

    try{

        const { name , email, password } = req.body

        if(!name || !email || !password){
            return res.status(404).json({
                message: "must need this filed"
            })
        }

        const user = await prisma.user.findUnique({
            where: { email}
        })

        if(user){
            return res.status(200).json({
                message: " This email already exits"
            })
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const userCreate = await prisma.user.create({
            data:{
                name,
                email,
                password:passwordHash
            }
        })

        return res.status(201).json({
            data: userCreate
        })


    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message:`Read errror message carefully then resolve error`
        })
    }
}


export const login = async(req, res) => {

    try{

        const { email, password} = req.body

        const user = await prisma.user.findUnique({
            where: { email}
        })

        if(!user){
            res.status(404).json({
                message: "user not found"
            })
        }

        const checkPassword = await bcrypt.compare(
            password,
            user.password
        );

        if(!checkPassword){
            res.status(404).json({
                message: "Password not match"
            })
        }

       const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

        return res.status(200).json({
            message: "Student login successfully",
            data: user,
            token: token
        })
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: error
        })
    }
}

export const profile = async(req, res) => {

    try{

        const { id } = req.user;

        const user = await prisma.user.findUnique({
            where: { id }
        })

        res.status(200).json({
            data: user
        })

    }
    catch(error){
        console.log(error)
    }
}