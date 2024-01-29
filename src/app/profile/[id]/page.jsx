export default function UserProfile({params}){
         
    return(
        <div className="flex flex-col justify-center items-center min-h-screen py-2 gap-[2rem]">
            <h1 className="text-4xl">Profile Page</h1>
           <p className="text-2xl">Params: <span className="bg-white text-orange-700 p-4 text-3xl rounded-[14px]">{params.id}</span></p>

        </div>
    )
}