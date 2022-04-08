import Draggable from "react-draggable";
import { useState, useRef } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Update(props) {
  const nodeRef = useRef(null);
  let history = useHistory(); //뒤로가기

  const [position, setPosition] = useState({ x: 0, y: 0 }); // box의 포지션 값
  // 업데이트 되는 값을 set 해줌
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };
  let [name, setName] = useState(props.name);
  let [title, setTitle] = useState(props.title);
  let [text, setText] = useState(props.text);

  const updateEmployee = () => {
    Axios.put(`http://localhost:3001/board/${props.id}`, {
      name: name,
      title: title,
      text: text,
      id: props.id,
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
            <label>Name:</label>
            <input
              value={name}
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label>Title:</label>
            <input
              value={title}
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label>Text:</label>
            <input
              value={text}
              style={{ height: "50px" }}
              type="text"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <a href="/" style={{ textDecoration: "none" }}>
              <button
                onClick={() => {
                  updateEmployee();
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
export default Update;
