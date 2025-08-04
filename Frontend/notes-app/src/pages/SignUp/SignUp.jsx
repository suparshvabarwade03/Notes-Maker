// import React, { useState } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import PasswordInput from "../../components/Input/PasswordInput";
// import { Link } from "react-router-dom";
// import { validateEmail } from "../../utils/helper";

// const SignUp = () => {

//     const [name, setName] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [error, setError] = useState(null)

//     const handleSignUp = async (e) => {
//         e.preventDefault();

//         if (!name) {
//             setError("Please Enter a valid Name")
//             return
//         }
//         if (!validateEmail(email)) {
//             setError("Please Enter a valid email Address")
//             return
//         }
//         if (!password) {
//             setError("Please Enter a valid Password")
//             return
//         }
//         setError("")

//         // signup api call 
//     }
//     return (
//         <>
//             <Navbar />

//             <div className="flex items-center justify-center mt-28">
//                 <div className="w-96 border rounded bg-white px-7 py-10">
//                     <form onSubmit={handleSignUp}>
//                         <h4 className="text-2xl mb-7">SignUp</h4>
//                         <input type="text" placeholder="Name" className="" value={name} onChange={(e) => setName(e.target.value)} />
//                         <input type="text" placeholder="Email" className="" value={email} onChange={(e) => setEmail(e.target.value)} />
//                         <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
//                         {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
//                         <button type="submit" className="btn-primary">Create Account</button>
//                         <p className="tect-sm text-center mt-4">
//                             Already have an account{" "}
//                             <Link to="/login" className="font-medium text-#2885FF underline">
//                                 Login
//                             </Link>
//                         </p>
//                     </form>
//                 </div>
//             </div>

//         </>
//     )
// }

// export default SignUp

// import React, { useState } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import PasswordInput from "../../components/Input/PasswordInput";
// import { Link,useNavigate } from "react-router-dom";
// import { validateEmail } from "../../utils/helper";
// import axiosInstance  from "../../utils/axiosInstance";

// const SignUp = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);

//     const navigate =useNavigate()
//     const handleSignUp = async (e) => {
//         e.preventDefault();

//         if (!name) {
//             setError("Please enter your name.");
//             return;
//         }
//         if (!validateEmail(email)) {
//             setError("Please enter a valid email address.");
//             return;
//         }
//         if (!password) {
//             setError("Please enter a password.");
//             return;
//         }
        
//         setError("");

//         // signup api call 
//         try {
//           const response = await axiosInstance.post("/create-account", { fullName:name,email, password });

//           if (response.data && response.data.error) {
//             setError(response.data.message);
//             return 
//           } 
//           if (response.data && response.data.accessToken) {
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
//                     <form onSubmit={handleSignUp}>
//                         <h4 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h4> {/* Larger, bolder, centered title */}

//                         <input
//                             type="text"
//                             placeholder="Name"
//                             className="w-full text-base border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                         />

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
//                             Create Account
//                         </button>

//                         <p className="text-sm text-center text-gray-600 mt-6"> {/* Centered text, slightly darker gray */}
//                             Already have an account?{" "}
//                             <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800 underline transition-colors duration-200">
//                                 Login
//                             </Link>
//                         </p>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SignUp;

// gemini start 

import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!name) {
            setError("Please enter your name.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter a password.");
            return;
        }

        setError(""); // Clear previous errors

        // Signup API call
        try {
            const response = await axiosInstance.post("/create-account", { fullName: name, email, password });

            // Check for successful registration based on backend response structure
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            } else if (response.data && response.data.error) {
                // Handle backend-specific errors (e.g., "User already exists")
                setError(response.data.message);
            } else {
                // Fallback for unexpected successful response structure
                setError("Registration failed: Unexpected response from server.");
            }
        } catch (err) {
            // Handle network errors or errors from backend with specific status codes
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); // Use the error message from the backend
            } else {
                setError("An unexpected error occurred. Please try again."); // Generic fallback
            }
            console.error("Signup error:", err); // Log the full error for debugging
        }
    };

    return (
        <>
            {/* Navbar without user info for login/signup pages */}
            <Navbar userInfo={null} onSearchNote={() => {}} handleClearSearch={() => {}} />

            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10 border border-gray-200">
                    <form onSubmit={handleSignUp}>
                        <h4 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h4>

                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full text-base border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

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
                            Create Account
                        </button>

                        <p className="text-sm text-center text-gray-600 mt-6">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800 underline transition-colors duration-200">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;