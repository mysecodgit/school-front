import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import "../../table.css";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import SubjectTeacherTable from "./subjectTeacherModal";
import NewClass from "./newClass";
import SubjectTeacherModal from "./subjectTeacherModal";
const url = "http://localhost:5000/class/";

const Classes = () => {
    const [klasses, setKlasses] = useState([]);
    const [input, setInput] = useState({
        class_name: "",
        shift_id: "",
    });

    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const [classId, setClassId] = useState(null);

    const handleHide = () => {
        setShow(false);
        setInput({ class_name: "", shift_id: "" });
    };

    const handleVisible = (id) => {
        setClassId(id);
        setVisible(true);
    };

    async function getKlasses() {
        const { data } = await axios.get(url + "list");
        setKlasses(data);
    }

    useEffect(() => {
        getKlasses();
    }, []);

    const handleUpdate = (klass) => {
        setInput(klass);
        setShow(true);
    };

    const handleDelete = async (klass) => {
        try {
            const res = await axios.delete(url + `delete/${klass.class_id}`);
            if (res.status === 200) {
                getKlasses();
            }
        } catch (err) {
            alert(err.response.data);
        }
    };

    const handleSave = async () => {
        const obj = {
            className: input.class_name,
            shiftId: input.shift_id,
        };

        if (input.class_id) {
            const res = await axios.put(url + `update/${input.class_id}`, obj);
            if (res.status === 200) {
                handleHide();
                getKlasses();
            }
        } else {
            const res = await axios.post(url + "new", obj);
            if (res.status === 200) {
                handleHide();
                getKlasses();
            }
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3 d-flex-between-center">
                        <h3 className="m-0">Classes</h3>
                        <button className="btn btn-success" onClick={() => setShow(true)}>
                            add new
                        </button>
                    </div>
                    <NewClass input={input} setInput={setInput} show={show} handleHide={handleHide} handleSave={handleSave} />
                    <div className="card-body mx-0">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Class</th>
                                    <th>Shift</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {klasses.map((klass) => (
                                    <tr key={klass.class_id}>
                                        <td>{klass.class_id}</td>
                                        <td>{klass.class_name}</td>
                                        <td>{klass.shift}</td>
                                        <td className="in-flex-center">
                                            <i className="bx bx-sm bx-edit text-success mr-2" onClick={() => handleUpdate(klass)}></i>
                                            <i className="bx bx-sm bx-trash text-danger mr-2" onClick={() => handleDelete(klass)}></i>
                                            <button className="btn bg-primary btn-sm text-white" onClick={() => handleVisible(klass.class_id)}>
                                                assign subjects
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <SubjectTeacherModal visible={visible} setVisible={setVisible} classId={classId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Classes;
