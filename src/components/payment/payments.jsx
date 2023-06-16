import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import moment from "moment/moment";
const $ = require("jquery");
$.DataTable = require("datatables.net");

const initialInput = {
    date: moment().format("YYYY-MM-DD"),
    studentId: "",
    amount: "",
};

const Payments = () => {
    const [show, setShow] = useState(false);
    const [input, setInput] = useState(initialInput);
    const [error, setError] = useState({
        user: null,
        amount: null,
    });

    const [balance, setBalance] = useState(null);
    const [payments, setPayments] = useState([]);

    async function getPayments() {
        const { data } = await axios.get("http://localhost:5000/payment/all");
        setPayments(data);
        // $(".mytable").dataTable();
    }

    useEffect(() => {
        getPayments();
    }, []);

    const handleHide = () => {
        setShow(false);
        setInput(initialInput);
        setBalance(null);
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        if (name === "studentId") {
            setError({ ...error, user: null });
            setBalance(null);
        } else {
            setError({ ...error, amount: null });
        }

        setInput({ ...input, [name]: value });
    };

    const getStudentFee = async (studentId) => {
        if (studentId === "") return setError({ ...error, user: "please enter student id." });
        try {
            const { data } = await axios.post("http://localhost:5000/fee-transaction/get-fee-total", { studentId });
            setBalance(data[0].balance);
        } catch (e) {
            setError({ ...error, user: e.response.data });
        }
    };

    const handleSave = async () => {
        if (input.studentId === "") return setError({ ...error, user: "please fill this field." });
        if (input.amount === "") return setError({ ...error, amount: "please fill this field." });
        if (!balance) return setError({ ...error, amount: `there must be balance ` });
        if (input.amount > balance) return setError({ ...error, amount: `you can not pay more than ${balance}` });

        const response = await axios.post("http://localhost:5000/payment/new", input);
        if (response.status === 200) {
            handleHide();
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3 d-flex-between-center">
                        <h3 className="m-0">Payments</h3>
                        <button className="btn btn-success" onClick={() => setShow(true)}>
                            add new
                        </button>
                    </div>
                    <Dialog header={input.transaction_id ? "update" : "new"} position="top" visible={show} style={{ width: "35vw" }} modal onHide={() => handleHide()}>
                        <div className="mb-3">
                            <label htmlFor="">Student ID</label>
                            <div className="flex">
                                <InputText name="studentId" value={input.studentId} type="text" onChange={handleChange} />
                                <button className="btn bg-success text-white ml-3" onClick={() => getStudentFee(input.studentId)}>
                                    Search
                                </button>
                            </div>
                        </div>
                        {error.user && <p style={{ color: "red" }}>{error.user}</p>}
                        {!error.user && (balance || balance === 0) && (
                            <p style={{ color: "#fa8b00" }}>
                                this student has to pay : <span style={{ color: "green" }}>${balance}</span>
                            </p>
                        )}
                        <div className="mb-3">
                            <label htmlFor="">Amount</label>
                            <InputText name="amount" value={input.amount} type="number" onChange={handleChange} />
                        </div>
                        {error.amount && <p style={{ color: "red" }}>{error.amount}</p>}
                        <button className={`btn btn-${input.transaction_id ? "primary" : "success"}`} onClick={handleSave}>
                            {input.transaction_id ? "update" : "save"}
                        </button>
                    </Dialog>
                    <div className="card-body mx-0">
                        <table className="mytable">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Date</th>
                                    <th>Student</th>
                                    <th>Class</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map(({ transaction_id, date, std_name, class_name, credit }) => (
                                    <tr>
                                        <td>{transaction_id}</td>
                                        <td>{date}</td>
                                        <td> {std_name}</td>
                                        <td>{class_name}</td>
                                        <td>${credit}</td>
                                        <td>
                                            <button>edit</button>
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

export default Payments;
