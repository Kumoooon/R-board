import Draggable from "react-draggable";
import { useState, useRef } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Modal() {
  const nodeRef = useRef(null);
  let history = useHistory(); //뒤로가기

  const [position, setPosition] = useState({ x: 0, y: 0 }); // box의 포지션 값
  // 업데이트 되는 값을 set 해줌
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };
  let [name, setName] = useState("");
  let [title, setTitle] = useState("");
  let [text, setText] = useState("");

  const addEmployee = () => {
    Axios.post("http://localhost:3001/board/create", {
      name: name,
      title: title,
      text: text,
    }).then(() => {
      console.log("success");
      history.goback();
    });
  };

  return (
    <div className="box_background">
      <Draggable onDrag={(e, data) => trackPos(data)} nodeRef={nodeRef}>
        <div ref={nodeRef} className="box">
          <div className="information">
            <label>작성자</label>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label>Title:</label>
            <input
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label>Text:</label>
            <input
              style={{ height: "50px" }}
              type="text"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <a href="/" style={{ textDecoration: "none" }}>
              <button
                onClick={() => {
                  addEmployee();
                  history.push("/");
                }}
              >
                저장
              </button>
            </a>
            <div></div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
export default Modal;
