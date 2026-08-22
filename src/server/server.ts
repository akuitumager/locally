import express from "express";
import db from "./database";

const app = express();

app.use(express.json());

app.get("/api/conversations", (req, res) => {
    const conversations = db
        .prepare("SELECT * FROM conversations ORDER BY created_at DESC")
        .all();

    res.json(conversations);
});

app.post("/api/conversations", (req, res) => {
    const { title, model } = req.body;

    const result = db
        .prepare(`
            INSERT INTO conversations (title, model)
            VALUES (?, ?)
        `)
        .run(title, model);

    res.json({
        id: result.lastInsertRowid,
        title,
        model
    });
});

app.listen(3001, () => {
    console.log("Locally backend running on http://localhost:3001");
});