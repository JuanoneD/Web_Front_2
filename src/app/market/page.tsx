import Image from "next/image"
import templete from '@/img/Acer_Wallpaper_03_3840x2400.jpg'

import { BtBuy } from "@/components/buy"

type IData = {
    id:number,
    name:string,
    description:string,
    price:number,
    stock:number
}


const Market = async ()=>{
    const res = await fetch("http://localhost:8080/products/")
    const data:IData[] = await res.json()
    return(
        <div className=" w-full flex justify-center">
            <div className="flex flex-wrap mt-6 justify-center md:w-4/5">
                {data.map((item)=>{
                    return(
                        <div key={item.id} className="p-1">
                            <div  className=" shadow-lg m-2 rounded-[20px]">
                                <div>
                                    <Image src={templete} alt="" width={300} height={300} className="object-cover  w-[300px] h-[300px] rounded-t-[15px]" priority={true}/>
                                </div>
                                <div className="p-1">
                                    <div className="flex justify-center font-bold">
                                        {item.name}
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="flex items-center text-center p-1">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="flex items-center font-semibold text-center p-1">
                                            R${item.price}
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <BtBuy idProduct={item.id.toString()}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Market;