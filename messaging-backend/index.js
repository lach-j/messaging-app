import express from "express";
import schema from "./data/schema.js";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import colors from "colors";

import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
app.use(cors());
app.get("/", (req, res) => {
  res.send("Init msg");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`.green);
  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`.red);
  });
  socket.on("custom_event", (data) => {
    console.log(data);
  });
});

httpServer.listen(3000, () => console.log(`Running on port 3000`.green));
