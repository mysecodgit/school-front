import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import "../../table.css";
import { InputText } from "primereact/inputtext";
const url = "http://localhost:5000/exam-type/";

const ExamTypes = () => {
    const [examTypes, setExamTypes] = useState([]);
    const [input, setInput] = useState({
        exam_type: "",
    });

    const [show, setShow] = useState(false);

    const handleHide = () => {
        setShow(false);
        setInput({ exam_type: "" });
    };

    async function getExamTypes() {
        const { data } = await axios.get(url + "list");
        setExamTypes(data);
    }

    useEffect(() => {
        getExamTypes();
    }, []);

    const handleUpdate = (examType) => {
        setInput(examType);
        setShow(true);
    };

    const handleDelete = async (examType) => {
        try {
            const res = await axios.delete(url + `delete/${examType.exam_type_id}`);
            if (res.status === 200) {
                getExamTypes();
            }
        } catch (error) {
            alert(error.response.data);
        }
    };

    const handleSave = async () => {
        if (input.exam_type_id) {
            const res = await axios.put(url + `update/${input.exam_type_id}`, { examType: input.exam_type });
            if (res.status === 200) {
                handleHide();
                getExamTypes();
            }
        } else {
            const res = await axios.post(url + "new", { examType: input.exam_type });
            if (res.status === 200) {
                handleHide();
                getExamTypes();
            }
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3 d-flex-between-center">
                        <h3 className="m-0">Exam Types</h3>
                        <button className="btn btn-success" onClick={() => setShow(true)}>
                            add new
                        </button>
                    </div>
                    <Dialog header={input.exam_type_id ? "update" : "new"} position="top" visible={show} style={{ width: "30vw" }} modal onHide={() => handleHide()}>
                        <div className="mb-3">
                            <label htmlFor="">exam type</label>
                            <InputText id="examtype" type="text" value={input.exam_type} onChange={(e) => setInput({ ...input, exam_type: e.target.value })} />
                        </div>
                        <button className={`btn btn-${input.exam_type_id ? "primary" : "success"}`} onClick={handleSave}>
                            {input.exam_type_id ? "update" : "save"}
                        </button>
                    </Dialog>
                    <div className="card-body mx-0">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Academic Year</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {examTypes.map((examType) => (
                                    <tr key={examType.exam_type_id}>
                                        <td>{examType.exam_type_id}</td>
                                        <td>{examType.exam_type}</td>
                                        <td>
                                            <i className="bx bx-sm bx-edit text-success mr-2" onClick={() => handleUpdate(examType)}></i>
                                            <i className="bx bx-sm bx-trash text-danger" onClick={() => handleDelete(examType)}></i>
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

export default ExamTypes;
