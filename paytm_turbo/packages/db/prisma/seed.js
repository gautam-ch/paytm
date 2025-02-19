import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async  function main(){
         
    const palak= await prisma.user.upsert({
        where:{
            number:'84500272081'
        },
        update:{

        },
        create:{
            number:'8450027081',
            password:await bcrypt.hash("palak", 10),
            name:'Palak Chouhan',
            email:"abc1@gmail.com",
        
           onRampTransaction:{
              create:{
                startTime:new Date(),
                amount:20000,
                status:'Success',
                token:'124',
                provider:'HDFC Bank'
              }
           }
    }})

    const rishi= await prisma.user.upsert({
        where:{
              number:'62603874231'
        },
        update:{},
        create:{
            number:'62603874231',
            password:await bcrypt.hash("rishi", 10),
            name:'Rishi Sen',

            onRampTransaction:{
                create:{
                    startTime:new Date(),
                    amount:50000,
                    status:'Failure',
                    provider:'HDFC Bank',
                    token:'125'
                }
            }
        }
    })

    console.log(palak,rishi);
}


main().then(async()=>{
     
   await prisma.$disconnect();

}).catch(async(e)=>{
    console.error(e);
    await prisma.$disconnect();
    process.exit();
})