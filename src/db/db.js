import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

async function initializeDB() {
  if (db) return db;

  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS dreams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      target_date TEXT,
      category TEXT
    );

    CREATE TABLE IF NOT EXISTS milestones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dream_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      target_date TEXT,
      FOREIGN KEY (dream_id) REFERENCES dreams (id)
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      milestone_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (milestone_id) REFERENCES milestones (id)
    );
  `);

  return db;
}

export { initializeDB };
