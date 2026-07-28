import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

import './SearchResults.css'

export default function SearchResults(){
    const [searchParams] = useSearchParams();

    const [games, setGames] = useState([]);

    const searchTerm = searchParams.get('search');

    useEffect(() => {
        searchGames();
    }, [searchTerm]);

    async function searchGames() {
        const { data, error } = await supabase
        .from('games')
        .select('*')
        .or(`title.ilike.%${searchTerm}%, genre.ilike.%${searchTerm}%`);

        if (error) {
        console.error(error);
        return;
        }
        
        setGames(data);
    }

    return (
        <div className="search-result-container">

            <div className="search-games">

            <div className="homePage-item-title">
                <h3>SEARCH RESULTS</h3>
            </div>

            <div className="homePage-item-border-col">

                <p>
                Showing results for: "{searchTerm}"
                </p>

                <p>
                Games found: {games.length}
                </p>

                {games.length === 0 ? (
                <p>No games found.</p>
                ) : (
                <div className="featuredGamesItems">
                    {games.map((game) => (
                    <div className="feature-item" key={game.id}>

                        <img
                        src={game.image_url}
                        alt={game.title}
                        className="Cover-Img"
                        />

                        <div className="featureDesc">

                        <p className="featuedGameTitle">
                            {game.title}
                        </p>

                        <p>{game.genre}</p>

                        <h5 className="featureGameRating">
                            ⭐ {game.rating}
                        </h5>

                        <button className="viewFeaturedGameBtn">
                            (View)
                        </button>

                        </div>

                    </div>
                    ))}
                </div>
                )}

            </div>

            </div>

        </div>
    );
}