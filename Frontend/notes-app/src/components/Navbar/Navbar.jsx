// import React from "react";
// import ProfileInfo from "../Card/ProfileInfo";
// import { useNavigate } from "react-router-dom"
// import SearchBar from "../SearchBar/SearchBar";
// import { useState } from "react";

// const Navbar = () =>{

//  const [searchQuery,setSearchQuery] = useState("")
//   const navigate = useNavigate();

//   const onLogout =()=>{
//     navigate("/login")
//   }

//   const handleSearch =()=>{}

//   const onClearSearch =()=>{ setSearchQuery("")}
  
//     return(
//       <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
//         <h2 className="text-xl font-medium text-black py-2">
//             Notes
//         </h2>
//         <SearchBar value={searchQuery} onChange={({target})=>{setSearchQuery(target.value) }} handleSearch={handleSearch} onClearSearch={onClearSearch}/>
//         <ProfileInfo onLogout={onLogout}/>
//       </div>
//     )
// }

// export default Navbar 

// import React, { useState } from "react";
// import ProfileInfo from "../Card/ProfileInfo";
// import { useNavigate } from "react-router-dom"; // Corrected import, assuming react-router-dom v6 or later
// import SearchBar from "../SearchBar/SearchBar";

// const Navbar = ({userInfo,onSearchNote,handleClearSearch}) => {
//     const [searchQuery, setSearchQuery] = useState("");
//     const navigate = useNavigate();  

//     const onLogout = () => {
//         localStorage.clear()
//         navigate("/login");
//     };

//     const handleSearch = () => {
//         if (searchQuery) {
//             onSearchNote(searchQuery)
//         }
//     };

//     const onClearSearch = () => {
//         setSearchQuery("");
//          handleClearSearch()
//     };

//     return (
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-between px-8 py-3 shadow-lg rounded-b-lg"> {/* Gradient background, increased padding, deeper shadow, rounded bottom corners */}
//             <h2 className="text-2xl font-bold text-white tracking-wide"> {/* Larger, bolder, white text, letter spacing */}
//                 MyNotes
//             </h2>
//             <div className="flex-1 max-w-lg mx-6"> {/* Constrain search bar width and center it */}
//                 <SearchBar
//                     value={searchQuery}
//                     onChange={({ target }) => {
//                         setSearchQuery(target.value);
//                     }}
//                     handleSearch={handleSearch}
//                     onClearSearch={onClearSearch}
//                 />
//             </div>
//             <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
//         </div>
//     );
// };

// export default Navbar;

// gemini start

import React, { useState } from "react";
import ProfileInfo from "../Card/ProfileInfo";
import { useNavigate } from "react-router-dom"; // Corrected import, assuming react-router-dom v6 or later
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // Handles user logout: clears local storage token and redirects to login
    const onLogout = () => {
        localStorage.clear(); // Clears any stored tokens or user data
        navigate("/login"); // Redirects to the login page
    };

    // Handles initiating a search when the search button is clicked or Enter is pressed
    const handleSearch = () => {
        if (searchQuery.trim()) { // Ensure there's actual content in the search query
            onSearchNote(searchQuery); // Calls the passed prop function to perform search
        }
    };

    // Handles clearing the search input and resetting search results
    const onClearSearch = () => {
        setSearchQuery(""); // Clears the local search input state
        handleClearSearch(); // Calls the passed prop function to clear search results in Home
    };

    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-between px-4 py-3 sm:px-8 shadow-lg rounded-b-lg"> {/* Gradient background, increased padding, deeper shadow, rounded bottom corners */}
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide"> {/* Larger, bolder, white text, letter spacing, responsive font size */}
                MyNotes
            </h2>
            <div className="flex-1 max-w-xs sm:max-w-md mx-4 sm:mx-6"> {/* Constrain search bar width and center it, responsive max-width */}
                <SearchBar
                    value={searchQuery}
                    onChange={({ target }) => {
                        setSearchQuery(target.value);
                    }}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />
            </div>
            {/* Renders ProfileInfo component, passing user data and logout handler */}
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
    );
};

export default Navbar;