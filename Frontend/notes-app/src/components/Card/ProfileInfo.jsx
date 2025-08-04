// import React from "react";
// import { getInitials } from "../../utils/helper";

// const ProfileInfo = ({onLogout}) => {
//     return (
//         <>
//             <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
//                     {getInitials("Raj Patil")}
//                 </div>
//                 <div >
//                     <p className="text-sm font-medium">Raj Patil</p>
//                     <button className="text-sm text-slate-700 underline" onClick={onLogout}>Logout</button>
//                 </div>

//             </div>
//         </>
//     )
// }

// export default ProfileInfo

// import React from "react";
// import { getInitials } from "../../utils/helper";

// const ProfileInfo = ({ userInfo , onLogout }) => {
//     return (
//         <>
//             <div className="flex items-center gap-4"> {/* Increased gap for better spacing */}
//                 <div className="w-14 h-14 flex items-center justify-center rounded-full text-white font-semibold text-lg bg-blue-600 shadow-md"> {/* Slightly larger, blue background, bolder text, and subtle shadow */}
//                     {getInitials(userInfo?.fullName)}
//                 </div>
//                 <div className="flex flex-col items-start"> {/* Align text to the start and make it a column */}
//                     <p className="text-base font-semibold text-gray-900 mb-1">{userInfo?.fullName}</p> {/* Slightly larger and bolder name */}
//                     <button
//                         className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 underline" // Blue logout button with hover effect
//                         onClick={onLogout}
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default ProfileInfo;

// gemini start 

import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
    // If userInfo is not available, don't render the component
    if (!userInfo) {
        return null;
    }

    return (
        <>
            <div className="flex items-center gap-4"> {/* Increased gap for better spacing */}
                {/* User initials display */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full text-white font-semibold text-base sm:text-lg bg-blue-600 shadow-md flex-shrink-0"> {/* Slightly larger, blue background, bolder text, and subtle shadow, responsive size */}
                    {getInitials(userInfo?.fullName)}
                </div>
                <div className="flex flex-col items-start overflow-hidden"> {/* Align text to the start and make it a column, hide overflow */}
                    {/* User's full name */}
                    <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1 truncate">{userInfo?.fullName}</p> {/* Slightly larger and bolder name, truncate long names */}
                    {/* Logout button */}
                    <button
                        className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 underline" // Blue logout button with hover effect, responsive font size
                        onClick={onLogout}
                        aria-label="Logout" // Accessibility improvement
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfileInfo;