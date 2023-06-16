import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

import "../../table.css";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
const url = "http://localhost:5000/student/";

const initialInput = {
    std_name: "",
    gender: "",
    phone: "",
    address: "",
    class_id: "",
    parent_id: "",
    reg_date: "",
};

const Students = () => {
    const [students, setStudents] = useState([]);
    const [parents, setParents] = useState([]);
    const [classes, setClasses] = useState([]);

    const [input, setInput] = useState(initialInput);

    const [show, setShow] = useState(false);

    const handleHide = () => {
        setShow(false);
        setInput(initialInput);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    async function getStudents() {
        const { data } = await axios.get(url + "list");
        setStudents(data);
    }

    async function getClasses() {
        const { data } = await axios.get("http://localhost:5000/class/list");
        setClasses(data);
    }

    async function getParents() {
        const { data } = await axios.get("http://localhost:5000/parent/list");
        setParents(data);
    }

    useEffect(() => {
        getStudents();
        getParents();
        getClasses();
    }, []);

    const handleUpdate = (student) => {
        console.log(student);
        setInput(student);
        setShow(true);
    };

    const handleDelete = async (student) => {
        try {
            const res = await axios.delete(url + `delete/${student.std_id}`);
            if (res.status === 200) {
                getStudents();
            }
        } catch (error) {
            alert(error.response.data);
        }
    };

    const handleSave = async () => {
        const obj = {
            studentName: input.std_name,
            gender: input.gender,
            phone: input.phone,
            address: input.address,
            classId: input.class_id,
            parentId: input.parent_id,
            regDate: new Date(),
        };

        if (input.std_id) {
            const res = await axios.put(url + `update/${input.std_id}`, obj);
            if (res.status === 200) {
                handleHide();
                getStudents();
            }
        } else {
            const res = await axios.post(url + "new", obj);
            if (res.status === 200) {
                handleHide();
                getStudents();
            }
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3 d-flex-between-center">
                        <h3 className="m-0">Students</h3>
                        <button className="btn btn-success" onClick={() => setShow(true)}>
                            add new
                        </button>
                    </div>
                    <Dialog header={input.std_id ? "update" : "new"} position="top" visible={show} style={{ width: "50vw" }} modal onHide={() => handleHide()}>
                        <div className="grid">
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="">Student Name</label>
                                    <InputText name="std_name" type="text" value={input.std_name} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="">Phone</label>
                                    <InputText name="phone" type="text" value={input.phone} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="">Gender</label>
                                    <Dropdown
                                        value={input.gender}
                                        name="gender"
                                        onChange={handleChange}
                                        options={[
                                            { id: "male", gender: "male" },
                                            { id: "female", gender: "female" },
                                        ]}
                                        optionLabel="gender"
                                        optionValue="id"
                                        placeholder="Select gender"
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="">Address</label>
                                    <InputText name="address" type="text" value={input.address} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="">Parent</label>
                                    <Dropdown value={input.parent_id} name="parent_id" onChange={handleChange} options={parents} optionLabel="parent_name" optionValue="parent_id" placeholder="Select parent" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="">Class</label>
                                    <Dropdown value={input.class_id} name="class_id" onChange={handleChange} options={classes} optionLabel="class_name" optionValue="class_id" placeholder="Select class" />
                                </div>
                            </div>
                        </div>
                        <button className={`btn btn-${input.std_id ? "primary" : "success"}`} onClick={handleSave}>
                            {input.std_id ? "update" : "save"}
                        </button>
                    </Dialog>
                    <div className="card-body mx-0">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>student name</th>
                                    <th>phone</th>
                                    <th>gender</th>
                                    <th>class</th>
                                    <th>parent</th>
                                    <th>register date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.std_id}>
                                        <td>{student.std_id}</td>
                                        <td>
                                            <Link to={`/students/view/${student.std_id}`}>{student.std_name}</Link>
                                        </td>
                                        <td>{student.phone}</td>
                                        <td>{student.gender}</td>
                                        <td>{student.class_name}</td>
                                        <td>{student.parent_name}</td>
                                        <td>{student.reg_date}</td>
                                        <td>
                                            <i className="bx bx-sm bx-edit text-success mr-2" onClick={() => handleUpdate(student)}></i>
                                            <i className="bx bx-sm bx-trash text-danger" onClick={() => handleDelete(student)}></i>
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

export default Students;
