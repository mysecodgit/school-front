import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import "../../table.css";
import { InputText } from "primereact/inputtext";
const url = "http://localhost:5000/subject/";

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [input, setInput] = useState({
        subject_name: "",
    });

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => {
        setShow(false);
        setInput({ subject_name: "" });
    };

    async function getSubjects() {
        const { data } = await axios.get(url + "list");
        setSubjects(data);
    }

    useEffect(() => {
        getSubjects();
    }, []);

    const handleUpdate = (subject) => {
        setInput(subject);
        setShow(true);
    };

    const handleDelete = async (subject) => {
        try {
            const res = await axios.delete(url + `delete/${subject.subject_id}`);
            if (res.status === 200) {
                getSubjects();
            }
        } catch (error) {
            alert(error.response.data);
        }
    };

    const handleSave = async () => {
        const obj = {
            subjectName: input.subject_name,
        };

        if (input.subject_id) {
            const res = await axios.put(url + `update/${input.subject_id}`, obj);
            if (res.status === 200) {
                handleHide();
                getSubjects();
            }
        } else {
            const res = await axios.post(url + "new", obj);
            if (res.status === 200) {
                handleHide();
                getSubjects();
            }
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3 d-flex-between-center">
                        <h3 className="m-0">Subjects</h3>
                        <button className="btn btn-success" onClick={() => setShow(true)}>
                            add new
                        </button>
                    </div>
                    <Dialog header={input.subject_id ? "update" : "new"} position="top" visible={show} style={{ width: "30vw" }} modal onHide={() => handleHide()}>
                        <div className="mb-3">
                            <label htmlFor="">Subject Name</label>
                            <InputText id="subject" type="text" value={input.subject_name} onChange={(e) => setInput({ ...input, subject_name: e.target.value })} />
                        </div>
                        <button className={`btn btn-${input.subject_id ? "primary" : "success"}`} onClick={handleSave}>
                            {input.subject_id ? "update" : "save"}
                        </button>
                    </Dialog>
                    <div className="card-body mx-0">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Subject</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map((subject) => (
                                    <tr key={subject.subject_id}>
                                        <td>{subject.subject_id}</td>
                                        <td>{subject.subject_name}</td>
                                        <td>
                                            <i className="bx bx-sm bx-edit text-success mr-2" onClick={() => handleUpdate(subject)}></i>
                                            <i className="bx bx-sm bx-trash text-danger" onClick={() => handleDelete(subject)}></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subjects;
