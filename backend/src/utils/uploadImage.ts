import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from "cloudinary";
import config from "../config";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

// Upload Options
const opts: UploadApiOptions = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto", // Fixed typo (was 'recourse_type')
};

/**
 * Upload Image to Cloudinary
 * @param {string} image - Local file path or remote URL
 * @returns {Promise<string>} - Returns secure URL of uploaded image
 */
export const uploadImage = async (image: string): Promise<string> => {
  try {
    const result: UploadApiResponse = await cloudinary.uploader.upload(image, opts);
    return result.secure_url;
  } catch (error) {
    throw new Error((error as Error).message || "Image upload failed");
  }
};

export default cloudinary;
