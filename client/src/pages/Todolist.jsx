import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Todolist() {
  const [todoList, setTodoList] = useState([]);

  const loadTodolist = () => {
    axios
      .get("http://localhost:3000/api/v1/todolist")
      .then((res) => {
        // console.log(res.data.works);
        setTodoList(res.data.works);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadTodolist();
  }, []);
  return (
    <div className="container ">
      <h1 className="h1_todolist">Theo dõi công việc</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Công việc</th>
            <th scope="col">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((e, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{e.name}</td>
              <td>{e.status === 0 ? "Chưa hoàn thành" : "Đã hoàn thành"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
