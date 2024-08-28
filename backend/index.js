const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// get all jams (songs to post)
app.get("/get-jams", async(req, res) => {
    try {
        const jams = await pool.query("SELECT * FROM jams ORDER BY date_created DESC;");
        res.json(jams.rows);
    } catch (error) {
        console.log(error.message)
    }
})

// post jam from 'Compose' to 'Explore' page
app.post("/post-jam", async(req, res) => {
    try {
        const { title, composer } = req.body;
        const newSong = await pool.query(
            "INSERT INTO jams (title, composer, song) VALUES ($1, $2, '') RETURNING *;",
            [title, composer]
        );
        res.json(newSong.rows);
        console.log(newSong.rows)
    } catch (error) {
        console.error(error.message);
    }
})

// signup
app.post("/signup", async(req, res) => {
    try {
        const { firstName, lastName, email, passkey } = req.body;
        const newUsers = await pool.query(
            "INSERT INTO users (username, email, passkey) VALUES ($1, $2, $3) RETURNING *;",
            [firstName + " " + lastName, email, passkey]
        );
        res.json(newUsers.rows);
    } catch (error) {
        console.error(error.message);
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