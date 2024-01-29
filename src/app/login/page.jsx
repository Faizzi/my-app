'use client'

import Link from "next/link";
import React,{useEffect,useState} from "react";
import { useRouter } from 'next/navigation'
import axios from "axios"



export default function login() {

  const router = useRouter()
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

    const [user,setUser]=useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{      
      const {name,value} = e.target
      setUser({...user,[name]:value})
  }
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false)
    } else {
        setButtonDisabled(true)
    }
}, [user])
    const handleLoginSubmit=async(e)=>{
           e.preventDefault();
           try {
                 setLoading(true)
                  const response = await axios.post('/api/users/login',user)
                  console.log("Login Success:", response.data)
                  // toast("User created Success.")
                  router.push('/profile')
           } catch (error) {
            console.log("Error during login:", { error })
           }finally{
            setLoading(false)
           }
    }
   
    return (
        <div className="min-h-screen flex items-center justify-center text-black">
          <div className="bg-white p-8 shadow-md rounded-md w-96">
          {
                    loading ? (
                        <div className="loader-wrapper">
                            <span className="loader"></span>
                        </div>
                    ) : (
                        <h2 className="text-2xl font-semibold mb-6 text-center">
                           Login
                        </h2>
                    )
                }
            
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              {buttonDisabled ? (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full line-through"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"
                        >
                            Login
                        </button>
                    )}
              <div className="mt-[1rem]">
                    <Link href="/register" className="text-blue-500">register here</Link>

                    </div>
             
            </form>
          </div>
        </div>
      );
}

