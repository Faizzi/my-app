import connect from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import jwt from "jsonwebtoken"
import { NextRequest ,NextResponse} from "next/server";
// connect to database
connect();


export async function POST(NextRequest) {
    try {
        const reqBody = await NextRequest.json();
        const { email, password } =reqBody;

        // check for the user if it exisit
        const user = await User.findOne({ email })
        if (!user) {
            console.log("User doesn't exist");

            return NextResponse.json({ error: "User doesn't exist" }, { status: 400 })
        }


        // check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 400 })
        }

        // create token 
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' })
        console.log({token})
        const response = NextResponse.json({
            message: "Login successfull",
            success: true,
        })
        response.cookies.set('token', token, { httpOnly: true})
        console.log({response})
        return response

    } catch (error) {
        console.error("Error during login:", {error});

        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}