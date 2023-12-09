import React from "react";
import NavBar from "../../component/NavBar/NavBar";
import Contact from "../../component/Footer/Contact";
import Footer from "../../component/Footer/Footer";
import DetailContent from "./DetailContent";
import Box from "../../UI/Box";
//
const Detail = () => {
  return (
    <div>
      <NavBar />
      <Box>
        <DetailContent />
      </Box>
      <Contact />
      <Footer />
    </div>
  );
};

export default Detail;
