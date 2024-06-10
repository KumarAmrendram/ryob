// pages/api/submitForm.ts

import { NextApiRequest, NextApiResponse } from "next";
import { uploadFileToCloudinary } from "../../../utils/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract form fields and files from the request body
    const {
      firstName,
      lastName,
      bio,
      gender,
      religion,
      residentStatus,
      maritalStatus,
      city,
      state,
      postalCode,
      country,
      phone,
      email,
      files,
    } = req.body;

    // Array to store uploaded file URLs
    const uploadedFileUrls: string[] = [];

    // Upload each file to Cloudinary
    for (const file of files) {
      const fileUrl = await uploadFileToCloudinary(file);
      uploadedFileUrls.push(fileUrl);
    }

    // Now you have the access URLs for the uploaded files
    console.log("Access URLs:", uploadedFileUrls);

    // Here you can handle other form fields and store them in your database

    // Respond with success message or redirect to another page
    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error submitting form" },
      { status: 500 }
    );
  }
}
