import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import moment from "moment/moment";
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

export const renderStatus = (status) => {
    if (status === 1) return "P";
    if (status === 0) return "A";
    return "";
};

const AttandenceReport = () => {
    const [attendaceReport, setAttendanceReport] = useState([]);
    const [input, setInput] = useState({
        year: moment().format("YYYY"),
        month: new Date().getMonth() + 1,
        classId: "",
    });

    const [dates, setDates] = useState([]);
    const [students, setStudents] = useState([]);
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

    const getAttendanceReport = async () => {
        for (const key in input) {
            if (input[key] === "") return alert("select all fields");
        }

        console.log(input);
        const { data } = await axios.post("http://localhost:5000/attendance/class/monthly/report", input);

        const dates = data.reduce((a, c) => {
            if (!a.includes(moment(c.date).format("ddd") + " " + c.date.split("-")[2])) {
                a.push(moment(c.date).format("ddd") + " " + c.date.split("-")[2]);
            }
            return a;
        }, []);

        const students = data.reduce((a, c) => {
            if (!a.includes(a.find((o) => o.std_id === c.std_id))) {
                a.push(c);
            }
            return a;
        }, []);

        setDates(dates);
        setStudents(students);
        setAttendanceReport(data);
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
                        <h3 className="m-0 mb-4">Attendence Report</h3>
                        <div className="grid">
                            <div className="col-3">
                                <Dropdown name="year" value={input.year} onChange={handleChange} options={academicYears} optionLabel="academic_year" optionValue="academic_year" placeholder="Select Year" />
                            </div>
                            <div className="col-3">
                                <Dropdown name="month" value={input.month} onChange={handleChange} options={months} optionLabel="month" optionValue="id" placeholder="Select month" />
                            </div>
                            <div className="col-3">
                                <Dropdown name="classId" value={input.classId} onChange={handleChange} options={classes} optionLabel="class_name" optionValue="class_id" placeholder="Select class" />
                            </div>

                            <div className="col-3">
                                <button className="btn btn-success" onClick={() => getAttendanceReport()}>
                                    get report
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body mx-0 pl-4" style={{ overflowY: "auto" }}>
                        {attendaceReport.length === 0 && (
                            <div>
                                <div style={{ textAlign: "center", paddingBottom: "13px" }}>
                                    <img src="../../../images/notfound.png" width="200" alt="" />
                                    <p>not found</p>
                                </div>
                            </div>
                        )}
                        {attendaceReport.length > 0 && (
                            <>
                                <table style={{ width: "none" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ border: "1px solid grey", padding: "5px 10px" }}>ID</th>
                                            <th style={{ border: "1px solid grey", padding: "5px 10px" }}>Student</th>
                                            {dates.map((date) => (
                                                <th style={{ border: "1px solid grey", padding: "5px 10px" }}>{date}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((t) => {
                                            return (
                                                <tr>
                                                    <td style={{ border: "1px solid grey", padding: "5px 10px" }}>{t.std_id}</td>
                                                    <td style={{ border: "1px solid grey", padding: "5px 10px", textWrap: "nowrap" }}>{t.std_name}</td>
                                                    {dates.map((d) => (
                                                        <>
                                                            {attendaceReport
                                                                .filter((f) => f.std_id === t.std_id && moment(f.date).format("ddd") + " " + f.date.split("-")[2] === d)
                                                                .map((m) => (
                                                                    <td style={{ border: "1px solid grey", padding: "5px 10px" }}>{renderStatus(m.status)}</td>
                                                                ))}
                                                        </>
                                                    ))}
                                                </tr>
                                            );
                                        })}
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

export default AttandenceReport;
