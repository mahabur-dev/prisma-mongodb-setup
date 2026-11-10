import prisma from "./src/lib/prisma.js";
import app from "./src/app.js";



const PORT = 3000;

const startServer = async() => {

    try{

        await prisma.$connect();
        console.log("Prisma connect successfully");

        app.listen(PORT, () => {
            console.log(`Server running : ${PORT}`)
        })

    }
    catch(error){
        console.log(error);
        await prisma.$disconnect();
        process.exit(1);

    }
}
startServer();