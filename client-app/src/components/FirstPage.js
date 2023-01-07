import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SERVER = 'http://localhost:8080/api';
let id_stud;

function FirstPage() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [email, setEmail] = useState('');
    const [emailExists, setEmailExists] = useState(null);
    const getStudents = async () => {
        const response = await fetch(SERVER + "/getStudents");
        const data = await response.json();
        setStudents(data);
    }

    useEffect(() => {
        getStudents()
    }, [])

    async function handleVerifyEmail() {
        const response = await fetch(`${SERVER}/getStudentByEmail/${email}`);
        const data = await response.json();
        if ( data.error ) {
            setEmailExists(false);
            return;
        } else {
            setEmailExists(true);
            id_stud = data.id;
            localStorage.setItem('id_stud', id_stud);
        }
    }

    return (
        <div>
            <div>
                <input type="text" placeholder="email" onChange={(evt) => setEmail(evt.target.value)} />
            </div>
            <div>
                <input type="button" value="Log in" onClick={handleVerifyEmail} />
                {emailExists === true && navigate(`/myPage/${id_stud}`)}
                {emailExists === false && <div>Email does not exist</div>}
            </div>
        </div>
    )
}
export default FirstPage;