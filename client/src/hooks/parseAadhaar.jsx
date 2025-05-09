import { useState } from 'react';
import axiosInstance from '../Api/axiosInstance';

const useAadhaarOCR = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ocrResult, setOcrResult] = useState(null);
    const [displayData,setDisplayData] =useState(null)
    const parseAadhaar = async (frontImage, backImage) => {
      setLoading(true);
      setError(null);
  
      if (!frontImage || !backImage) {
        setError("Please upload both sides of the Aadhaar card.");
        setLoading(false);
        return;
      }
  
      const formData = new FormData();
      formData.append('front', frontImage);
      formData.append('back', backImage);
  
      try {
        const response = await axiosInstance.post(
          '/api/parse-aadhaar',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log(response.data)
        if (response.data.success) {
          setDisplayData(response.data)
          setOcrResult(JSON.stringify(response.data, null, 2));
        } else {
          setError(response.data.message || 'OCR failed. Please try again.');
        }
      } catch (err) {
        console.error(err);
        setError(err.response.data.message || "Server error while performing OCR.");
      } finally {
        setLoading(false);
      }
    };
  
    return { loading, error, ocrResult,displayData, parseAadhaar };
  };
  
  export default useAadhaarOCR;
