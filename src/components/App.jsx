import React, { useState,useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {useLocation}from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  const [notes, setNotes] = useState([]);
const navigate = useNavigate(); 
  const API = "https://notesapp-backend-50tc.onrender.com";
  const location=useLocation();

   const fetchNotes=async()=>{
      const token =localStorage.getItem("token");
      if(!token)return;
      try{
        const res=await axios.get(`${API}/api/notes`,{
          headers:{Authorization:`Bearer ${token}`},
        });
        setNotes(res.data);
      }catch(err){
        console.error("Error fetching notes",err);;
      }
    };

 useEffect(() => {
    fetchNotes();
    if (location.state?.refresh) {
      navigate(location.pathname, { replace: true, state: {} }); // ✅ clear refresh state
    }
  }, [location.state]);


  async function addNote(newNote) {
    const token = localStorage.getItem("token");

     try {
      const res = await axios.post(`${API}/api/notes`, newNote, {
        headers: { Authorization: `Bearer ${token}` },
      });
    setNotes((prevNotes) => [...prevNotes, res.data]);
  }catch(err){
     console.error("Error creating note", err);
  }
}

  async function deleteNote(id) {
     const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    setNotes((prevNotes) => prevNotes.filter((note)=>note.id!==id));
  }catch(err){
    console.error("Error deleting Note",err)
  }
}

function handleEditNote(id,updatedNote){
   const token = localStorage.getItem("token");
    
  return axios.put(`${API}/api/notes/${id}`,updatedNote,{
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((res)=>{
        console.log("Note updated",res.data);
        setNotes((prev)=>
      prev.map((note)=>
        note.id === id?{...note,...updatedNote}:note
       ))
      })
    .catch((err)=>{
    console.error("Error Updating Note",err);

  });
}

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={handleEditNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
