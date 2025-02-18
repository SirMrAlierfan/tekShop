import { useContext, useState } from "react";
import { Context } from "../../App";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { UserName, loged, profileInfo, setProfileInfo, handleLogout } =
    useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfileInfo, setEditableProfileInfo] = useState(profileInfo);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProfileInfo({ ...editableProfileInfo, [name]: value });
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleSaveChanges = () => {
    setProfileInfo(editableProfileInfo);
    setIsEditing(false);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  if (!loged) {
    return (
      <div className="profile-container">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Welcome, {UserName}!</h1>
      <div className="profile-info">
        {isEditing ? (
          <>
         
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editableProfileInfo.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={editableProfileInfo.age}
                onChange={handleChange}
                placeholder="Enter your age"
              />
            </div>
            <div>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={editableProfileInfo.city}
                onChange={handleChange}
                placeholder="Enter your city"
              />
            </div>
            <button className="save-btn" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </>
        ) : (
          <>
            <p>Email: {profileInfo.email || "Not provided"}</p>
            <p>Age: {profileInfo.age || "Not provided"}</p>
            <p>City: {profileInfo.city || "Not provided"}</p>
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit Profile
            </button>
          </>
        )}
      </div>
      <button onClick={handleBackToHome} className="back-btn">
        Back to Home
      </button>
      <button onClick={handleLogoutClick} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;