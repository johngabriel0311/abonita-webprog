import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
import { signupUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
    username: "",
    address: "",
    email: "",
    password: "",
    type: "editor",
    isActive: true,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const fieldName = e.target.id
      .replace("signup-", "")
      .replace("first-name", "firstName")
      .replace("last-name", "lastName");

    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.firstName.trim()) {
      return setError("First name is required");
    }

    if (!formData.lastName.trim()) {
      return setError("Last name is required");
    }

    if (!formData.age || formData.age < 1 || formData.age > 120) {
      return setError("Age must be between 1 and 120");
    }

    if (!formData.gender) {
      return setError("Gender is required");
    }

    if (!/^09\d{9}$/.test(formData.contactNumber)) {
      return setError("Contact number must start with 09 and be 11 digits");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return setError("Invalid email format");
    }

    if (!/^[a-zA-Z0-9_]{4,20}$/.test(formData.username)) {
      return setError("Username must be 4–20 letters or numbers");
    }

    if (formData.address.trim().length < 5) {
      return setError("Address is too short");
    }

    if (formData.password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    try {
      await signupUser(formData);

      navigate("/auth/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-[#cd45a1] sm:text-4xl">
        Sign Up
      </h1>

      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Initialize and start your progression towards a developing adventure.
      </p>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="text-sm font-medium text-zinc-700"
            >
              First Name
            </label>

            <input
              id="first-name"
              type="text"
              placeholder="First Name"
              autoComplete="given-name"
              className={inputClasses}
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="text-sm font-medium text-zinc-700"
            >
              Last Name
            </label>

            <input
              id="last-name"
              type="text"
              placeholder="Last Name"
              autoComplete="family-name"
              className={inputClasses}
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="signup-age"
              className="text-sm font-medium text-zinc-700"
            >
              Age
            </label>

            <input
              id="signup-age"
              type="number"
              placeholder="67"
              min="1"
              max="120"
              className={inputClasses}
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="signup-gender"
              className="text-sm font-medium text-zinc-700"
            >
              Gender
            </label>

            <select
              id="signup-gender"
              className={inputClasses}
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>

              <option value="Male">Male</option>

              <option value="Female">Female</option>

              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-zinc-700"
          >
            Email
          </label>

          <input
            id="signup-email"
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            className={inputClasses}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="signup-contactNumber"
            className="text-sm font-medium text-zinc-700"
          >
            Contact Number
          </label>

          <input
            id="signup-contactNumber"
            maxLength="11"
            placeholder="09XXXXXXXXX"
            pattern="09[0-9]{9}"
            className={inputClasses}
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="signup-username"
            className="text-sm font-medium text-zinc-700"
          >
            Username
          </label>

          <input
            id="signup-username"
            placeholder="Username"
            minLength="4"
            maxLength="20"
            className={inputClasses}
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="signup-address"
            className="text-sm font-medium text-zinc-700"
          >
            Address
          </label>

          <textarea
            id="signup-address"
            rows={3}
            className={inputClasses}
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-zinc-700"
          >
            Password
          </label>

          <input
            id="signup-password"
            minLength="8"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            className={inputClasses}
            value={formData.password}
            onChange={handleChange}
          />

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
        >
          Create Account
        </Button>
      </form>

      <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-6 text-sm text-zinc-900">
        <div>
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="font-semibold text-[#cd45a1] transition hover:text-[#253b80]"
          >
            Log In
          </Link>
        </div>

        <Link
          to="/"
          className="font-semibold text-[#cd45a1] transition hover:text-[#253b80]"
        >
          ← Back Home
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
