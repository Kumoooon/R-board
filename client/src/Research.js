import { React, useState } from "react";
import Dragbox from "./Dragbox";

export default function Research(props) {
  let [modal, setModal] = useState(false);
  let list = props.list;
  let [search, setSearch] = useState("");
  let result = list.find(function (data) {
    return data.name === `${search}`;
  });

  let [name, setName] = useState("");
  let [title, setTitle] = useState("");
  let [text, setText] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setName(result.name);
          setTitle(result.title);
          setText(result.text);
          setModal(!modal);
        }}
      >
        찾기
      </button>
      {modal === true ? (
        <Dragbox name={name} title={title} text={text} />
      ) : null}
    </div>
  );
}
