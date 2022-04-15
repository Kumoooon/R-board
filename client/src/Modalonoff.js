import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

import Modal from "./Modal";
export default function Modalonoff() {
  let [modal, setModal] = useState(false);
  let history = useHistory();

  return (
    <>
      {modal === false ? null : <Modal />}

      <Button
        className="writeButton2"
        variant="primary"
        onClick={() => {
          setModal(!modal);
        }}
      >
        ✏
      </Button>
    </>
  );
}
