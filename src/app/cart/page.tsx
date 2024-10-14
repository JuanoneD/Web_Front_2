'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "../constants/routes"
import Image from "next/image"

import templete from '@/img/Acer_Wallpaper_03_3840x2400.jpg'

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
        if(!localStorage.getItem("Token")){
            router.push(ROUTES.login)
        }
        const load = async()=>{
            const res = await fetch("http://localhost:8080/cart/",{
                headers:{
                    'authorization': `${localStorage.getItem("Token")}`
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
    
    return(
        <>
        <div>
            <div>
                <h1>Carrinho</h1>
            </div>
            <div>
                <p>Preco Total:{data?.currentCart.totalPrice}</p>
            </div>
            <div>
                <div>
                <p>Produtos:</p>
                </div>
                <div>
                    {data?.allProducts.map((item)=>{
                        return(
                            <div key={item.id}>
                                <Image src={templete} alt=""/>
                                <p>nome:{item.Product.name}</p>
                                <p>Quantidade:{item.quantity}</p>
                                <p>Preco:{item.price}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
        </>
    )
}

export default Cart;