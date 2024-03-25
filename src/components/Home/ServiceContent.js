import React from "react";

const ServiceContent = ({ title, icon, content }) => {
  return (
    <>
      <div className="service-content d-flex">
        <div>{icon}</div>
        <div>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      </div>
    </>
  );
};

export default ServiceContent;
