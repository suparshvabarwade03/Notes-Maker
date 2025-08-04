// import React, { useState } from "react";
// import { MdAdd ,MdClose } from "react-icons/md";

// const TagInput =({tags,setTags})=>{
//     const [inputValue,setInputValue]=useState("")

//     const handleInputChange =(e)=>{
//         setInputValue(e.target.value)
//     }

//     const addNewTag =(e)=>{
//         if (inputValue.trim()!=="") {
//             setTags([...tags,inputValue.trim()])
//             setInputValue("")
//         }
//     }

//     const handleKeyDown =(e)=>{
//         if (e.key === "Enter") {
//             addNewTag()
//         }
//     }

//     const handleRemoveTag =(tagToRemove)=>{
//         setTags(tags.filter((tag)=> tag !== tagToRemove))
//     }

//     return (
//         <div>
//             { tags?.length > 0 && (
//                 <div className="flex items-center gap-2 flex-wrap mt-2">
//                   {tags.map((tag,index)=>(
//                     <span key={index} className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded">
//                         # {tag}
//                         <button onClick={()=>{ handleRemoveTag(tag)}}>
//                             <MdClose />
//                         </button>
//                     </span>
//                   ))
//                   } 
//                 </div> 
//             )}
//             <div className="flex items-center gap-4 mt-3">
//                 <input 
//                 type="text" 
//                 value={inputValue}
//                 placeholder="Add Tags"
//                 className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
//                 onChange={handleInputChange}
//                 onKeyDown={handleKeyDown}
//                 />
//                 <button 
//                 className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
//                 onChange={ ()=>{ addNewTag() } }
//                 >
//                     <MdAdd className="text-2xl text-blue-700 hover:text-white"/>
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default TagInput


// gemini start

import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState("");

    // Handles changes in the tag input field
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Adds a new tag to the list
    const addNewTag = () => {
        // Trim whitespace from the input value
        const trimmedInputValue = inputValue.trim();
        // Check if input is not empty and tag doesn't already exist
        if (trimmedInputValue !== "" && !tags.includes(trimmedInputValue)) {
            setTags([...tags, trimmedInputValue]); // Add new tag to the array
            setInputValue(""); // Clear the input field
        }
    };

    // Handles key presses in the input field, specifically for 'Enter'
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent default form submission if inside a form
            addNewTag();
        }
    };

    // Removes a tag from the list
    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove)); // Filter out the tag to be removed
    };

    return (
        <div>
            {/* Display existing tags if any */}
            {tags?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-2 mb-4"> {/* Added margin-bottom for spacing */}
                    {tags.map((tag, index) => (
                        <span
                            key={index} // Using index as key is generally discouraged if items can be reordered/deleted, but acceptable for static lists. Consider a unique ID if tags were objects.
                            className="flex items-center gap-2 text-sm text-gray-800 bg-blue-100 px-3 py-1.5 rounded-full shadow-sm" // Slightly more prominent tag style
                        >
                            <span className="font-medium"># {tag}</span>
                            <button
                                onClick={() => {
                                    handleRemoveTag(tag);
                                }}
                                className="text-gray-500 hover:text-red-500 transition-colors duration-200" // Hover effect for close button
                                aria-label={`Remove tag ${tag}`} // Accessibility improvement
                            >
                                <MdClose className="text-base" /> {/* Consistent icon size */}
                            </button>
                        </span>
                    ))}
                </div>
            )}
            {/* Input field for adding new tags */}
            <div className="flex items-center gap-3"> {/* Slightly reduced gap for a tighter look */}
                <input
                    type="text"
                    value={inputValue}
                    placeholder="Add Tags (Press Enter to add)" // More descriptive placeholder
                    className="flex-1 text-sm bg-white border border-gray-300 px-4 py-2 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" // Enhanced input field styling
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                {/* Button to add a new tag */}
                <button
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" // Styled button
                    onClick={addNewTag}
                    aria-label="Add tag" // Accessibility improvement
                >
                    <MdAdd className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default TagInput;
