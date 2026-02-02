import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Todo API is running 🚀");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
