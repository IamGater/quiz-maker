import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

export default function Card({ id, name, description, onDelete }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible((prevState) => !prevState);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="card">
      <HiDotsVertical className="dots" onClick={togglePopup} />
      {isPopupVisible && (
        <div className="popup">
          <a onClick={handleDelete}>delete</a>
        </div>
      )}
      <h3 className="card-name">{name}</h3>
      <p className="card-descr">{description}</p>
    </div>
  );
}
