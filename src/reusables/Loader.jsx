import React from "react";
import { Spinner } from "react-bootstrap";
const Loader = ({ variant }) => {
  return (
    <div className="text-center my-auto w-100">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
