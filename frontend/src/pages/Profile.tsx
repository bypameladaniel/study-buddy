import Sidebar from "../components/layout/Sidebar";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardColors } from "../styles/colors";
import { useUserProfile } from "../hooks/useUserProfile";
import editPencil from "../assets/edit-pencil.svg";
import defaultProfilePhoto from "../assets/default-pfp.jpeg";
import { auth } from "../config/firebase";
import { deleteUser } from "firebase/auth";

type Feedback = { kind: "success" | "error"; text: string };

const DELETE_PHRASE = "DELETE";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { profile, loading, saveProfile } = useUserProfile();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletePhrase, setDeletePhrase] = useState("");
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteModalError, setDeleteModalError] = useState<string | null>(null);

  const confirmInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
    }
  }, [profile]);

  useEffect(() => {
    if (!deleteModalOpen) return;
    document.body.style.overflow = "hidden";
    setDeletePhrase("");
    setDeleteModalError(null);
    const t = window.setTimeout(() => confirmInputRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [deleteModalOpen]);

  useEffect(() => {
    if (!deleteModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !deleteBusy) {
        setDeleteModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deleteModalOpen, deleteBusy]);

  const isDirty = useMemo(() => {
    if (!profile) return false;
    return (
      firstName.trim() !== (profile.firstName || "").trim() ||
      lastName.trim() !== (profile.lastName || "").trim()
    );
  }, [profile, firstName, lastName]);

  const displayName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ");
  const deletePhraseOk = deletePhrase.trim() === DELETE_PHRASE;

  const scrollToNameEditor = () => {
    document.getElementById("profile-name-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      await saveProfile(firstName.trim(), lastName.trim());
      setFeedback({ kind: "success", text: "Profile updated." });
    } catch {
      setFeedback({ kind: "error", text: "Could not update profile. Try again." });
    }

    setSaving(false);
  };

  const handleCancel = () => {
    setFirstName(profile?.firstName || "");
    setLastName(profile?.lastName || "");
    setFeedback(null);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleteBusy) return;
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!deletePhraseOk) return;
    if (!auth.currentUser) {
      setDeleteModalError("No user is signed in.");
      return;
    }

    setDeleteBusy(true);
    setDeleteModalError(null);

    try {
      await deleteUser(auth.currentUser);
      setDeleteModalOpen(false);
      setFeedback({ kind: "success", text: "Account deleted. Redirecting…" });
      setTimeout(() => navigate("/"), 1000);
    } catch (err: unknown) {
      const code =
        typeof err === "object" && err !== null && "code" in err
          ? String((err as { code?: string }).code)
          : "";
      if (code === "auth/requires-recent-login") {
        setDeleteModalError(
          "For security, sign out and sign in again, then try deleting your account."
        );
      } else {
        setDeleteModalError("Something went wrong. Please try again.");
      }
    } finally {
      setDeleteBusy(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <Sidebar />
        <main style={styles.main}>
          <div style={styles.loadingCard} aria-busy="true" aria-live="polite">
            <div style={styles.spinner} />
            <p style={styles.loadingText}>Loading profile…</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Sidebar />

      <main style={styles.main}>
        <div style={styles.contentWrap}>
          <header style={styles.pageHeader}>
            <h1 style={styles.pageTitle}>Profile</h1>
            <p style={styles.pageSubtitle}>
              Your account overview and settings.
            </p>
          </header>

          <div style={styles.stack}>
            <div style={styles.upperGrid}>
              <section
                style={styles.identityPanel}
                aria-labelledby="profile-identity-heading"
              >
                <div style={styles.identityCardColumn}>
                  <div style={styles.avatarWrap}>
                    <div style={styles.avatarPhotoRing}>
                      <img
                        src={defaultProfilePhoto}
                        alt=""
                        style={styles.avatarPhoto}
                        decoding="async"
                      />
                    </div>
                    <button
                      type="button"
                      style={styles.avatarEditFab}
                      onClick={scrollToNameEditor}
                      title="Edit name in the panel beside this card"
                      aria-label="Edit name"
                    >
                      <img
                        src={editPencil}
                        alt=""
                        style={styles.avatarEditIcon}
                      />
                    </button>
                  </div>

                  <h2 id="profile-identity-heading" style={styles.identityName}>
                    {displayName || "Your name"}
                  </h2>
                  <p style={styles.identityTagline}>StudyBuddy student profile</p>

                  <div style={styles.accountInset}>
                    <p style={styles.accountInsetTitle}>Account</p>
                    <div style={styles.accountField}>
                      <span style={styles.accountFieldLabel}>Email</span>
                      <span style={styles.accountFieldValue}>
                        {profile?.email || "—"}
                      </span>
                    </div>
                    <div style={{ ...styles.accountField, marginBottom: 0 }}>
                      <span style={styles.accountFieldLabel}>Status</span>
                      <span style={styles.statusPill}>
                        <span style={styles.statusDot} aria-hidden />
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="profile-name-section"
                style={styles.detailsPanel}
                aria-labelledby="profile-details-heading"
              >
                <h2 id="profile-details-heading" style={styles.sectionHeading}>
                  Name on Study Buddy
                </h2>
                <p style={styles.sectionLead}>
                  This is shown in the app. It does not change your Google or email login name.
                </p>

                <form onSubmit={handleSave} style={styles.formInner}>
                  <div style={styles.nameRow}>
                    <div style={styles.fieldGroup}>
                      <label htmlFor="profile-first-name" style={styles.label}>
                        First name
                      </label>
                      <input
                        id="profile-first-name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={styles.input}
                        autoComplete="given-name"
                        required
                      />
                    </div>
                    <div style={styles.fieldGroup}>
                      <label htmlFor="profile-last-name" style={styles.label}>
                        Last name
                      </label>
                      <input
                        id="profile-last-name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={styles.input}
                        autoComplete="family-name"
                        required
                      />
                    </div>
                  </div>

                  <div style={{ ...styles.fieldGroup, flex: "1 1 100%", minWidth: "100%" }}>
                    <label htmlFor="profile-email" style={styles.label}>
                      Sign-in email
                    </label>
                    <input
                      id="profile-email"
                      type="email"
                      value={profile?.email || ""}
                      disabled
                      style={styles.disabledInput}
                      autoComplete="email"
                    />
                    <p style={styles.fieldHelp}>
                      Read-only. To use a different email, create a new account.
                    </p>
                  </div>

                  {feedback && (
                    <div
                      role="status"
                      style={{
                        ...styles.feedback,
                        ...(feedback.kind === "success"
                          ? styles.feedbackSuccess
                          : styles.feedbackError),
                      }}
                    >
                      {feedback.text}
                    </div>
                  )}

                  <div style={styles.actionsRow}>
                    <button
                      type="submit"
                      disabled={saving || !isDirty}
                      style={{
                        ...styles.saveButton,
                        ...(saving || !isDirty ? styles.buttonDisabled : {}),
                      }}
                      onMouseOver={(e) => {
                        if (!saving && isDirty) {
                          e.currentTarget.style.background =
                            dashboardColors.uploadButtonHover;
                        }
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background =
                          dashboardColors.uploadButtonBackground;
                      }}
                    >
                      {saving ? "Saving…" : "Save changes"}
                    </button>

                    <button
                      type="button"
                      disabled={saving || !isDirty}
                      style={{
                        ...styles.cancelButton,
                        ...(saving || !isDirty ? styles.secondaryDisabled : {}),
                      }}
                      onClick={handleCancel}
                      onMouseOver={(e) => {
                        if (!saving && isDirty) {
                          e.currentTarget.style.background =
                            dashboardColors.cancelButtonHover;
                        }
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background =
                          dashboardColors.cancelButtonBackground;
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </form>

                <div style={styles.detailsDeleteSeparator} aria-hidden />

                <button
                  type="button"
                  disabled={saving}
                  style={styles.deleteButtonCorner}
                  onClick={openDeleteModal}
                  onMouseOver={(e) => {
                    if (!saving) {
                      e.currentTarget.style.background =
                        dashboardColors.deleteButtonHover;
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      dashboardColors.deleteButtonBackground;
                  }}
                >
                  Delete account
                </button>
              </section>
            </div>
          </div>
        </div>
      </main>

      {deleteModalOpen && (
        <div
          style={styles.modalRoot}
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeDeleteModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-desc"
            style={styles.modalDialog}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h2 id="delete-dialog-title" style={styles.modalTitle}>
              Delete your account?
            </h2>
            <p id="delete-dialog-desc" style={styles.modalBody}>
              This permanently removes your Study Buddy account. Your sign-in may still exist with Google or email, but app data tied to this account will be gone. This cannot be undone.
            </p>
            <label htmlFor="delete-confirm-input" style={styles.modalLabel}>
              Type <strong style={styles.modalMono}>{DELETE_PHRASE}</strong> to confirm
            </label>
            <input
              ref={confirmInputRef}
              id="delete-confirm-input"
              type="text"
              autoComplete="off"
              value={deletePhrase}
              onChange={(e) => setDeletePhrase(e.target.value)}
              style={styles.modalInput}
              placeholder={DELETE_PHRASE}
              disabled={deleteBusy}
            />
            {deleteModalError ? (
              <p style={styles.modalError} role="alert">
                {deleteModalError}
              </p>
            ) : null}
            <div style={styles.modalActions}>
              <button
                type="button"
                style={styles.modalCancel}
                onClick={closeDeleteModal}
                disabled={deleteBusy}
              >
                Cancel
              </button>
              <button
                type="button"
                style={{
                  ...styles.modalConfirm,
                  ...(!deletePhraseOk || deleteBusy ? styles.modalConfirmDisabled : {}),
                }}
                onClick={handleConfirmDelete}
                disabled={!deletePhraseOk || deleteBusy}
              >
                {deleteBusy ? "Deleting…" : "Delete forever"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: '"DM Sans", system-ui, sans-serif',
  },
  main: {
    flex: 1,
    width: "100%",
    boxSizing: "border-box",
    minHeight: "100vh",
    paddingTop: 36,
    paddingBottom: 56,
    paddingLeft: 36,
    paddingRight: 36,
    backgroundColor: dashboardColors.pageBackground,
    backgroundImage: `linear-gradient(180deg, ${dashboardColors.pageGradientStart} 0%, ${dashboardColors.pageGradientEnd} 100%)`,
    color: dashboardColors.title,
  },
  contentWrap: {
    width: "100%",
    maxWidth: "min(1080px, 100%)",
    margin: "0 auto",
  },
  pageHeader: {
    marginBottom: 32,
  },
  pageTitle: {
    fontSize: 36,
    margin: 0,
    marginBottom: 10,
    color: dashboardColors.title,
    fontWeight: 700,
    letterSpacing: "-0.03em",
  },
  pageSubtitle: {
    margin: 0,
    fontSize: 17,
    lineHeight: 1.55,
    color: dashboardColors.subtitle,
    maxWidth: 560,
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },
  upperGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 28,
    alignItems: "stretch",
  },
  detailsPanel: {
    background: dashboardColors.cardBackground,
    borderRadius: 20,
    border: `1px solid ${dashboardColors.cardBorder}`,
    boxShadow: dashboardColors.shadowMd,
    padding: "32px 34px 56px",
    boxSizing: "border-box",
    flex: "1 1 380px",
    minWidth: "min(100%, 320px)",
    position: "relative" as const,
  },
  identityPanel: {
    background: dashboardColors.cardBackground,
    borderRadius: 24,
    border: `1px solid ${dashboardColors.cardBorder}`,
    boxShadow: dashboardColors.shadowMd,
    padding: "36px 28px 32px",
    boxSizing: "border-box",
    flex: "0 1 380px",
    maxWidth: 400,
    minWidth: "min(100%, 280px)",
  },
  identityCardColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  avatarWrap: {
    position: "relative",
    width: 124,
    height: 124,
    marginBottom: 22,
    flexShrink: 0,
  },
  avatarPhotoRing: {
    width: 124,
    height: 124,
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#e8ecf0",
    boxShadow: "0 10px 32px rgba(0, 122, 255, 0.22)",
    border: `3px solid ${dashboardColors.cardBackground}`,
  },
  avatarPhoto: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    objectPosition: "center" as const,
    display: "block",
  },
  avatarEditFab: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#1d1d1f",
    border: "3px solid #ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    boxShadow: dashboardColors.shadowSm,
  },
  avatarEditIcon: {
    width: 18,
    height: 18,
    objectFit: "contain" as const,
    filter: "brightness(0) invert(1)",
  },
  identityName: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: dashboardColors.title,
    letterSpacing: "-0.02em",
    lineHeight: 1.25,
    wordBreak: "break-word",
    maxWidth: "100%",
  },
  identityTagline: {
    margin: "8px 0 0 0",
    fontSize: 14,
    color: dashboardColors.subtitle,
    lineHeight: 1.45,
  },
  accountInset: {
    width: "100%",
    marginTop: 26,
    padding: "18px 18px 16px",
    background: "#f5f5f7",
    borderRadius: 16,
    border: "1px solid rgba(0, 0, 0, 0.06)",
    textAlign: "left" as const,
    boxSizing: "border-box" as const,
  },
  accountInsetTitle: {
    margin: "0 0 14px 0",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "#5a7a9a",
  },
  accountField: {
    marginBottom: 14,
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
  },
  accountFieldLabel: {
    fontSize: 12,
    color: "#86868b",
    fontWeight: 500,
  },
  accountFieldValue: {
    fontSize: 15,
    color: dashboardColors.title,
    fontWeight: 500,
    wordBreak: "break-all" as const,
  },
  statusPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    marginTop: 2,
    padding: "6px 14px",
    borderRadius: 999,
    background: "#e8f4ff",
    color: "#007aff",
    fontSize: 14,
    fontWeight: 600,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#007aff",
    flexShrink: 0,
  },
  sectionHeading: {
    margin: 0,
    fontSize: 19,
    fontWeight: 700,
    color: dashboardColors.sectionTitle,
    letterSpacing: "-0.02em",
  },
  sectionLead: {
    margin: "10px 0 22px 0",
    fontSize: 15,
    color: dashboardColors.subtitle,
    lineHeight: 1.55,
  },
  formInner: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  nameRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 18,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: "1 1 200px",
    minWidth: "min(100%, 200px)",
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: dashboardColors.sectionTitle,
    letterSpacing: 0.02,
  },
  fieldHelp: {
    margin: 0,
    fontSize: 13,
    color: dashboardColors.studySubtitle,
    lineHeight: 1.45,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: 10,
    border: `1px solid ${dashboardColors.cardBorder}`,
    fontSize: 16,
    background: "#fff",
    color: dashboardColors.title,
    outline: "none",
  },
  disabledInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: 10,
    border: `1px solid ${dashboardColors.cardBorder}`,
    fontSize: 16,
    background: dashboardColors.cancelButtonBackground,
    color: dashboardColors.studySubtitle,
  },
  feedback: {
    fontSize: 14,
    padding: "12px 14px",
    borderRadius: 10,
    lineHeight: 1.45,
  },
  feedbackSuccess: {
    background: "rgba(13, 128, 80, 0.08)",
    color: "#0d6b45",
    border: "1px solid rgba(13, 128, 80, 0.2)",
  },
  feedbackError: {
    background: dashboardColors.deleteButtonBackground,
    color: dashboardColors.deleteButtonText,
    border: `1px solid ${dashboardColors.deleteButtonBorder}`,
  },
  actionsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 4,
  },
  saveButton: {
    background: dashboardColors.uploadButtonBackground,
    color: dashboardColors.uploadButtonText,
    border: "none",
    borderRadius: 10,
    padding: "13px 22px",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    transition: "background 0.15s ease",
    minWidth: 148,
  },
  cancelButton: {
    background: dashboardColors.cancelButtonBackground,
    color: dashboardColors.cancelButtonText,
    border: `1px solid ${dashboardColors.cancelButtonBorder}`,
    borderRadius: 10,
    padding: "13px 22px",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    transition: "background 0.15s ease",
    minWidth: 120,
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  secondaryDisabled: {
    opacity: 0.45,
    cursor: "not-allowed",
  },
  detailsDeleteSeparator: {
    width: "100%",
    marginTop: 24,
    marginBottom: 0,
    border: "none",
    borderTop: `1px solid ${dashboardColors.cardBorder}`,
    boxSizing: "border-box" as const,
  },
  deleteButtonCorner: {
    position: "absolute" as const,
    right: 28,
    bottom: 24,
    background: "#fff",
    color: dashboardColors.deleteButtonText,
    border: `1px solid ${dashboardColors.deleteButtonBorder}`,
    borderRadius: 10,
    padding: "10px 16px",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    transition: "background 0.15s ease",
  },
  modalRoot: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    boxSizing: "border-box",
    background: "rgba(29, 29, 31, 0.42)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },
  modalDialog: {
    width: "100%",
    maxWidth: 440,
    background: dashboardColors.cardBackground,
    borderRadius: 20,
    border: `1px solid ${dashboardColors.cardBorder}`,
    boxShadow: dashboardColors.shadowLg,
    padding: "28px 28px 24px",
    boxSizing: "border-box",
  },
  modalTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: dashboardColors.title,
    letterSpacing: "-0.02em",
  },
  modalBody: {
    margin: "12px 0 20px",
    fontSize: 15,
    lineHeight: 1.55,
    color: dashboardColors.subtitle,
  },
  modalLabel: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: dashboardColors.sectionTitle,
    marginBottom: 8,
  },
  modalMono: {
    fontFamily: "ui-monospace, monospace",
    fontWeight: 700,
    color: dashboardColors.deleteButtonText,
  },
  modalInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: 10,
    border: `1px solid ${dashboardColors.cardBorder}`,
    fontSize: 16,
    fontFamily: "ui-monospace, monospace",
    letterSpacing: "0.04em",
    marginBottom: 8,
  },
  modalError: {
    margin: "0 0 12px",
    fontSize: 14,
    color: dashboardColors.deleteButtonText,
    lineHeight: 1.45,
  },
  modalActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "flex-end",
    marginTop: 16,
  },
  modalCancel: {
    padding: "11px 18px",
    borderRadius: 10,
    border: `1px solid ${dashboardColors.cancelButtonBorder}`,
    background: dashboardColors.cancelButtonBackground,
    color: dashboardColors.cancelButtonText,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  modalConfirm: {
    padding: "11px 18px",
    borderRadius: 10,
    border: `1px solid ${dashboardColors.deleteButtonText}`,
    background: dashboardColors.deleteButtonText,
    color: "#fff",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  modalConfirmDisabled: {
    opacity: 0.45,
    cursor: "not-allowed",
  },
  loadingCard: {
    background: dashboardColors.cardBackground,
    borderRadius: 16,
    border: `1px solid ${dashboardColors.cardBorder}`,
    boxShadow: dashboardColors.shadowMd,
    padding: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
    maxWidth: 280,
    marginTop: 48,
  },
  spinner: {
    width: 28,
    height: 28,
    border: `3px solid ${dashboardColors.cardBorder}`,
    borderTopColor: dashboardColors.sectionTitle,
    borderRadius: "50%",
    animation: "profile-spin 0.75s linear infinite",
  },
  loadingText: {
    margin: 0,
    fontSize: 14,
    color: dashboardColors.subtitle,
  },
};

export default Profile;
