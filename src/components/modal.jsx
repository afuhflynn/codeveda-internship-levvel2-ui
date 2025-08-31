import React, { useState } from "react";

export default function Modal({ initialValue, onClose, onSave }) {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    if (value.trim()) onSave(value.trim());
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Todo</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSave} className="save">
            Save
          </button>
          <button onClick={onClose} className="cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
