// import React from "react";
// import { MdOutlinePushPin } from "react-icons/md"
// import { MdCreate, MdDelete } from "react-icons/md"

// const NoteCard = ({
//     title,
//     date,
//     content,
//     tags,
//     isPinned,
//     onEdit,
//     onDelete,
//     onPinNote
// }) => {
//     return (
//         <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
//             <div className="flex items-center justify-between ">
//                 <div >
//                     <h6 className="text-sm font-medium">{title}</h6>
//                     <span className="text-xs text-slate-500">{date}</span>
//                 </div>

//                 <MdOutlinePushPin className={`text-xl text-slate-300 cursor-pointer hover:text-blue-600 ${isPinned ? 'text-primary' : text - slate - 300} `} onClick={onPinNote} />
//             </div>

//             <p className="text--xs text-slate-600 mt-2">{content?.slice(0, 80)}</p>

//             <div className=" flex items-center justify-between mt-2">
//                 <div className="text-xs text-slate-500 ">{tags}</div>

//                 <div className="flex items-center gap-2">
//                     <MdCreate
//                      className=""
//                      onClick={onEdit}
//                     />
//                     <MdDelete
//                      className=""
//                      onClick={onDelete}
//                      />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default NoteCard


// import React from "react";
// import { MdOutlinePushPin } from "react-icons/md"
// import { MdCreate, MdDelete } from "react-icons/md"
// import moment from "moment"

// const NoteCard = ({
//     title,
//     date,
//     content,
//     tags,
//     isPinned,
//     onEdit,
//     onDelete,
//     onPinNote
// }) => {
//     return (
//         <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 ease-in-out">
//             <div className="flex items-start justify-between mb-2">
//                 <div >
//                     <h6 className="text-base font-semibold text-gray-800 leading-tight">{title}</h6>
//                     <span className="text-xs text-slate-500 font-light">{moment(date).format("Do MMM YYYY")}</span>
//                 </div>
 
//                 <MdOutlinePushPin
//                     className={`text-xl cursor-pointer transition-colors duration-200 ease-in-out ${isPinned ? 'text-blue-600' : 'text-slate-400 hover:text-blue-500'}`}
//                     onClick={onPinNote}
//                 />
//             </div>

//             <p className="text-sm text-slate-700 mt-3 mb-4 leading-relaxed">{content?.slice(0, 120)}{content.length > 120 ? "..." : ""}</p> {/* Increased content limit and added ellipsis */}

//             <div className="flex items-center justify-between mt-4">
//                 {tags && tags.length > 0 && (  
//                     <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium">
//                         {tags.map((tag, index) => (
//                             <span key={index} className="mr-1">#{tag}</span>
//                         ))}
//                     </div>
//                 )}
//                 {!tags || tags.length === 0 && (
//                     <div className="text-xs text-slate-500">No tags</div>
//                 )}


//                 <div className="flex items-center gap-2">
//                     <MdCreate
//                         className="text-base text-slate-500 cursor-pointer hover:text-green-600 transition-colors duration-200"
//                         onClick={onEdit}
//                     />
//                     <MdDelete
//                         className="text-base text-slate-500 cursor-pointer hover:text-red-600 transition-colors duration-200"
//                         onClick={onDelete}
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default NoteCard

// gemini start

import React from "react";
import { MdOutlinePushPin } from "react-icons/md"; // Pin icon
import { MdCreate, MdDelete } from "react-icons/md"; // Edit and Delete icons
import moment from "moment"; // For date formatting

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote
}) => {
    return (
        <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 ease-in-out">
            <div className="flex items-start justify-between mb-2">
                <div>
                    {/* Note Title */}
                    <h6 className="text-base font-semibold text-gray-800 leading-tight mb-1">{title}</h6>
                    {/* Note Creation Date */}
                    <span className="text-xs text-slate-500 font-light">
                        {moment(date).format("Do MMM YYYY")} {/* Formatted date */}
                    </span>
                </div>

                {/* Pin Icon */}
                <MdOutlinePushPin
                    className={`text-xl cursor-pointer transition-colors duration-200 ease-in-out 
                                ${isPinned ? 'text-blue-600' : 'text-slate-400 hover:text-blue-500'}`}
                    onClick={onPinNote}
                    aria-label={isPinned ? "Unpin note" : "Pin note"} // Accessibility improvement
                />
            </div>

            {/* Note Content - truncated if too long */}
            <p className="text-sm text-slate-700 mt-3 mb-4 leading-relaxed">
                {content?.slice(0, 120)}{content && content.length > 120 ? "..." : ""}
            </p>

            <div className="flex items-center justify-between mt-4">
                {/* Display Tags if available */}
                {tags && tags.length > 0 ? (
                    <div className="flex flex-wrap gap-x-2 text-xs text-blue-600"> {/* Use flex-wrap for multiple tags */}
                        {tags.map((tag, index) => (
                            <span key={index} className="bg-blue-50 px-2 py-1 rounded-full font-medium mb-1">
                                #{tag}
                            </span>
                        ))}
                    </div>
                ) : (
                    // Display "No tags" if no tags are present
                    <div className="text-xs text-slate-500">No tags</div>
                )}


                {/* Edit and Delete Action Buttons */}
                <div className="flex items-center gap-2">
                    <MdCreate
                        className="text-base text-slate-500 cursor-pointer hover:text-green-600 transition-colors duration-200"
                        onClick={onEdit}
                        aria-label="Edit note" // Accessibility improvement
                    />
                    <MdDelete
                        className="text-base text-slate-500 cursor-pointer hover:text-red-600 transition-colors duration-200"
                        onClick={onDelete}
                        aria-label="Delete note" // Accessibility improvement
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
