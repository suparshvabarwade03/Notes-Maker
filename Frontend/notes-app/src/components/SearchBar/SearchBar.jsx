// import React from "react";
// import { FaMagnifyingGlass } from "react-icons/fa6";
// import { IoMdClose } from "react-icons/io"

// const SearchBar = ({value,onChange,handleSearch,onClearSearch}) =>{
//     return(
//         <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">

//         <input 
//             type="text" 
//             placeholder="Search Notes"
//             className="w-full text-xs bg-transparent py-[11px] outline-none"
//             value={value}
//             onChange={onChange} 
//         />

//         {value && (
//             <IoMdClose
//             className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
//             onClick={onClearSearch}
//             />

//         )}

//         <FaMagnifyingGlass 
//           className="text-slate-400 cursor-pointer hover:text-black"
//           onClick={handleSearch}
//         />

//         </div>
//     )
// }

// export default SearchBar

// import React from "react";
// import { FaMagnifyingGlass } from "react-icons/fa6";
// import { IoMdClose } from "react-icons/io";

// const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
//     return (
//         <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-inner border border-gray-200 focus-within:border-blue-500 transition-all duration-200 w-full max-w-md"> {/* Increased padding, full width up to max-width, rounded-full, inner shadow, border with focus effect */}

//             <input
//                 type="text"
//                 placeholder="Search your notes..." // More descriptive placeholder
//                 className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-500" // Flexible width, better text and placeholder colors
//                 value={value}
//                 onChange={onChange}
//                 onKeyDown={(e) => { // Added keydown for enter to search
//                     if (e.key === 'Enter') {
//                         handleSearch();
//                     }
//                 }}
//             />

//             {value && (
//                 <IoMdClose
//                     className="text-xl text-gray-500 cursor-pointer hover:text-red-500 transition-colors duration-200 mr-2" // Clearer icon, hover effect, slightly reduced margin
//                     onClick={onClearSearch}
//                 />
//             )}

//             <FaMagnifyingGlass
//                 className="text-xl text-blue-600 cursor-pointer hover:text-blue-800 transition-colors duration-200" // Blue icon, hover effect, larger size
//                 onClick={handleSearch}
//             />

//         </div>
//     );
// };

// export default SearchBar;


// gemini start 

import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6"; // Ensure fa6 is installed for this icon
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-inner border border-gray-200 focus-within:border-blue-500 transition-all duration-200 w-full max-w-md"> {/* Increased padding, full width up to max-width, rounded-full, inner shadow, border with focus effect */}

            <input
                type="text"
                placeholder="Search your notes..." // More descriptive placeholder
                className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-500" // Flexible width, better text and placeholder colors
                value={value}
                onChange={onChange}
                onKeyDown={(e) => { // Added keydown for enter to trigger search
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />

            {/* Conditionally render the clear button if there's a value in the input */}
            {value && (
                <IoMdClose
                    className="text-xl text-gray-500 cursor-pointer hover:text-red-500 transition-colors duration-200 mr-2" // Clearer icon, hover effect, slightly reduced margin
                    onClick={onClearSearch}
                />
            )}

            {/* Search icon */}
            <FaMagnifyingGlass
                className="text-xl text-blue-600 cursor-pointer hover:text-blue-800 transition-colors duration-200" // Blue icon, hover effect, larger size
                onClick={handleSearch}
            />

        </div>
    );
};

export default SearchBar;
