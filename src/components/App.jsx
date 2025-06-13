import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ import these

function App() {
  const [notes, setNotes] = useState([]);
  const API = "https://notesapp-backend-50tc.onrender.com";
  const location = useLocation(); // ✅ get router location
  const navigate = useNavigate(); // ✅ for clearing state

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(`${API}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  useEffect(() => {
    fetchNotes();

    // ✅ clear the refresh flag so useEffect doesn't run again unnecessarily
    if (location.state?.refresh) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]); // ✅ run effect again if login triggered refresh

  // (Your addNote, deleteNote, handleEditNote stay unchanged...)

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => (
        <Note
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          onEdit={handleEditNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;

