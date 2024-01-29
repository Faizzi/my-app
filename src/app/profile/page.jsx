'use client'

import { NextResponse } from "next/server"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import axios from "axios"
import Link from "next/link"

export default function UserProfile() {
    const router = useRouter()
    const [userData, setUserData] = useState("nothing");

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me")
            const data = res.data.data._id
            setUserData(data)
        } catch (error) {
            console.log("Error getting users data;", { error })
        }
    }

    const handleLogout = async () => {
        try {
            await axios.post(`/api/users/logout`)
            router.push("/login")
        } catch (error) {
            return NextResponse.json({
                error: error.message
            }, { status: 500 })
        }
    }

    return (
        <div className="flex flex-col justify-center align-middle text-center min-h-screen">
            <div className="w-[600px] block m-auto">
                <div className="flex justify-center align-middle gap-3">
                    <div>
                        <h1 className="mb-[2rem]">Profile Page</h1>
                    </div>
                    <div >
                        <h1>
                            {userData === "nothing" ? "Nothing" : <Link href={`/profile/${userData}`}>{userData}</Link>}
                        </h1>

                    </div>
                </div>
                <div className="w-[500px] flex justify-center align-middle gap-[1rem]">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"
                        onClick={getUserDetails}
                    >
                        Get User
                    </button>
                </div>
            </div>
        </div>
    )
}