import React, { useState } from 'react';
import UploadCard from './components/uploadCard';
import OCRResponse from './components/OCRResponse';
import DataDisplay from './components/dataDisplay';
import useAadhaarOCR from './hooks/parseAadhaar';

const AddharOCR = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  
  const { loading, error, ocrResult,displayData, parseAadhaar } = useAadhaarOCR();

  const handleUpload = (file, side) => {
    if (side === 'front') setFrontImage(file);
    if (side === 'back') setBackImage(file);
  };

  const handleParse = () => {
    parseAadhaar(frontImage, backImage);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      {/* Left: Upload + Parse Button */}
      <div className="flex flex-col space-y-6">
        <UploadCard label="Aadhaar Front" side="front" onUpload={handleUpload} />
        <UploadCard label="Aadhaar Back" side="back" onUpload={handleUpload} />
        <button
          onClick={handleParse}
          disabled={loading}
          className="bg-purple-500 text-white px-6 py-2 rounded-2xl hover:bg-purple-700 transition font-semibold self-center disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Parsing...</span>
            </span>
          ) : (
            'PARSE AADHAAR'
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 bg-red-100 border border-red-300 rounded p-3 text-sm font-medium">
            {error}
          </div>
        )}
      </div>

      {/* Right: OCR Results */}
      <div className="flex flex-col space-y-6">
        {ocrResult && (
          <>
            <DataDisplay data={displayData} />
            <OCRResponse responseText={ocrResult} />
          </>
        )}
      </div>
    </div>
  );
};

export default AddharOCR;
