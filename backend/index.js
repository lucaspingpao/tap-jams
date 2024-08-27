const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// create new task
app.post("/tasks", async(req, res) => {
    try {
        const { taskName, priorityLevel } = req.body;
        const newTask = await pool.query(
            "INSERT INTO todo (TaskName, PriorityLevel) VALUES ($1, $2) RETURNING *",
            [taskName, priorityLevel]
        );
        res.json(newTask.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// get all tasks
app.get("/tasks", async(req, res) => {
    try {
        const allTasks = await pool.query("SELECT * FROM todo ORDER BY TaskID");
        res.json(allTasks.rows);
    } catch (error) {
        console.log(error.message)
    }
})

// update task
app.put("/tasks/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { taskName } = req.body;
        const updateTask = await pool.query(
            "UPDATE todo SET TaskName = $1 WHERE TaskID = $2",
            [taskName, id]
        );
        res.json(updateTask.rows);
    } catch (error) {
        console.log(error.message)
    }
})

// delete task
app.delete("/tasks/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await pool.query(
            "DELETE FROM todo WHERE TaskID = $1",
            [id]
        );
        res.json(deleteTask.rows);
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(8000, () => {
    console.log("server has started on port 8000")
});