import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFileToCloudinary = async (file: string): Promise<any> => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      upload_preset: "ryob",
      folder: "ryob",
      resource_type: "auto",
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { uploadFileToCloudinary };