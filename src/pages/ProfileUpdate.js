import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";

const ProfileUpdate = () => {
  const [profileData, setProfileData] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
  });

  // Fetch the profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem("email");
      try {
        const response = await axios.get(
          `http://localhost:8081/api/auth/user/profile?email=${email}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8081/api/auth/user/update-profile`,
        profileData
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={profileData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={profileData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={profileData.address}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileUpdate;