import cloudinary from '../config/cloudinary.js';

// @desc    Upload a file buffer to Cloudinary
// @param   {Buffer} fileBuffer - The file buffer from multer memoryStorage
// @param   {String} folder     - Cloudinary folder to upload into
// @returns {String}            - Secure URL of the uploaded image
export const uploadToCloudinary = async (fileBuffer, folder = 'products') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export default uploadToCloudinary;
