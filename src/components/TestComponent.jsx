import React, { useState } from "react";
import parseDataLocale from "../utils/parseDataLocale";

const TestComponent = () => {
  const [data, setData] = useState(new Date());

  const handleChange = (e) => {
    const localeDate = parseDataLocale(e.target.value);
    setData(localeDate);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>🧪 Test Date Picker</h2>
      <input
        type="date"
        value={data.toISOString().slice(0, 10)}
        onChange={handleChange}
      />

      <div style={{ marginTop: "1rem", background: "#f9f9f9", padding: "1rem", borderRadius: "6px" }}>
        <p><strong>getDate():</strong> {data.getDate()}</p>
        <p><strong>getMonth():</strong> {data.getMonth() + 1}</p>
        <p><strong>getFullYear():</strong> {data.getFullYear()}</p>
        <p><strong>toLocaleDateString():</strong> {data.toLocaleDateString("it-IT")}</p>
        <p><strong>toISOString():</strong> {data.toISOString()}</p>
      </div>
    </div>
  );
};

export default TestComponent;
