import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial= [
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
      const [notes , setNotes] = useState(notesInitial);
    return (
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;