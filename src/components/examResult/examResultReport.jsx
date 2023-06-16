import axios from "axios";
import moment from "moment/moment";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

const url = "http://localhost:5000/exam-result/";

const ExamResultReport = () => {
    const [classes, setClasses] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [examTypes, setExamTypes] = useState([]);
    const [result, setResult] = useState([]);
    const [input, setInput] = useState({
        classId: "",
        examTypeId: "",
        academicYearId: "",
    });

    async function getAcademicYears() {
        const { data } = await axios.get("http://localhost:5000/academic-year/list");
        setAcademicYears(data);
    }

    async function getExamTypes() {
        const { data } = await axios.get("http://localhost:5000/exam-type/list");
        setExamTypes(data);
    }

    async function getClasses() {
        const { data } = await axios.get("http://localhost:5000/class/list");
        setClasses(data);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const getReport = async () => {
        const info = {
            classId: input.classId,
            examTypeId: input.examTypeId,
            academicYearId: input.academicYearId,
        };
        const { data } = await axios.post(`http://localhost:5000/exam-result/report`, info);
        console.log(data);
        setResult(data);
    };

    useEffect(() => {
        getClasses();
        getAcademicYears();
        getExamTypes();
    }, []);
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3">
                        <h3 className="m-0 mb-4">Exam Report</h3>
                        <div className="grid">
                            <div className="col-3">
                                <Dropdown value={input.academicYearId} name="academicYearId" onChange={handleChange} options={academicYears} optionLabel="academic_year" optionValue="academic_year_id" placeholder="Select Year" />
                            </div>
                            <div className="col-3">
                                <Dropdown value={input.classId} name="classId" onChange={handleChange} options={classes} optionLabel="class_name" optionValue="class_id" placeholder="Select class" />
                            </div>
                            <div className="col-3">
                                <Dropdown value={input.examTypeId} name="examTypeId" onChange={handleChange} options={examTypes} optionLabel="exam_type" optionValue="exam_type_id" placeholder="Select exam type" />
                            </div>
                            <div className="col-3">
                                <button onClick={() => getReport()} className="btn btn-success">
                                    get report
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body mx-0">
                        {result.length === 0 && (
                            <div>
                                <div style={{ textAlign: "center", paddingBottom: "13px" }}>
                                    <img src="../../../images/notfound.png" width="200" alt="" />
                                    <p>not found</p>
                                </div>
                            </div>
                        )}
                        {result.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        {Object.keys(result[0]).map((k) => (
                                            <th>{k}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.map((res) => (
                                        <tr>
                                            {Object.keys(res).map((k) => (
                                                <td>{res[k]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                                <button className="btn btn-primary ml-4 mb-3 mt-3">print</button>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamResultReport;
