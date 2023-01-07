import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";

const SERVER = 'http://localhost:8080/api';

function FirstPage() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const getStudents = async () => {
        const response = await fetch(SERVER+"/getStudents");
        const data = await response.json();
        setStudents(data);
    }
    let id_stud;
    let email="";
    
    useEffect( () => {
        getStudents()
    }, [])

    return (
        <div>
            <div>
                <input type="text" placeholder="email" onChange={(evt) => email=evt.target.value}/>
            </div>
            <div>
                <input type="button" value="Log in" onClick={() => {
                    if(email.includes("@stud.ase.ro")){
                        students.forEach(s => {if(s.email === email){
                            id_stud=s.id;
                        }});
                        //navigate(`/students/${id_stud}/notes`);
                        navigate(`/myPage/${id_stud}`);
                    }
                    else{
                        alert("Email format is not correct! It should end with `@stud.ase.ro`.");
                    }
                }}/>
            </div>
        </div>
    )
}
 export default FirstPage;