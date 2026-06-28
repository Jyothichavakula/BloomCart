import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function AddPlant() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

  name: "",

  price: "",

  description: "",

  category: ""

});

  const [imageFile, setImageFile] =
    useState(null);

const [preview, setPreview] =
  useState("");
  

  const [uploading, setUploading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (!imageFile) {

        toast.error(
          "Please select an image"
        );

        return;

      }

      setUploading(true);

      // Upload Image To Cloudinary

      const uploadData =
        new FormData();

      uploadData.append(

        "image",

        imageFile

      );

      const uploadRes =
        await axios.post(

           `${import.meta.env.VITE_API_URL}/api/upload`,

          uploadData,

          {

            headers: {

              "Content-Type":
                "multipart/form-data"

            }

          }

        );

      const imageUrl =
        uploadRes.data.imageUrl;

      // Save Plant

      await axios.post(

  `${import.meta.env.VITE_API_URL}/api/plants`,

        {

          ...formData,

          image: imageUrl

        }

      );

      toast.success(

        "Plant Added Successfully 🌱"

      );

      navigate("/admin/plants");

    }

    catch (error) {

  console.log("FULL ERROR:", error);

  console.log("RESPONSE:", error.response);

  console.log("DATA:", error.response?.data);

  toast.error(
    error.response?.data?.message ||
    "Failed To Add Plant ❌"
  );

}

    finally {

      setUploading(false);

    }

  };

  return (

    <div className="add-plant-page">

      <form

        className="add-plant-form"

        onSubmit={handleSubmit}

      >

        <h1>

          Add New Plant 🌿

        </h1>

        <input

          type="text"

          name="name"

          placeholder="Plant Name"

          value={formData.name}

          onChange={handleChange}

          required

        />

        <input

          type="number"

          name="price"

          placeholder="Price"

          value={formData.price}

          onChange={handleChange}

          required

        />

<select

  name="category"

  value={formData.category}

  onChange={handleChange}

  required

>

  <option value="">
    Select Category
  </option>

  <option value="Indoor Plant">
    Indoor Plant
  </option>

  <option value="Outdoor Plant">
    Outdoor Plant
  </option>

  <option value="Succulent">
    Succulent
  </option>

  <option value="Flowering Plant">
    Flowering Plant
  </option>

  <option value="Air Purifying Plant">
    Air Purifying Plant
  </option>

</select>




        <input
  type="file"
  accept="image/*"
  onChange={(e) => {

    const file =
      e.target.files[0];

    setImageFile(file);

    setPreview(

      URL.createObjectURL(file)

    );

  }}
  required
/>{
  preview && (

    <div className="image-preview">

      <img

        src={preview}

        alt="Preview"

      />

    </div>

  )
}

        <textarea

          name="description"

          placeholder="Plant Description"

          value={formData.description}

          onChange={handleChange}

          rows="5"

          required

        />

        <button type="submit">

          {

            uploading

              ? "Uploading..."

              : "Add Plant"

          }

        </button>

      </form>

    </div>

  );

}

export default AddPlant;