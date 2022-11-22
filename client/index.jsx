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
                <li><Link to="/games/selector"> Random Game Selector </Link> </li>
                <li><Link to="/games/nyside"> ny side :) </Link> </li>
            </ul>
        </div>

}
function NySide({gameApi}){
console.log("NY SIDE");
return <div> <h1>en ny side :)</h1>
    <Link to="/"> ny side :) </Link>



</div>

}

function ListGames({gameApi}){

    const [games, setGames] = useState();

    useEffect(  () => {
        async function fetchData(){
        console.log("use effect is called! yey!");
        setGames(undefined);
        setGames(await gameApi.listGames());
        }
        fetchData();}, []);

    if(!games){
        console.log(games)
        return <div> Loading... </div>
    }


    return(
        <div>
            <h1> Listing all Games </h1>
            {

                games.map( m =>
                    <div key={m.id}>
                        <h2> {m.title} - {m.year}</h2>
                        <div>
                            <h3> <Link to="/games/nyside"> home </Link></h3>;
                        </div>
                    </div>
                )
            }
        </div>
    )
}

function AddGame({gameApi}){
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [genre, setGenre] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        await gameApi.onAddGame({title, year, genre});
        navigate("/");
        console.log({title, year, genre})
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1> New game details </h1>
            <div>
                <label> Title: <input value={title} onChange={e => setTitle(e.target.value)}/> </label>
            </div>
            <div>
                <label> Year: <input value={year} onChange={e => setYear(e.target.value)}/> </label>
            </div>
            <div>
                <label> Genre: <input value={genre} onChange={e => setGenre(e.target.value)}/> </label>
            </div>
            <button>Submit</button>
        </form>
    );
}

function Application(){

    const gameApi = {
        onAddGame: async (m) => {
            await fetch("/api/games", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(m)
            })
        },
        listGames: async () => {
            const res = await fetch("/api/games");
            return res.json();
        }
    }

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage/>}></Route>
            <Route path="/games" element={<ListGames gameApi={gameApi}/>}></Route>
            <Route path="/games/selector" element={<AddGame gameApi={gameApi}/>}></Route>
            <Route path="/games/nyside" element={<NySide gameApi={gameApi}/>}></Route>
        </Routes>
    </BrowserRouter>
}

root.render(
    <Application/>
);
