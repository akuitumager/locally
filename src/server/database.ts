import Database from "better-sqlite3";

const db = new Database("./data/locally.db");

db.pragma("journal_mode = WAL");

db.exec(`
    CREATE TABLE IF NOT EXISTS conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        model TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

export default db;