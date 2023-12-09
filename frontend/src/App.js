import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import LoginPage from "./pages/loginRegister/login";
import TransactionPage from "./pages/transaction/transaction";
import UserPage from "./pages/user/user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:detailId" element={<Detail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
