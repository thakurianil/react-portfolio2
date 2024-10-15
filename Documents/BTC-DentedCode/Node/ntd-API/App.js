import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import { mongoDBconnection } from "./data/mongoDbConnection.js";

const app = express();
const PORT = 8011;
// db = connect("localhost:27017/ntd-API");


app.use(cors);
app.use(morgan("dev"));

app.use(express.json());


//database
mongoDBconnection()

app.get("/v1/tasks", (req, res) => {
  try {
    fs.readFile("./data/task.json", (error, data) => {
      const data1 = JSON.parse(data);
      console.log(data1);
      error
        ? res.json({
            status: "error",
            message: "cant fetch data",
          })
        : res.json({
            status: "success",
            message: "data",
            data1,
          });
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Cannot retrive the data form task.json",
    });
  }
});
"Hello"
app.patch("/v1/tasks/patch/:id", (req, res) => {
  try {
    const id = req.params.id;
    const data = fs.fdatasyncSync("./data/task.json");
    taskList = JSON.parse(data);
    const output = fs.writeFileSync("./data/task.json", JSON.stringify());
  } catch (error) {}
});

app.delete("/v1/tasks/delete/:id", (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const data = fs.readFileSync("./data/task.json");
    const taskList = JSON.parse(data);

    let task = taskList.find((item) => item.id == id);
    updatedTask = {
      ...updatedTask,
      task,
      hour,
      type,
    };

    const output = fs.writeFileSync(
      "./data/task.json",
      JSON.stringify(taskList)
    );

    const successObj = {
      status: "success",
      message: "Task " + id + "updated",
    };

    res.status(200).send(successObj);
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

app.listen(PORT, (error) => {
  error
    ? console.log("Server error")
    : console.log(`Server connnected at http://localhost:${PORT}`);
});
