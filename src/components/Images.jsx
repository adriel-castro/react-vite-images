import React, { useState, useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";

import Loader from "../reusables/Loader";
import { getImages } from "../api";
import Search from "./Search";
import CardImages from "./CardImages";
import Pagination from "../reusables/Paginator/Pagination";

const Images = () => {
  const [photos, setPhotos] = useState([]);
  const [loader, setLoader] = useState(false);
  const [keywords, setKeywords] = useState("");

  // pagination
  let pageSize = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPhotosData, setCurrentPhotosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const data = await getImages();
        const parsedData = await data.json();
        const filterData = parsedData.filter((img) =>
          img.title.includes(keywords)
        );
        if (keywords) {
          setPhotos(filterData);
        } else {
          setPhotos(parsedData);
        }
        setLoader(false);
      } catch (error) {
        console.log(error.message);
        setLoader(false);
      }
    };

    fetchData();
    setCurrentPage(1);
  }, [keywords]);

  useEffect(() => {
    const getCurrentData = () => {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      const newData = photos.slice(firstPageIndex, lastPageIndex);
      setCurrentPhotosData(newData);
    };

    getCurrentData();
  }, [currentPage, loader]);

  return (
    <>
      <div className="container my-5">
        {/* Search Component */}
        <Search keywords={keywords} setKeywords={setKeywords} />
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalCount={photos.length}
          pageSize={pageSize}
          loader={loader}
        />
        {loader ? (
          <div className="my-3">
            <Loader />
          </div>
        ) : (
          <div className="row">
            {currentPhotosData && currentPhotosData.length > 0 ? (
              currentPhotosData.map((image) => (
                <div
                  className="d-flex justify-content-center col-sm-12 col-md-6 col-lg-4"
                  key={image.id}
                >
                  {/* CardImages Component */}
                  <CardImages image={image} />
                </div>
              ))
            ) : (
              <h2 className="text-center mt-5">No Available Image</h2>
            )}
          </div>
        )}
      </div>
      <ScrollToTop smooth />
    </>
  );
};

export default Images;
