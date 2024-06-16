// src/app/api/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { uploadFileToCloudinary } from "@/utils/cloudinary";
import multer from "multer";
import { saveToGoogleSheets } from "@/utils/saveToGoogleSheets";
import { promises as fs } from "fs";
import path from "path";

const handler = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const data: Record<string, any> = {};
    const files: File[] = [];

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        files.push(value);
      } else {
        data[key] = value;
      }
    }


    let count = 1;
    for (const file of files) {
      const tempPath = path.join(process.cwd(), "uploads", file.name);
      await fs.writeFile(tempPath, Buffer.from(await file.arrayBuffer()));

      const result = await uploadFileToCloudinary(tempPath);
      formData.append(`image_${count}`, result.url);

      count++;

      await fs.unlink(tempPath);
    }
    console.log("form data", formData);
    await saveToGoogleSheets(formData);

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error) {
    console.error("Error handling form submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Form submission failed",
      },
      { status: 500 }
    );
  }
};

export async function POST(req: NextRequest) {
  return handler(req);
}
