'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "../constants/routes"
import Image from "next/image"

import templete from '@/img/Acer_Wallpaper_03_3840x2400.jpg'
import { Menu } from "@/components/menu"

interface IData{
    currentCart:{
        id:number,
        totalPrice:number,
    },
    allProducts:{
        id:number,
        price:number,
        quantity:number,
        Product:{
            id:number,
            name:string,
            description:string,
            price:number,
            stock:number,
        }
    }[]
}

const Cart = ()=>{
    const router = useRouter()
    const [data,setData] = useState<IData>()
    const [err,setErr] = useState<boolean>()
    const [del,setDel] = useState<boolean>(false)

    useEffect(()=>{
        if(!sessionStorage.getItem("Token")){
            router.push(ROUTES.login)
        }
        const load = async()=>{
            const res = await fetch("http://localhost:8080/cart/",{
                headers:{
                    'authorization': `${sessionStorage.getItem("Token")}`
                }
            })

            if(res.status===401){
                router.push(ROUTES.login)
            }

            if(res.status===500){
                setErr(true)
            }
            const dataJson = await res.json()
            setData(dataJson)
        }
        load()
    },[del])

    const removeProduct = async(IdItem:number) =>{
        const res = await fetch("http://localhost:8080/cart/remove",{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'authorization': `${sessionStorage.getItem("Token")}`
            },
            body: JSON.stringify({
                IdProduct:IdItem,
            }),
        })
        setDel(!del);
    }
    
    return(
        <>
            <Menu rigthMenu={true}/>
            <div className="flex justify-center">
                <div className="md:w-4/5">
                    <div className="text-[30px]">
                        <h1>Carrinho:</h1>
                    </div>
                    <div>
                        <div className="text-[20px]">
                        <p>Produtos:</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            {!err && data?.allProducts.map((item)=>{
                                return(
                                    <div key={item.id} className="flex shadow m-2 rounded-[18px] md:w-2/3">
                                        <Image src={templete} alt="" className="h-auto w-1/3 rounded-l-[20px] md:h-[120px] md:w-auto" priority={true}/>
                                        <div className="ml-2 mr-2 w-full">
                                            <div className="flex justify-between">
                                                <p className="text-[20px] font-bold">{item.Product.name}</p>
                                                <button onClick={()=>{removeProduct(item.Product.id)}}>❌</button>
                                            </div>
                                            <p className="text-[15px]">Quantidade:{item.quantity}</p>
                                            <p className="text-[17px] text-red-600">Preco:{item.price}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center text-[20px] absolute bottom-0 w-full border-2 bg-white p-2">
                <p className="text-center">Preco Total:<span className="font-bold">${!err && data?.currentCart.totalPrice}</span></p>
                <div className="flex justify-center">
                    <button className="bg-black p-4 mt-2 rounded-[20px] text-white">Finalizar Compra</button>
                </div>
            </div>
        </>
    )
}

export default Cart;