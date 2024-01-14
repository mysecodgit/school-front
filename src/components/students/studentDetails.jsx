import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { renderStatus } from "../attendance/attendanceReport";

const url = "http://localhost:5000/";

const StudentDetails = () => {
    const [student, setStudent] = useState({});
    const [statement, setSTatement] = useState([]);
    const [examTypes, setExamTypes] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [exams, setExams] = useState([]);

    const [days, setDays] = useState([]);
    const [months, setMonths] = useState([]);
    const [attandeReport, setAttandenceReport] = useState([]);

    const { id } = useParams();

    const getStudentInfo = async (id) => {
        const { data } = await axios.get(url + `student/${id}`);
        setStudent(data);
    };

    const getStudentAttendance = async (id) => {
        const { data } = await axios.post(url + `attendance/student/yearly/report`, {});
        const days = data.reduce((a, c) => {
            if (!a.includes(c.date.split("-")[2])) {
                a.push(c.date.split("-")[2]);
            }
            return a;
        }, []);

        const months = data.reduce((a, c) => {
            if (!a.includes(c.month.slice(0, 3))) {
                a.push(c.month.slice(0, 3));
            }
            //comment
            return a;
        }, []);

        setDays(days);
        setMonths(months);
        setAttandenceReport(data);
    };

    const getStudentExams = async (id) => {
        const { data } = await axios.get(url + `student/exams/${id}`);

        const types = data.reduce((a, c) => {
            if (!a.includes(c.exam_type)) {
                a.push(c.exam_type);
            }
            return a;
        }, []);

        const subjects = data.reduce((a, c) => {
            if (!a.includes(c.subject_name)) {
                a.push(c.subject_name);
            }
            return a;
        }, []);

        setExamTypes(types);
        setSubjects(subjects);
        setExams(data);
    };

    const getStudentFees = async (id) => {
        const { data } = await axios.get(url + `student/statement/${id}`);
        setSTatement(data);
    };

    useEffect(() => {
        if (id) {
            getStudentInfo(id);
            getStudentFees(id);
            getStudentExams(id);
            getStudentAttendance(id);
        }
    }, []);

    return (
        <div className="grid">
            <div className="col-3">
                <div className="card px-0 py-0">
                    <div className="card-header px-3 py-4" style={{ borderBottom: "1px solid #333" }}>
                        {/* <div
                            style={{
                                width: "80px",
                                height: "80px",
                                background: "green",
                                borderRadius: "50%",
                            }}
                        ></div> */}
                        <h5>{student.std_name}</h5>
                        <p>ID : {student.std_id}</p>
                    </div>
                    <div className="card-body">
                        <div className="flex align-items-center justify-content-between border border-bottom px-3 py-2">
                            <h6 className="mb-0">Class</h6>
                            <span>{student.class_name}</span>
                        </div>
                        <div className="flex align-items-center justify-content-between border border-bottom px-3 py-2">
                            <h6 className="mb-0">gender</h6>
                            <span>{student.gender}</span>
                        </div>
                        <div className="flex align-items-center justify-content-between border border-bottom px-3 py-2">
                            <h6 className="mb-0">parent</h6>
                            <span>{student.parent_name}</span>
                        </div>
                        <div className="flex align-items-center justify-content-between px-3 py-2">
                            <h6 className="mb-0">phone</h6>
                            <span>{student.phone}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-9">
                {/* <div className="card">
                    <div className="card-body">body</div>
                </div> */}
                <TabView>
                    <TabPanel header="Fees">
                        <table className="border border-1">
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>date</th>
                                    <th>charged</th>
                                    <th>paid</th>
                                    <th>balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {statement.map((stmt) => (
                                    <tr>
                                        <td className="border border-bottom-1">{stmt.transaction_id}</td>
                                        <td className="border border-bottom-1">{stmt.date}</td>
                                        <td className={`border border-bottom-1 ${stmt.debit > 0 ? "text-dnger" : ""}`}>${stmt.debit}</td>
                                        <td className={`border border-bottom-1 ${stmt.credit > 0 ? "text-reen" : ""}`}>${stmt.credit}</td>
                                        <td className="border border-bottom-1">${stmt.balance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </TabPanel>
                    <TabPanel header="Attandence">
                        <button className="btn bg-success" onClick={() => printReport()}>
                            print
                        </button>
                        <div className="yearly-report">
                            <table style={{ width: "none" }} className="yearly-report">
                                <thead>
                                    <tr>
                                        <th style={{ border: "1px solid #333", padding: "5px 10px" }}>Date month</th>
                                        {months.map((month) => (
                                            <th style={{ border: "1px solid #333", padding: "5px 10px" }}>{month}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {days.map((day) => (
                                        <tr>
                                            <td style={{ border: "1px solid #333", padding: "5px 10px" }}>{day}</td>
                                            {/* {months.map((month) => {
                                            return attandeReport
                                                .filter((att) => att.month.slice(0, 3) === month && att.date.split("-")[2] === day)
                                                .map((obj, index) => {
                                                    return <td style={{ border: "1px solid #333", padding: "5px 10px" }}>{renderStatus(obj.status)}</td>;
                                                });
                                        })} */}
                                            {months.map((month) => {
                                                let status = attandeReport.filter((att) => att.month.slice(0, 3) === month && att.date.split("-")[2] === day)[0]?.status;
                                                return <td style={{ border: "1px solid #333", padding: "5px 10px" }}>{renderStatus(status)}</td>;
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </TabPanel>
                    <TabPanel header="Exam">
                        {examTypes.map((type) => (
                            <table className="mb-3 border border-1">
                                <thead>
                                    <tr>
                                        <th className="border border-1" colSpan={2}>
                                            {type}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjects.map((sub) => (
                                        <tr>
                                            <td className="border border-1">{sub}</td>
                                            <td className="border border-1">{exams.filter((exam) => exam.exam_type == type && exam.subject_name == sub)[0]?.mark}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ))}
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default StudentDetails;

function printReport() {
    var prtContent = document.querySelector(".yearly-report").innerHTML;
    var WinPrint = window.open("");
    WinPrint.document.write("<html><head>");
    // WinPrint.document.write('<link rel="stylesheet" href=assets/table.css>');
    WinPrint.document.write(`</head>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    :root {
        --clr-primary: #d0def2;
        --clr-primary-light: #f3f8fe;
        --clr-primary-dark: #a7bad3;
        --clr-gray100: #f9fbff;
        --clr-gray150: #f4f6fb;
        --clr-gray200: #eef1f6;
        --clr-gray300: #e1e5ee;
        --clr-gray400: #767b91;
        --clr-gray500: #4f546c;
        --clr-gray600: #2a324b;
        --clr-gray700: #161d34;
    
        /*   border radius */
        --radius: 0.2rem;
    }
   
        body{
            font-family:'Poppins',sans-serif;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            /* box-shadow: 20px 20px 20px 5px var(--clr-primary-dark); */
            background-color: white;
            text-align: left;
            /* margin-left: -1.5rem; */
        }
    
        th {
            background-color: var(--clr-primary);
            -webkit-print-color-adjust: exact;
            padding: 0.75rem 2rem;
            text-transform: uppercase;
            letter-spacing: 0.1rem;
            font-size: 0.7rem;
            font-weight: 900;
        }
    
        td {
            padding: 1rem 2rem;
        }
    
        tr:nth-child(even) {
            background-color: var(--clr-primary-light);
        }
    </style>
    <body onload="print();close();">`);
    WinPrint.document.write(`
        <div style="text-align:center;">
            <h3 style="margin:10px 0;">Attendance Report</h3>
            <h4 style="margin:0;">2023</h4>
            <p style="margin:10px 0;">Hudeifa abdirashid</p>
        </div>
    `);
    WinPrint.document.write(prtContent);
    WinPrint.document.write("</body></html>");
    WinPrint.focus();
    WinPrint.document.close();
}
