import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import UpdateAllocation from "./updateAllocation";

const initialInput = {
    date: "",
    feeTypeId: "",
    classId: "",
    amount: "",
};

const months = [
    { id: 1, month: "janauary" },
    { id: 2, month: "february" },
    { id: 3, month: "march" },
    { id: 4, month: "april" },
    { id: 5, month: "may" },
    { id: 6, month: "june" },
    { id: 7, month: "july" },
    { id: 8, month: "august" },
    { id: 9, month: "september" },
    { id: 10, month: "octobar" },
    { id: 11, month: "novembar" },
    { id: 12, month: "decembar" },
];

const FeesAllocation = () => {
    const [transactions, setTransactions] = useState([]);
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const [input, setInput] = useState(initialInput);
    const [searchInput, setSearchInput] = useState({
        classId: "",
        month: "",
        year: "",
        status: "all",
    });
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [feeTypes, setFeeTypes] = useState([]);

    const handleHide = () => {
        setShow(false);
        setInput(initialInput);
    };

    const handleUnvisible = () => {
        setVisible(false);
        setInput(initialInput);
    };

    const getStudents = async (classId) => {
        const { data } = await axios.get("http://localhost:5000/student/student-of-class/" + classId);
        setStudents(data.map((std) => std.std_id));
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        if (name === "classId") {
            getStudents(value);
            // setInput({ ...input, classId: value, students });
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setSearchInput({ ...searchInput, [name]: value });
    };

    async function getClasses() {
        const { data } = await axios.get("http://localhost:5000/class/list");
        setClasses(data);
    }

    async function getFeeTypes() {
        const { data } = await axios.get("http://localhost:5000/fee-type/all");
        setFeeTypes(data);
    }

    const handleSave = async () => {
        const obj = { ...input, students };
        const res = await axios.post("http://localhost:5000/fee-transaction/new", obj);
        if (res.status === 200) {
            handleHide();
        }
    };

    const filter = async () => {
        const { data } = await axios.post("http://localhost:5000/fee-transaction/all", searchInput);
        setTransactions(data);
    };

    const handleUpdate = (tran) => {
        console.log(tran);
        setInput(tran);
        setVisible(true);
    };

    const handleDelete = async (tran) => {
        try {
            const res = await axios.delete(`http://localhost:5000/fee-transaction/delete/${tran.transaction_id}`);
            if (res.status === 200) {
                filter();
            }
        } catch (error) {
            alert(error.response.data);
        }
    };

    useEffect(() => {
        getClasses();
        getFeeTypes();
    }, []);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3 d-flex-between-center">
                        <h3 className="m-0">Fee Allocation</h3>
                        <button className="btn btn-success" onClick={() => setShow(true)}>
                            add new
                        </button>
                    </div>
                    <div className="grid">
                        <div className="col-3">
                            <Dropdown name="classId" value={searchInput.classId} onChange={handleFilterChange} options={classes} optionLabel="class_name" optionValue="class_id" placeholder="Select class" />
                        </div>
                        <div className="col-3">
                            <Dropdown name="month" value={searchInput.month} onChange={handleFilterChange} options={months} optionLabel="month" optionValue="id" placeholder="Select class" />
                        </div>
                        <div className="col-3">
                            <InputText type="text" name="year" value={searchInput.year} onChange={handleFilterChange} />
                        </div>
                        {/* <div className="col-3">
                            <Dropdown name="status" value={searchInput.status} onChange={handleFilterChange} options={[{ status: "all" }, { status: "paid" }, { status: "unpaid" }]} optionLabel="status" optionValue="status" placeholder="Select subject" />
                        </div> */}
                        <div className="col-3">
                            <button onClick={() => filter()} className="btn btn-success" style={{ width: "100%" }}>
                                show students
                            </button>
                        </div>
                    </div>
                    <Dialog header={input.transaction_id ? "update" : "new"} position="top" visible={show} style={{ width: "35vw" }} modal onHide={() => handleHide()}>
                        <div className="mb-3">
                            <label htmlFor="">Date</label>
                            <InputText name="date" type="date" value={input.date} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Fee type</label>
                            <Dropdown name="feeTypeId" value={input.feeTypeId} onChange={handleChange} options={feeTypes} optionLabel="fee_type" optionValue="fee_type_id" placeholder="Select fee type" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Class</label>
                            <Dropdown name="classId" value={input.classId} onChange={handleChange} options={classes} optionLabel="class_name" optionValue="class_id" placeholder="Select class" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Amount</label>
                            <InputText name="amount" value={input.amount} type="number" onChange={handleChange} />
                        </div>
                        <button className={`btn btn-${input.transaction_id ? "primary" : "success"}`} onClick={handleSave}>
                            {input.transaction_id ? "update" : "save"}
                        </button>
                    </Dialog>
                    <div className="card-body mx-0">
                        {transactions.length === 0 && (
                            <div style={{ textAlign: "center", paddingBottom: "13px", paddingTop: "10px" }}>
                                <img src="../../../images/notfound.png" width="200" alt="" />
                                {/* <p>not found</p> */}
                            </div>
                        )}
                        {transactions.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>student</th>
                                        <th>type</th>
                                        <th>amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((tran, index) => (
                                        <tr key={index}>
                                            <td>{tran.transaction_id}</td>
                                            <td>{tran.std_name}</td>
                                            <td>{tran.fee_type}</td>
                                            <td>${tran.debit}</td>
                                            <td>
                                                <i className="bx bx-sm bx-edit text-success mr-2" onClick={() => handleUpdate(tran)}></i>
                                                <i className="bx bx-sm bx-trash text-danger" onClick={() => handleDelete(tran)}></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <UpdateAllocation visible={visible} handleUnvisible={handleUnvisible} input={input} classes={classes} feeTypes={feeTypes} />
                </div>
            </div>
        </div>
    );
};

export default FeesAllocation;
