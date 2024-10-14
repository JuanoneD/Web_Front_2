"use client"
import { ROUTES } from "@/app/constants/routes"
import { useRouter } from "next/navigation"
import Image from "next/image"

import logo from '@/img/growth.png'
import cart from '@/img/shopping-cart (1).png'
import Link from "next/link"
import { useEffect, useState } from "react"
import { log } from "console"

export const Menu = ()=>{
  const router = useRouter();
  const[login,setLogin] = useState<boolean>(false)

  useEffect(()=>{
    const verifyToken = async()=>{
        try{
            const response = await fetch('http://localhost:8080/users/verifyToken', {
              headers: {
                'authorization': `${localStorage.getItem("Token")}`
              },
            });
            if(response.status === 401){
                setLogin(false)
            }else{
                setLogin(true)
            }
        }catch(err){
            console.log(err)
            setLogin(false)
        }
    }
    verifyToken()
    },[login])

    const logoff =()=>{
        localStorage.setItem("Token","")
        setLogin(false)
    }


    return(
        <div className="w-full flex justify-center bg-black">
            <div className="w-full h-24 md:w-4/5 p-3 flex justify-between items-center">
                <Link href={ROUTES.market}>
                    <div className="flex items-center">
                        <Image src={logo} alt="" className=" h-12 w-auto" priority={true}/>
                        <h1 className="text-white text-[30px]">Loja 1</h1>
                    </div>
                </Link>
                {login &&
                    <div className="flex items-center">
                        <Link href={ROUTES.cart}>
                            <Image src={cart} alt="" className="h-10 w-auto " priority={true}/>
                        </Link>
                        <button className="w-16 bg-white text-black rounded-[20px] p-2 m-2" onClick={()=>{logoff()}}>Sair</button>
                    </div>
                }
                {!login &&
                    <div className="flex items-center">
                        <Link href={ROUTES.login}>
                            <button className="w-16 bg-white text-black rounded-[20px] p-2 m-2">Login</button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}