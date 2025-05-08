import React from "react";

const dataDisplay = ({ data }) => {
  console.log("data", data);
  if (!data.success) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600">
          {data.message || "Failed to process Aadhar card"}
        </p>
      </div>
    );
  }

  const fields = [
    { label: "Name", value: data.name },
    { label: "Date of Birth", value: data.dob },
    { label: "Gender", value: data.gender },
    { label: "Aadhar Number", value: data.aadharNumber },
    { label: "Address", value: data.address },
  ];

  return (
    <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
      <div className="flex items-center mb-4">
        <svg
          className="h-5 w-5 text-green-500 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-green-600 font-medium">{data.message}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(
          (field, index) =>
            field.value && (
              <div
                key={index}
                className={`border border-gray-200 rounded-md p-3 bg-white ${
                  field.label === "Address" ? "md:col-span-2" : ""
                }`}
              >
                <p className="text-xs text-gray-500 mb-1">{field.label}</p>
                <p className="font-medium">{field.value}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default dataDisplay;
