import "./App.css";
import { React, useEffect, useRef, useState } from "react";
import Axios from "axios";
import Header from "./Header";
import Line from "./Line";
import { Route } from "react-router-dom";
import Detail from "./Detail";
import Modalonoff from "./Modalonoff";
function App() {

  observer.observe(target);
  let [lists, setLists] = useState([]);
  let [limit, setlimit] = useState(10);//limit : 개수, 
  let [offset, setoffset] = useState(0);//offset : 시작지점
  console.log("offset : ",offset)
  const getDatab = () => {
    Axios.get(`http://localhost:3001/board/paginate/${limit}/${offset}`)
      .then((response) => {
        setoffset(response.data.length)
        setLists(response.data)
      })
      .catch(() => {
        console.log("error");
      });
  };
  
  useEffect(() => {
    getDatab();
  }, []);
  let [search, setSearch] = useState("");
  const items = lists
    .filter((a) => {
      if (search == "") {
        return a;
      } else if (
        a.name.includes(search) ||
        a.title.includes(search) ||
        a.text.includes(search)
      ) {
        return a;
      }
    })
    .map((a, i) => {
      return (
        <div>
          <Line a={a} i={i} list={lists} />
        </div>
      );
    });

  return (
    <div>
  
      <div>
        <Header />
        {items}
        <Route path="/detail/:id">
          <Detail list={lists} />
        </Route>

        <div className="searchBox">
          <input
            className="text-gray-700 rounded search"
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <div className="glass">🔍</div>
          <div>
            <Modalonoff />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


