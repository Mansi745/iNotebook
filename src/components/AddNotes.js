import React, { useContext,useState } from 'react'
import noteContext from "../context/notes/noteContext"

function AddNotes(props) {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note,setNotes] = useState({title:"",description:"",tag:"default"})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        props.showAlert("Note Added Successfully", "success")
    }

    const onChange = (e)=>{
        setNotes({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className="container my-3">
      <h1>Add a Notes</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
            <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
        </div>
         <div className="mb-3">
          <label htmlFor="Tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
        </div>
       
        <button disabled={note.title.length<5 || note.description.length<5 || note.tag.length<2} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
      </div>
  )
}

export default AddNotes