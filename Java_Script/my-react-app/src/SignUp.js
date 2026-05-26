import React, { useState } from "react";

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  // Validation
  const validate = () => {

    let newErrors = {};

    // Name validation
    if (formData.name === "") {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (formData.email === "") {
      newErrors.email = "Email is required";
    }
    else if (!formData.email.includes("@")) {
      newErrors.email = "Enter valid email";
    }

    // Password validation
    if (formData.password === "") {
      newErrors.password = "Password is required";
    }
    else if (formData.password.length < 6) {
      newErrors.password = "Password must be 6 characters";
    }

    return newErrors;
  };

  // Form submit
  const handleSubmit = (event) => {

    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }
    else {
      alert("Signup Successful");

      setErrors({});

      setFormData({
        name: "",
        email: "",
        password: ""
      });
    }
  };

  return (
    <div>
      <h2>Signup Form</h2>

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div>
          <label>Name:</label>
          <br />

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <p style={{ color: "red" }}>
            {errors.name}
          </p>
        </div>

        {/* Email */}
        <div>
          <label>Email:</label>
          <br />

          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <p style={{ color: "red" }}>
            {errors.email}
          </p>
        </div>

        {/* Password */}
        <div>
          <label>Password:</label>
          <br />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <p style={{ color: "red" }}>
            {errors.password}
          </p>
        </div>

        <button type="submit">
          Signup
        </button>

      </form>
    </div>
  );
}

export default Signup;