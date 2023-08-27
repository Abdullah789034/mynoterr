import { useState } from "react";
import noteContext from "./noteContext";
import { json } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);
//Get all Note
const getNotes = async () => {
  //API CALL
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjOTVhNGM4OGI1ZDZkNGY5YTY3NzUwIn0sImlhdCI6MTY5MDkyNTQ1M30.wm5qy278hHsvrZseMhzACNGZYTpQc8zTtrunHhnB4jc"
    },
  });
  const json = await response.json()
  console.log(json)
  setNotes(json)

}


  //Add Note
  const addNote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjOTVhNGM4OGI1ZDZkNGY5YTY3NzUwIn0sImlhdCI6MTY5MDkyNTQ1M30.wm5qy278hHsvrZseMhzACNGZYTpQc8zTtrunHhnB4jc"
      },
      body: JSON.stringify({title,description,tag}), 
    });
    const json=response.json()
    console.log(json);
    const note = json
    setNotes(notes.concat(note))
  }


  //Delete
  const deleteNote = async(id) => {
    //API
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjOTVhNGM4OGI1ZDZkNGY5YTY3NzUwIn0sImlhdCI6MTY5MDkyNTQ1M30.wm5qy278hHsvrZseMhzACNGZYTpQc8zTtrunHhnB4jc"
      },
    });
    console.log(response.json())
    console.log("del" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //Edit
  const editNote = async (id, title, description, tag) => {
    //API CALL 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjOTVhNGM4OGI1ZDZkNGY5YTY3NzUwIn0sImlhdCI6MTY5MDkyNTQ1M30.wm5qy278hHsvrZseMhzACNGZYTpQc8zTtrunHhnB4jc"
      },
      body: JSON.stringify({title,description,tag})
    });
    const json= response.json();
    console.log(json);

    let newN=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newN.length; index++) {
      //Edit on client side
      const element = newN[index];
      if (element._id === id) {
        newN[index].title = title;
        newN[index].description = description;
        newN[index].tag = tag;
        break;

      }

    }
    setNotes(newN);
  }

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote , getNotes}}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;