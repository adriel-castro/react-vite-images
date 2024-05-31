import React, { useEffect, useRef } from "react";

const Search = ({ keywords, setKeywords }) => {
  const keywordRef = useRef();

  useEffect(() => {
    if (keywords === "") {
      keywordRef.current.focus();
    }
  }, [keywords]);

  return (
    <div className="d-flex justify-content-center">
      <input
        type="text"
        className="form-control w-50 my-3 mx-3"
        placeholder="Search Keywords"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        ref={keywordRef}
      />
      <button
        className="btn btn-secondary my-3"
        onClick={() => setKeywords("")}
        disabled={keywords === "" ? true : false}
      >
        Clear
      </button>
    </div>
  );
};

export default Search;
