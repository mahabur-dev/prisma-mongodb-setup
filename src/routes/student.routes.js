import { Router } from "express";
import prisma from "../lib/prisma.js";
import { createRequire } from 'module';
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

const require = createRequire(import.meta.url);

const router = Router();


router.post("/students", async (req, res) => {
    try{ 
        const { name , email, phone } = req.body;

        if(!name  || !email || !phone ) {
            return res.status(400).json({
                message: "Name, email and phone are required"
            });
        }

        const student = await prisma.student.create({
            data: {
                name,
                email,
                phone
            }
        });

        return res.status(201).json({
            message: "Student created successfully",
            data: student
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
            });
        }
    });

    router.get("/students", async(req,res) => {
        try{
            const students = await prisma.student.findMany();
            return res.status(200).json({
                message: "Students fetched successfully",
                data: students
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Students fetched failed"
            })
        }
    })

    export default router;	
