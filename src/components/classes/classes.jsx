import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import "../../table.css";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
const url = "http://localhost:5000/class/";

const Classes = () => {
    const [klasses, setKlasses] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [input, setInput] = useState({
        class_name: "",
        shift_id: "",
    });

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => {
        setShow(false);
        setInput({ class_name: "", shift_id: "" });
    };

    async function getKlasses() {
        const { data } = await axios.get(url + "list");
        setKlasses(data);
    }

    const getShifts = async () => {
        const { data } = await axios.get("http://localhost:5000/shift/list");
        setShifts(data);
    };

    useEffect(() => {
        getKlasses();
        getShifts();
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
                    <Dialog header={input.class_id ? "update" : "new"} position="top" visible={show} style={{ width: "30vw" }} modal onHide={() => handleHide()}>
                        <div className="mb-3">
                            <label htmlFor="">Class Name</label>
                            <InputText id="klass" type="text" value={input.class_name} onChange={(e) => setInput({ ...input, class_name: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label>shifts</label>
                            <Dropdown value={input.shift_id} onChange={(e) => setInput({ ...input, shift_id: e.target.value })} options={shifts} optionLabel="shift" optionValue="shift_id" placeholder="Select shift" />
                        </div>
                        <button className={`btn btn-${input.class_id ? "primary" : "success"}`} onClick={handleSave}>
                            {input.class_id ? "update" : "save"}
                        </button>
                    </Dialog>
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
                                        <td>
                                            <i className="bx bx-sm bx-edit text-success mr-2" onClick={() => handleUpdate(klass)}></i>
                                            <i className="bx bx-sm bx-trash text-danger" onClick={() => handleDelete(klass)}></i>
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

export default Classes;
