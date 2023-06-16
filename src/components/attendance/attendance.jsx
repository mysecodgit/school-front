import axios from "axios";
import moment from "moment/moment";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

const url = "http://localhost:5000/attendance/";
const Attendance = () => {
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [input, setInput] = useState({
        classId: "",
        subjectId: "",
        attendanceDate: moment().format("YYYY-MM-DD"),
    });

    async function getSubjects() {
        const { data } = await axios.get("http://localhost:5000/subject/list");
        setSubjects(data);
    }

    async function getClasses() {
        const { data } = await axios.get("http://localhost:5000/class/list");
        setClasses(data);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const showStudents = async () => {
        const info = {
            classId: input.classId,
            attendanceDate: input.attendanceDate,
        };
        const { data } = await axios.post(`http://localhost:5000/attendance/get-class-students`, info);
        setStudents(data);
    };

    const handleRadioChange = (e) => {
        const newStudents = [...students];
        const res = newStudents.map((student) => {
            if (student.std_id !== Number(e.target.name)) {
                return student;
            } else {
                return {
                    ...student,
                    status: Number(e.target.value),
                };
            }
        });
        setStudents(res);
    };

    const handleTake = async () => {
        const obj = {
            classId: input.classId,
            attendanceDate: input.attendanceDate,
            list: students,
        };
        const res = await axios.post(url + "delete", obj);

        if (res.status === 200) {
            const res = await axios.post(url + "new", obj);
            if (res.status === 200) {
                setStudents([]);
                setInput({
                    ...input,
                    classId: "",
                });
            } else {
                console.log(res);
            }
        }
    };

    useEffect(() => {
        getClasses();
        getSubjects();
    }, []);
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3">
                        <h3 className="m-0 mb-3">Attandence</h3>
                        <div className="grid">
                            <div className="col-4">
                                <InputText type="date" name="attendanceDate" value={input.attendanceDate} onChange={handleChange} />
                            </div>
                            <div className="col-4">
                                <Dropdown value={input.classId} name="classId" onChange={handleChange} options={classes} optionLabel="class_name" optionValue="class_id" placeholder="Select class" />
                            </div>
                            {/* <div className="col-3">
                                <Dropdown value={input.subjectId} name="subjectId" onChange={handleChange} options={subjects} optionLabel="subject_name" optionValue="subject_id" placeholder="Select subject" />
                            </div> */}
                            <div className="col-4">
                                <button onClick={() => showStudents()} className="btn btn-success">
                                    show students
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body mx-0">
                        {students.length === 0 && (
                            <div style={{ textAlign: "center", paddingBottom: "13px" }}>
                                <img src="../../../images/notfound.png" width="200" alt="" />
                                <p>not found</p>
                            </div>
                        )}
                        {students.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>student</th>
                                        <th>status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student) => (
                                        <tr>
                                            <td>{student.std_name}</td>
                                            <td style={{ display: "flex" }}>
                                                <span style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
                                                    <input onChange={handleRadioChange} type="radio" name={student.std_id} value="1" checked={student.status === 1} />
                                                    <label className="m-0 mt-1 ml-1">present</label>
                                                </span>
                                                &nbsp;
                                                <span style={{ display: "flex", alignItems: "center" }}>
                                                    <input onChange={handleRadioChange} type="radio" name={student.std_id} value="0" checked={student.status === 0} />
                                                    <label className="m-0 mt-1 ml-1">absent</label>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <button className="btn btn-primary ml-4 mb-3 mt-3" onClick={handleTake}>
                                    take / update attendance
                                </button>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
