import connect from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import User from "@/models/userModel"
import { NextResponse,NextRequest } from "next/server"

connect()


export async function GET(NextRequest){
    try {
        const userID =await getDataFromToken(NextRequest)
        const userData = await User.findOne({_id:userID}).
        select("-password")
        return NextResponse.json({
            message:"User found",
            data:userData
        })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:400})
    }
}