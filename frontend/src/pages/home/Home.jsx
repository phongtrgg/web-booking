import NavBar from "../../component/NavBar/NavBar";
import Header from "./Header";
import HomeCity from "./HomeCity";
import Type from "./Type";
import HotelList from "./HotelList";
import Footer from "../../component/Footer/Footer";
import Contact from "../../component/Footer/Contact";
import Box from "../../UI/Box";
import useRequest from "../../Hook/useRequest";
import { useEffect } from "react";
//
const Home = () => {
  const { request, resData, err } = useRequest();
  useEffect(() => {
    request(null, "hotel/get");
  }, []);
  return (
    <div>
      <NavBar onPageHome={true} />
      <Header />
      {resData && (
        <Box>
          <HomeCity hotel={resData} />
          <Type hotel={resData} />
          <HotelList hotel={resData} />
        </Box>
      )}
      {err && <h1 className="errHome">fetch not found</h1>}
      {!resData && !err && <h1 className="waitHome">Loading ...</h1>}
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
