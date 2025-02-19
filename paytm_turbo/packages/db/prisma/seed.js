import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async  function main(){
         
    const palak= await prisma.user.upsert({
        where:{
            number:'8450027208'
        },
        update:{

        },
        create:{
            number:'845002708',
            password:await bcrypt.hash("palak", 10),
            name:'Palak Chouhan',
            email:"abc@gmail.com",
        
           onRampTransaction:{
              create:{
                startTime:new Date(),
                amount:20000,
                status:'Success',
                token:'122',
                provider:'HDFC Bank'
              }
           }
    }})

    const rishi= await prisma.user.upsert({
        where:{
              number:'6260387423'
        },
        update:{},
        create:{
            number:'6260387423',
            password:await bcrypt.hash("rishi", 10),
            name:'Rishi Sen',

            onRampTransaction:{
                create:{
                    startTime:new Date(),
                    amount:50000,
                    status:'Failure',
                    provider:'HDFC Bank',
                    token:'123'
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