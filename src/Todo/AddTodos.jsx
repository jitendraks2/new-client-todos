import { useRef } from "react";
import { URL } from "../URL";

const AddTodos = ({ setAddTodos, mutate }) => {
  const todoRef = useRef(null);

  const onAddTodos = async (e) => {
    e.preventDefault();

    const todo = todoRef.current.value;

    console.log(todo);
    const response = await fetch(`${URL}/addtodos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo,
      }),
    });

    const data = await response.json();
    mutate();

    setAddTodos(false);
    todoRef.current.value = "";
  };
  return (
    <div>
      <form onSubmit={onAddTodos}>
        {/* <label htmlFor="todo">Add Todos</label> */}
        <input
          type="text"
          ref={todoRef}
          className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
          placeholder="Enter your todo"
          required
        />

        <button
          type="submit"
          className="bg-slate-900 text-white px-5 py-2 rounded-full mt-3"
        >
          Add todos
        </button>
      </form>
    </div>
  );
};

export default AddTodos;
