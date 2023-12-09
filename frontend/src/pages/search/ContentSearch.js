import "./ContentSearch.css";
import React, { useEffect } from "react";
import SearchList from "./SearchList";
import SearchPopup from "./SearchPopup";
import { useSelector } from "react-redux";
import useRequest from "../../Hook/useRequest";

function ContentSearch() {
  const { request, resData, err } = useRequest();
  const searchInfo = useSelector((state) => state.searchInfo.searchInfo);
  useEffect(() => {
    if (searchInfo && searchInfo.city !== "") {
      request(searchInfo, "hotel/search");
    }
  }, [searchInfo]);

  console.log(searchInfo);
  console.log("resData", resData);
  console.log("err", err);
  return (
    <div className="box-contai">
      <SearchPopup />
      <div className="box-2">
        {err && <h1 className="errHome">fetch not found</h1>}
        {!resData && !err && <h1 className="waitHome">Loading ...</h1>}
        {resData &&
          !err &&
          resData.map((item, i) => (
            //truyền dữ liệu từ data lấy ở json vào SearchList
            <SearchList
              className="box-2"
              key={item._id}
              name={item.name}
              distance={item.distance}
              type={item.type}
              description={item.address}
              featured={item.featured}
              price={item.cheapestPrice}
              rate={item.rating}
              rate_text={item.rate_text}
              image_url={item.photos[0]}
              id={item._id}
            />
          ))}
      </div>
    </div>
  );
}
export default ContentSearch;
