import multer from "multer";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp"); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
