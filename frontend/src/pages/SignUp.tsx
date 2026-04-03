import { useState } from "react";
import type { FC, SyntheticEvent } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import "../styles/auth.css";
import logo from "../assets/logo.png";
import ActiveLearning from "../assets/ActiveLearning.png";
import EfficientStudySessions from "../assets/EfficientStudySessions.png";
import { Link } from "react-router-dom";
import LoadingOverlay from "../components/extra/LoadingPageOverlay";
import { useNavigate } from "react-router-dom";

// Icons
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

const CheckIcon = ({ met }: { met: boolean }) => (
  <span className={`password-rule__icon ${met ? "password-rule__icon--met" : ""}`}>
    {met ? "✓" : "○"}
  </span>
);

// Sub-components
const StudyBuddy: FC = () => (
  <div className="logo">
    <img style={{ mixBlendMode: "multiply" }} src={logo} alt="StudyBuddy" className="logo__image" />
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

// Features
const features = [
  {
    icon: <img src={ActiveLearning} style={{ width: "40px" }} />,
    title: "Active Learning",
    description: "Use quizzes, practice tests, and flashcards to study effectively.",
  },
  {
    icon: <img src={EfficientStudySessions} style={{ width: "40px" }} />,
    title: "Efficient Study Sessions",
    description: "Quickly understand material with clear AI explanations.",
  },
];

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Password rules (simplified)
  const passwordRules = {
    minLength: password.length >= 6,
    hasUppercase: /[A-Z]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
  };

  const allPasswordRulesMet = Object.values(passwordRules).every(Boolean);

  // Email validation
  const isValidEmail =
    email.includes("@") && email.indexOf("@") > 0;

  // Final form validation
  const isFormValid =
    isValidEmail &&
    allPasswordRulesMet &&
    password === confirmPassword;

  const handleSignUp = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/MyLibrary");
    } catch (err) {
      console.error(err);
    }finally{
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/MyLibrary");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="page__inner">

        <div className="features">
          <StudyBuddy />
          {features.map((f, i) => (
            <FeatureItem key={i} {...f} />
          ))}
        </div>

        <div className="card">
          <h1 className="card__title">Sign Up</h1>

          <form onSubmit={handleSignUp}>
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
              <label className="field__label">Password</label>
              <input
                className="field__input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {password.length > 0 && (
                <div className="password-requirements">
                  <div className="password-rule">
                    <CheckIcon met={passwordRules.minLength} />
                    <span>At least 6 characters</span>
                  </div>
                  <div className="password-rule">
                    <CheckIcon met={passwordRules.hasUppercase} />
                    <span>One uppercase letter</span>
                  </div>
                  <div className="password-rule">
                    <CheckIcon met={passwordRules.hasSpecialChar} />
                    <span>One special character</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="field field--password">
              <label className="field__label">Confirm Password</label>
              <input
                className="field__input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {confirmPassword.length > 0 && (
                <div className="password-rule">
                  <CheckIcon met={password === confirmPassword} />
                  <span>Passwords match</span>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn--primary"
              disabled={!isFormValid || isLoading}
            >
              Join the Study Gang
            </button>
          </form>

          <p className="signup-prompt">
            I have an account?{" "}
            <Link to="/" className="field__forgot">Sign in</Link>
          </p>

          <div className="divider">
            <div className="divider__line" />
            <span className="divider__text">or</span>
            <div className="divider__line" />
          </div>

          <button type="button" className="btn btn--social" onClick={handleGoogle} disabled={isLoading}>
            <GoogleIcon /> Sign in with Google
          </button>
        </div>
      </div>
      {isLoading && <LoadingOverlay text="Creating your account..."/>}
    </div>
  );
}