import Draggable from "react-draggable";
import { React, useState } from "react";

export default function Dragbox(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <div className="box_background">
      <Draggable onDrag={(e, data) => trackPos(data)}>
        <div className="box2">
          <h4 className="h4">
            <label>name:</label>
          </h4>
          <h4 className="h4">{props.name}</h4>
          <h5 className="h5">
            <label>title:</label>
            {props.title}
          </h5>
          <h5 className="h5">
            <label>text:</label>
            {props.text}
          </h5>
          <a href="/" style={{ textDecoration: "none" }}>
            <button>닫기</button>
          </a>
        </div>
      </Draggable>
    </div>
  );
}
