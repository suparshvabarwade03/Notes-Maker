// import React, { useState } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import NoteCard from "../../components/Card/NoteCard";
// import { MdAdd } from "react-icons/md";
// import AddEditNotes from "./AddEditNotes";
// import Modal from "react-modal";

// const Home = () =>{

//     const [openAddEditModal,setOpenAddEditModal] = useState({
//         isShown :false,
//         type: "add",
//         data:null ,
//     })

//     return(
//         <> 
//             <Navbar />

//             <div className="container mx-auto">
//             <div className="grid grid-cols-2 gap-4 mt-8">   
//                 <NoteCard 
//                 title="Suparshva Barwade" 
//                 date="3rd May 2025"
//                 content="Learn Web development and become a Expert in it " 
//                 tags="#Developer"
//                 isPinned={true}
//                 onEdit={()=>{}}
//                 onPinNote={()=>{}}
//                 onDelete={()=>{}}
//                 />
//             </div>
//             </div>

//         <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-amber-400 hover:bg-amber-600 absolute right-10 bottom-10" onClick={()=>{ setOpenAddEditModal({isShown:true ,type:"add",data:null}) }}>
//             <MdAdd className="text-[32px] text-white"/>
//         </button>

//         <Modal
//             isOpen={openAddEditModal.isShown}
//             onRequestClose={()=>{}}
//             style={{
//                 overlay:{
//                     backgroundColor:"rgba(0,0,0,0.2)",
//                 },
//             }}
//             contentLabel=""
//             className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll "
//         > 
//             <AddEditNotes 
//              type={openAddEditModal.type}
//              noteData={openAddEditModal.data}
//              onClose={ ()=>{
//                 setOpenAddEditModal({isShown:false ,type:"add",data:null})
//              }}
//             />
//         </Modal>

//         </>
//     )
// }

// export default Home

// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import NoteCard from "../../components/Card/NoteCard";
// import { MdAdd } from "react-icons/md";
// import AddEditNotes from "./AddEditNotes";
// import Modal from "react-modal";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import moment from "moment"
// import Toast from "../../components/ToastMessage/Toast";
// import EmptyCard from "../../components/EmptyCard/EmptyCard";
// import addNoteImg from "../../assets/images.png"


// const Home = () => {
//     const [openAddEditModal, setOpenAddEditModal] = useState({
//         isShown: false,
//         type: "add",
//         data: null,
//     });

//     const [userInfo, setUserInfo] = useState(null);
//     const [allNotes, setAllNotes] = useState([]);

//     const [isSearch, setIsSearch] = useState(false);
    
//     const navigate = useNavigate()

//     const [showToastMsg,setShowToastMsg] = useState({ isShown:false, message : "" ,type:"add"})

//     const handleEdit = (noteDetails) => {
//         setOpenAddEditModal({ isShown : true , data : noteDetails ,type:"edit" })
//     }

//     const showToastMessage=( message ,type )=>{
//         setShowToastMsg({ isShown:true, message ,type })
//     }

//     const handleCloseToast=()=>{
//         setShowToastMsg({ isShown:false, message : ""  })
//     }

//     // get user info
//     // const getUserInfo = async () => {
//     //     try {
//     //         const response = await axiosInstance.get("/current-user");
//     //         if (response.data && response.data.user) {
//     //             setUserInfo(response.data.user)
//     //         }
//     //     } catch (error) {
//     //         console.log("Error occurs")
//     //         if (error.response.status === 401) {
//     //             localStorage.clear()
//     //             navigate("/login")
//     //         }
//     //     }
//     // };  

//     const getUserInfo = async () => {   
//         try {
//             const response = await axiosInstance.get("/current-user")
//             if (response.data && response.data.user) {
//                 setUserInfo(response.data.user)
//             }
//         } catch (error) {
//             // if (error.response.status === 401) {
//             //     localStorage.clear()
//             //     navigate("/login")
//             // }
//         }
//     }
//     const getAllNotes = async () => {
//         try {
//             const response = await axiosInstance.get("/get-all-note")

//             if (response.data && response.data.notes) {
//                 setAllNotes(response.data.notes)
//             }
//         } catch (error) {
//             console.log("An unexpected error occured  ");
//         }
//     }

//     // delete note
//     const deleteNote = async (data) => {
//         const noteId = data._id
//          try {
//           const response = await axiosInstance.delete("/delete-note/"+noteId);
           
//           if (response.data && !response.data.error) {
//              showToastMessage("Note Deleted Successfully")
//             getAllNotes()
             
//           }
//         } catch (err) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 console.log("An Unexpected Error Occurred");
                
//             }
//         }
//     }

//     // search query
//     const onSearchNote = async (query)=>{
//         try {
//             const response = await axiosInstance.get("/search-notes",{
//                 params:{query},
//             })

//             if(response.data && response.data.notes){
//                 setIsSearch(true)
//                 setAllNotes(response.data.notes)
//             }

//         } catch (error) {
//             console.log(error);
            
//         }
//     }

//     const updateIsPinned =async(noteData)=>{
//         const noteId = noteData._id
//          try {
//           const response = await axiosInstance.put("/update-note-pinned/"+noteId, { isPinned: !noteData.isPinned });
           
//           if (response.data && response.data.note) {
//              showToastMessage("Note Updated Successfully")
//             getAllNotes()
             
//           }
//         } catch (err) {
//            console.log(error);
           
//         }
//     }

//     const handleClearSearch = () =>{
//          setIsSearch(false)
//          getAllNotes()
//     }

//     useEffect(() => {
//         getUserInfo();
//         getAllNotes();
//     }, [])

//     return (
//         <>
//             <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />


//             <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">

//                  { allNotes.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
//                     {allNotes.map((note, index) => (
//                         <NoteCard
//                             key={note._id}
//                             title={note.title}
//                             date={note.createdOn}
//                             content={note.content}
//                             tags={note.tags}  
//                             isPinned={note.isPinned}
//                             onEdit={() => handleEdit(note)}
//                             onPinNote={() => updateIsPinned(note)}
//                             onDelete={() =>deleteNote(note)}
//                         />
//                     ))}
//                 </div> ) : (
//                   <EmptyCard  imgSrc={addNoteImg} message={isSearch ? `Oops! No Note Found`:`Start Creating Your Notes`}/>
//                 )}
//             </div>

             
//             <button
//                 className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 ease-in-out absolute right-6 bottom-6 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 onClick={() => { setOpenAddEditModal({ isShown: true, type: "add", data: null }); }}
//             >
//                 <MdAdd className="text-[32px] text-white" />
//             </button>

           
//             <Modal
//                 isOpen={openAddEditModal.isShown}
//                 onRequestClose={() => {
//                     setOpenAddEditModal({ isShown: false, type: "add", data: null });
//                 }}
//                 style={{
//                     overlay: {
//                         backgroundColor: "rgba(0,0,0,0.4)", // Darker overlay
//                         zIndex: 1000, // Ensure it's above other content
//                     },
//                     content: {
//                         top: '50%',
//                         left: '50%',
//                         right: 'auto',
//                         bottom: 'auto',
//                         marginRight: '-50%',
//                         transform: 'translate(-50%, -50%)',
//                         width: '90%', // Responsive width
//                         maxWidth: '600px', // Max width for larger screens
//                         maxHeight: '80vh', // Max height for scrolling
//                         backgroundColor: 'white',
//                         borderRadius: '12px', // More rounded corners
//                         padding: '30px', // Increased padding
//                         overflow: 'auto', // Enable scrolling if content overflows
//                         boxShadow: '0 10px 25px rgba(0,0,0,0.1)', // Subtle shadow
//                         border: 'none', // Remove default border
//                     },
//                 }}
//                 contentLabel={openAddEditModal.type === "add" ? "Add New Note" : "Edit Note"}
//             >
//                 <AddEditNotes
//                     type={openAddEditModal.type}
//                     noteData={openAddEditModal.data}
//                     onClose={() => {
//                         setOpenAddEditModal({ isShown: false, type: "add", data: null });
//                     }}
//                     getAllNotes={getAllNotes}
//                     showToastMessage={showToastMessage}
//                 />
//             </Modal> 

//             <Toast 
//                 isShown={showToastMsg.isShown}
//                 message={showToastMsg.message}
//                 type={showToastMsg.type}
//                 onClose={handleCloseToast}
//             /> 
            
             
//         </>
//     );
// };

// export default Home;

// gemini start 

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Card/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment"; // Ensure moment is installed: npm install moment
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import addNoteImg from "../../assets/images.png"; // Ensure this path is correct and image exists

// Set app element for react-modal to avoid accessibility warnings
// This should ideally be called once in your main entry file (e.g., index.jsx or main.jsx)
// but placing it here for completeness if this is the only file using Modal directly.
Modal.setAppElement('#root'); // Assuming your root element in index.html is <div id="root"></div>

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    const navigate = useNavigate();

    const [showToastMsg, setShowToastMsg] = useState({ isShown: false, message: "", type: "add" });

    // Function to handle opening the edit modal with note data
    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
    };

    // Function to display a toast message
    const showToastMessage = (message, type = "add") => {
        setShowToastMsg({ isShown: true, message, type });
    };

    // Function to close the toast message
    const handleCloseToast = () => {
        setShowToastMsg({ isShown: false, message: "" });
    };

    // Get user information
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/current-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            console.error("Error fetching user info:", error); // Log the full error
            // If the token is invalid or expired (401 Unauthorized), clear local storage and redirect to login
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            } else {
                // Handle other potential errors, e.g., show a generic error message
                showToastMessage("Failed to load user info.", "error");
            }
        }
    };

    // Get all notes for the current user
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/get-all-note");

            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.error("Error fetching all notes:", error); // Log the full error
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            } else {
                showToastMessage("Failed to load notes.", "error");
            }
        }
    };

    // Delete a note
    const deleteNote = async (data) => {
        const noteId = data._id;
        try {
            const response = await axiosInstance.delete("/delete-note/" + noteId);

            if (response.data && !response.data.error) {
                showToastMessage("Note Deleted Successfully", "delete"); // Specify type for delete
                getAllNotes(); // Refresh notes after deletion
            } else if (response.data && response.data.error) {
                showToastMessage(response.data.message, "error"); // Show specific backend error
            }
        } catch (error) { // Changed 'err' to 'error' for consistency
            console.error("Error deleting note:", error); // Log the full error
            if (error.response && error.response.status === 401) { // Handle 401 specifically
                localStorage.clear();
                navigate("/login");
            } else if (error.response && error.response.data && error.response.data.message) {
                showToastMessage(error.response.data.message, "error");
            } else {
                showToastMessage("An unexpected error occurred during deletion.", "error");
            }
        }
    };

    // Search for notes
    const onSearchNote = async (query) => {
        try {
            const response = await axiosInstance.get("/search-notes", {
                params: { query },
            });

            if (response.data && response.data.notes) {
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.error("Error searching notes:", error); // Log the full error
            if (error.response && error.response.status === 401) { // Handle 401 specifically
                localStorage.clear();
                navigate("/login");
            } else {
                showToastMessage("Failed to search notes.", "error");
            }
        }
    };

    // Update note pinned status
    const updateIsPinned = async (noteData) => {
        const noteId = noteData._id;
        try {
            const response = await axiosInstance.put("/update-note-pinned/" + noteId, { isPinned: !noteData.isPinned });

            if (response.data && response.data.note) {
                showToastMessage("Note Pinned Status Updated", "edit"); // Specify type for edit
                getAllNotes(); // Refresh notes after update
            } else if (response.data && response.data.error) {
                showToastMessage(response.data.message, "error"); // Show specific backend error
            }
        } catch (error) { // Changed 'err' to 'error' for consistency
            console.error("Error updating pin status:", error); // Log the full error
            if (error.response && error.response.status === 401) { // Handle 401 specifically
                localStorage.clear();
                navigate("/login");
            } else if (error.response && error.response.data && error.response.data.message) {
                showToastMessage(error.response.data.message, "error");
            } else {
                showToastMessage("An unexpected error occurred while updating pin status.", "error");
            }
        }
    };

    // Clear search and fetch all notes
    const handleClearSearch = () => {
        setIsSearch(false);
        getAllNotes();
    };

    // Fetch user info and all notes on component mount
    useEffect(() => {
        getUserInfo();
        getAllNotes();
    }, []); // Empty dependency array means this runs once on mount

    // Image for EmptyCard (replace with a proper base64 or hosted image if needed)
    // You had this defined in the consolidated HTML, but it's better to define it here or import it.
    // const addNoteImg = "https://placehold.co/240x240/E0E7FF/4F46E5?text=No+Notes";


    return (
        <>
            {/* Navbar component, passing user info and search handlers */}
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Conditional rendering for notes list or empty card */}
                {allNotes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                        {allNotes.map((note) => (
                            <NoteCard
                                key={note._id}
                                title={note.title}
                                date={moment(note.createdOn).format("Do MMM YYYY")} // Format date using moment
                                content={note.content}
                                tags={note.tags}
                                isPinned={note.isPinned}
                                onEdit={() => handleEdit(note)}
                                onPinNote={() => updateIsPinned(note)}
                                onDelete={() => deleteNote(note)}
                            />
                        ))}
                    </div>
                ) : (
                    // Display EmptyCard if no notes are found
                    <EmptyCard
                        imgSrc={addNoteImg}
                        message={isSearch ? `Oops! No Notes Found Matching Your Search.` : `Start Creating Your First Note! Click the Add button to begin.`}
                    />
                )}
            </div>

            {/* Floating Action Button to add new notes */}
            <button
                className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 ease-in-out absolute right-6 bottom-6 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => { setOpenAddEditModal({ isShown: true, type: "add", data: null }); }}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            {/* Modal for adding/editing notes */}
            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {
                    setOpenAddEditModal({ isShown: false, type: "add", data: null });
                }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        zIndex: 1000,
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: '600px',
                        maxHeight: '80vh',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '30px',
                        overflow: 'auto',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        border: 'none',
                    },
                }}
                contentLabel={openAddEditModal.type === "add" ? "Add New Note" : "Edit Note"}
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: "add", data: null });
                    }}
                    getAllNotes={getAllNotes} // Pass function to refresh notes after add/edit
                    showToastMessage={showToastMessage} // Pass function to show toast messages
                />
            </Modal>

            {/* Toast message component */}
            <Toast
                isShown={showToastMsg.isShown}
                message={showToastMsg.message}
                type={showToastMsg.type}
                onClose={handleCloseToast}
            />
        </>
    );
};

export default Home;
