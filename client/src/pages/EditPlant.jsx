import { useEffect, useState } from "react";

import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function EditPlant() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",

    price: "",

    image: "",

    description: ""

  });

  useEffect(() => {

    fetchPlant();

  }, []);

  const fetchPlant = async () => {

    try {

      const res = await axios.get(

        `http://localhost:5000/api/plants/${id}`

      );

      setFormData(res.data);

    }

    catch(error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.put(

        `http://localhost:5000/api/plants/${id}`,

        formData

      );

      toast.success(

        "Plant Updated 🌱"

      );

      navigate("/admin/plants");

    }

    catch(error) {

      toast.error(

        "Update Failed ❌"

      );

    }

  };

  return (

    <div className="add-plant-page">

      <form

        className="add-plant-form"

        onSubmit={handleSubmit}

      >

        <h1>

          Edit Plant ✏️

        </h1>

        <input

          type="text"

          name="name"

          value={formData.name}

          onChange={handleChange}

          required

        />

        <input

          type="number"

          name="price"

          value={formData.price}

          onChange={handleChange}

          required

        />

        <input

          type="text"

          name="image"

          value={formData.image}

          onChange={handleChange}

          required

        />

        <textarea

          name="description"

          value={formData.description}

          onChange={handleChange}

          rows="5"

          required

        />

        <button type="submit">

          Update Plant

        </button>

      </form>

    </div>

  );

}

export default EditPlant;
