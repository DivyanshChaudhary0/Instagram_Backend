
import { v2 as cloudinary } from "cloudinary";
import config from "../config/config.js";
import { Readable } from "stream"

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = function(imageBuffer){
    return new Promise((resolve,reject)=>{
        const uploadStream = cloudinary.uploader.upload_stream({folder: "instagram"},(err,fileData) => {
            resolve({
                asset_id: fileData.asset_id,
                public_id: fileData.public_id,
                url: fileData.url,
                format: fileData.format
            })
        })
        Readable.from(imageBuffer).pipe(uploadStream)
    })
}
