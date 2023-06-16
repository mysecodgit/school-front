import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import moment from "moment/moment";

const StudentFeeReport = () => {
    const [feeReport, setFeeReport] = useState([]);
    const [input, setInput] = useState({
        year: moment().format("YYYY"),
        classId: "",
    });
    const [academicYears, setAcademicYears] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        getClasses();
        getAcademicYears();
    }, []);

    async function getClasses() {
        const { data } = await axios.get("http://localhost:5000/class/list");
        setClasses(data);
    }

    async function getAcademicYears() {
        const { data } = await axios.get("http://localhost:5000/academic-year/list");
        setAcademicYears(data);
    }

    const getFeeReport = async () => {
        for (const key in input) {
            if (input[key] === "") return alert("select all fields");
        }

        const { data } = await axios.post("http://localhost:5000/fee-transaction/fee-report", input);
        setFeeReport(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3">
                        <h3 className="m-0 mb-4">Fee Report</h3>
                        <div className="grid">
                            <div className="col-4">
                                <Dropdown name="year" value={input.year} onChange={handleChange} options={academicYears} optionLabel="academic_year" optionValue="academic_year" placeholder="Select Year" />
                            </div>
                            <div className="col-4">
                                <Dropdown name="classId" value={input.classId} onChange={handleChange} options={classes} optionLabel="class_name" optionValue="class_id" placeholder="Select class" />
                            </div>

                            <div className="col-4">
                                <button className="btn btn-success" onClick={() => getFeeReport()}>
                                    get report
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body mx-0 pl-4" style={{ overflowY: "auto" }}>
                        {feeReport.length === 0 && (
                            <div>
                                <div style={{ textAlign: "center", paddingBottom: "13px" }}>
                                    <img src="../../../images/notfound.png" width="200" alt="" />
                                    <p>not found</p>
                                </div>
                            </div>
                        )}
                        {feeReport.length > 0 && (
                            <>
                                <table className="fee-report-table">
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>name</th>
                                            <th>total</th>
                                            <th>paid</th>
                                            <th>balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {feeReport.map((fee) => (
                                            <tr>
                                                <td>{fee.std_id}</td>
                                                <td>{fee.std_name}</td>
                                                <td>${fee.debit}</td>
                                                <td>${fee.credit}</td>
                                                <td>${fee.balance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button className="btn btn-primary mb-3 mt-3">print</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentFeeReport;
