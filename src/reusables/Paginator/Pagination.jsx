import React from "react";
import { usePagination, DOTS } from "./usePagination";
import "./pagination.css";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    loader,
  } = props;

  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    !loader && (
      <div className="container my-4">
        <ul className="pagination justify-content-center">
          {currentPage !== 1 ? (
            <li className="page-item" onClick={onPrevious}>
              <span className="page-link orangeText">Previous</span>
            </li>
          ) : null}

          {paginationRange &&
            paginationRange.map((pageNumber, index) => {
              // If the pageItem is a DOT, render the DOTS unicode character
              if (pageNumber === DOTS) {
                return (
                  <li key={index} className="page-item dots">
                    <span href="#" className="page-link">
                      &#8230;
                    </span>
                  </li>
                );
              }

              // Render our Page Pills
              return (
                <li
                  key={index}
                  className="page-item"
                  onClick={() => onPageChange(pageNumber)}
                >
                  <span
                    href="#"
                    className={`page-link orangeText ${
                      pageNumber === currentPage ? "orangeBg text-light" : ""
                    }`}
                  >
                    {pageNumber}
                  </span>
                </li>
              );
            })}
          {currentPage !== lastPage ? (
            <li className="page-item" onClick={onNext}>
              <span className="page-link orangeText">Next</span>
            </li>
          ) : null}
        </ul>
      </div>
    )
  );
};

export default Pagination;
