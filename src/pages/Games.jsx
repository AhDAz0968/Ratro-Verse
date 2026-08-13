import "../styles/Games.css";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Games() {

const [searchTerm, setSearchTerm] = useState("");
const [platform, setPlatform] = useState("All");
const [genre, setGenre] = useState("All");
const [sortBy, setSortBy] = useState("rating");

const [selectedGame, setSelectedGame] = useState(null);
const [visibleGames, setVisibleGames] = useState(5);

const [favorites, setFavorites] = useState([]);

const [reviews, setReviews] = useState([]);
const [reviewText, setReviewText] = useState("");
const [reviewRating, setReviewRating] = useState(5);
    
const [games, setGames] = useState([]);

//load games data
useEffect(() => {
    fetchGames();
    fetchFavorites();
}, []);

//fetch reviews
useEffect(() => {
    if (selectedGame) {
        fetchReviews(selectedGame.id);
    }
}, [selectedGame]);


//fetch games
async function fetchGames() {

    const { data, error } = await supabase
        .from("games")
        .select("*")
        .order("rating", {ascending: false} );

    if (error) {
        console.error("FETCH GAMES ERROR:", error);
        return;
    }

    console.log("GAMES:", data);

    setGames(data);
}


async function fetchReviews(gameId) {

    const { data, error } = await supabase
        .from("reviews")
        .select(`
            id,
            user_id,
            game_id,
            rating,
            review_text,
            created_at,
            profiles (
                username
            )
        `)
        .eq("game_id", gameId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("FETCH REVIEWS ERROR:", error);
        return;
    }

    console.log("REVIEWS:", data);

    setReviews(data);
}

//update game rating
async function updateGameRating(gameId) {

    const { data: ratings, error } = await supabase
        .from("reviews")
        .select("rating")
        .eq("game_id", gameId);

    if (error) {
        console.error(error);
        return;
    }

    if (!ratings.length) return;

    const average =
        ratings.reduce((sum, review) => sum + review.rating, 0 ) / ratings.length;

    const { error: updateError } = await supabase
        .from("games")
        .update({
            rating: Number(average.toFixed(1))
        })
        .eq("id", gameId);

    if (updateError) {
        console.error(updateError);
    }
}

//sumit reviews
async function submitReview() {

    if (!reviewText.trim()) {
        alert("Please write a review.");
        return;
    }

    const {data: { user }} = await supabase.auth.getUser();

    if (!user) {
        alert("Please login first.");
        return;
    }

    const { error } = await supabase
        .from("reviews")
        .insert([
            {
                user_id: user.id,
                game_id: selectedGame.id,
                rating: reviewRating,
                review_text: reviewText
            }
        ]);

    if (error) {
        console.error(error);
        alert("Failed to post review");
        return;
    }

    await updateGameRating(selectedGame.id);
    await fetchReviews(selectedGame.id);
    await fetchGames();

    const updatedGame = await supabase
        .from("games")
        .select("*")
        .eq("id", selectedGame.id)
        .single();

    setSelectedGame(updatedGame.data);

    setReviewText("");
    setReviewRating(5);

    alert("Review posted! (❁´◡`❁)");
}

const platforms = [
    ...new Set(games.map(game => game.platform))
];

const genres = [
    ...new Set(games.map(game => game.genre))
];


const search = searchTerm.toLowerCase();

const filteredGames = [...games]
    .filter(game =>
        game.title?.toLowerCase().includes(search) ||
        game.platform?.toLowerCase().includes(search) ||
        game.genre?.toLowerCase().includes(search)
    )
    .filter(game =>
        platform === "All" ||
        game.platform === platform
    )
    .filter(game =>
        genre === "All" ||
        game.genre === genre
    )
    .sort((a, b) => {

        if (sortBy === "rating") {
            return b.rating - a.rating;
        }

        if (sortBy === "year") {
            return b.year - a.year;
        }

        return a.title.localeCompare(b.title);
    });

useEffect(() => {
    setVisibleGames(5);
}, [searchTerm, platform, genre, sortBy]);

//toggle favorite 
async function toggleFavorite(gameId) {

    const {data: { user }} = await supabase.auth.getUser();

    if (!user) {
        alert("Please login first.");
        return;
    }

    if (favorites.includes(gameId)) {

        const { error } = await supabase
            .from("favorites")
            .delete()
            .eq("user_id", user.id)
            .eq("game_id", gameId);

        if (error) {
            console.error(error);
            return;
        }

        setFavorites(favorites.filter(id => id !== gameId));

    } else {

        const { error } = await supabase
            .from("favorites")
            .insert([
                {
                    user_id: user.id,
                    game_id: gameId
                }
            ]);

        if (error) {
            console.error(error);
            return;
        }

        setFavorites([ ...favorites, gameId]);
    }
}

//fetch favorites
async function fetchFavorites() {

    const {data: { user }} = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
        .from("favorites")
        .select("game_id")
        .eq("user_id", user.id);

    if (error) {
        console.error(error);
        return;
    }

    setFavorites(data.map(favorite => favorite.game_id));
}

return (

    <div className="gamesPage">

        <div className="gamesHero">

            <h1>RETRO GAME LIBRARY</h1>

            <p>
                EXPLORE CLASSIC GAMES FROM EVERY GENERATION
            </p>

        </div>

        <div className="searchFilterBox">

            <input
                type="text"
                placeholder=" Search games..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
            />

            <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
            >
                <option value="All">All Platforms</option>

                {platforms.map((platformName) => (
                    <option
                        key={platformName}
                        value={platformName}
                    >
                        {platformName}
                    </option>
                ))}
            </select>

            <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
            >
                <option value="All">All Genres</option>

                {genres.map((genreName) => (
                    <option
                        key={genreName}
                        value={genreName}
                    >
                        {genreName}
                    </option>
                ))}
            </select>

            <select
                value={sortBy}
                onChange={(e) =>
                    setSortBy(e.target.value)
                }
            >
                <option value="rating">Rating</option>
                <option value="year">Year</option>
                <option value="title">Title</option>
            </select>

        </div>

        <div className="resultsBar">

            <h3>
                {filteredGames.length} GAMES FOUND
            </h3>

        </div>

        <div className="gamesGrid">

        {filteredGames
            .slice(0, visibleGames)
            .map((game) => (

                <div
                    className="gameCard"
                    key={game.id}
                >

                    <img
                        src={game.image_url}
                        alt={game.title}
                    />

                    <h3>{game.title}</h3>

                    <p>{game.platform}</p>

                    <p>{game.genre}</p>

                    <p>⭐ {game.rating}</p>

                    <button
                        onClick={() =>
                            setSelectedGame(game)
                        }
                    >
                        ▶ VIEW DETAILS
                    </button>

                </div>

            ))}

        </div>
        {visibleGames < filteredGames.length ? (
            <button
                className="showMoreBtn"
                onClick={() => setVisibleGames(visibleGames + 5)}
            >
                SHOW MORE
            </button>
        ) : (
            filteredGames.length > 5 && (
                <button
                    className="showLessBtn"
                    onClick={() =>setVisibleGames(5)}
                >
                    SHOW LESS
                </button>
            )
        )}
        

        {selectedGame && (

            <div className="modalOverlay">

                <div className="gameModal">

                    <img
                        src={selectedGame.image_url}
                        alt={selectedGame.title}
                    />

                    <div className="modalContent">

                        <h2>
                            {selectedGame.title}
                        </h2>

                        <p>
                            <strong>Platform:</strong>
                            {" "}
                            {selectedGame.platform}
                        </p>

                        <p>
                            <strong>Genre:</strong>
                            {" "}
                            {selectedGame.genre}
                        </p>

                        <p>
                            <strong>Year:</strong>
                            {" "}
                            {selectedGame.year}
                        </p>

                        <p>
                            <strong>Rating:</strong>
                            {" "}
                            ⭐ {selectedGame.rating}
                            {" "}
                            ({reviews.length} Reviews)
                        </p>

                        <h3>Description</h3>

                        <p>
                            {selectedGame.description}
                        </p>

                        <button
                            className="favoriteBtn"
                            onClick={() =>
                                toggleFavorite(selectedGame.id)
                            }
                        >
                            {favorites.includes(selectedGame.id)
                                ? "♥ FAVORITED"
                                : "♡ ADD TO FAVORITES"}
                        </button>

                        <div className="reviewsSection">

                            <h3>PLAYER REVIEWS</h3>

                            <div className="writeReview">

                                <div className="reviewUserHeader">
                                    <span>👤 Share your thoughts</span>
                                </div>

                                <textarea
                                    value={reviewText}
                                    onChange={(e) =>
                                        setReviewText(e.target.value)
                                    }
                                    placeholder="Write your review..."
                                    rows="4"
                                />
                                
                                <div className="ratingSelect">

                                    <label>RATING</label>

                                    <select
                                        value={reviewRating}
                                        onChange={(e) =>
                                            setReviewRating(Number(e.target.value))
                                        }
                                    >
                                        <option value="5">⭐⭐⭐⭐⭐</option>
                                        <option value="4">⭐⭐⭐⭐</option>
                                        <option value="3">⭐⭐⭐</option>
                                        <option value="2">⭐⭐</option>
                                        <option value="1">⭐</option>
                                    </select>

                                </div>

                                <button
                                    className="postReviewBtn"
                                    onClick={submitReview}
                                >
                                    POST REVIEW
                                </button>

                            </div>

                            <div className="reviewsList">

                                <h4>
                                    {reviews.length} REVIEWS
                                </h4>

                                {reviews.length === 0 ? (

                                    <p className="noReviews">
                                        No reviews yet. Be the first to review this game!
                                    </p>

                                ) : (

                                    reviews.map((review) => (

                                        <div
                                            className="reviewCard"
                                            key={review.id}
                                        >

                                            <div className="reviewUserInfo">

                                                <div className="reviewAvatar">
                                                    👤
                                                </div>

                                                <div>

                                                    <h4>
                                                        {review.profiles?.username || "Unknown User"}
                                                    </h4>

                                                    <span>
                                                        {review.created_at
                                                            ? new Date(
                                                                review.created_at
                                                            ).toLocaleDateString()
                                                            : "Unknown Date"}
                                                    </span>

                                                </div>

                                            </div>

                                            <p className="reviewRating">
                                                {"⭐".repeat(review.rating)}
                                            </p>

                                            <p className="reviewText">
                                                "{review.review_text}"
                                            </p>

                                        </div>

                                    ))

                                )}

                            </div>

                        </div>

                        <button
                            className="closeBtn"
                            onClick={() =>
                                setSelectedGame(null)
                            }
                        >
                            CLOSE
                        </button>

                    </div>

                </div>

            </div>

        )}

    </div>

);
}