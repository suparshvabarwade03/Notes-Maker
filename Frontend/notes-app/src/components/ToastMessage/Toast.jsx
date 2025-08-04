// import React, { useEffect } from "react";
// import {LuCheck } from "react-icons/lu"
// import {   MdDeleteOutline } from "react-icons/md";



// const Toast =({isShown ,message, type , onClose}) =>{

//     useEffect(()=>{
//         const timeoutId = setTimeout(()=>{
//             onClose();
//         },2000);
//         return ()=>{
//             clearTimeout(timeoutId)
//         }
//     },[onClose])

//     return(
//        <div className={`absolute top-20 right-6 transition-all duration-300 ${!isShown ?"opacity-100":"opacity-0"}`}>
//          <div className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${
//             type === "delete" ? "after:bg-red-500": "after:bg-green-500"
//          } after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
//          >
//             <div className="flex items-center gap-3 py-2 px-4">
//                 <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
//                     type === "delete" ? "bg-red-50" : "bg-green-50"
//                 }`}>
//                     { type === "delete" ? (<MdDeleteOutline className="text-xl text-red-500" /> ) : (<LuCheck className="text-xl text-green-500" /> )}
//                 </div>
//                <p className="text-sm text-slate-800 ">{message}</p>
//             </div>
//          </div>
//        </div>
//     )
// }

// export default Toast


//  gemini start 

import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu"; // For success/add/edit icon
import { MdDeleteOutline } from "react-icons/md"; // For delete icon
import { IoClose } from "react-icons/io5"; // For manual close button
import { RiErrorWarningLine } from "react-icons/ri"; // For error icon

const Toast = ({ isShown, message, type, onClose }) => {

    // Effect to automatically hide the toast after a few seconds
    useEffect(() => {
        let timeoutId;
        if (isShown) {
            timeoutId = setTimeout(() => {
                onClose(); // Call the onClose prop to hide the toast
            }, 3000); // Hide after 3 seconds (common duration)
        }

        // Cleanup function to clear the timeout if the component unmounts or isShown becomes false
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isShown, onClose]); // Re-run effect when isShown or onClose changes

    // Determine the icon and border color based on the 'type' prop
    const getToastStyles = () => {
        let borderColorClass = '';
        let iconComponent = null;
        let iconBgClass = '';
        let iconColorClass = '';

        switch (type) {
            case 'add':
                borderColorClass = 'after:bg-green-500';
                iconBgClass = 'bg-green-50';
                iconColorClass = 'text-green-500';
                iconComponent = <LuCheck className="text-xl" />;
                break;
            case 'edit':
                borderColorClass = 'after:bg-blue-500';
                iconBgClass = 'bg-blue-50';
                iconColorClass = 'text-blue-500';
                iconComponent = <LuCheck className="text-xl" />;
                break;
            case 'delete':
                borderColorClass = 'after:bg-red-500';
                iconBgClass = 'bg-red-50';
                iconColorClass = 'text-red-500';
                iconComponent = <MdDeleteOutline className="text-xl" />;
                break;
            case 'error':
                borderColorClass = 'after:bg-red-600'; // Darker red for explicit errors
                iconBgClass = 'bg-red-100';
                iconColorClass = 'text-red-600';
                iconComponent = <RiErrorWarningLine className="text-xl" />;
                break;
            default:
                borderColorClass = 'after:bg-gray-500';
                iconBgClass = 'bg-gray-50';
                iconColorClass = 'text-gray-500';
                iconComponent = null; // No icon by default
                break;
        }
        return { borderColorClass, iconComponent, iconBgClass, iconColorClass };
    };

    const { borderColorClass, iconComponent, iconBgClass, iconColorClass } = getToastStyles();

    // Only render the toast if isShown is true
    if (!isShown) return null;

    return (
        <div
            className={`fixed bottom-40 right-6 z-[1001] transition-all duration-300 ease-in-out transform 
                        ${isShown ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
            <div
                className={`min-w-52 bg-white border shadow-2xl rounded-md relative overflow-hidden
                           after:w-[5px] after:h-full ${borderColorClass} after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
            >
                <div className="flex items-center gap-3 py-2 px-4">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${iconBgClass}`}>
                        <span className={iconColorClass}>
                            {iconComponent} {/* Display the determined icon */}
                        </span>
                    </div>
                    <p className="text-sm text-slate-800 flex-grow">{message}</p>
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none"
                        aria-label="Close toast"
                    >
                        <IoClose className="text-xl" /> {/* Close icon */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toast;
