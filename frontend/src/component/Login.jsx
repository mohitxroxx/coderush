import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/login`, { user: username, pass: password });
  
      if (res.data.success) {
        // If success is true, navigate to the home route
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        navigate("/home");
      } else {
        // If success is false, display the error message
        setError(res.data.message);
      }
    } catch (err) {
      // Handle other errors, e.g., network issues
      setError("An error occurred. Please try again.");
    }
  };
  

  const navigate = useNavigate();
  
  return (
    <div className=" min-h-screen  pb-16 sm:pb-64  flex items-center justify-center bg-transparent">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-primary">Login</h2>
        <form  onSubmit={handleSubmit} >
          <div className="mb-4">
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="user">
              Admin name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-#AE1143 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block  text-primary text-sm font-bold mb-2" htmlFor="pass">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button
            
            className="bg-secondary hover:bg-opacity-75 text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </form>
      </div>
    </div>
  );
}


export default Login
