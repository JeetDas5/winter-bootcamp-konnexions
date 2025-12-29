// Nodejs code
// const http = require("http")

// const server = http.createServer((request, response) => {
//     response.writeHead(200, {"content-type": "html"})
//     response.end("<h1>Hello World</h1>")
// })

// server.listen(8000, () => {
//     console.log("Server is running on port: localhost:8000")
// })

// Expressjs code
// const express = require("express")
import express from "express"
import getUserController from "./controllers/getUser.controller.js";
const app = express()

// GET (when you want to get some info)
// POST (when you want to store some info in the server/db)
// DELETE (when you want to delete some info)
// PUT (replace the old info with the new info)
// PATCH (update the info partially)
app.get("/", (request, response) => {
    response.send("Hello Nodejs, this is backend basic class");
})

app.get("/user", getUserController)

app.listen(8000, () => {
    console.log("Server is running on port: localhost:8000")
})