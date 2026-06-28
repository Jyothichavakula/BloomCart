import {

  useEffect,

  useState

} from "react";

import axios from "axios";

import {

  useNavigate

} from "react-router-dom";

function AdminDashboard() {

  const navigate =
    useNavigate();

  const [stats,setStats] =
    useState({

      totalPlants:0,

      totalOrders:0,

      totalUsers:0,

      totalRevenue:0

    });

  useEffect(()=>{

    fetchStats();

  },[]);

  const fetchStats =
    async()=>{

    try{

      const res =
        await axios.get(

          "http://localhost:5000/api/admin/stats"

        );

      setStats(res.data);

    }

    catch(error){

      console.log(error);

    }

  };

  return (

    <div className="admin-page">

      <h1>

        Admin Dashboard 🌿

      </h1>

      <div className="stats-grid">

        <div className="stat-card">

          <h2>

            🌱 Plants

          </h2>

          <h1>

            {stats.totalPlants}

          </h1>

        </div>

        <div className="stat-card">

          <h2>

            📦 Orders

          </h2>

          <h1>

            {stats.totalOrders}

          </h1>

        </div>

        <div className="stat-card">

          <h2>

            👥 Users

          </h2>

          <h1>

            {stats.totalUsers}

          </h1>

        </div>

        <div className="stat-card">

          <h2>

            💰 Revenue

          </h2>

          <h1>

            ₹ {stats.totalRevenue}

          </h1>

        </div>

      </div>

      <div className="admin-grid">

        <div
          className="admin-card"
          onClick={() =>
            navigate("/admin/plants")
          }
        >

          🌱

          <h2>

            Manage Plants

          </h2>

        </div>

        <div
          className="admin-card"
          onClick={() =>
            navigate("/admin/orders")
          }
        >

          📦

          <h2>

            Manage Orders

          </h2>

        </div>

        <div
          className="admin-card"
          onClick={() =>
            navigate("/admin/users")
          }
        >

          👥

          <h2>

            Manage Users

          </h2>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;