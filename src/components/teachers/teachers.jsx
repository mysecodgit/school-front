import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import "../../table.css";
import { InputText } from "primereact/inputtext";
const url = "http://localhost:5000/teacher/";

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [input, setInput] = useState({
        teacher_name: "",
        teacher_phone: "",
    });

    const [show, setShow] = useState(false);

    const handleHide = () => {
        setShow(false);
        setInput({ teacher_name: "", teacher_phone: "" });
    };

    async function getTeachers() {
        const { data } = await axios.get(url + "list");
        setTeachers(data);
    }

    useEffect(() => {
        getTeachers();
    }, []);

    const handleUpdate = (teacher) => {
        setInput(teacher);
        setShow(true);
    };

    const handleDelete = async (teacher) => {
        return alert("still needs work");
        try {
            const res = await axios.delete(url + `delete/${teacher.teacher_id}`);
            if (res.status === 200) {
                getTeachers();
            }
        } catch (error) {
            alert(error.response.data);
        }
    };

    const handleSave = async () => {
        const obj = {
            teacherName: input.teacher_name,
            phone: input.teacher_phone,
        };

        if (input.teacher_id) {
            const res = await axios.put(url + `update/${input.teacher_id}`, obj);
            if (res.status === 200) {
                handleHide();
                getTeachers();
            }
        } else {
            const res = await axios.post(url + "new", obj);
            if (res.status === 200) {
                handleHide();
                getTeachers();
            }
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3 d-flex-between-center">
                        <h3 className="m-0">Teachers</h3>
                        <button className="btn btn-success" onClick={() => setShow(true)}>
                            add new
                        </button>
                    </div>
                    <Dialog header={input.teacher_id ? "update" : "new"} position="top" visible={show} style={{ width: "30vw" }} modal onHide={() => handleHide()}>
                        <div className="mb-3">
                            <label htmlFor="">Teacher Name</label>
                            <InputText id="teacher" type="text" value={input.teacher_name} onChange={(e) => setInput({ ...input, teacher_name: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Teacher Phone</label>
                            <InputText id="phone" type="number" value={input.teacher_phone} onChange={(e) => setInput({ ...input, teacher_phone: e.target.value })} />
                        </div>
                        <button className={`btn btn-${input.subject_id ? "primary" : "success"}`} onClick={handleSave}>
                            {input.teacher_id ? "update" : "save"}
                        </button>
                    </Dialog>
                    <div className="card-body mx-0">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>phone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.map((t) => (
                                    <tr key={t.teacher_id}>
                                        <td>{t.teacher_id}</td>
                                        <td>{t.teacher_name}</td>
                                        <td>{t.teacher_phone}</td>
                                        <td>
                                            <i className="bx bx-sm bx-edit text-success mr-2" onClick={() => handleUpdate(t)}></i>
                                            <i className="bx bx-sm bx-trash text-danger" onClick={() => handleDelete(t)}></i>
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

export default Teachers;
