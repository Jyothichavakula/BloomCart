import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
function ChangePassword() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [formData, setFormData] =
        useState({

            currentPassword: "",

            newPassword: "",

            confirmPassword: ""

        });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (

            formData.newPassword !==

            formData.confirmPassword

        ) {

            return alert(
                "Passwords do not match"
            );

        }

        try {

            const res =
                await axios.put(

                    `${import.meta.env.VITE_API_URL}/api/users/change-password/${user._id}`,

                    {

                        currentPassword:
                            formData.currentPassword,

                        newPassword:
                            formData.newPassword

                    }

                );

           toast.success(
  res.data.message
);
            setFormData({

                currentPassword: "",

                newPassword: "",

                confirmPassword: ""

            });

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to change password"

            );

        }

    };

    return (

        <div className="change-password-page">

            <form

                className="change-password-form"

                onSubmit={handleSubmit}

            >

                <h1>

                    Change Password

                </h1>

                <input

                    type="password"

                    name="currentPassword"

                    placeholder="Current Password"

                    value={
                        formData.currentPassword
                    }

                    onChange={handleChange}

                    required

                />

                <input

                    type="password"

                    name="newPassword"

                    placeholder="New Password"

                    value={
                        formData.newPassword
                    }

                    onChange={handleChange}

                    required

                />

                <input

                    type="password"

                    name="confirmPassword"

                    placeholder="Confirm Password"

                    value={
                        formData.confirmPassword
                    }

                    onChange={handleChange}

                    required

                />

                <button type="submit">

                    Update Password

                </button>

            </form>

        </div>

    );

}

export default ChangePassword;