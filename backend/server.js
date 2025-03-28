import app from "./app.js"
import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDAINARY_CLOUD_NAME,
    api_key:process.env.CLOUDAINARY_API_KEY,
    api_secret:process.env.CLOUDAINARY_API_SECRET,
});


app.listen(process.env.PORT, ()=>{
    console.log(`server is listen at port ${process.env.PORT}`);
})
