import { useState } from "react";
import delIcon from "../images/dButton.svg";
import editIcon from "../images/eButton.svg";

function Folder({ explorer, editModeFunc, deleteFunc }) {
  //   const [expand, setExpand] = useState(false);
  return (
    <div style={{ cursor: "pointer", margin: "10px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span
          style={{
            border: "1px solid #00000060",
            margin: "5px",
            padding: "5px",
          }}
        >
          {explorer.name}
        </span>
        {explorer.parent !== "root" && (
          <div>
            <img
              style={{ height: "18px", width: "18px", cursor: "pointer" }}
              src={editIcon}
              alt="edit"
              onClick={() => editModeFunc(explorer)}
            />
            <img
              style={{ height: "18px", width: "18px", cursor: "pointer" }}
              src={delIcon}
              alt="del"
              onClick={(e) => deleteFunc(e, explorer)}
            />
          </div>
        )}
      </div>
      <br />
      <div
        style={{
          display: "flex",
          //   display: expand ? "flex" : "none",
          justifyContent: "center",
        }}
      >
        {explorer?.child?.map((explore) => (
          <div
            style={{
              margin: "5px",
              padding: "5px",
            }}
          >
            <Folder
              deleteFunc={deleteFunc}
              editModeFunc={editModeFunc}
              key={explore.name}
              explorer={explore}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Folder;
