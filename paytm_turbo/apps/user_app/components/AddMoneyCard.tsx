
"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";



const supported_banks=[
    {
        name:'Hdfc Bank',
        redirectUrl:'https://netbanking.hdfcbank.com'
    },
    {
         name:'Axis Bank',
         redirectUrl:'https://www.axisbank.com/'
    }
]

export const AddMoney=()=>{
    const [redirectUrl,setRedirectUrl] = useState(supported_banks[0]?.redirectUrl);

    
    return(
                <Card title="Add Money">
                        
                        <div className="w-full">

                            <TextInput label="Amount" placeholder="Amount" onChange={()=>{} }/>


                              <div className="py-4 text-left">
                                  Bank
                              </div>  

                              <Select options={ supported_banks.map(x=>({key:x.name,value:x.name}))}
                                     
                             onSelect={(value)=>(setRedirectUrl(supported_banks.find(x=>x.name==value)?.redirectUrl || ""))}
                                     >
                              </Select>

                              <div className="flex justify-center pt-4">
                                   
                                   <Button onClick={()=>{window.location.href=redirectUrl || ""} }>Add Money</Button>
                              </div>

                        </div>
                </Card> 
    )


}

