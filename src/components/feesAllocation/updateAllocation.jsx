import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

const UpdateAllocation = ({ input, classes, visible, feeTypes, handleUnvisible }) => {
    const [students, setStudents] = useState([]);

    const getStudents = async (classId) => {
        const { data } = await axios.get("http://localhost:5000/student/student-of-class/" + classId);
        setStudents(data);
    };

    useEffect(() => {
        getStudents(input.class_id);
    }, [visible]);
    return (
        <Dialog header="update" position="top" visible={visible} style={{ width: "35vw" }} modal onHide={() => handleUnvisible()}>
            <div className="mb-3">
                <label htmlFor="">class</label>
                <Dropdown name="classId" value={input.class_id} options={classes} optionLabel="class_name" optionValue="class_id" placeholder="Select class" />
            </div>
            <div className="mb-3">
                <label htmlFor="">Student</label>
                <Dropdown name="classId" value={input.std_id} options={students} optionLabel="std_name" optionValue="std_id" placeholder="Select student" />
            </div>
            <div className="mb-3">
                <label htmlFor="">Fee type</label>
                <Dropdown name="feeTypeId" value={input.fee_type_id} options={feeTypes} optionLabel="fee_type" optionValue="fee_type_id" placeholder="Select fee type" />
            </div>
            <div className="mb-3">
                <label htmlFor="">Amount</label>
                <InputText name="amount" value={input.debit} type="number" />
            </div>
            <div className="mb-3">
                <label htmlFor="">date</label>
                <InputText name="date" value={input.date.split("T")[0]} type="date" />
            </div>
            <button className={`btn btn-primary`}>update</button>
        </Dialog>
    );
};

export default UpdateAllocation;
