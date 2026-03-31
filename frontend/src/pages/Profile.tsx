import Sidebar from "../components/layout/Sidebar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardColors } from "../styles/colors";
import { useUserProfile } from "../hooks/useUserProfile";
import mockProfile from "../assets/default-pfp.jpeg";
import editPencil from "../assets/edit-pencil.svg";
import { auth } from "../config/firebase";
import { deleteUser } from "firebase/auth";

const Profile: React.FC = () => {
  const navigate = useNavigate();
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
          <div style={{ marginBottom: 8, position: 'relative', width: 96, margin: '0 auto 8px auto' }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                background: "#e6eef8",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px solid ${dashboardColors.cardBorder}`,
              }}
            >
              <img src={mockProfile} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <img src={editPencil} alt="Edit" style={{ position: 'absolute', right: 0, bottom: 0, width: 28, height: 28, background: '#fff', borderRadius: '50%', boxShadow: '0 1px 4px #0002', padding: 4, cursor: 'pointer', border: `1px solid ${dashboardColors.cardBorder}` }} />
            </div>
          </div>
          {(profile?.firstName || profile?.lastName) && (
            <div style={{
              marginTop: -4,
              marginBottom: 8,
              textAlign: 'center',
              fontWeight: 600,
              fontSize: 18,
              color: dashboardColors.title,
              letterSpacing: 0.2,
              wordBreak: 'break-word',
            }}>
              {[profile?.firstName, profile?.lastName].filter(Boolean).join(' ')}
            </div>
          )}
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
          <div style={{ width: '100%', marginTop: 8 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  background: dashboardColors.uploadButtonBackground,
                  color: dashboardColors.uploadButtonText,
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 18px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  flex: 1,
                  transition: 'background 0.2s',
                }}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                disabled={saving}
                style={{
                  background: '#f5f5f5',
                  color: '#444',
                  border: `1px solid ${dashboardColors.cardBorder}`,
                  borderRadius: 6,
                  padding: '10px 18px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  flex: 1,
                  transition: 'background 0.2s',
                }}
                onClick={() => {
                  setFirstName(profile?.firstName || '');
                  setLastName(profile?.lastName || '');
                  setMessage('');
                }}
              >
                Cancel
              </button>
            </div>
            <button
              type="button"
              disabled={saving}
              style={{
                background: '#fff0f0',
                color: '#e53e3e',
                border: `1px solid #e53e3e`,
                borderRadius: 6,
                padding: '10px 18px',
                fontWeight: 600,
                fontSize: 16,
                cursor: saving ? 'not-allowed' : 'pointer',
                width: '100%',
                marginTop: 16,
                transition: 'background 0.2s',
              }}
              onClick={async () => {
                if (!auth.currentUser) {
                  setMessage("No user is currently signed in.");
                  return;
                }
                if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                  return;
                }
                try {
                  await deleteUser(auth.currentUser);
                  setMessage("Account deleted. Redirecting...");
                  setTimeout(() => {
                    navigate("/");
                  }, 1000);
                } catch (err: any) {
                  if (err.code === 'auth/requires-recent-login') {
                    setMessage("Please sign out and sign in again before deleting your account.");
                  } else {
                    setMessage("Failed to delete account.");
                  }
                }
              }}
            >
              Delete Account
            </button>
          </div>
          {message && <div style={{ color: message.includes('updated') ? 'green' : 'red', marginTop: 8 }}>{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
