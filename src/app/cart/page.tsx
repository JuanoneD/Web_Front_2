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
            const dataJson = await res.json()
            setData(dataJson)
        }
        load()
    },[])

    const removeProduct = async(IdItem:number) =>{
        
    }
    
    return(
        <>
            <Menu rigthMenu={true}/>
            <div className="flex justify-center">
                <div className="md:w-4/5">
                    <div className="text-[50px]">
                        <h1>Carrinho:</h1>
                    </div>
                    <div>
                        <div className="text-[22px]">
                        <p>Produtos:</p>
                        </div>
                        <div>
                            {data?.allProducts.map((item)=>{
                                return(
                                    <div key={item.id} className="flex shadow m-2 rounded-[18px]">
                                        <Image src={templete} alt="" className="h-[120px] w-auto rounded-l-[20px]" priority={true}/>
                                        <div className="ml-2 mr-2 w-2/3">
                                            <div className="flex justify-between">
                                                <p className="text-[30px] font-bold">{item.Product.name}</p>
                                                <button onClick={()=>{removeProduct(item.id)}}>❌</button>
                                            </div>
                                            <p className="text-[17px]">Quantidade:{item.quantity}</p>
                                            <p className="text-[17px] text-red-600">Preco:{item.price}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    <div className="flex flex-col justify-center text-[30px] mt-4">
                        <p className="text-center">Preco Total:<span className="font-bold">${data?.currentCart.totalPrice}</span></p>
                        <div className="flex justify-center">
                            <button className="bg-black p-4 mt-2 rounded-[20px] text-white">Finalizar Compra</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;