import { useState } from "react";
import { MdDeleteForever, MdEditNote } from "react-icons/md";
import EditNote from "./EditNote";
import NoteForm from "./NoteForm";

const SERVER = 'http://localhost:8080/api';

function Note(props){
    const {item, onDelete, setBtn} = props;
    let {btn} = props;
    // const [description, setDescription] = useState(item.description);
    // const [subject, setSubject] = useState(item.subject);
    // const [tag, setTag] = useState(item.tag);

    const deleteNote = () => {
        onDelete(item.id);
    }

    // const editNote = () => {
    //     setIsEditing(true);
    // }

    const editNote = async (noteId, note) => {
        const response = await fetch(`${SERVER}/modifyNote/${noteId}`, {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        if (!response.ok) {
            throw response
        }
      
    }

    console.log(btn)
    return (
        <div className="note">
            <div className="note-header">
                <div className="description">
                    {item.description}
                </div>
            </div>
            <div className="note-footer">
                <small>{item.subject}</small>
                <div className="icons">
                    <MdDeleteForever onClick={deleteNote} className="delete-icon" size="1.3em" />
                    <MdEditNote onClick={() => setBtn(true)} className="edit-icon" size="1.3em"/>
                </div>
            </div>
        </div>
    ) 
}

export default Note;