import { useRef, useState } from "react";
import { Menu, MenuItem } from "@mui/joy";

function Folder({ explorer, editModeFunc, deleteFunc }) {
  //   const [expand, setExpand] = useState(false);
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const editFirst = (explorer) => {
    editModeFunc(explorer);
    setOpen(false);
  };

  const deleteRecord = (e, explorer) => {
    setOpen(false);
    deleteFunc(e, explorer);
  };

  return (
    <div style={{ cursor: "pointer", margin: "10px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span
          style={{
            border: "1px solid #000000",
            margin: "5px",
            padding: "10px 25px",
            background: "#efefef",
          }}
        >
          {explorer.name.length > 20 ? `${explorer.name.slice(0,18)}...`: explorer.name}
        </span>
        {explorer.parent !== "root" && (
          <div
            style={{
              position: "relative",
            }}
          >
            <p
              style={{
                position: "absolute",
                right: "10px",
                top:'-27px',
                fontSize:'20px',
                fontWeight:'500'
              }}
              ref={buttonRef}
              onClick={() => {
                setOpen(!open);
              }}
            >
              ...
            </p>

            <Menu
              id="basic-menu"
              anchorEl={buttonRef.current}
              open={open}
              onClose={handleClose}
              aria-labelledby="basic-demo-button"
            >
              <MenuItem onClick={() => editFirst(explorer)}>Edit</MenuItem>
              <MenuItem onClick={(e) => deleteRecord(e, explorer)}>
                Delete
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
      <br />
      <div
        style={{
          display: "flex",
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
