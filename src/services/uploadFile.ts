const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const isUploadConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET);

// Unsigned preset lets the browser upload straight to Cloudinary without a backend.
export async function uploadFile(file: File, folder: string): Promise<string> {
  if (!isUploadConfigured) {
    throw new Error('Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env.local.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('File upload failed. Please try again.');
  }

  const data = await response.json();
  return data.secure_url as string;
}
