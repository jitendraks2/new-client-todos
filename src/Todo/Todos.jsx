import { useState } from "react";
import useSWR from "swr";
import AddTodos from "./AddTodos";
import EditTodo from "./EditTodo";
import { useModalStore } from "../state/modalState";
import SingleTodo from "./SingleTodo";
import { URL } from "../URL";
import Header from "../Header";

const Todos = () => {
  let todosArray = [];
  let completedArray = [];

  const [addTodos, setAddTodos] = useState(false);
  const fetcher = async (url) => {
    const res = await fetch(url);
    const todos = await res.json();
    return todos;
  };

  const { data, mutate, error } = useSWR(`${URL}/todos`, fetcher);

  if (error) {
    console.log(error);
  }
  if (data && data.data !== null) {
    data.data.map((todos) => todosArray.push(todos));
    console.log(data);
  }

  if (todosArray && todosArray.length > 0) {
    console.log("inside todos array", todosArray);

    todosArray.map((todos) =>
      todos.completed ? completedArray.push(todos) : null
    );
  }

  const sortByDate = (a, b) => {
    const dateOfA = new Date(a.createdAt);
    const dateOfB = new Date(b.createdAt);

    if (dateOfA > dateOfB) return -1;
    else if (dateOfA < dateOfB) return 1;

    return 0;
  };

  todosArray.sort(sortByDate);
  completedArray.sort(sortByDate);

  const modalClose = useModalStore((state) => state.openModal);
  const openModal = useModalStore((state) => state.openModal);

  const [modalData, setModalData] = useState("");
  const [modalId, setModalId] = useState("");

  const handleModal = (todo) => {
    openModal();
    setModalData(todo.todo);
    setModalId(todo.id);
    console.log("modal edit", todo);
  };

  console.log("completed todos array", completedArray);
  return (
    <>
      <Header />

      <div className="md:max-w-[80%] m-auto p-5 md:py-5">
        <EditTodo modalData={modalData} modalId={modalId} mutate={mutate} />
        <div className="flex items-center gap-5">
          <h2 className="text-3xl font-bold text-slate-900 ">All todos</h2>
          <button
            className="bg-slate-900 text-white px-5 py-2 rounded-full"
            onClick={() => setAddTodos((prev) => !prev)}
          >
            {addTodos ? "Cancel" : "  Add Todos"}
          </button>
        </div>

        {addTodos ? (
          <AddTodos setAddTodos={setAddTodos} mutate={mutate} />
        ) : null}

        {/* {data ? ( */}
        {todosArray.length > 0 ? (
          <>
            <section className="mt-10">
              {completedArray.length === todosArray.length ? (
                ""
              ) : (
                <h2 className="text-2xl font-bold">Active Todos</h2>
              )}

              {todosArray.map(
                (todos) =>
                  !todos.completed && (
                    <SingleTodo
                      key={todos.id}
                      todo={todos}
                      mutate={mutate}
                      handleModal={handleModal}
                    />
                  )
              )}
            </section>
            <section className="mt-10">
              {completedArray && completedArray.length > 0 ? (
                <h2 className="text-2xl font-bold">Completed Todos</h2>
              ) : (
                ""
              )}

              {todosArray.map(
                (todos) =>
                  todos.completed && (
                    <SingleTodo
                      key={todos.id}
                      todo={todos}
                      mutate={mutate}
                      handleModal={handleModal}
                    />
                  )
              )}
            </section>
          </>
        ) : (
          <div className="my-20 text-2xl font-bold">
            Start adding your todos. Your todos will appear here
          </div>
        )}
      </div>
    </>
  );
};

export default Todos;
