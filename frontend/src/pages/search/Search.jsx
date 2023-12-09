import NavBar from "../../component/NavBar/NavBar";
import ContentSearch from "./ContentSearch";
import Box from "../../UI/Box";
import Contact from "../../component/Footer/Contact";
import Footer from "../../component/Footer/Footer";
//
const Search = () => {
  return (
    <div>
      <NavBar />
      <Box>
        <ContentSearch />
      </Box>
      <Contact />
      <Footer />
    </div>
  );
};

export default Search;
