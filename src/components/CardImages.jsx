import React from "react";

const CardImages = ({ image }) => {
  return (
    <>
      <div className="card my-3" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={image.url}
          alt={image.title}
          loading="lazy"
        />
        <div className="card-body">
          <h5 className="card-title text-center">{image.title}</h5>
        </div>
      </div>
    </>
  );
};

export default CardImages;
