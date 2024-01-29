import mongoose from "mongoose";

const connect =async() => {
      try {
        await   mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("Database connected successfully.")
        })
        connection.on('error',(error)=>{
            console.log('Database connection failed.',{error})
            process.exit();
        })
      } catch (error) {
        console.log("Something goes wrong")
        console.log({error})
      }
}

export default connect;