import express from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();

const GAMES = [
    {
        title: "Plan 9 from outer space - server",
        year: 1957,
        genre: "A complete mess, but Bela Lugosi is in it"
    },
    {
        title: "Dune - server",
        year: 2021,
        genre: "The spice must flow."
    }
];

app.use(bodyParser.json());

app.get("/api/games", (req, res) => {
    res.json(GAMES);
});

app.post("/api/games", (req, res) =>{
    const {title, year, synopsis} = req.body;
    GAMES.push({title, year, games});
    res.sendStatus(200);
});

app.use(express.static(path.resolve("..", "client", "dist")));
app.use((req, res) => {
   res.sendFile(path.resolve("..", "client", "dist", "index.html"));
});

const server = app.listen(3000, () => {
    console.log("Listening on http://localhost:" + server.address().port);
})