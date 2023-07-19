import React, { useState } from "react";
import "./Modal.css";
import { Button } from "@mui/joy";

const Modal = ({ data, closeRec, formSubmit, userData: userD, editMode }) => {
  const [userData, setUserData] = useState(userD);

  const onChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const closeModal = (e) => {
    e.stopPropagation();
    closeRec(e);
  };

  const submit = (e) => {
    e.stopPropagation();
    setUserData({ name: "", id: Date.now(), parent: data[0].name, child: [] });
    formSubmit(e, userData);
  };

  const selectParent = (e) => {
    e.stopPropagation();
    setUserData((prev) => ({ ...prev, parent: e.target.value }));
  };

  return (
    <div
      className="modal"
      style={{ cursor: "default" }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="modal-content">
        <div>
          <span onClick={(e) => closeModal(e)} className="close">
            &times;
          </span>
        </div>
        <div>
          <h3 className="record-title">
            {!editMode ? `Add Record` : "Edit Record"}
          </h3>
          <input
            onChange={onChange}
            name="name"
            value={userData.name}
            className="input"
            type="text"
            placeholder="Name"
          />
      
            <p>id : {userData.id}</p>
          <select
            onChange={selectParent}
            className="input"
            style={{ marginTop: "20px", cursor: "pointer" }}
          >
            <option selected disabled>
              Please Select Parent
            </option>
            {data.map((res) => (
              userData.id != res.id && <option value={res.id}>{res.name.length > 25 ? `${res.name.slice(0,25)}...` : res.name}</option>
            ))}
          </select>
          <hr  style={{margin: '20px'}}/>
       
            <Button
             disabled={userData.name === "" || userData.parent === "root"}
             style={{ cursor: "pointer" }}
             onClick={(e) => submit(e)}>

            Submit
            </Button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
