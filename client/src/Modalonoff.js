import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import Modal from "./Modal";
export default function Modalonoff() {
  let [modal, setModal] = useState(false);
  let history = useHistory();

  return (
    <>
      {modal === false ? null : <Modal />}
      <button
        onClick={() => {
          setModal(!modal);
        }}
      >
        글쓰기
      </button>
    </>
  );
}
