import { useState } from "react";
import type { FC, SyntheticEvent } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import "../styles/auth.css";
import logo from "../assets/logo.png";
import ActiveLearning from "../assets/ActiveLearning.png";
import EfficientStudySessions from "../assets/EfficientStudySessions.png";
import { Link, useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/extra/LoadingPageOverlay";
import { Eye, EyeOff } from "lucide-react";

// Icons

const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      fill="#34A853"
    />
    <path
      d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      fill="#EA4335"
    />
  </svg>
);

//Sub-components

const StudyBuddy: FC = () => (
  <div className="logo">
    <img
      style={{ mixBlendMode: "multiply" }}
      src={logo}
      alt="StudyBuddy"
      className="logo__image"
    />
  </div>
);

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => (
  <div className="feature">
    <div className="feature__icon">{icon}</div>
    <div>
      <p className="feature__title">{title}</p>
      <p className="feature__description">{description}</p>
    </div>
  </div>
);

// Feature data  ──

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: (
      <img
        src={ActiveLearning}
        alt="hand holding a gear"
        style={{ width: "40px", height: "40px", objectFit: "contain" }}
      />
    ),
    title: "Active Learning",
    description:
      "Change your way of studying by applying active learning methods such as quizzes, parctice tests and flashcards instead of reviewing boring notes.",
  },
  {
    icon: (
      <img
        src={EfficientStudySessions}
        alt="document icon"
        style={{ width: "40px", height: "40px", objectFit: "contain" }}
      />
    ),
    title: "Efficient Study Sessions",
    description:
      "No more wasting time searching for information or deciphering simple concepts with complex explanations. StudyBuddy summarizes and explains your courses simply and effectively.",
  },
];

// Page component

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const notify = (msg: string, error = false): void => {
    setMessage(msg);
    setIsError(error);
  };

  const handleSignIn = async (
    e: SyntheticEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      setPassword("");
      notify("Invalid email or password", true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async (): Promise<void> => {
    setMessage("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch {
      notify("Google sign-in failed", true);
    }
  };

  return (
    <div className="page">
      <div className="page__inner">
        {/* Left: feature list */}
        <div className="features">
          <StudyBuddy />
          {features.map((f, i) => (
            <FeatureItem key={i} {...f} />
          ))}
        </div>

        {/* Right: sign-in card */}
        <div className="card">
          <h1 className="card__title">Sign in</h1>

          <form onSubmit={handleSignIn}>
            {/* Email */}
            <div className="field">
              <label className="field__label">Email</label>
              <input
                className="field__input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="field field--password">
              <div className="field__header">
                <label className="field__label field__label--inline">
                  Password
                </label>
              </div>

              <div className="password-wrapper">
                <input
                  className="field__input"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="remember-forgot">
              <label className="remember">
                <input
                  className="remember__checkbox"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="remember__label">Remember me</span>
              </label>

              <a href="#" className="field__forgot">
                Forgot your password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn--primary"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Feedback message */}
          {message && (
            <p
              className={`feedback ${isError ? "feedback--error" : "feedback--success"}`}
            >
              {message}
            </p>
          )}

          {/* Sign-up prompt */}
          <p className="signup-prompt">
            Don't have an account?{" "}
            <Link to="/signup" className="field__forgot">
              Sign up
            </Link>
          </p>

          {/* Divider */}
          <div className="divider">
            <div className="divider__line" />
            <span className="divider__text">or</span>
            <div className="divider__line" />
          </div>

          {/* Social buttons */}
          <button
            type="button"
            className="btn btn--social"
            onClick={handleGoogle}
            disabled={isLoading}
          >
            <GoogleIcon /> Sign in with Google
          </button>
        </div>
      </div>
      {isLoading && <LoadingOverlay text="Signing you in..." />}
    </div>
  );
}
