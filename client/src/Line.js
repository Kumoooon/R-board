import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";

function Line(props) {
  let history = useHistory();

  return (
    <>
      <div
        onClick={() => {
          history.push(`/detail/${props.a.id}`);
        }}
      >
        <span className="post">
          {props.a.name}님 ------
          {props.a.title}
        </span>
        <span className="hour">-->{props.a.createtime}</span>
        <Route path="/detail/:id"></Route>
      </div>
    </>
  );
}
export default Line;
