import React, { useEffect, useState } from "react";
import Modal from "./Modal";

import Folder from "./A";

let outPut = [];
let ids = [];
// let editMode = false
const Record = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [myList, setMyList] = useState([
    { name: "Record 1", id: "id-1", parent: "root", child: [] },
  ]);
  const [userData, setUserData] = useState({
    name: "",
    id: Date.now(),
    parent: myList[0].name,
  });

  let a = [];

  const [editMode, setEditMode] = useState(false);
  const [listToShow, setListToShow] = useState([
    { name: "Record 1", id: "id-1", parent: "root", child: [] },
  ]);

  const [shadowList, setShadowList] = useState([
    { name: "Record 1", id: "id-1", parent: "root", child: [] },
  ]);

  const addRecord = (e) => {
    e.stopPropagation();
    setUserData({
      name: "",
      id: Date.now(),
      parent: "root",
      child: [],
    });
    setEditMode(false);
    setIsOpen(true);
  };

  const closeRecord = (e) => {
    e.stopPropagation();
    a = JSON.parse(JSON.stringify(shadowList))
    setListToShow(a)
    setIsOpen(false);
  };

  function recursiveMap(parent) {
    let data = [];
    for (let i = 0; i < a.length; i++) {
      if (parent == "root" && a[i].parent === "root") {
        outPut.push({
          name: a[i].name,
          id: a[i].id,
          parent: a[i].parent,
          child: recursiveMap(a[i].id),
        });
      } else {
        if (parent == a[i].parent) {
          data.push({
            name: a[i].name,
            id: a[i].id,
            parent: a[i].parent,
            child: recursiveMap(a[i].id),
          });
        }
      }
    }
    return data;
  }

  const formSubmit = (e, data) => {
    e.stopPropagation();
    outPut = [];

    a = JSON.parse(JSON.stringify(shadowList));
    let b = JSON.parse(JSON.stringify(shadowList));

    if (editMode === false) {
      b.push(data);
      a.push(data);

      recursiveMap("root");
      setListToShow(b);
      setShadowList(b)

      const newArr = JSON.parse(JSON.stringify(outPut));
      setMyList(newArr);
    } else {
      a = a.map((res) =>
        res.id == data.id
          ? { ...res, name: data.name, parent: data.parent }
          : res
      );
      b = JSON.parse(JSON.stringify(a));

      recursiveMap("root");

      setListToShow(b);
      setShadowList(b)
      const newArr = JSON.parse(JSON.stringify(outPut));
      setMyList(newArr);
    }

    setIsOpen(false);
  };

  const editModeFunc = (currData) => {

    ids = [];
    a = JSON.parse(JSON.stringify(listToShow));
    setShadowList(a)


    recursiveMapDel(currData.id);

    const filteredArray = a.filter((item) => !ids.includes(item.id));

    const newArr = [...filteredArray];
 
    setListToShow(newArr);

    setUserData(currData);
    setEditMode(true);
    setIsOpen(true);
  };

  function recursiveMapDel(id) {
    let data = [];
    for (let i = 0; i < a.length; i++) {
      if (a[i].id == id) {
        ids.push(a[i].id);
      } else {
        if (id == a[i].parent) {
          recursiveMapDel(a[i].id);
        }
      }
    }

    return data;
  }

  const deleteFunc = (e, data) => {
    ids = [];
    outPut = [];
    a = JSON.parse(JSON.stringify(listToShow));

    recursiveMapDel(data.id);

    const filteredArray = a.filter((item) => !ids.includes(item.id));

    a = [...filteredArray];

    recursiveMap("root");
    const newArr_ = JSON.parse(JSON.stringify(outPut));
    setListToShow(a);
    setShadowList(a)
    setMyList(newArr_);
  };

  return (
    <div>
      <div className="App" style={{ display: "flex", justifyContent: "end" }}>
        <div
          style={{
            height: "80px",
            width: "160px",
            borderLeft: "1px solid",
            borderBottom: "1px solid",
            borderBottomLeftRadius: "300px",
            display: "flex",
            justifyContent: "center",
            background: "black",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={addRecord}
        >
          <p style={{ width: "45px", color: "white" }}>Add Record</p>
          {isOpen === true && (
            <Modal
              editMode={editMode}
              data={listToShow}
              userData={userData}
              formSubmit={formSubmit}
              closeRec={closeRecord}
            />
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Folder
          deleteFunc={deleteFunc}
          editModeFunc={editModeFunc}
          explorer={myList[0]}
        />
      </div>
    </div>
  );
};

export default Record;
