import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    await axios.post("/api/forgot-password", { email });
    alert("Reset link sent!");
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Send Link</button>
    </div>
  );
};

export default ForgotPassword;