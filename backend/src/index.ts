import app from "./app.js"
import { connectToDatabase } from "./db/connection.js"

//connectiona and listneres
const PORT = process.env.PORT || 5000; 
connectToDatabase().then(()=>{
    app.listen(PORT, ()=>console.log("Server open and connected to DB"))
}).catch((err)=>console.log(err))