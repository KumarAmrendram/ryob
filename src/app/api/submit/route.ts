import { NextRequest, NextResponse } from "next/server";
import { uploadFileToCloudinary } from "@/utils/cloudinary";
import { saveToGoogleSheets } from "@/utils/saveToGoogleSheets";

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
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await uploadFileToCloudinary(buffer, file.name);
      formData.append(`image_${count}`, result.url);

      count++;
    }

    console.log("formData", formData);
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
