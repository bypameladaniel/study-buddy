import Sidebar from "../components/layout/Sidebar";
import React, { useState } from "react";
import { dashboardColors } from "../styles/colors";
import { useUserProfile } from "../hooks/useUserProfile";
import mockProfile from "../assets/default-pfp.jpeg";

const Profile: React.FC = () => {
  const { profile, loading, saveProfile } = useUserProfile();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  React.useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await saveProfile(firstName, lastName);
      setMessage("Profile updated!");
    } catch (err) {
      setMessage("Failed to update profile.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: `linear-gradient(180deg, ${dashboardColors.pageGradientStart} 0%, ${dashboardColors.pageGradientEnd} 100%)` }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: `linear-gradient(180deg, ${dashboardColors.pageGradientStart} 0%, ${dashboardColors.pageGradientEnd} 100%)` }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form
          onSubmit={handleSave}
          style={{
            background: dashboardColors.cardBackground,
            borderRadius: 16,
            boxShadow: "0 2px 16px #0001",
            padding: 36,
            minWidth: 340,
            maxWidth: 400,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <h2 style={{ color: dashboardColors.title, marginBottom: 8 }}>Profile Information</h2>
          <div style={{ marginBottom: 8 }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                background: "#e6eef8",
                overflow: "hidden",
                margin: "0 auto 8px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px solid ${dashboardColors.cardBorder}`,
              }}
            >
              <img src={mockProfile} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <label style={{ display: "block", textAlign: "left", fontWeight: 500, marginBottom: 4 }}>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 6,
                border: `1px solid ${dashboardColors.cardBorder}`,
                fontSize: 16,
                marginBottom: 8,
              }}
              required
            />
            <label style={{ display: "block", textAlign: "left", fontWeight: 500, marginBottom: 4 }}>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 6,
                border: `1px solid ${dashboardColors.cardBorder}`,
                fontSize: 16,
                marginBottom: 8,
              }}
              required
            />
            <label style={{ display: "block", textAlign: "left", fontWeight: 500, marginBottom: 4 }}>Email</label>
            <input
              type="email"
              value={profile?.email || ""}
              disabled
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 6,
                border: `1px solid ${dashboardColors.cardBorder}`,
                fontSize: 16,
                background: "#f5f5f5",
                color: "#888",
                marginBottom: 8,
              }}
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            style={{
              background: dashboardColors.uploadButtonBackground,
              color: dashboardColors.uploadButtonText,
              border: "none",
              borderRadius: 6,
              padding: "10px 28px",
              fontWeight: 600,
              fontSize: 16,
              cursor: saving ? "not-allowed" : "pointer",
              marginTop: 8,
              transition: "background 0.2s",
            }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          {message && <div style={{ color: message.includes("updated") ? "green" : "red", marginTop: 8 }}>{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
