import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./index.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "", // Changed from implicitly handled to explicit
    password: "",
    confirmPassword: "",
    age: "",
    weight: ""
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Min 8 chars, 1 upper, 1 lower, 1 number, 1 special
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Please use a valid Gmail address.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters long, contain one uppercase, one lowercase, one number, and one special character.");
      return;
    }

    const result = register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      alert("Registered Successfully! Please login.");
      navigate("/login");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <div className="logo-section">
          <h1 className="brand-logo">Health & Wellness</h1>
          <h2>Create Account</h2>
          <p>Start your fitness journey</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

          <div className="input-group">
            <input id="name" required value={formData.name} onChange={handleChange} placeholder=" " />
            <label>Full Name</label>
          </div>

          <div className="input-group">
            <input id="email" type="email" required value={formData.email} onChange={handleChange} placeholder=" " />
            <label>Email (Gmail only)</label>
          </div>

          <div className="input-group">
            <input type="password" id="password" required value={formData.password} onChange={handleChange} placeholder=" " />
            <label>Password</label>
          </div>

          <div className="input-group">
            <input type="password" id="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} placeholder=" " />
            <label>Confirm Password</label>
          </div>

          <div className="input-group">
            <input type="number" id="age" required value={formData.age} onChange={handleChange} placeholder=" " />
            <label>Age</label>
          </div>

          <div className="input-group">
            <input type="number" id="weight" required value={formData.weight} onChange={handleChange} placeholder=" " />
            <label>Weight (kg)</label>
          </div>

          <div className="footer-actions">
            <Link to="/login" className="create-account">
              Already have account?
            </Link>

            <button type="submit" className="next-btn">
              Register
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default Register;
