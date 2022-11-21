import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const root = ReactDOM.createRoot(document.getElementById("app"));

function FrontPage(){
    return <div>
            <h1> Game list </h1>
            <ul>
                <li><Link to="/games"> List Games </Link></li>
                <li><Link to="/movies/new"> Random Game Selector </Link> </li>
            </ul>
        </div>

}

function ListMovies({gameApi}){

    const [movies, setMovies] = useState();

    useEffect( async () => {
        console.log("use effect is called! yey!");
        setMovies(undefined);
        setMovies(await gameApi.listMovies());
        }, []);

    if(!games){
        return <div> Loading... </div>
    }

    return(
        <div>
            <h1> Listing all Movies </h1>
            {
                games.map( m =>
                    <>
                        <h2> {m.title} - {m.year}</h2>
                        <div key={m.title}>
                            {m.genre}
                        </div>
                    </>
                )
            }
        </div>
    )
}

function AddGame({gameApi}){
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [genre, setgenre] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        await gameApi.onAddMovie({title, year, genre});
        navigate("/");
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1> New movie details </h1>
            <div>
                <label> Title: <input value={title} onChange={e => setTitle(e.target.value)}/> </label>
            </div>
            <div>
                <label> Year: <input value={year} onChange={e => setYear(e.target.value)}/> </label>
            </div>
            <div>
                <label> Synopsis: <input value={genre} onChange={e => setSynopsis(e.target.value)}/> </label>
            </div>
            <button>Submit</button>
        </form>
    );
}

function Application(){

    const gameApi = {
        onAddMovie: async (m) => {
            await fetch("/api/games", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(m)
            })
        },
        listMovies: async () => {
            const res = await fetch("/api/movies");
            return res.json();
        }
    }

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage/>}></Route>
            <Route path="/games" element={<ListMovies movieApi={movieApi}/>}></Route>
            <Route path="/games/selector" element={<Addgame gameApi={gameApi}/>}></Route>
        </Routes>
    </BrowserRouter>
}

root.render(
    <Application/>
);
