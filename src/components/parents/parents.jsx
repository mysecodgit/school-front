import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import "../../table.css";
import { InputText } from "primereact/inputtext";
const url = "http://localhost:5000/parent/";

const Parents = () => {
    const [parents, setParents] = useState([]);
    const [input, setInput] = useState({
        parent_name: "",
    });

    const [show, setShow] = useState(false);

    const handleHide = () => {
        setShow(false);
        setInput({ parent_name: "" });
    };

    async function getParents() {
        const { data } = await axios.get(url + "list");
        setParents(data);
    }

    useEffect(() => {
        getParents();
    }, []);

    const handleUpdate = (parent) => {
        setInput(parent);
        setShow(true);
    };

    const handleDelete = async (parent) => {
        try {
            const res = await axios.delete(url + `delete/${parent.parent_id}`);
            if (res.status === 200) {
                getParents();
            }
        } catch (error) {
            alert(error.response.data);
        }
    };

    const handleSave = async () => {
        const obj = {
            parentName: input.parent_name,
        };
        if (input.parent_id) {
            const res = await axios.put(url + `update/${input.parent_id}`, obj);
            if (res.status === 200) {
                handleHide();
                getParents();
            }
        } else {
            const res = await axios.post(url + "new", obj);
            if (res.status === 200) {
                handleHide();
                getParents();
            }
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3 d-flex-between-center">
                        <h3 className="m-0">Parents</h3>
                        <button className="btn btn-success" onClick={() => setShow(true)}>
                            add new
                        </button>
                    </div>
                    <Dialog header={input.parent_id ? "update" : "new"} position="top" visible={show} style={{ width: "30vw" }} modal onHide={() => handleHide()}>
                        <div className="mb-3">
                            <label htmlFor="">Parent Name</label>
                            <InputText type="text" value={input.parent_name} onChange={(e) => setInput({ ...input, parent_name: e.target.value })} />
                        </div>
                        <button className={`btn btn-${input.parent_id ? "primary" : "success"}`} onClick={handleSave}>
                            {input.parent_id ? "update" : "save"}
                        </button>
                    </Dialog>
                    <div className="card-body mx-0">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>parent name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parents.map((parent) => (
                                    <tr key={parent.parent_id}>
                                        <td>{parent.parent_id}</td>
                                        <td>{parent.parent_name}</td>
                                        <td>
                                            <i className="bx bx-sm bx-edit text-success mr-2" onClick={() => handleUpdate(parent)}></i>
                                            <i className="bx bx-sm bx-trash text-danger" onClick={() => handleDelete(parent)}></i>
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

export default Parents;
