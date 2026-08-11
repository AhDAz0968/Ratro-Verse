import "../../styles/GamesDashboard.css";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";


function GamesDashboard() {

const [games, setGames] = useState([]);
const [searchTerm, setSearchTerm] = useState('');

const [showAddForm, setShowAddForm] = useState(false);

const [title, setTitle] = useState('');
const [genre, setGenre] = useState('');
const [platform, setPlatform] = useState('');
const [year, setYear] = useState('');
const [description, setDescription] = useState('');
const [imageUrl, setImageUrl] = useState('');

const [editingId, setEditingId] = useState(null);

//load games
useEffect(() => {
    checkUser();
    fetchGames();
}, []);


async function checkUser() {
    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    if (error) {
        console.error("AUTH ERROR:", error);
        return;
    }

    console.log("CURRENT USER:", user);

    if (!user) {
        console.log("NO USER LOGGED IN");
        return;
    }

    console.log("USER ID:", user.id);
    console.log("USER EMAIL:", user.email);
}


//fetch games
async function fetchGames() {

    const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('id', { ascending: true });

    if(error){
        console.error(error);
        return;
    }

    setGames(data);
}

//add games function
async function addGame() {

    if( !title || !genre || !platform || !year ){
        alert("Please fill all required fields");
        return;
    }

    const {
        data: { user }
    } = await supabase.auth.getUser();

    console.log("USER:", user);


    const { error } = await supabase
        .from('games')
        .insert([
        {
            title,
            genre,
            platform,
            year: Number(year),
            description,
            image_url: imageUrl,
            rating: 0
        }
        ]);

    if(error){
        console.error(error);
        return;
    }

    fetchGames();

    setTitle('');
    setGenre('');
    setPlatform('');
    setYear('');
    setDescription('');
    setImageUrl('');

    setShowAddForm(false);

    alert("Game Added!");
}

// edit game
function editGame(game) {
    console.log("EDIT CLICKED:", game);

    setEditingId(game.id);

    setTitle(game.title);
    setGenre(game.genre);
    setPlatform(game.platform);
    setYear(game.year);
    setDescription(game.description || '');
    setImageUrl(game.image_url || '');

    setShowAddForm(true);
}

//update game after editing
async function updateGame() {

    if (!title || !genre || !platform || !year) {
        alert("Please fill all required fields");
        return;
    }

    const { error } = await supabase
        .from('games')
        .update({
            title,
            genre,
            platform,
            year: Number(year),
            description,
            image_url: imageUrl
        })
        .eq('id', editingId);

    if (error) {
        console.error(error);
        alert("Failed to update game");
        return;
    }

    await fetchGames();

    setTitle('');
    setGenre('');
    setPlatform('');
    setYear('');
    setDescription('');
    setImageUrl('');

    setEditingId(null);
    setShowAddForm(false);

    alert("Game Updated!");
}

//search filter
const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
);

//delete function
async function deleteGame(id){

    const confirmDelete = window.confirm("Delete this game?");

    if(!confirmDelete) return;

    const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', id);

    if(error){
        console.error(error);
        return;
    }

    fetchGames();
}

  return (
    <div className="gamesDashboard">

      <div className="gamesHeader">
        <h1>MANAGE GAMES</h1>
      </div>

      <div className="gamesControls">
        <button 
            className="addGameBtn"
            onClick={() => {
                setShowAddForm(!showAddForm);
                if (showAddForm) {
                    setEditingId(null);
                    setTitle('');
                    setGenre('');
                    setPlatform('');
                    setYear('');
                    setDescription('');
                    setImageUrl('');
                }
            }}
        >
          + ADD GAME
        </button>
      </div>

        {showAddForm && (

        <div className="addGameForm">

            <h2>{editingId ? "EDIT GAME" : "ADD NEW GAME"}</h2>

            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
            />

            <input
                placeholder="Platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
            />

            <input
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />

            <input
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button onClick={editingId ? updateGame : addGame}>
                {editingId ? "UPDATE GAME" : "SAVE GAME"}
            </button>

            <button
                onClick={() => {
                    setTitle('');
                    setGenre('');
                    setPlatform('');
                    setYear('');
                    setDescription('');
                    setImageUrl('');
                    setEditingId(null);
                    setShowAddForm(false);
                }}
            >
                CANCEL
            </button>

        </div>

        )}

      <div className="searchSection">
        <input
            type="text"
            placeholder="SEARCH GAMES..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="gamesTableContainer">

        <table className="gamesTable">

          <thead>
            <tr>
              <th>IMAGE</th>
              <th>TITLE</th>
              <th>GENRE</th>
              <th>PLATFORM</th>
              <th>YEAR</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>

            {filteredGames.map((game) => (
            <tr key={game.id}>

                <td>
                    <img
                        src={game.image_url}
                        alt={game.title}
                        className="gameImage"
                    />
                </td>

                <td>{game.title}</td>

                <td>{game.genre}</td>

                <td>{game.platform}</td>

                <td>{game.year}</td>

                <td>

                    <button
                        className="editBtn"
                        onClick={() => editGame(game)}
                    >
                        Edit
                    </button>

                    <button
                        className="deleteBtn"
                        onClick={() => deleteGame(game.id)}
                    >
                        Delete
                    </button>

                </td>

            </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default GamesDashboard;