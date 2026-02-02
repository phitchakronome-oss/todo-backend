import { Request, Response } from "express";
import { pool } from "../db";

export const getTodos = async (req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  res.json(result.rows);
};

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;

  const result = await pool.query(
    "INSERT INTO todos(title) VALUES($1) RETURNING *",
    [title]
  );

  res.json(result.rows[0]);
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    await pool.query(
      "UPDATE todos SET title=$1, completed=$2 WHERE id=$3",
      [title, completed, id]
    );

    res.json({ message: "Todo updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  await pool.query("DELETE FROM todos WHERE id = $1", [id]);

  res.json({ message: "Todo deleted" });
};
