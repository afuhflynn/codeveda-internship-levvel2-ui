import React, { useState } from "react";

export default function Modal({ initialValue, onClose, onSave }) {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    if (value.trim()) onSave(value.trim());
  };

  return (
    <div className="modal-overlay">
      <div className="modal card">
        <h2>Edit Todo</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="auth-input"
        />
        <div className="modal-actions">
          <button onClick={handleSave} className="auth-btn modal-save-btn">
            Save
          </button>
          <button onClick={onClose} className="modal-cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
