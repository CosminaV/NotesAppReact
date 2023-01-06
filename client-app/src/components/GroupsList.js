import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SERVER = 'http://localhost:8080/api';

function GroupsList(props){
    const {id} = useParams();
    const {trigger, setTrigger} = props;
    const [groups, setGroups] = useState([]);

    const getMyGroups = async () => {
        const response = await fetch(`${SERVER}/students/${id}/groups`);
        if (!response.ok) {
            throw response
        }
        const data = await response.json();
        setGroups(data);
    }

    useEffect( () => {
        getMyGroups()
    }, [])

    return (trigger) ? (
        <div>
            <div className="groups-list-popup">
                <div className="popup-inner">
                    {groups.map} 
                    <button className="close-button" onClick={() => setTrigger(false)}>Close</button>
                </div>
            </div>
        </div>
    ) : ""
}

export default GroupsList;