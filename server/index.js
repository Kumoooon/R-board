const client = require("./connection.js");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.listen(3001, () => {
  console.log(`server is running`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
client.connect();
app.get("/board", (req, res) => {
  client.query(`SELECT * FROM board`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});

app.get("/board/paginate/:limit/:offset", (req, res) => {
  console.log(req.params)
  client.query(
    `SELECT * FROM board order by id limit ${req.params.limit} offset ${req.params.offset};`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

/*app.get("/board/:id", (req, res) => {
  client.query(
    `SELECT * FROM board WHERE id = ${req.params.id}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});
*/


app.post("/board/create", (req, res) => {
  console.log(req.body);
  let insertQuery = `INSERT INTO public.board (name, title, text)VALUES('${req.body.name}','${req.body.title}','${req.body.text}')`;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

app.delete("/board/:id", (req, res) => {
  let insertQuery = `DELETE FROM board WHERE id=${req.params.id}`;
  console.log(req.params.id);

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Deletion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});
app.put("/board/:id", (req, res) => {
  const change = req.body;
  let updateQuery = `UPDATE board
    set name = '${change.name}',
    title = '${change.title}',
    text = '${change.text}'
    WHERE id = ${change.id}`;
  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});


