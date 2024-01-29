import connect from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

// connect to database
connect();

export async function POST(NextRequest) {
    try {
        const reqBody = await NextRequest.json();
        const { username, email, password } = reqBody;

        if (!username || !email || !password) {
            return NextResponse.json({ message: "Please fill the fields properly." });
        }

        // check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // save the user to the database
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log({ savedUser });

        return NextResponse.json({
            message: "User created successfully.",
            success: true,
            savedUser,
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
