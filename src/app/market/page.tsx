
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
        <>
            <div className="flex flex-wrap ml-6 mt-6">
                {data.map((item)=>{
                    return(
                        <div key={item.id} className="p-1">
                            <div  className="border-4 w-[300px]">
                                <div className="flex justify-center bg-gradient-to-r from-blue1 to-purple-500">
                                    {item.name}
                                </div>
                                <div className="flex justify-center">
                                    <p className="flex items-center text-center p-1">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <p className="flex items-center text-center p-1">
                                        {item.price}
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <BtBuy idProduct={item.id.toString()}/>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Market;