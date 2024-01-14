import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import "../../table.css";
import { InputText } from "primereact/inputtext";
const url = "http://localhost:5000/expense/";

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [input, setInput] = useState({
        expenseName: "",
        amount: "",
    });

    const [show, setShow] = useState(false);

    const handleHide = () => {
        setShow(false);
        setInput({ expenseName: "", amount: "" });
    };

    async function getExpenses() {
        const { data } = await axios.get(url + "list");
        setExpenses(data);
    }

    useEffect(() => {
        getExpenses();
    }, []);

    const handleUpdate = (expense) => {
        setInput({ expense_id: expense.expense_id, expenseName: expense.expense_name, amount: expense.amount });
        setShow(true);
    };

    const handleDelete = async (expense) => {
        try {
            const res = await axios.delete(url + `delete/${expense.expense_id}`);
            if (res.status === 200) {
                getExpenses();
            }
        } catch (err) {
            alert(err.response.data);
        }
    };

    const handleSave = async () => {
        if (input.expense_id) {
            const res = await axios.put(url + `update/${input.expense_id}`, input);
            if (res.status === 200) {
                handleHide();
                getExpenses();
            }
        } else {
            const res = await axios.post(url + "new", input);
            if (res.status === 200) {
                handleHide();
                getExpenses();
            }
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3 d-flex-between-center">
                        <h3 className="m-0">expenses</h3>
                        <button className="btn btn-success" onClick={() => setShow(true)}>
                            add new
                        </button>
                    </div>
                    <Dialog header={input.expense_id ? "update" : "new"} position="top" visible={show} style={{ width: "30vw" }} modal onHide={() => handleHide()}>
                        <div className="mb-3">
                            <label htmlFor="">expense</label>
                            <InputText name="expenseName" type="text" value={input.expenseName} onChange={(e) => setInput({ ...input, expenseName: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">amount</label>
                            <InputText name="amount" type="text" value={input.amount} onChange={(e) => setInput({ ...input, amount: e.target.value })} />
                        </div>
                        <button className={`btn btn-${input.expense_id ? "primary" : "success"}`} onClick={handleSave}>
                            {input.expense_id ? "update" : "save"}
                        </button>
                    </Dialog>
                    <div className="card-body mx-0">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Expense</th>
                                    <th>amount</th>
                                    <th>date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((exp) => (
                                    <tr key={exp.expense_id}>
                                        <td>{exp.expense_id}</td>
                                        <td>{exp.expense_name}</td>
                                        <td>$ {exp.amount}</td>
                                        <td>{exp.date}</td>
                                        <td>
                                            <i className="bx bx-sm bx-edit text-success mr-2" onClick={() => handleUpdate(exp)}></i>
                                            <i className="bx bx-sm bx-trash text-danger" onClick={() => handleDelete(exp)}></i>
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

export default Expenses;
