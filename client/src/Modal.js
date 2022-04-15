import Draggable from "react-draggable";
import { useState, useRef } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

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
          <label>작성자:</label>
          <input
            className="m-0 text-gray-700 transition ease-in-out border border-gray-300 border-solid rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <hr />
          <label>Title:</label>
          <input
            className="m-0 text-gray-700 transition ease-in-out border border-gray-300 border-solid rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <hr />
          <label>Text:</label>

          <textarea
            class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        m-0 
      "
            rows="3"
            placeholder="..."
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></textarea>
          <hr />
          <a href="/" style={{ textDecoration: "none" }}>
            <Button
              className="writeButton"
              variant="primary"
              onClick={() => {
                addEmployee();
                history.push("/");
              }}
            >
              ✏
            </Button>
          </a>

          <div></div>
        </div>
      </Draggable>
    </div>
  );
}
export default Modal;
