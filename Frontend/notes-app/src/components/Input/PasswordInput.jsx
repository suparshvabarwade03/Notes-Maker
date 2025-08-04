// import React, { useState } from "react";
// import { FaRegEye ,FaRegEyeSlash } from "react-icons/fa6"
 
// const PasswordInput = ({value,onChange,placeholder}) =>{

//     const [isShowPassword,setIsShowPassword] = useState(false)

//     const toggleShowPassword =()=>{
//         setIsShowPassword(!isShowPassword)
//     }
//     return(
//       <div className="">
//         <input 
//          value={value}
//          onChange={onChange}
//          type={isShowPassword ? "text" : "password"}
//          placeholder={placeholder || "Password"}
//          className=""
//         />
//         { isShowPassword ? 
//           <FaRegEye 
//           size={22}
//           className=""
//           onClick={()=>toggleShowPassword()}
//           /> : 
//           <FaRegEyeSlash 
//            size={22}
//           className=""
//           onClick={()=>toggleShowPassword()}
//           />
//           }
//       </div>
//     )
// }

// export default PasswordInput 

// import React, { useState } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

// const PasswordInput = ({ value, onChange, placeholder }) => {
//     const [isShowPassword, setIsShowPassword] = useState(false);

//     const toggleShowPassword = () => {
//         setIsShowPassword(!isShowPassword);
//     };

//     return (
//         <div className="relative flex items-center bg-gray-50 rounded-lg border border-gray-300 focus-within:border-blue-500 transition-all duration-200">
//             <input
//                 value={value}
//                 onChange={onChange}
//                 type={isShowPassword ? "text" : "password"}
//                 placeholder={placeholder || "Password"}
//                 className="w-full text-base bg-transparent py-3 px-4 pr-12 outline-none text-gray-800 placeholder-gray-500 rounded-lg"
//             />
//             {isShowPassword ?
//                 <FaRegEye
//                     size={22}
//                     className="absolute right-4 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-200"
//                     onClick={toggleShowPassword}
//                 /> :
//                 <FaRegEyeSlash
//                     size={22}
//                     className="absolute right-4 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-200"
//                     onClick={toggleShowPassword}
//                 />
//             }
//         </div>
//     );
// };

// export default PasswordInput;

// gemini start 

import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"; // Ensure fa6 is installed for these icons

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    // Toggles the visibility state of the password
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    return (
        <div className="relative flex items-center bg-gray-50 rounded-lg border border-gray-300 focus-within:border-blue-500 transition-all duration-200 mb-4"> {/* Added bottom margin for spacing */}
            <input
                value={value}
                onChange={onChange}
                // Dynamically set input type based on isShowPassword state
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "Password"} // Use provided placeholder or default to "Password"
                className="w-full text-base bg-transparent py-3 px-4 pr-12 outline-none text-gray-800 placeholder-gray-500 rounded-lg"
            />
            {/* Conditionally render eye icon based on password visibility state */}
            {isShowPassword ? (
                <FaRegEye
                    size={22}
                    className="absolute right-4 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    onClick={toggleShowPassword}
                    aria-label="Hide password" // Accessibility improvement
                />
            ) : (
                <FaRegEyeSlash
                    size={22}
                    className="absolute right-4 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    onClick={toggleShowPassword}
                    aria-label="Show password" // Accessibility improvement
                />
            )}
        </div>
    );
};

export default PasswordInput;
