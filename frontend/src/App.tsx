import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "./config/firebase";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    setMessage("");
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up:", res.user);
      setMessage("Signed up successfully");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message);
    }
  };

  const handleLogin = async () => {
    setMessage("");
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", res.user);
      setMessage("Logged in successfully");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message);
    }
  };

  const handleGoogle = async () => {
    setMessage("");
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log("Google user:", res.user);
      setMessage("Google sign-in successful");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message);
    }
  };

  const handleLogout = async () => {
    setMessage("");
    try {
      await signOut(auth);
      setMessage("Logged out");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Auth Test</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin} style={{ marginLeft: 10 }}>
        Login
      </button>

      <div style={{ marginTop: 20 }}>
        <button onClick={handleGoogle}>Sign in with Google</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <p style={{ marginTop: 20 }}>{message}</p>
    </div>
  );
}

export default App;