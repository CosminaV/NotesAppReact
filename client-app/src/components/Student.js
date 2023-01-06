
function Student(props) {
    const {item} = props;
    return (
        <div className="student">
            <div className="student-header">
                {item.nume}
            </div>
            <div className="student-footer">
                <button className="see-notes-button">See notes</button>
            </div>
        </div>
    )
}

export default Student;