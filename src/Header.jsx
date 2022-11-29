import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="min-h-[50px]  bg-mainbg  text-white md:p-4 p-4">
      <nav className=" h-full w-full text-xl flex items-center md:w-[1180px] m-auto justify-between">
        <Link to="/">
          <h1 className="text-4xl font-bold">Todos</h1>
        </Link>
        <ul className="flex gap-7">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/todo">
            <li>Todos</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
