import Sidebar from "../components/layout/Sidebar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardColors, workspaceColors } from "../styles/colors";
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
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await saveProfile(firstName, lastName);
      setMessage("Profile updated!");
    } catch {
      setMessage("Failed to update profile.");
    }

    setSaving(false);
  };

  const handleCancel = () => {
    setFirstName(profile?.firstName || "");
    setLastName(profile?.lastName || "");
    setMessage("");
  };

  const handleDeleteAccount = async () => {
    if (!auth.currentUser) {
      setMessage("No user is currently signed in.");
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deleteUser(auth.currentUser);
      setMessage("Account deleted. Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err: any) {
      if (err.code === "auth/requires-recent-login") {
        setMessage("Please sign out and sign in again before deleting your account.");
      } else {
        setMessage("Failed to delete account.");
      }
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <Sidebar />
        <div style={styles.centerContent}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Sidebar />

      <div style={styles.centerContent}>
        <form onSubmit={handleSave} style={styles.form}>
          <h2 style={styles.title}>Profile Information</h2>

          <div style={styles.avatarWrapper}>
            <div style={styles.avatarContainer}>
              <img src={mockProfile} alt="Profile" style={styles.avatarImage} />
            </div>

            <img
              src={editPencil}
              alt="Edit"
              style={styles.editPencil}
            />
          </div>

          {(profile?.firstName || profile?.lastName) && (
            <div style={styles.fullName}>
              {[profile?.firstName, profile?.lastName].filter(Boolean).join(" ")}
            </div>
          )}

          <div style={styles.fieldsWrapper}>
            <label style={styles.label}>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={styles.input}
              required
            />

            <label style={styles.label}>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={styles.input}
              required
            />

            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={profile?.email || ""}
              disabled
              style={styles.disabledInput}
            />
          </div>

          <div style={styles.actionsWrapper}>
            <div style={styles.buttonRow}>
              <button
                type="submit"
                disabled={saving}
                style={styles.saveButton}
                onMouseOver={(e) => {
                  if (!saving) {
                    e.currentTarget.style.background =
                      dashboardColors.uploadButtonHover;
                    e.currentTarget.style.color =
                      dashboardColors.uploadButtonText;
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background =
                    dashboardColors.uploadButtonBackground;
                  e.currentTarget.style.color =
                    dashboardColors.uploadButtonText;
                }}
              >
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                disabled={saving}
                style={styles.cancelButton}
                onClick={handleCancel}
                onMouseOver={(e) => {
                  if (!saving) {
                    e.currentTarget.style.background = dashboardColors.cancelButtonHover;
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = dashboardColors.cancelButtonBackground;
                }}
              >
                Cancel
              </button>
            </div>

            <button
              type="button"
              disabled={saving}
              style={styles.deleteButton}
              onClick={handleDeleteAccount}
              onMouseOver={(e) => {
                if (!saving) {
                  e.currentTarget.style.background = dashboardColors.deleteButtonHover;
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = dashboardColors.deleteButtonBackground;
              }}
            >
              Delete Account
            </button>
          </div>

          {message && (
            <div
              style={{
                ...styles.message,
                color: message.includes("updated") ? "green" : "red",
              }}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: `linear-gradient(180deg, ${dashboardColors.pageGradientStart} 0%, ${dashboardColors.pageGradientEnd} 100%)`,
  },
  centerContent: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
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
  },
  title: {
    color: dashboardColors.title,
    marginBottom: 8,
  },
  avatarWrapper: {
    margin: "0 auto 8px auto",
    marginBottom: 8,
    position: "relative",
    width: 96,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: "50%",
    background: workspaceColors.tabBackground,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px solid ${dashboardColors.cardBorder}`,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  editPencil: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    background: dashboardColors.cardBackground,
    borderRadius: "50%",
    boxShadow: "0 1px 4px #0002",
    padding: 4,
    cursor: "pointer",
    border: `1px solid ${dashboardColors.cardBorder}`,
  },
  fullName: {
    marginTop: -4,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: 600,
    fontSize: 18,
    color: dashboardColors.title,
    letterSpacing: 0.2,
    wordBreak: "break-word",
  },
  fieldsWrapper: {
    width: "100%",
  },
  label: {
    display: "block",
    textAlign: "left",
    fontWeight: 500,
    marginBottom: 4,
  },
  input: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: 6,
    border: `1px solid ${dashboardColors.cardBorder}`,
    fontSize: 16,
    marginBottom: 8,
    background: "#fff",
  },
  disabledInput: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: 6,
    border: `1px solid ${dashboardColors.cardBorder}`,
    fontSize: 16,
    background: dashboardColors.cancelButtonBackground,
    color: "#888",
    marginBottom: 8,
  },
  actionsWrapper: {
    width: "100%",
    marginTop: 8,
  },
  buttonRow: {
    display: "flex",
    gap: 12,
  },
  saveButton: {
    background: dashboardColors.uploadButtonBackground,
    color: dashboardColors.uploadButtonText,
    border: "none",
    borderRadius: 6,
    padding: "10px 18px",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    flex: 1,
    transition: "background 0.2s",
  },
  cancelButton: {
    background: dashboardColors.cancelButtonBackground,
    color: dashboardColors.cancelButtonText,
    border: `1px solid ${dashboardColors.cancelButtonBorder}`,
    borderRadius: 6,
    padding: "10px 18px",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    flex: 1,
    transition: "background 0.2s",
  },
  deleteButton: {
    background: dashboardColors.deleteButtonBackground,
    color: dashboardColors.deleteButtonText,
    border: `1px solid ${dashboardColors.deleteButtonBorder}`,
    borderRadius: 6,
    padding: "10px 18px",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    width: "100%",
    marginTop: 16,
    transition: "background 0.2s",
  },
  message: {
    marginTop: 8,
  },
};

export default Profile;