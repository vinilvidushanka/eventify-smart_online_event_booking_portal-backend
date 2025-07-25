import app from "./app";
import dotenv from "dotenv";
import DBConnection from "./db/DBConnection";

dotenv.config();

const port = process.env.PORT || 3000; // access the port from the .env file

DBConnection().then(result=>console.log(result));

app.listen(port,()=>{
    console.log(`Example app listening on port at http://localhost:${port}`)
})
