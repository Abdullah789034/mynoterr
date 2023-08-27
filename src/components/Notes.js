import React, { useEffect, useRef , useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'



const Notes = () => {
  const context = useContext(noteContext)
  const { notes, getNotes , editNote } = context;
  useEffect(() => {
    getNotes();
  }, [])

  const[note,setNote]=useState({id:"", etitle:"",edescription:"",etag:""})

const onChange =(e) =>{
  setNote({...note,[e.target.name]:e.target.value}) 
  }
  const handleClick =(e)=>{
    console.log("updatng", note);
    editNote(note.id , note.etitle, note.edescription, note.etag)
    ref2.current.click();
  }

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({ id:currentnote._id ,etitle:currentnote.title, edescription:currentnote.description  , etag: currentnote.tag })


  }
  const ref = useRef(null)
  const ref2 = useRef(null)
  return (
    <>
      <div>
        <AddNote />
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={ref2} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
              </div>
            </div>
          </div>
        </div>

        <div className='row my-3'>

          <h1>Your Notes</h1>
          {notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes
