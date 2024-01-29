import User from "@/models/userModel"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"

export const sendEmails = async ({ email, emailType, userID }) => {
    try {
        // create a hashed token

        const hashedToken = await bcrypt.hash(userID.toString(), 10)
        await User.findByIdAndUpdate(userID, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }, { new: true, runValidators: true })
    } catch (error) {
        throw new Error(error.message)
    }

}