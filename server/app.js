"use strict";

const express = require("express");
const cors = require('cors');

const apiRoutes = require("./routes/api");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes(express.Router()));

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
