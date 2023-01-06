import { useState } from "react";
import { MdDeleteForever, MdEditNote } from "react-icons/md";
import NoteForm from "./NoteForm";
function Note(props){
    const {item, onDelete} = props;
    const [isEditing, setIsEditing] = useState(false);
    // const [description, setDescription] = useState(item.description);
    // const [subject, setSubject] = useState(item.subject);
    // const [tag, setTag] = useState(item.tag);

    const deleteNote = () => {
        onDelete(item.id);
    }

    const editNote = () => {
        setIsEditing(true);
    }

    return(
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
                    <MdEditNote onClick={editNote} className="edit-icon" size="1.3em"/>
                </div>
            </div>
        </div>
    )
}

export default Note;