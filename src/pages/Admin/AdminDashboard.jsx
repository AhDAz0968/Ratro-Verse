import "../../styles/AdminDashboard.css";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import GamesDashboard from "./GamesDashboard";
import UsersDashboard from "./UsersDashboard";


function AdminDashboard() {

    const [totalGames, setTotalGames] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalMessages, setTotalMessages] = useState(0);
    const [totalPlatforms, setTotalPlaforms] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [totalFavorites, setTotalFavorites] = useState(0);

    const [activePage, setActivePage] = useState("overview");

    //load dashboard
    useEffect(() => {
        fetchDashboardData();
    }, []);

    //fetch data
    async function fetchDashboardData() {
        
        //games
        const { data: games } = await supabase
            .from('games')
            .select('*');

        setTotalGames(games?.length || 0);

        //platform
        const uniquePlatforms = [
            ...new Set(games?.map(game => game.platform))
        ];

        setTotalPlaforms(uniquePlatforms.length);

        //contact messages
        const { data: messages } = await supabase
            .from('contact_messages')
            .select('*')
            
        setTotalMessages(messages?.length || 0);


        //profile users
        const { data: users } = await supabase
            .from("profiles")
            .select("*")

        setTotalUsers(users?.length || 0);


        //reviews
        const { data: reviews } = await supabase
          .from("reviews")
          .select("*");

        setTotalReviews(reviews?.length || 0);

        //favorites
        const { data: favorites } = await supabase
          .from("favorites")
          .select("*");

        setTotalFavorites(favorites?.length || 0);

        //protect admin dashboard
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if(data.role === 'admin'){
          navigate('/admin');
        }
        else{
          navigate('/');
        }
    }

  return (
    <div className="adminDashboard">

      <aside className="sidebar">
        <div className="sidebarTitle">
          <h2>DASHBOARD</h2>
        </div>

        <nav className="sidebarMenu">
          <button 
            onClick={() => setActivePage("games")}
          >
            GAMES
          </button>

          <button>PLATFORMS</button>

          <button 
            onClick={() => setActivePage("users")}
          >
            USERS
          </button>

          <button>REVIEWS</button>
          <button>MESSAGES</button>
          <button className="logoutBtn">LOGOUT</button>
        </nav>
      </aside>

      <main className="dashboardContent">
        {activePage === "overview" && (
          <>
            <header className="dashboardHeader">
              <h1>SYSTEM OVERVIEW</h1>
            </header>

            <section className="statsGrid">

              <div className="statCard">
                <h3>TOTAL GAMES</h3>
                <p>{totalGames}</p>
              </div>

              <div className="statCard">
                <h3>PlATFORM</h3>
                <p>{totalPlatforms}</p>
              </div>

              <div className="statCard">
                <h3>USERS</h3>
                <p>{totalUsers}</p>
              </div>

              <div className="statCard">
                <h3>REVIEWS</h3>
                <p>{totalReviews}</p>
              </div>

              <div className="statCard">
                <h3>MESSAGE</h3>
                <p>{totalMessages}</p>
              </div>

              <div className="statCard">
                <h3>FAVORITES</h3>
                <p>{totalFavorites}</p>
              </div>

            </section>
          </>
        )}


        {activePage === "games" && (
          <GamesDashboard />
        )}
        {activePage === "users" && (
          <UsersDashboard />
        )}
        
      </main>

    </div>
  );
}

export default AdminDashboard;