import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import "../../table.css";
import { InputText } from "primereact/inputtext";
const url = "http://localhost:5000/academic-year/";

const AcademicYear = () => {
    const [academicYears, setAcademicYears] = useState([]);
    const [input, setInput] = useState({
        academic_year: "",
    });

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => {
        setShow(false);
        setInput({ academic_year: "" });
    };

    async function getAcademicYears() {
        const { data } = await axios.get(url + "list");
        setAcademicYears(data);
    }

    useEffect(() => {
        getAcademicYears();
    }, []);

    const handleUpdate = (academicYear) => {
        setInput(academicYear);
        setShow(true);
    };

    const handleDelete = async (academicYear) => {
        try {
            const res = await axios.delete(url + `delete/${academicYear.academic_year_id}`);
            if (res.status === 200) {
                getAcademicYears();
            }
        } catch (error) {
            alert(error.response.data);
        }
    };

    const handleSave = async () => {
        if (input.academic_year_id) {
            const res = await axios.put(url + `update/${input.academic_year_id}`, { academicYear: input.academic_year });
            if (res.status === 200) {
                handleHide();
                getAcademicYears();
            }
        } else {
            const res = await axios.post(url + "new", { academicYear: input.academic_year });
            if (res.status === 200) {
                handleHide();
                getAcademicYears();
            }
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3 d-flex-between-center">
                        <h3 className="m-0">Academic Years</h3>
                        <button className="btn btn-success" onClick={() => setShow(true)}>
                            add new
                        </button>
                    </div>
                    <Dialog header={input.academic_year_id ? "update" : "new"} position="top" visible={show} style={{ width: "30vw" }} modal onHide={() => handleHide()}>
                        <div className="mb-3">
                            <label htmlFor="">Academic Year</label>
                            <InputText id="academicYear" type="text" value={input.academic_year} onChange={(e) => setInput({ ...input, academic_year: e.target.value })} />
                        </div>
                        <button className={`btn btn-${input.academic_year_id ? "primary" : "success"}`} onClick={handleSave}>
                            {input.academic_year_id ? "update" : "save"}
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
                                {academicYears.map((academic) => (
                                    <tr key={academic.academic_year_id}>
                                        <td>{academic.academic_year_id}</td>
                                        <td>{academic.academic_year}</td>
                                        <td>
                                            <i className="bx bx-sm bx-edit text-success mr-2" onClick={() => handleUpdate(academic)}></i>
                                            <i className="bx bx-sm bx-trash text-danger" onClick={() => handleDelete(academic)}></i>
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

export default AcademicYear;
