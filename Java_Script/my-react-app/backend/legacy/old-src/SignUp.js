import React, { useState } from "react";

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const validate = () => {

    let newErrors = {};

    if (formData.name === "") {
      newErrors.name = "Name is required";
    }

    if (formData.email === "") {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Enter valid email";
    }

    if (formData.password === "") {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {

      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      alert(data.message);

      setErrors({});

      setFormData({
        name: "",
        email: "",
        password: ""
      });

    } catch (error) {
      console.log(error);
      alert("Error connecting to server");
    }
  };

  return (
    <div>
      <h2>Signup Form</h2>

      <form onSubmit={handleSubmit}>

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

        <div>
          <label>Email:</label>
          <br />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <p style={{ color: "red" }}>
            {errors.email}
          </p>
        </div>

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