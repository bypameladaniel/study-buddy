import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

export interface UserProfile {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const [firstName = "", lastName = ""] = (user.displayName || "").split(" ");
        setProfile({
          displayName: user.displayName || "",
          firstName,
          lastName,
          email: user.email || "",
        });
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  // Save only name fields, no photo. The pfp is the default one for everyone.
  const saveProfile = async (firstName: string, lastName: string) => {
    if (!auth.currentUser) return;
    const displayName = `${firstName} ${lastName}`.trim();
    await updateProfile(auth.currentUser, { displayName });
    setProfile((prev) => prev ? { ...prev, displayName, firstName, lastName } : null);
  };

  return { profile, loading, saveProfile };
}