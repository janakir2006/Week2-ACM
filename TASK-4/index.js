import express from "express";
import axios from "axios";

const app = express();
const port = 3000;



const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
const day = String(today.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

app.get("/", async(req,res)=>{
    try{
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${formattedDate}`);
        const result = response.data;
        res.render("index.ejs",{data:result});
    }catch(error){
        console.error("Failed to make this request: ",error.message);
        res.render("index.ejs",{
            error:error.message,
        });
    }
});


app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

