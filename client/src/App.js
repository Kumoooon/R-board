import "./App.css";
import { React, useEffect, useState } from "react";
import Axios from "axios";
import Header from "./Header";
import Line from "./Line";
import { Route } from "react-router-dom";
import Research from "./Research";
import Detail from "./Detail";
import Modalonoff from "./Modalonoff";
import create from "zustand";
const useStore = create(() => ({}));
function App() {
  let [list, setList] = useState([]);
  const showEmployee = () => {
    Axios.get("http://localhost:3001/board")
      .then((response) => {
        setList(response.data);
      })

      .catch(() => {
        console.log("error");
      });
  };
  useEffect(() => {
    showEmployee();
  }, []);
  return (
    <div>
      <Header />
      <div className="other">
        {list.map((a, i) => {
          return (
            <div className="card">
              <Line a={a} i={i} />
            </div>
          );
        })}
        <Research list={list} />
        <Route path="/detail/:id">
          <Detail list={list} />
        </Route>
        <Modalonoff />
      </div>
    </div>
  );
}

export default App;
