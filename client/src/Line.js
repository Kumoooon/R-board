import { useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "./Box";

function Line(props) {
  let history = useHistory();
  let [Post, SetPost] = useState(false);

  return (
    <>
      {Post ? <Box list={props.list} id={props.a.id} post={Post} /> : null}
      <div
        onClick={() => {
          SetPost(!Post);
        }}
      >
        <span className="card">
          <span className="post">
            {props.a.name}님 ------
            {props.a.title}
          </span>
          <span className="hour">{props.a.createtime}</span>
        </span>
      </div>
    </>
  );
}

export default Line;
