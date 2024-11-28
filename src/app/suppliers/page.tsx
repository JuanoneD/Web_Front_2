"use client"

import { useState,useEffect } from "react";
import Link from "next/link";
import {ROUTES} from "@/app/constants/routes"
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Menu } from "@/components/menu";

const  suppliers =  ()=> {
    const [error,setError] = useState<boolean>(false)
    const [data,setData] = useState<{name:String,id:Number}[]>([]);
    const router = useRouter()

    useEffect(()=>{
        async function loadData(){
            try {
                const res = await fetch("http://localhost:8080/suppliers",{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `${sessionStorage.getItem("Token")}`
                    },
                })
                let respJson = await res.json()
                console.log(respJson)
                setData(respJson)
            } catch (error) {
                setData([{"id":0,"name":"ERRO AO CARREGAR PRODUTOS"}])
            } 
        }
        loadData()
    },[])

    

    return (
      <>
        <Menu rigthMenu={true}/>
        <Link href={ROUTES.registerSuppliers}>
            <button className="w-1/3 bg-black text-white rounded-[20px] p-2 m-2">Adicionar fornecedores</button>
        </Link>
        <div  className=" flex justify-center aling-center mt-6 mb-6">
          <div className="flex flex-col p-6 rounded-md w-4/5 md:w-1/3">
                <ul>
                {data.map((item)=>{
                    return(
                    <li>
                        Id:{String(item.id)}
                        <br/>
                        Name:{item.name}
                    </li>
                )})}
                </ul>
          </div>
        </div>
      </>
  );
}

export default suppliers;