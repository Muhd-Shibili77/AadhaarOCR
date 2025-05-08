import React,{useState,useEffect} from "react";
import { CloudArrowUpIcon, XCircleIcon } from "@heroicons/react/24/outline";

const uploadCard = ({ label, side, onUpload }) => {
  const [preview, setPreview] = useState(null);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onUpload(file, side);
    }
  };
  const handleRemove = () => {
    setPreview(null);
    onUpload(null, side); // notify parent to reset the file
  };
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="w-full h-full bg-white rounded-lg border border-dashed border-gray-300 p-6 text-center hover:border-blue-500 transition">
      <p className="text-sm font-semibold mb-4">{label}</p>

      {!preview ? (
        <label className="cursor-pointer flex flex-col justify-center items-center space-y-2 h-32">
          <CloudArrowUpIcon className="w-10 h-10 text-purple-500" />
          <span className="text-purple-500 underline text-sm">
            Click here to Upload
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg shadow"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
            title="Remove"
          >
            <XCircleIcon className="w-6 h-6 text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
};

export default uploadCard;
