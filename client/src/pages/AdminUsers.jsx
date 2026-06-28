
import {
  useEffect,
  useState
} from "react";

import axios from "axios";

function AdminUsers() {

  const [users,setUsers] =
    useState([]);

  useEffect(()=>{

    fetchUsers();

  },[]);

  const fetchUsers =
    async()=>{

    try{

      const res =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/users`

        );

      setUsers(res.data);

    }

    catch(error){

      console.log(error);

    }

  };

  return(

    <div className="admin-page">

      <h1>

        Manage Users 👥

      </h1>

      <div className="users-grid">

        {

          users.map((user)=>(

            <div
              className="user-card"
              key={user._id}
            >

              <h3>

                {user.name}

              </h3>

              <p>

                {user.email}

              </p>

              <p>

                {

                  user.isAdmin

                    ? "Admin"

                    : "Customer"

                }

              </p>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default AdminUsers;

