import Draggable from "react-draggable";
import { useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Update from "./Update";

function Detail(props) {
  const nodeRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [modal, setModal] = useState(false);
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };
  //움직임 구현
  const innerText = props.list; //전체 배열 받아오기

  let history = useHistory(); //뒤로가기
  let { id } = useParams(); //페이지 url파라미터 가져오기.
  // 전체 배열에서, 클릭한 페이지의 url파라미터, 즉 id값과 같은 id값을 지닌 배열의 값을
  //디테일페이지에서 출력해야한다.
  let result = innerText.find(function (data) {
    //find 함수를 이용해 url파라미터와 id가 같은 객체를 변수에 넣는다.
    return data.id == id;
  });
  const deletePost = () => {
    axios.delete(`http://localhost:3001/board/${id}`).then(() => {
      console.log("success");
    });
  };

  return (
    <div className="box_background">
      <Draggable onDrag={(e, data) => trackPos(data)} nodeRef={nodeRef}>
        <div ref={nodeRef} className="box">
          <div className="information">
            <h4 className="h4">{result.name}님</h4>

            <h5 className="h5">title:</h5>
            <h5 className="h5">{result.title}</h5>

            <h5 className="h5">text:</h5>
            <h5 className="h5">{result.text}</h5>

            <div className="buttonInbox">
              <a href="/" style={{ textDecoration: "none" }}>
                <button onClick={deletePost}>삭제</button>
              </a>
              <button
                onClick={() => {
                  history.goBack();
                }}
              >
                닫기
              </button>
              {modal === true ? (
                <Update
                  name={result.name}
                  title={result.title}
                  text={result.text}
                  id={id}
                />
              ) : null}
              <button
                onClick={() => {
                  setModal(!modal);
                }}
              >
                수정
              </button>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default Detail;
