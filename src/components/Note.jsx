import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

function Note(props) {
   
  const[isEditing,setEditing]=useState(false);
  const[updatedNote,setUpdatedNote]=useState({
    
      title:props.title,
      content:props.content,
    }
  );

  function handleEdit(event){
    const{name,value}=event.target;
      setUpdatedNote((prev)=>({
          ...prev,
          [name]:value
      }));
  }

  function handleSave(){
     props.onEdit(props.id,updatedNote);
  
    setEditing(false);
    
  }



  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      {isEditing?(
        <>
      <input type="text" name="title" value={updatedNote.title} onChange={handleEdit}/>
      <textarea name="content" value={updatedNote.content} onChange={handleEdit}></textarea>
      </>
      ):
      <>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      </>}
      
    
      
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
       {isEditing ? (
        <button onClick={handleSave}>
          <SaveIcon />
        </button>
      ) : (
        <button onClick={() => setEditing(true)}>
          <EditIcon />
        </button>
      )}
    </div>
  );
}

export default Note;
