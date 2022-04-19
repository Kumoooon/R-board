import "./App.css";
import { React, useEffect, useRef, useState } from "react";
import Axios from "axios";
import Header from "./Header";
import Line from "./Line";
import { Route } from "react-router-dom";
import Detail from "./Detail";
import Modalonoff from "./Modalonoff";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  let [items, setItems] = useState([]);
  let [limit, setlimit] = useState(12);
  let [offset, setoffset] = useState(0);
  let [hasMore, setHasMore] = useState(true);
  const getDatab = async () => {
    const res = await Axios.get(
      `http://localhost:3001/board/paginate/${limit}/${offset}`
    );
    setoffset(res.data.length);
    console.log(`offset : `, offset);
    setItems(res.data);
  };
  useEffect(() => {
    getDatab();
  }, []);
  let [search, setSearch] = useState("");
  const inventory = items
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
          <Line a={a} i={i} list={items} />
        </div>
      );
    });

  const fetchComments = async () => {
    const res = await Axios.get(
      `http://localhost:3001/board/paginate/${limit}/${offset}`
    );
    const data = await res.data;
    console.log(data);
    return data;
  };

  const fetchData = async () => {
    const asdf = await fetchComments();
    setItems([...items, ...asdf]);
    console.log(items);
    setoffset(items.length);
  };
  return (
    <div>
      <div>
        <Header />
        <Route path="/detail/:id">
          <Detail list={items} />
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
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {inventory}
      </InfiniteScroll>
    </div>
  );
}

export default App;
