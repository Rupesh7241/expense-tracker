import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(
            API_PATHS.IMAGE.UPLOAD_IMAGE,formData,{
                headers: {
                    "Content-Type": "multipart/form-data",//Set header for filr upload
                },
            }
        );
        return response.data;  // Return response data
    } catch (error) {
        console.error("Error uploading the image:", error);
        throw error; // Rethrow error for  handling
    }
};

export default uploadImage;
