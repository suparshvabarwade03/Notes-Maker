// import React, { useState } from "react";
// import TagInput from "../../components/Input/TagInput";
// import { MdClose } from "react-icons/md";

// const AddEditNotes = ({ noteData,type,onClose}) => {

//     const [title, setTitle] = useState("")
//     const [content, setContent] = useState("")
//     const [tags, setTags] = useState([])
//     const [error, setError] = useState(null)

//     // add note
//     const addNewNote=async()=>{
        
//     }

//     // edit note
//     const editNote=async()=>{

//     }

//     const handleAddNote=()=>{
//         if (!title) {
//            setError("Please Enter Title")
//            return
//         }
//         if (!content) {
//            setError("Please Enter Content")
//            return
//         }
//         setError("")

//         if (type === "edit") {
//             editNote()
//         }
//         else{
//             addNewNote()
//         }
//     }

//     return (
//         <div className="relative ">
//             <button
//                 className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
//                 onClick={onClose}
//             >
//                 <MdClose className="text-xl text-slate-400" />
//             </button>

             
//                 <div className="flex flex-col gap-2">
//                     <label className="input-label">Title</label>
//                     <input
//                         type="text"
//                         className="text-2xl text-slate-950 outline-none"
//                         placeholder="Enter Title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                 </div>
//                 <div className="flex flex-col gap-2 mt-4">
//                     <label className="input-label">Content</label>
//                     <textarea
//                         type="text"
//                         className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
//                         placeholder="Enter Content"
//                         rows={10}
//                         value={content}
//                         onChange={(e) => setContent(e.target.value)}
//                     />
//                 </div>
//                 <div className="mt-2 flex flex-col gap-2">
//                     <label className="input-label">TAGS</label>
//                     <TagInput tags={tags} setTags={setTags} />
//                 </div>
                
//                 {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

//                 <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>ADD</button>
//             </div>
         
//     )
// }
// export default AddEditNotes

import React, { useState, useEffect } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({showToastMessage, noteData, type,getAllNotes, onClose }) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);
 
    
    // add note
    const addNewNote = async () => {
 
        try {
          const response = await axiosInstance.post("/add-note", { title, content, tags });
           
          if (response.data && response.data.note) {
            showToastMessage("Note Added Successfully")
            getAllNotes()
            onClose()
          }
        } catch (err) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    };

    // edit note
    const editNote = async () => {
        const noteId = noteData._id
         try {
          const response = await axiosInstance.put("/edit-note/"+noteId, { title, content, tags });
           
          if (response.data && response.data.note) {
             showToastMessage("Note Updated Successfully")
            getAllNotes()
            onClose()
          }
        } catch (err) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    };

    const handleAddEditNote = () => { // Renamed to be more generic
        if (!title.trim()) { // Use .trim() for validation
            setError("Please enter a title.");
            return;
        }
        if (!content.trim()) { // Use .trim() for validation
            setError("Please enter content.");
            return;
        }
        setError(""); // Clear error if validation passes

        if (type === "edit") {
            editNote();
        } else {
            addNewNote();
        }
    };

    return (
        <div className="relative p-6"> {/* Increased padding for the modal content */}
            <button
                className="w-8 h-8 rounded-full flex items-center justify-center absolute -top-4 -right-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300" // Styled close button
                onClick={onClose}
            >
                <MdClose className="text-xl text-gray-600 hover:text-gray-800" /> {/* Darker icon with hover */}
            </button>

            <div className="flex flex-col gap-4 mb-5">  
                <label className="text-sm font-medium text-gray-700">Title</label>  
                <input
                    type="text"
                    className="text-lg font-medium text-gray-900 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" // Styled input
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-4 mb-5"> 
                <label className="text-sm font-medium text-gray-700">Content</label>  
                <textarea
                    type="text"
                    className="text-sm text-gray-800 border border-gray-300 rounded-lg px-4 py-3 outline-none bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 resize-y min-h-[120px]" // Styled textarea, added resize and min-height
                    placeholder="Enter Content"
                    rows={8}  
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="mb-6"> {/* Added bottom margin */}
                <label className="text-sm font-medium text-gray-700">Tags</label>  
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}  
            <button
                className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" // Primary button styling
                onClick={handleAddEditNote}  
            >
                {type === "edit" ? "UPDATE" : "ADD"} 
            </button>
        </div>
    );
};
export default AddEditNotes;

