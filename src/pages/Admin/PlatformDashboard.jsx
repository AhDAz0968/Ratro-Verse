import "../../styles/PlatformDashboard.css";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

function PlatformDashboard() {

const [platforms, setPlatforms] = useState([]);

const [name, setName] = useState('');
const [logoUrl, setLogoUrl] = useState('');
const [description, setDescription] = useState('');

//load platform
useEffect(() => {
    fetchPlatforms();
}, []);


//fetching
async function fetchPlatforms(){

    const { data, error } = await supabase
        .from('platforms')
        .select('*')
        .order('id');

    if(error){
        console.error(error);
        return;
    }

    setPlatforms(data);
}

//save platform
async function addPlatform(){

    if(!name){
        alert("Please enter a platform name");
        return;
    }

    const { error } = await supabase
        .from('platforms')
        .insert([
            {
                name,
                logo_url: logoUrl,
                description
            }
        ]);

    if(error){
        console.error(error);
        return;
    }

    setName('');
    setLogoUrl('');
    setDescription('');

    fetchPlatforms();

    alert("Platform Added!");
}


    return (
        <div className="platformDashboard">

            <div className="platformHeader">
                <h1>ADD PLATFORM</h1>
            </div>

            <div className="platformForm">

                <div className="formGroup">
                <label>Platform Name</label>
                <input
                    type="text"
                    placeholder="Enter platform name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>

                <div className="formGroup">
                <label>Logo URL</label>
                <input
                    type="text"
                    placeholder="Enter logo URL..."
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                />
                </div>

                <div className="formGroup">
                <label>Description</label>
                <textarea
                    placeholder="Enter platform description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>

                <button type="button" className="savePlatformBtn" onClick={addPlatform}>
                    SAVE
                </button>

            </div>
            <div className="platformList">

            {platforms.map((platform) => (

                    <div
                        className="platformCard"
                        key={platform.id}
                    >

                        <img
                            src={platform.logo_url}
                            alt={platform.name}
                            className="platformLogo"
                        />

                        <h3>{platform.name}</h3>

                        <p>{platform.description}</p>

                    </div>

                ))}

            </div>

        </div>
  );
}

export default PlatformDashboard;