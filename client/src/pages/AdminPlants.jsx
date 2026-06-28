import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function AdminPlants() {

  const navigate = useNavigate();

  const [plants, setPlants] =
    useState([]);

  useEffect(() => {

    fetchPlants();

  }, []);

  const fetchPlants = async () => {

    try {

      const res = await axios.get(

        "http://localhost:5000/api/plants"

      );

      setPlants(res.data);

    }

    catch(error) {

      console.log(error);

    }

  };

  const deletePlant = async (id) => {

    const confirmDelete =
      window.confirm(

        "Delete this plant?"

      );

    if(!confirmDelete) return;

    try {

      await axios.delete(

        `http://localhost:5000/api/plants/${id}`

      );

      toast.success(

        "Plant Deleted 🌱"

      );

      fetchPlants();

    }

    catch(error) {

      toast.error(

        "Delete Failed ❌"

      );

    }

  };

  return (

    <div className="admin-page">

      <div className="admin-header">

        <h1>

          Manage Plants 🌱

        </h1>

        <button
          className="add-plant-btn"
          onClick={() =>
            navigate("/admin/add-plant")
          }
        >

          + Add Plant

        </button>

      </div>

      <div className="admin-plants-grid">

        {

          plants.map((plant) => (

            <div
              className="admin-plant-card"
              key={plant._id}
            >

              <img
                src={plant.image}
                alt={plant.name}
              />

              <h3>

                {plant.name}

              </h3>

              <p>

                ₹ {plant.price}

              </p>

              <div
                className="admin-actions"
              >

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(
                      `/admin/edit-plant/${plant._id}`
                    )
                  }
                >

                  Edit

                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deletePlant(
                      plant._id
                    )
                  }
                >

                  Delete

                </button>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default AdminPlants;

