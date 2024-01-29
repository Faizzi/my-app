const { NextResponse } = require("next/server");

export async function GET(){
    try {
         const response = NextResponse.json({
            message:"logout Successfully.",
            success:true,
         })
         response.cookies.set('token',"",{httpOnly:true,expires:new Date(0)})
         return response
    } catch (error) {
         return NextResponse.json({error:error.message},{status:500})
    }
}