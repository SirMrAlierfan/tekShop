import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../../App";

const Login = () => {
  const navigate = useNavigate();
  const { setloged, SetUserNameP, setProfileInfo } = useContext(Context);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      setIsSubmitting(false);
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 6 characters and include letters and numbers.");
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    if (!isOtpValid) {
      setError("Please enter the correct OTP.");
      setIsSubmitting(false);
      return;
    }

    setError("");
    setSuccess("Form submitted successfully!");

    setloged(true);
    SetUserNameP(username);
    setProfileInfo({ UserName: username, email, age: "", city: "" });

    navigate("/profile");

    // Clear form
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    setUserOtp("");
    setIsOtpSent(false);
    setIsOtpValid(false);
    setIsSubmitting(false);
  };

  const handleSendOtp = () => {
    const generatedOtp = generateOtp();
    setOtp(generatedOtp);
    setIsOtpSent(true);
    setError("");
    setSuccess("OTP sent successfully!");
    alert(generatedOtp);
  };

  const handleOtpChange = (e) => {
    setUserOtp(e.target.value);
  };

  const validateOtp = () => {
    if (userOtp === otp.toString()) {
      setIsOtpValid(true);
      setError("");
      setSuccess("OTP is valid!");
    } else {
      setIsOtpValid(false);
      setError("Invalid OTP. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        {isOtpSent && (
          <div>
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              id="otp"
              value={userOtp}
              onChange={handleOtpChange}
              placeholder="Enter the OTP sent to you"
              required
            />
            <button type="button" onClick={validateOtp} disabled={isSubmitting}>
              Validate OTP
            </button>
          </div>
        )}
        {!isOtpSent && (
          <button type="button" onClick={handleSendOtp} disabled={isSubmitting}>
            Send OTP
          </button>
        )}
        <button type="submit" disabled={!isOtpValid || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;