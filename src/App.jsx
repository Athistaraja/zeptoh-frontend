import React, { useEffect, useState } from "react";
import FormField from "./FormField";
import { decryptField } from "./components/decryptor";
import { URL } from "./components/url";

function App() {
  const [fields, setFields] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`${URL}/api/form`)
      .then((res) => res.json())
      .then((data) => {
        const decrypted = data
          .map(({ data, iv }) => decryptField(data, iv))
          .filter(Boolean);
        setFields(decrypted);
      });
  }, []);

  const handleChange = (value) => {
    const currentField = fields[currentIndex];
    setFormData({ ...formData, [currentField.label]: value });
  };

  const handleBlur = () => {
    if (currentIndex + 1 < fields.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      fetch(`${URL}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then(() => setSubmitted(true));
    }
  };

  if (submitted) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-semibold">
        🎉 Thank you! Form submitted successfully.
      </div>
    );
  }

  const currentField = fields[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md transition-all duration-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Secure Dynamic Form</h2>
        {currentField && (
          <FormField
            field={currentField}
            value={formData[currentField.label] || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
        <p className="text-sm text-gray-400 mt-4 text-center">
          {currentIndex + 1} of {fields.length} fields
        </p>
      </div>
    </div>
  );
}

export default App;
