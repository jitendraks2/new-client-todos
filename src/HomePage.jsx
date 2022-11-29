import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <Header />

      <section className="homepage bg-mainbg">
        <div className="h-[90vh] flex w-[1180px] m-auto">
          <div className="h-full w-full flex flex-col justify-center items-center text-white">
            <h2 className="text-3xl text-center font-bold  ">
              The best todo app.
            </h2>

            <p className="mt-7">
              Organise all your todos app in a single place.
            </p>

            <button className="mt-10 px-7 py-2 border-3 border-solid rounded-full">
              <Link to="/todo">Create Todos</Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
