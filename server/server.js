import express from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();

const GAMES = [
    {
        id: 1,
        title: "Plan 9 server",
        year: 1957,
        genre: "jumping game"
    },
    {
        id:2,
        title: "Dune - server",
        year: 2021,
        genre: "desert game."
    }
];

app.use(bodyParser.json());

app.get("/api/games", (req, res) => {
    res.json(GAMES);
});

app.post("/api/games", (req, res) =>{
    const {title, year, genre} = req.body;
    GAMES.push({title, year, genre});
    res.sendStatus(200);
});

app.use(express.static(path.resolve("..", "client", "dist")));
app.use((req, res) => {
   res.sendFile(path.resolve("..", "client", "dist", "index.html"));
});

const server = app.listen(3000, () => {
    console.log("Listening on http://localhost:" + server.address().port);
})