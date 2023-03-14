import { useState } from "react";
import "./App.css";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [editId, seteditId] = useState(0);

  const handlesubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const edittodo = todos.find((i) => i.id === editId);
      const updatetodos = todos.map((t) =>
        t.id === edittodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      settodos(updatetodos);
      seteditId(0);
      settodo("");
      return;
    }

    if (todo !== "") {
      settodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      settodo("");
    }
  };

  const handledelete = (id) => {
    const deltodo = todos.filter((to) => to.id !== id);
    settodos([...deltodo]);
  };

  const deleteall = () => {
    settodos([]);
  };

  const handleedit = (id) => {
    const edittodo = todos.find((i) => i.id === id);
    settodo(edittodo.todo);
    seteditId(id);
  };

  return (
    <div className="App">
      <h1>TODO_APP</h1>
      <div className="container">
        <form onSubmit={handlesubmit} className="stuff">
          <input
            type="text"
            onChange={(e) => settodo(e.target.value)}
            value={todo}
            className="inp"
            placeholder="ADD YOUR STUFF"
          />
          <button className="update" type="submit">
            {editId ? "Update" : "Add Todo"}
          </button>
        </form>
        <button onClick={deleteall} className="rmal">
          Remove All
        </button>
        <div className="todos">
          <ul className="list">
            {todos.map((e, key) => (
              <li key={key} className="todo-list">
                <>{key + 1}.</>
                <span className="work">{e.todo}</span>
                <button onClick={() => handleedit(e.id)} className="bt">
                  Edit
                </button>
                <button onClick={() => handledelete(e.id)} className="bt">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
