
"use client"
//@ts-ignore
import { Button } from "@repo/ui/button";
//@ts-ignore
import { Card } from "@repo/ui/card";
//@ts-ignore
import { Select } from "@repo/ui/select";
//@ts-ignore
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import createOnRamp from "../app/lib/actions/createOnRampTransaction"


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
    const [provider,setProvider] = useState(supported_banks[0]?.name || "");
    const [value ,setValue] = useState(0);

    
    return(
                <Card title="Add Money">
                        
                        <div className="w-full">

                            <TextInput label="Amount" placeholder="Amount" onChange={(val:string)=>{ setValue(Number(val)) } }/>


                              <div className="py-4 text-left">
                                  Bank
                              </div>  

                              <Select options={ supported_banks.map(x=>({key:x.name,value:x.name}))}
                                     
                             onSelect={(value:string)=>{
                                
                                setRedirectUrl(supported_banks.find(x=>x.name==value)?.redirectUrl || "")

                                setProvider(supported_banks.find(x=>x.name==value)?.name || "");
                             }}
                                     >
                              </Select>

                              <div className="flex justify-center pt-4">
                                   
                                   <Button onClick={async()=>{
                                       
                                       await createOnRamp(value,provider);

                                     window.location.href=redirectUrl || ""
                                    
                                    } }>Add Money</Button>
                              </div>

                        </div>
                </Card> 
    )


}

