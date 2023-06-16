import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import "../../table.css";
import { InputText } from "primereact/inputtext";
const url = "http://localhost:5000/shift/";

const Shifts = () => {
    const [shifts, setShifts] = useState([]);
    const [shift, setShift] = useState({
        shift: "",
    });

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => {
        setShow(false);
        setShift({ shift: "" });
    };

    async function getShifts() {
        const { data } = await axios.get(url + "list");
        setShifts(data);
    }

    useEffect(() => {
        getShifts();
    }, []);

    const handleUpdate = (shift) => {
        setShift(shift);
        setShow(true);
    };

    const handleDelete = async (shift) => {
        try {
            const res = await axios.delete(url + `delete/${shift.shift_id}`);
            if (res.status === 200) {
                getShifts();
            }
        } catch (err) {
            alert(err.response.data);
        }
    };

    const handleSave = async () => {
        console.log(shift);
        if (shift.shift_id) {
            const res = await axios.put(url + `update/${shift.shift_id}`, { shift: shift.shift });
            if (res.status === 200) {
                handleHide();
                getShifts();
            }
        } else {
            const res = await axios.post(url + "new", { shift: shift.shift });
            if (res.status === 200) {
                handleHide();
                getShifts();
            }
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3 d-flex-between-center">
                        <h3 className="m-0">Shifts</h3>
                        <button className="btn btn-success" onClick={() => setShow(true)}>
                            add new
                        </button>
                    </div>
                    <Dialog header={shift.shift_id ? "update" : "new"} position="top" visible={show} style={{ width: "30vw" }} modal onHide={() => handleHide()}>
                        <div className="mb-3">
                            <label htmlFor="">Shift</label>
                            <InputText id="username" type="text" value={shift.shift} onChange={(e) => setShift({ ...shift, shift: e.target.value })} />
                        </div>
                        <button className={`btn btn-${shift.shift_id ? "primary" : "success"}`} onClick={handleSave}>
                            {shift.shift_id ? "update" : "save"}
                        </button>
                    </Dialog>
                    <div className="card-body mx-0">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>shift</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shifts.map((shift) => (
                                    <tr key={shift.shift_id}>
                                        <td>{shift.shift_id}</td>
                                        <td>{shift.shift}</td>
                                        <td>
                                            <i className="bx bx-sm bx-edit text-success mr-2" onClick={() => handleUpdate(shift)}></i>
                                            <i className="bx bx-sm bx-trash text-danger" onClick={() => handleDelete(shift)}></i>
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

export default Shifts;
