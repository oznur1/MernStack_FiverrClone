import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import Links from "../links";
import User from "../user";


const Header = () => {

 let user=true


  // arama sayfasına yönlendiren fonksiyon
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = e.target[0].value.trim();

    navigate(`/search?query=${text}`)
  }

  return (
    <header className="p-5 shadow">
      <div className="max-w-[1440px] mx-auto flex justify-between gap-4 md:gap-8">
        {/* Logo */}
        <Link to="/">
          <img src="/src/assets/fiverr (1).png" className="w-[100px]" alt="logo" />
        </Link>

        {/* Form */}
        <form 
        onSubmit={handleSubmit}
        className="flex flex-1 border border-gray-400 rounded overflow-hidden max-w-[600px]">
          <input
            type="search"
            placeholder="Hizmetleri ara ..."
            className="w-full h-full outline-none px-3"
          />

          <button className="bg-black p-2 text-white text-xl max-md:hidden">
            <IoSearch />
          </button>
        </form>

             {/* User */}
       <div>
        {user ? <User/> : <Links/>}
       </div>
      
      </div>
    </header>
  );
};

export default Header;