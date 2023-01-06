import { useState, useEffect } from "react";

const SERVER = 'http://localhost:8080/api';

function StudentForm(props) {
    const {onAdd, list} = props;
    const [students, setStudents] = useState([]);
    const [nume, setNume] = useState('');
    const [id, setId] = useState(null);

    const getStudents = async () => {
        const response = await fetch(`${SERVER}/getStudents`);
        if (!response.ok) {
            throw response
        }
        const data = await response.json();
        setStudents(data);
    }
  
    const addStudent =  () => {
        onAdd( id, {
            nume
        })
    }

    useEffect( () => {
        getStudents()
    }, [])

    const isSameStudent = (a,b) => a.nume === b.nume && a.id === b.id;
    const onlyInLeft = (left, right, compareFunction) => left.filter(leftValue => !right.some(rightValue => compareFunction(leftValue, rightValue)));

    const onlyInList = onlyInLeft(list, students, isSameStudent);
    const onlyInStudents = onlyInLeft(students, list, isSameStudent);

    const studentiRamasi = [...onlyInStudents, ...onlyInList];
    //console.log(studentiRamasi);

    return (
        <div className="student form">
            <div className="student-header">
                <textarea type="text" placeholder="Search student's name:" readOnly={true}/>
                <select className="student-tag" value={nume} onChange={(evt) => {setNume(evt.target.value)
                for(let s of studentiRamasi){
                    if(s.nume === evt.target.value){
                        setId(s.id);
                    }
                }}}>
                    {
                        studentiRamasi.map((s) => <option key={s.nume} value={s.nume}>{s.nume}</option>)
                    }
                </select>
            </div>

            <div className="student-footer">
                <button className="add-student-button" onClick={addStudent}>Add</button>
            </div>
        </div>
    )
}

export default StudentForm;