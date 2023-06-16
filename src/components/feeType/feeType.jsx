import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import "../../table.css";
import { InputText } from "primereact/inputtext";
const url = "http://localhost:5000/fee-type/";

const FeeType = () => {
    const [feeType, setFeeType] = useState([]);
    const [input, setInput] = useState({
        fee_type: "",
    });

    const [show, setShow] = useState(false);

    const handleHide = () => {
        setShow(false);
        setInput({ fee_type: "" });
    };

    async function getFeeType() {
        const { data } = await axios.get(url + "all");
        setFeeType(data);
    }

    useEffect(() => {
        getFeeType();
    }, []);

    const handleUpdate = (feeType) => {
        setInput(feeType);
        setShow(true);
    };

    const handleDelete = async (feeType) => {
        try {
            const res = await axios.delete(url + `delete/${feeType.fee_type_id}`);
            if (res.status === 200) {
                getFeeType();
            }
        } catch (error) {
            alert(error.response.data);
        }
    };

    const handleSave = async () => {
        if (input.fee_type_id) {
            const res = await axios.put(url + `update/${input.fee_type_id}`, { feeType: input.fee_type });
            if (res.status === 200) {
                handleHide();
                getFeeType();
            }
        } else {
            const res = await axios.post(url + "new", { feeType: input.fee_type });
            if (res.status === 200) {
                handleHide();
                getFeeType();
            }
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3 d-flex-between-center">
                        <h3 className="m-0">Fee Types</h3>
                        <button className="btn btn-success" onClick={() => setShow(true)}>
                            add new
                        </button>
                    </div>
                    <Dialog header={input.fee_type_id ? "update" : "new"} position="top" visible={show} style={{ width: "30vw" }} modal onHide={() => handleHide()}>
                        <div className="mb-3">
                            <label htmlFor="">Fee type</label>
                            <InputText type="text" value={input.fee_type} onChange={(e) => setInput({ ...input, fee_type: e.target.value })} />
                        </div>
                        <button className={`btn btn-${input.fee_type_id ? "primary" : "success"}`} onClick={handleSave}>
                            {input.fee_type_id ? "update" : "save"}
                        </button>
                    </Dialog>
                    <div className="card-body mx-0">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Fee type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feeType.map((fee) => (
                                    <tr key={fee.fee_type_id}>
                                        <td>{fee.fee_type_id}</td>
                                        <td>{fee.fee_type}</td>
                                        <td>
                                            <i className="bx bx-sm bx-edit text-success mr-2" onClick={() => handleUpdate(fee)}></i>
                                            <i className="bx bx-sm bx-trash text-danger" onClick={() => handleDelete(fee)}></i>
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

export default FeeType;
