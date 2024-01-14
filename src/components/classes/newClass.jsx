import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useEffect, useState } from "react";

const NewClass = ({ input, setInput, show, handleHide, handleSave }) => {
    const [shifts, setShifts] = useState([]);

    const getShifts = async () => {
        const { data } = await axios.get("http://localhost:5000/shift/list");
        setShifts(data);
    };

    useEffect(() => {
        getShifts();
    }, []);

    return (
        <Dialog header={input.class_id ? "update" : "new"} position="top" visible={show} style={{ width: "40vw" }} modal onHide={() => handleHide()}>
            <div className="grid">
                <div className="mb-3 col-6">
                    <label htmlFor="">Class Name</label>
                    <InputText id="klass" type="text" value={input.class_name} onChange={(e) => setInput({ ...input, class_name: e.target.value })} />
                </div>
                <div className="mb-3 col-6">
                    <label>shifts</label>
                    <Dropdown value={input.shift_id} onChange={(e) => setInput({ ...input, shift_id: e.target.value })} options={shifts} optionLabel="shift" optionValue="shift_id" placeholder="Select shift" />
                </div>
            </div>
            <button className={`btn btn-${input.class_id ? "primary" : "success"}`} onClick={handleSave}>
                {input.class_id ? "update" : "save"}
            </button>
        </Dialog>
    );
};

export default NewClass;
