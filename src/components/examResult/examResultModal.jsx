import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";

const ExamResultModal = ({ show, handleHide, input, setInput, handleSave }) => {
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [examTypes, setExamTypes] = useState([]);
    const [subjects, setSubjects] = useState([]);

    console.log(input);

    async function getClasses() {
        const { data } = await axios.get("http://localhost:5000/class/list");
        setClasses(data);
    }

    async function getStudentsOfAclass(classId) {
        const { data } = await axios.get("http://localhost:5000/student/student-of-class/" + classId);
        setStudents(data);
    }

    async function getExamTypes() {
        const { data } = await axios.get("http://localhost:5000/exam-type/list");
        setExamTypes(data);
    }

    async function getSubjects() {
        const { data } = await axios.get("http://localhost:5000/subject/list");
        setSubjects(data);
    }

    async function getAcademicYears() {
        const { data } = await axios.get("http://localhost:5000/academic-year/list");
        setAcademicYears(data);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, "=>", value);
        setInput({ ...input, [name]: value });
    };

    useEffect(() => {
        getClasses();
        getExamTypes();
        getAcademicYears();
        getSubjects();
    }, []);

    let initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            getStudentsOfAclass(input.classId);
        }
    }, [input.classId]);

    return (
        <Dialog header={input.result_id ? "update" : "new"} position="top" visible={show} style={{ width: "50vw" }} modal onHide={() => handleHide()}>
            <div className="grid">
                <div className="col-6">
                    <div className="mb-3">
                        <label htmlFor="">Academic Year</label>
                        <Dropdown value={input.academicYearId} name="academicYearId" onChange={handleChange} options={academicYears} optionLabel="academic_year" optionValue="academic_year_id" placeholder="Select academic year" />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label htmlFor="">Exam Type</label>
                        <Dropdown value={input.examTypeId} name="examTypeId" onChange={handleChange} options={examTypes} optionLabel="exam_type" optionValue="exam_type_id" placeholder="Select type" />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label htmlFor="">Class</label>
                        <Dropdown value={input.classId} name="classId" onChange={handleChange} options={classes} optionLabel="class_name" optionValue="class_id" placeholder="Select class" />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label htmlFor="">Student</label>
                        <Dropdown value={input.studentId} name="studentId" onChange={handleChange} options={students} optionLabel="std_name" optionValue="std_id" placeholder="Select student" />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label htmlFor="">Subject</label>
                        <Dropdown value={input.subjectId} name="subjectId" onChange={handleChange} options={subjects} optionLabel="subject_name" optionValue="subject_id" placeholder="Select subject" />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label htmlFor="">Mark</label>
                        <InputText value={input.mark} name="mark" type="number" placeholder="mark" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-12">
                    <div className="mb-3">
                        <label htmlFor="">Date</label>
                        <InputText value={input.rs_date?.split("T")[0]} name="resultDate" type="date" onChange={(e) => setInput({ ...input, rs_date: e.target.value })} />
                    </div>
                </div>
            </div>
            <button className={`btn btn-${input.result_id ? "primary" : "success"}`} onClick={handleSave}>
                {input.result_id ? "update" : "save"}
            </button>
        </Dialog>
    );
};

export default ExamResultModal;
