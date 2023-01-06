import { useState } from "react";

function EditNote(props) {
    const [item, onEdit] = props;
    const [description, setDescription] = useState(item.description);
    const [subject, setSubject] = useState(item.subject);
    const [tag, setTag] = useState(item.tag);
    let date = new Date().toJSON();
    
    const editNote = () => {
        onEdit(item.id, {
            description,
            subject,
            date,
            tag
        })
    }
    return (
        <div className="note">
            <div className="note-header">
                <div className="description">
                    <textarea rows="12" value={description} onChange={(evt) => setDescription(evt.target.value)}></textarea>
                </div>
            </div>
            <div className="note-footer">
                <textarea rows="1" value={subject} onChange={(evt) => setSubject(evt.target.value)}></textarea>
                <button className="save-button" onClick={editNote}>Save</button>
            </div>
        </div>
    )
}

export default EditNote;