const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const port = 3000;
// khoi tao server
const app = express();

const authRouter = require("./routes/auth.routes");
const todolistRouter = require("./routes/todolist.routes");

// su dung cac package can thiet
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todolist", todolistRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
