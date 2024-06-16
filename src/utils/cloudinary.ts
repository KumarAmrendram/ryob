import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFileToCloudinary = (
  fileBuffer: Buffer,
  fileName: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        upload_preset: "ryob",
        folder: "ryob",
        resource_type: "auto",
        public_id: fileName,
      },
      (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve({
            url: result?.secure_url,
            public_id: result?.public_id,
          });
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export { uploadFileToCloudinary };
