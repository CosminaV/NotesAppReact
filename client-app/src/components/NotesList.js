import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Note from "./Note";
import NoteForm from "./NoteForm";
import EditNote from "./EditNote";
import Search from "./Search";
import {useNavigate} from "react-router-dom";
import GroupsList from "./GroupsList";

const SERVER = 'http://localhost:8080/api';

function NotesList() {
    const [notes, setNotes] = useState([]);
    const {id} = useParams();
    const [editNoteId, setEditNoteId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchTag, setSearchTag] = useState('');
    const navigate = useNavigate();
    const [buttonPopup, setButtonPopup] = useState(false);

    const getMyNotes = async () => {
        const response = await fetch(`${SERVER}/students/${id}/notes`);
        if (!response.ok) {
            throw response
        }
        const data = await response.json();
        setNotes(data);
    }

    const addNote = async (note) => {
        await fetch(`${SERVER}/students/${id}/note`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        getMyNotes();
    }

    // const deleteNote = async (noteId) => {
    //     await fetch(`${SERVER}/deleteNote/${noteId}`, {
    //         method: "DELETE"
    //     })
    //     getMyNotes();
    // }

    const deleteNote = async (note_id) => {
        try {
            await fetch(`${SERVER}/students/${id}/deleteNote/${note_id}`, {
                method: 'DELETE'
            })
            getMyNotes()
        } catch (err) {
           console.warn(err);
        }
    }
    
    const editNote = async (noteId, note) => {
        setEditNoteId(noteId);
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
        getMyNotes();
    }

    const searchNotes = async () => {
        const response = await fetch(`${SERVER}/students/${id}/notes/${searchText}`);
        if (!response.ok) {
            throw response
        }
        const data = await response.json();
        setNotes(data);
    }

    useEffect( () => {
        getMyNotes()
    }, [])


    return(
        <div className="notes-container">
            <Search onSearchNote={setSearchText} onSearchTag={setSearchTag}/>
            <div className="notes-list">
            {
                notes.filter((note) => {return note.description.toLowerCase().includes(searchText) && note.tag.includes(searchTag)})
                //.filter((note) => note.tag === searchTag)
                .map(e => (
                    // <Fragment>
                    //     {editNoteId === e.id ? (
                    //         <EditNote key={e.id} item={e} onEdit={editNote}/>
                    //     ) : (
                    //         <Note key={e.id} item={e} onDelete={deleteNote} />
                    //     )}
                    // </Fragment>
                    <Note key={e.id} item={e} onDelete={deleteNote} />
                ) )
            }
            <NoteForm onAdd={addNote} />
            </div>
            <button className="groups-button" onClick={() => setButtonPopup(true)} /*onClick={() => navigate(`/students/${id}/groups`) }*/>
                See your groups
            </button>
            <GroupsList trigger={buttonPopup} setTrigger={setButtonPopup}></GroupsList>
        </div>
        
    )
}

export default NotesList;