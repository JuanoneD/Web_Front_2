/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites:()=>{
        return[
            {
                source:"/",
                destination:"/login"
            },
            {
                source:"/registerUser",
                destination:'/registerUser'
            },
        ]
    }
};

export default nextConfig;
