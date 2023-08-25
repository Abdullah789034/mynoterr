import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [
    {
      "_id": "64c982bad22b03f80cd5b2ba",
      "user": "64c95a4c88b5d6d4f9a67750",
      "title": "My todo",
      "description": "as i have a to do list",
      "tag": "todo list",
      "date": "1690927802065",
      "__v": 0
    },
    {
      "_id": "64cbf351d0c7446ddefdb81f",
      "user": "64c95a4c88b5d6d4f9a67750",
      "title": "My todo no 3",
      "description": "as i have33 to do list no 2",
      "tag": "todo list",
      "date": "1691087697962",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial);


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


    const note = {
      "_id": "64cbf351d0c7446ddefdb81f",
      "user": "64c95a4c88b5d6d4f9a677350",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "1691087697962",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }


  //Delete
  const deleteNote = (id) => {
    console.log("del" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //Edit
  const editNote = async (id, title, description, tag) => {
    //API CALL 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjOTVhNGM4OGI1ZDZkNGY5YTY3NzUwIn0sImlhdCI6MTY5MDkyNTQ1M30.wm5qy278hHsvrZseMhzACNGZYTpQc8zTtrunHhnB4jc"
      },
      body: JSON.stringify(title,description,tag),
    });
    const json = response.json();


    for (let index = 0; index < notes.length; index++) {
      //Edit on client side
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;