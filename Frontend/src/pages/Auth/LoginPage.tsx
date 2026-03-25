import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../assets/BackgroundImage.png";
import { User, Lock } from "lucide-react";
import { statesData } from "../../data/indiaData";

// 🔐 Schema
const authSchema = z.object({
  name: z.string().optional(),
  phone: z
    .string()
    .min(10, "Phone must be 10 digits")
    .max(10, "Phone must be 10 digits"),
  state: z.string().optional(),
  district: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type AuthFormData = z.infer<typeof authSchema>;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const selectedState = watch("state");

  const selectedStateData = statesData.states.find(
    (s: any) => s.state === selectedState
  );

  // 🔥 SUBMIT
  const onSubmit = async (data: AuthFormData) => {
    try {
      setLoading(true);

      const url = isSignup
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      // 🔥 SIGNUP → OTP
      if (isSignup) {
        if (result.phone) {
          setTempPhone(result.phone);
          setShowOTP(true);
        } else {
          alert(result.message);
        }
        return;
      }

      // 🔐 LOGIN
      if (result.token) {
        localStorage.setItem("token", result.token);
        login(result.token);
        navigate("/dashboard");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 VERIFY OTP
  const handleVerifyOTP = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: tempPhone,
            otp,
          }),
        }
      );

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        login(data.token);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 OTP SCREEN
  if (showOTP) {
    return (
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative bg-white/90 p-8 rounded-2xl shadow-xl w-96 text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Verify OTP 
          </h2>

          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full p-3 border rounded-xl mb-4"
          />

          <button
            onClick={handleVerifyOTP}
            className="w-full bg-green-600 text-white py-2 rounded-xl"
          >
            Verify OTP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-2">
          AgriSetu 🌾
        </h1>

        <p className="text-center text-gray-600 mb-6">
          {isSignup ? "Create your account" : "Welcome back"}
        </p>

        {/* Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setIsSignup(false)}
            className={`flex-1 py-2 ${
              !isSignup ? "bg-white text-green-600" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsSignup(true)}
            className={`flex-1 py-2 ${
              isSignup ? "bg-white text-green-600" : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          {isSignup && (
            <input
              {...register("name")}
              placeholder="Enter Name"
              className="w-full p-3 border rounded-xl"
            />
          )}

          {/* Phone */}
          <input
            {...register("phone")}
            placeholder="Phone Number"
            className="w-full p-3 border rounded-xl"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

          {/* State */}
          {isSignup && (
            <select {...register("state")} className="w-full p-3 border rounded-xl">
              <option value="">Select State</option>
              {statesData.states.map((s: any, i: number) => (
                <option key={i} value={s.state}>
                  {s.state}
                </option>
              ))}
            </select>
          )}

          {/* District */}
          {isSignup && (
            <select {...register("district")} className="w-full p-3 border rounded-xl">
              <option value="">Select District</option>
              {selectedStateData?.districts.map((d: string, i: number) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
          )}

          {/* Password */}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl"
          >
            {loading
              ? "Processing..."
              : isSignup
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-green-600 cursor-pointer ml-1"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;