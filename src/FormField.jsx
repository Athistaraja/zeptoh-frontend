import React from "react";

export default function FormField({ field, onChange, value, onBlur }) {
  return (
    <div className="flex flex-col transition-opacity duration-300 ease-in">
      <label className="text-gray-700 font-medium mb-2">{field.label}</label>
      <input
        type={field.type}
        name={field.label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="px-4 py-2 rounded-lg border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        autoFocus
      />
    </div>
  );
}
