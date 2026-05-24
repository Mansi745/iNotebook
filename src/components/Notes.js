import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNotes from './AddNotes';
import {useNavigate} from 'react-router-dom'

function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNote,editNote } = context;
     let navigate = useNavigate();
 useEffect(() => {
    if(!localStorage.getItem('token')){
        navigate("/login");
    }
    else{
        getNote();
        // eslint-disable-next-line
    }
}, [])
   
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note,setNotes] = useState({id:"",etitle:"",edescription:"",etag:""})
    const updateNote = (currentnote) => {
        ref.current.click()
        setNotes({id:currentnote._id,etitle:currentnote.title , edescription:currentnote.description,etag:currentnote.tag})
    }
    
        const handleClick = async (e)=>{
            console.log("updating note",note);
            editNote(note.id,note.etitle,note.edescription,note.etag)
           refClose.current.click()
           props.showAlert("Updated Successfully","success")
        }
    
        const onChange = async (e)=>{
            setNotes({...note,[e.target.name]:e.target.value})
        }
    return (
        <>
          <AddNotes showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                    <div id="emailHelp" className="form-text"></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5 || note.etag.length<2} type="button" className="btn btn-primary"onClick={handleClick} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-7">
                <h1>This is your Notes</h1>
                <div className="container mx-2">
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
                })}
            </div>
        </>

    )
}

export default Notes