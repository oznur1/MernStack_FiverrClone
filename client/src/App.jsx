import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/index.jsx";
import Home from "./pages/home/index.jsx";
import Register from "./pages/register/index.jsx";
import Login from "./pages/login/index.jsx";
import Search from "./pages/search/index.jsx";
import Create from "./pages/create/index.jsx";
import Detail from "./pages/detail/index.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-1 p-5 max-w-[1440px] mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/add-gig" element={<Create />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
