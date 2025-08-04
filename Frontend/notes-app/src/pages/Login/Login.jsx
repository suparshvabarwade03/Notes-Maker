// import React, { useState } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import {Link} from "react-router-dom"
// import PasswordInput from "../../components/Input/PasswordInput";
// import { validateEmail } from "../../utils/helper";

// const Login = () =>{

//     const [email,setEmail] =useState("")
//     const [password,setPassword] =useState("")
//     const [error,setError] =useState(null)

//     const handleLogin=async(e)=>{
//         e.preventDefault();

//         if (!validateEmail(email)) {
//             setError("Please Enter a valid email Address")
//             return 
//         }
//         if (!password) {
//             setError("Please Enter a valid Password")
//             return
//         }
//         setError("")

//         // login api call 
//     }

//     return(
//         <>
//             <Navbar/>

//             <div className="flex items-center justify-center mt-28">
//                 <div className="w-96 border rounded bg-white px-7 py-10">
//                     <form onSubmit={handleLogin}>
//                         <h4 className="text-2xl mb-7">Login</h4>
//                         <input type="text" placeholder="Email" className="" value={email} onChange={(e)=> setEmail(e.target.value)} /> 
//                         <PasswordInput  value={password} onChange={(e)=> setPassword(e.target.value)} />
//                             {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
//                         <button type="submit" className="btn-primary">Login</button>
//                         <p className="tect-sm text-center mt-4">
//                             Not registered yet?{" "}
//                             <Link to="/signup" className="font-medium text-#2885FF underline">
//                                Create an Account
//                             </Link>
//                         </p>
//                     </form>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Login

// import React, { useState } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import { Link, useNavigate } from "react-router-dom";
// import PasswordInput from "../../components/Input/PasswordInput";
// import { validateEmail } from "../../utils/helper";
// import axiosInstance  from "../../utils/axiosInstance";
 
// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);

//     const navigate = useNavigate()

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         if (!validateEmail(email)) {
//             setError("Please enter a valid email address.");
//             return;
//         }
//         if (!password) {
//             setError("Please enter your password.");
//             return;
//         }
//         setError("");

//         // login api call 
//         try {
//           const response = await axiosInstance.post("/login", { email, password });
//           if (response.data && response.data.accessToken) {
//             // Handle successful login e.g., store token, redirect
//             localStorage.setItem("token",response.data.accessToken)
//             navigate("/dashboard"); 
//           } 
//         } catch (err) {
           
//             setError( "An unexpected error occurred.");
//           }
//         }
    

//     return (
//         <>
//             {/* Navbar is typically not present on login/signup pages for a cleaner flow,
//                 but keeping it as per your original code. */}
//             <Navbar />

//             <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 px-4"> {/* Centered content, min-height to fill screen, light background */}
//                 <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10 border border-gray-200"> {/* Responsive width, rounded corners, deeper shadow, padding */}
//                     <form onSubmit={handleLogin}>
//                         <h4 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h4> {/* Larger, bolder, centered title */}

//                         <input
//                             type="text"
//                             placeholder="Email"
//                             className="w-full text-base border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />

//                         <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

//                         {error && <p className="text-red-600 text-sm mt-2 mb-4 text-center">{error}</p>} {/* Redder error, centered, more margin */}

//                         <button
//                             type="submit"
//                             className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-6 shadow-md" // Primary button styling
//                         >
//                             Login
//                         </button>

//                         <p className="text-sm text-center text-gray-600 mt-6"> {/* Centered text, slightly darker gray */}
//                             Not registered yet?{" "}
//                             <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-800 underline transition-colors duration-200">
//                                 Create an Account
//                             </Link>
//                         </p>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Login;

// gemini start 

import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            return;
        }
        setError(""); // Clear previous errors

        // Login API call
        try {
            const response = await axiosInstance.post("/login", { email, password });

            // Check for successful login based on backend response structure
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            } else if (response.data && response.data.error) {
                // Handle backend-specific errors (e.g., "Invalid Credentials")
                setError(response.data.message);
            } else {
                // Fallback for unexpected successful response structure
                setError("Login failed: Unexpected response from server.");
            }
        } catch (err) {
            // Handle network errors or errors from backend with specific status codes
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); // Use the error message from the backend
            } else {
                setError("An unexpected error occurred. Please try again."); // Generic fallback
            }
            console.error("Login error:", err); // Log the full error for debugging
        }
    };

    return (
        <>
            {/* Navbar without user info for login/signup pages */}
            <Navbar userInfo={null} onSearchNote={() => {}} handleClearSearch={() => {}} />

            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10 border border-gray-200">
                    <form onSubmit={handleLogin}>
                        <h4 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h4>

                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full text-base border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

                        {error && <p className="text-red-600 text-sm mt-2 mb-4 text-center">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-6 shadow-md"
                        >
                            Login
                        </button>

                        <p className="text-sm text-center text-gray-600 mt-6">
                            Not registered yet?{" "}
                            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-800 underline transition-colors duration-200">
                                Create an Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;

