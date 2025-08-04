// import React from "react";

// const EmptyCard = ({imgSrc,message})=>{
//     return (
//         <div className="flex flex-col items-center justify-center mt-20">
//             <img src={imgSrc} alt="No Notes" className="w-60" />
//             <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">{message}</p>
//         </div>
//     )
// }

// export default EmptyCard

// gemini start 

import React from "react";

const EmptyCard = ({ imgSrc, message }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-20"> {/* Flex container, centered items, top margin */}
            {/* Image for visual representation of empty state */}
            <img
                src={imgSrc}
                alt="No Notes"
                className="w-48 sm:w-60 h-auto object-contain" // Responsive width, auto height, maintain aspect ratio
            />
            {/* Message describing the empty state */}
            <p className="w-full max-w-sm text-sm sm:text-base font-medium text-slate-700 text-center leading-7 mt-5 px-4"> {/* Responsive width, centered text, appropriate font size and line height, margin-top, horizontal padding */}
                {message}
            </p>
        </div>
    );
};

export default EmptyCard;
