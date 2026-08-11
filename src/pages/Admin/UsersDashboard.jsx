import "../../styles/UsersDashboard.css";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

function UsersDashboard() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
      fetchUsers();
  }, []);


  async function fetchUsers(){

    const { data, error } = await supabase
        .from('profiles')
        .select('*');

    if(error){
        console.error(error);
        return;
    }

    setUsers(data);
}


  return (
    <div className="usersDashboard">

      <div className="usersHeader">
        <h1>USER MANAGEMENT</h1>
      </div>

      <div className="usersTableContainer">

        <table className="usersTable">

          <thead>
            <tr>
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>

        {users.map((user) => (

          <tr key={user.id}>

              <td>{user.username}</td>

              <td>{user.email}</td>

              <td>
                  <span className="roleBadge">
                      {user.role}
                  </span>
              </td>

              <td>
                  <span className="statusBadge active">
                      ACTIVE
                  </span>
              </td>

              <td>
                  <button className="disableBtn">
                      Disable
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

export default UsersDashboard;