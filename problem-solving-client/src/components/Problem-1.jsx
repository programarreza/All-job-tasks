import { useEffect, useState } from "react";
import axios from "axios";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFiltaredTodos] = useState([]);

  const handleClick = (val) => {
    setShow(val);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((res) => {
        setTodos(res.data);
        filterTodos(show, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [show]);

  const filterTodos = (category, allTodos) => {
    if (category === "all") {
      setFiltaredTodos(allTodos);
    } else {
      const filtered =
        category === "active"
          ? allTodos.filter((todo) => todo.status === "active")
          : category === "completed"
          ? allTodos.filter((todo) => todo.status === "completed")
          : [];
      setFiltaredTodos(filtered);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const status = form.get("status");
    console.log(name, status);

    const todoInfo = { name, status };
    axios.post("http://localhost:5000/todos", todoInfo).then((res) => {
      
      // Update the todos and apply the current filter
      setTodos([...todos, res.data]);
      filterTodos(show, [...todos, res.data]);
      
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="status"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>

          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead className="">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody className="">
            {filteredTodos.map((todo, index) => (
            <tr key={index}>
              <td className="p-2">{todo.name}</td>
              <td className="p-2">{todo.status}</td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
