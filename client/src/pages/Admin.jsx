import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Admin() {
  const [newWork, setNewWork] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [updateName, setUpdateName] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  const addWork = () => {
    if (newWork.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Vui lòng nhập tên công việc",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      return;
    }

    axios
      .post("http://localhost:3000/api/v1/todolist", {
        name: newWork,
        status: 0,
      })
      .then((res) => {
        console.log("Công việc đã được thêm thành công:", res.data.dataTodo);
        setNewWork("");
      })
      .catch((err) => {
        console.error("Lỗi khi thêm công việc:", err);
      });
  };

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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/todolist/${id}`)
      .then((res) => {
        console.log("Công việc đã hoàn thành đã được xóa thành công");
        loadTodolist();
      })
      .catch((err) => console.log(err));
  };

  const handleComplete = (id) => {
    axios
      .put(`http://localhost:3000/api/v1/todolist/complete/${id}`, {
        name: updateName,
      })
      .then((res) => {
        console.log("Công việc đã được cập nhật thành công:", res.data.message);
        loadTodolist();
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật công việc:", err);
      });
  };

  const handleUnfinished = (id) => {
    axios
      .put(`http://localhost:3000/api/v1/todolist/unfinished/${id}`, {
        name: updateName,
      })
      .then((res) => {
        console.log("Công việc đã được cập nhật thành công:", res.data.message);
        loadTodolist();
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật công việc:", err);
      });
  };

  return (
    <div className="container">
      <div className="add">
        <div className="input-group mb-3 inpur">
          <input
            type="text"
            className="form-control"
            placeholder="Thêm công việc mới"
            value={newWork}
            onChange={(e) => setNewWork(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={addWork}
          >
            <i className="fa-solid fa-plus"></i> Thêm công việc
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Công việc</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((e, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{e.name}</td>
              <td>{e.status === 0 ? "Chưa hoàn thành" : "Đã hoàn thành"}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Update
                </button>
                {/* Modal */}

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Update Todo
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <div>
                          <input
                            type="text"
                            placeholder="Update Todo"
                            value={updateName}
                            onChange={(e) => setUpdateName(e.target.value)}
                          />
                          <select
                            value={updateStatus}
                            onChange={(e) => setUpdateStatus(e.target.value)}
                          >
                            <option value="0">Chưa hoàn thành</option>
                            <option value="1">Hoàn Thành</option>
                          </select>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                          onClick={() => {
                            if (updateStatus === "0") {
                              handleUnfinished(e.id);
                            } else if (updateStatus === "1") {
                              handleComplete(e.id);
                            }
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(e.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
