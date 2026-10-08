import { Router } from "express";
import { Readable } from "stream";

import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";
import { auth, adminOnly } from "../middleware/auth.js";

const r = Router();

r.post(
  "/image",
  auth,
  adminOnly,
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please select an image.",
        });
      }

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "engineering-india-ghrce",
            resource_type: "image",
          },
          (error, uploadedImage) => {
            if (error) {
              reject(error);
            } else {
              resolve(uploadedImage);
            }
          }
        );

        Readable.from(req.file.buffer).pipe(stream);
      });

      return res.status(201).json({
        message: "Image uploaded successfully.",
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      next(error);
    }
  }
);

export default r;