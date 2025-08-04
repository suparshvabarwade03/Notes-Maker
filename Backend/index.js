// require("dotenv").config()

// const config =require("./config.json")
// const mongoose = require("mongoose")

// mongoose.connect(config.connectionString).then(()=>console.log("DB CONNECTED")
// ).catch(err => console.error(err))

// const User = require("./models/user.model")
// const Note = require("./models/note.model")


// const express = require("express");
// const cors=require("cors")
// const app = express() 

// const jwt = require("jsonwebtoken")
// const { authenticateToken } = require("./utilities")

// app.use(express.json())

// app.use(
//     cors({
//         origin:"*",
//     })
// );

// app.get("/",(req,res)=>{
//     res.send("Sample")
// })

// // create Account 
// app.post("/create-account",async(req,res)=>{
//     const {fullName,email,password} =req.body;

//     if(!fullName){
//         return res.status(400).json({error:true,message:"full Name is required"})
//     }
//     if(!email){
//         return res.status(400).json({error:true,message:"email is required"})
//     }
//     if(!password){
//         return res.status(400).json({error:true,message:"password is required"})
//     }

//     const isUser =await User.findOne({email})

//     if(isUser){
//         return res.json({ error:true , message:"User already exists"})
//     }

//     const user = new User({
//         fullName,
//         email,
//         password
//     })

//     await user.save()

//     const accessToken = jwt.sign({user},process.env.ACCESS_TOKEN_SECRET ,{expiresIn:"1d"})

//      return res.json({
//         error:false,
//         user,
//         accessToken,
//         message:"Registration successfull"
//      })
// })

// app.post("/login",async(req,res)=>{

//      const {email,password} =req.body;

//     if(!email){
//         return res.status(400).json({message:"email is required"})
//     }
//     if(!password){
//         return res.status(400).json({message:"password is required"})
//     }

//     const userInfo =await User.findOne({email:email})
//     if(!userInfo){
//         return res.status(400).json({message:"User not found"})
//     }

//     if(userInfo.email == email && userInfo.password == password ){
//         const user ={user:userInfo}
//         const accessToken= jwt.sign({user},process.env.ACCESS_TOKEN_SECRET ,{expiresIn:"1d"})

//         return res.json({error:false,message:"Login Successfull ",email,accessToken})
//     }else{
//         return res.json({error:true,message:"Invalid Credentials"})
//     }


// })

// app.get("/current-user",authenticateToken,async (req,res) => {
    
//     const {user}=req.user
//     const isUser = await User.findOne({_id:user._id})
     

//     if(!isUser){
//         return res.sendStatus(401).json({message:"User not found in db or unauthorized"})
//     }

//     return res.json({
//         message:"",
//         user:{ fullName:isUser.fullName, email: isUser.email, "_id":isUser._id, createdOn:isUser.createdOn }
//     })
// })

// app.post("/add-note",authenticateToken,async (req,res) => {
//      const {title,content,tags}=req.body
//      const {user} = req.user

//      if(!title){
//         return res.status(400).json({error:true,message:"title is required"})
//     }
//     if(!content){
//         return res.status(400).json({error:true,message:"content is required"})
//     }
 
//     try {
//         const note = new Note({
//             title,content,tags:tags || [],userId:user._id
//         })
//         await note.save()
        
//         return res.json({error:false,note,message:"Note added successfully"})

//     } catch (error) {
//         return res.status(500).json({error:true,message:"Internal Server Error"})
//     }
// })

// app.put("/edit-note/:noteId",authenticateToken,async (req,res) => {

//      const noteId =req.params.noteId;
//      const {title,content,tags,isPinned}=req.body
//      const {user} = req.user

//      if(!title && !content){
//         return res.status(400).json({error:true,message:"No changes provided"})
//     }
//      try {
//         const note = await Note.findOne({_id:noteId ,userId:user._id})

//         if(!note){
//             return res.status(404).json({error:true,message:"Note not Found"})
//         }

//         if(title) note.title =title;
//         if(content) note.content =content;
//         if(tags) note.tags =tags ;
//         if(isPinned) note.isPinned =isPinned;

//         await note.save()

//         return res.json({error:false,note,message:"Note updated successfully"})

//      } catch (error) {
//         return res.status(500).json({error:true,message:"Internal Server Error"})
//      }
// })

// app.get("/get-all-note",authenticateToken,async (req,res) => {
//     const {user}=req.user

//     try{
//         const notes = await Note.find({userId:user._id}).sort({isPinned:-1})
         
//         return res.json({error:false,notes,message:"All Notes retrived successfully"})
//     }catch (error) {
//         return res.status(500).json({error:true,message:"Internal Server Error"})
//      }
// })

// app.delete("/delete-note/:noteId",authenticateToken,async(req,res) => {
//     const noteId = req.params.noteId
//     const {user}=req.user

//     try{
//         const note = await Note.findOne({_id:noteId,userId:user._id}) 

//         if (!note) {
//             return res.status(404).json({error:true,message:"Note not Found"})
//         }
//         const deletedNote =await Note.deleteOne({_id:noteId ,userId:user._id})

//         return res.json({error:false,deletedNote,message:"Note deleted successfully"})
//     }catch (error) {
//         return res.status(500).json({error:true,message:"Internal Server Error"})
//      }

// })

// app.put("/update-note-pinned/:noteId",authenticateToken,async (req,res) => {
//       const noteId =req.params.noteId;
//      const {isPinned }=req.body
//      const {user} = req.user
 
//      try {
//         const note = await Note.findOne({_id:noteId ,userId:user._id})

//         if(!note){
//             return res.status(404).json({error:true,message:"Note not Found"})
//         }
        
//        note.isPinned =isPinned  

//         await note.save()

//         return res.json({error:false,note,message:"Note updated successfully"})

//      } catch (error) {
//         return res.status(500).json({error:true,message:"Internal Server Error"})
//      }
// })


// app.get("/search-notes",authenticateToken,async (req,res) => {
//     const {user} =req.user
//     const {query} =req.query

//     if(!query){
//         return res.status(400).json({error:true,message:"Search query is required"})
//     }
//     try {
//         const matchingNotes =await Note.find({
//             userId:user._id,
//             $or:[
//                 { title :{ $regex : new RegExp(query,"i")} },
//                 { content:{ $regex : new RegExp(query,"i")} },
//             ],
//         })
//         return res.json({
//             error:false,  
//             notes:matchingNotes,
//             message:"Notes matching search query retrived successfully"
//         })
//     } catch (error) {
//         return res.status(500).json({error:true,message:"Internal Server Error"})
//     }
    
// })


// app.listen(8000)

// module.exports =app;


// gemini start 

require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Import bcryptjs

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("DB CONNECTED"))
    .catch(err => console.error(err));

const User = require("./models/user.model");
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
    cors({
        origin: "*", // Consider restricting this in production
    })
);

app.get("/", (req, res) => {
    res.send("Sample");
});

// create Account
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({ error: true, message: "Full Name is required" });
    }
    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }

    try { // Added try-catch for async operations
        const isUser = await User.findOne({ email });

        if (isUser) {
            return res.status(409).json({ error: true, message: "User already exists" }); // Changed status to 409 Conflict
        }

        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash password

        const user = new User({
            fullName,
            email,
            password: hashedPassword // Store hashed password
        });

        await user.save();

        // Only send necessary user info in JWT
        const accessToken = jwt.sign({ _id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

        return res.status(201).json({ // Changed status to 201 Created
            error: false,
            user: { fullName: user.fullName, email: user.email, _id: user._id }, // Only send non-sensitive user info back
            accessToken,
            message: "Registration successful"
        });
    } catch (error) {
        console.error("Error creating account:", error); // Log the actual error
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try { // Added try-catch for async operations
        const userInfo = await User.findOne({ email: email });

        if (!userInfo) {
            return res.status(400).json({ message: "Invalid Credentials" }); // Generic message for security
        }

        // Compare provided password with hashed password
        const isPasswordValid = await bcrypt.compare(password, userInfo.password);

        if (isPasswordValid) {
            // Only send necessary user info in JWT
            const accessToken = jwt.sign({ _id: userInfo._id, email: userInfo.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

            return res.status(200).json({ // Changed status to 200 OK
                error: false,
                message: "Login successful",
                user: { fullName: userInfo.fullName, email: userInfo.email, _id: userInfo._id }, // Only send non-sensitive user info
                accessToken
            });
        } else {
            return res.status(400).json({ error: true, message: "Invalid Credentials" }); // Generic message for security
        }
    } catch (error) {
        console.error("Error during login:", error); // Log the actual error
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.get("/current-user", authenticateToken, async (req, res) => {
    try { // Added try-catch for async operations
        const { _id } = req.user; // Directly access _id from req.user as stored in JWT

        const isUser = await User.findOne({ _id: _id });

        if (!isUser) {
            return res.status(401).json({ message: "User not found or unauthorized" }); // Corrected status and json message
        }

        return res.status(200).json({ // Changed status to 200 OK
            user: { fullName: isUser.fullName, email: isUser.email, "_id": isUser._id, createdOn: isUser.createdOn }
        });
    } catch (error) {
        console.error("Error fetching current user:", error); // Log the actual error
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { _id } = req.user; // Use _id directly from req.user

    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }
    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required" });
    }

    try {
        const note = new Note({
            title, content, tags: tags || [], userId: _id // Use _id from req.user
        });
        await note.save();

        return res.status(201).json({ error: false, note, message: "Note added successfully" }); // Changed status to 201 Created

    } catch (error) {
        console.error("Error adding note:", error); // Log the actual error
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { _id } = req.user; // Use _id directly from req.user

    if (!title && !content && !tags && typeof isPinned === 'undefined') { // Check for any changes, including isPinned
        return res.status(400).json({ error: true, message: "No changes provided" });
    }
    try {
        const note = await Note.findOne({ _id: noteId, userId: _id }); // Use _id from req.user

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not Found" });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (typeof isPinned !== 'undefined') note.isPinned = isPinned; // Correctly handle boolean update

        await note.save();

        return res.status(200).json({ error: false, note, message: "Note updated successfully" });

    } catch (error) {
        console.error("Error editing note:", error); // Log the actual error
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.get("/get-all-note", authenticateToken, async (req, res) => {
    const { _id } = req.user; // Use _id directly from req.user

    try {
        const notes = await Note.find({ userId: _id }).sort({ isPinned: -1 }); // Use _id from req.user

        return res.status(200).json({ error: false, notes, message: "All Notes retrieved successfully" });
    } catch (error) {
        console.error("Error retrieving notes:", error); // Log the actual error
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { _id } = req.user; // Use _id directly from req.user

    try {
        // More efficient way to delete:
        const result = await Note.deleteOne({ _id: noteId, userId: _id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: true, message: "Note not found or unauthorized to delete" });
        }

        return res.status(200).json({ error: false, message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error); // Log the actual error
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body; // No need for !isPinned check here, just assign
    const { _id } = req.user; // Use _id directly from req.user

    // Ensure isPinned is a boolean if it's meant to be toggled
    if (typeof isPinned === 'undefined' || typeof isPinned !== 'boolean') {
        return res.status(400).json({ error: true, message: "isPinned (boolean) is required" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: _id }); // Use _id from req.user

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not Found" });
        }

        note.isPinned = isPinned; // Directly assign

        await note.save();

        return res.status(200).json({ error: false, note, message: "Note pinned status updated successfully" });

    } catch (error) {
        console.error("Error updating pin status:", error); // Log the actual error
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});


app.get("/search-notes", authenticateToken, async (req, res) => {
    const { _id } = req.user; // Use _id directly from req.user
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: true, message: "Search query is required" });
    }
    try {
        const matchingNotes = await Note.find({
            userId: _id, // Filter by the authenticated user's ID
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } },
            ],
        });
        return res.status(200).json({ // Changed status to 200 OK
            error: false,
            notes: matchingNotes,
            message: "Notes matching search query retrieved successfully"
        });
    } catch (error) {
        console.error("Error searching notes:", error); // Log the actual error
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

 
// const PORT = process.env.PORT || 8000;  
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

module.exports = app;
