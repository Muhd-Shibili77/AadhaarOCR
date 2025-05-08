import React from 'react';

const OCRResponse = ({ responseText }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
    <h3 className="text-lg font-semibold mb-3 text-gray-800">API Response</h3>
    <div className="bg-white border rounded p-4 h-40 w-full overflow-y-auto text-sm text-gray-700 whitespace-pre-wrap">
        <code>
            {responseText}
        </code>
    </div>
  </div>
  
  );
};

export default OCRResponse;
