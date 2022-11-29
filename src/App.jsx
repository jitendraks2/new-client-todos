import HomePage from "./HomePage";
import { Routes, Route } from "react-router-dom";
import Todos from "./Todo/Todos";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/todo" element={<Todos />}></Route>
    </Routes>
  );
}

export default App;
