import React, { useState } from "react";
import { URL } from "../URL";
const SingleTodo = ({ todo, mutate, handleModal }) => {
  const [error, setError] = useState(false);


  const handleDelete = async (todoId) => {
    const response = await fetch(`${URL}/deletetodo/${todoId}`, {
      method: "DELETE",
    });

    if (response.status != 200) {
      setError(true);

      console.log("error while deleting", response.message);
    }

    console.log(response.status);

    mutate();
  };
  const handleComplete = async (todo) => {
    const updatedTodo = { ...todo, completed: true };
    const response = await fetch(`${URL}/updatetodo/${todo.id}`, {
      method: "PATCH",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(updatedTodo),
    });

    if (response.status != 200) {
      setError(true);

      console.log("error while editing", response.message);
    }

    console.log(response.status);

    mutate();
  };
  const handleNotComplete = async (todo) => {
    const updatedTodo = { ...todo, completed: false };
    const response = await fetch(`${URL}/updatetodo/${todo.id}`, {
      method: "PATCH",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(updatedTodo),
    });

    if (response.status != 200) {
      setError(true);

      console.log("error while editing", response.message);
    }

    console.log(response.status);

    mutate();
  };

  return (
    <>
      {error && (
        <p className="bg-red-500 text-white p-3 m-2">
          Their is some error please try again later.
        </p>
      )}
      <div
        className={`rounded-xl ${
          todo.completed ? "bg-green-800" : "bg-slate-900"
        } text-white flex items-center justify-between py-3 px-5 mt-5`}
      >
        {todo.todo}
        <div className="flex items-center ">
          {todo.completed ? (
            <span
              className="material-symbols-outlined text-[30px] mr-5 cursor-pointer"
              onClick={() => handleNotComplete(todo)}
            >
              refresh
            </span>
          ) : (
            <>
              <span
                className="material-symbols-outlined text-[22px] mr-5 cursor-pointer"
                onClick={() => handleModal(todo)}
              >
                edit
              </span>
              <span
                className="material-symbols-outlined text-[30px] mr-5 cursor-pointer"
                onClick={() => handleComplete(todo)}
              >
                done
              </span>
            </>
          )}
          <span
            className="material-symbols-outlined text-[25px] mr-5 cursor-pointer"
            onClick={() => handleDelete(todo.id)}
          >
            delete
          </span>
        </div>
      </div>
    </>
  );
};

export default SingleTodo;
