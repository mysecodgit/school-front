import axios from "axios";
import { useEffect, useState } from "react";

import "../../table.css";
import ExamResultModal from "./examResultModal";

const url = "http://localhost:5000/exam-result/";

const initialInput = {};

const ExamResult = () => {
    const [results, setResults] = useState([]);
    const [input, setInput] = useState(initialInput);

    const [show, setShow] = useState(false);

    const handleHide = () => {
        setShow(false);
        setInput(initialInput);
    };

    async function getResults() {
        const { data } = await axios.get(url + "list");
        setResults(data);
    }

    useEffect(() => {
        getResults();
    }, []);

    const handleUpdate = (resutl) => {
        setInput(resutl);
        setShow(true);
    };

    const handleDelete = async (resutl) => {
        const res = await axios.delete(url + `delete/${resutl.result_id}`);
        if (res.status === 200) {
            getResults();
        }
    };

    const handleSave = async () => {
        if (input.result_id) {
            const obj = {
                examTypeId: input.exam_type_id,
                academicYearId: input.academic_year_id,
                studentId: input.std_id,
                subjectId: input.subject_id,
                classId: input.class_id,
                mark: input.mark,
                resultDate: input.rs_date,
            };
            // return console.log(obj);
            const res = await axios.put(url + `update/${input.result_id}`, obj);
            if (res.status === 200) {
                handleHide();
                getResults();
            }
        } else {
            console.log(input);
            const res = await axios.post(url + "new", input);
            if (res.status === 200) {
                handleHide();
                getResults();
            }
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card pb-0">
                    <div className="card-header mb-3 d-flex-between-center">
                        <h3 className="m-0">Exam Result</h3>
                        <button className="btn btn-success" onClick={() => setShow(true)}>
                            add new
                        </button>
                    </div>
                    <ExamResultModal show={show} handleHide={handleHide} input={input} setInput={setInput} handleSave={handleSave} />
                    <div className="card-body mx-0">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>academic year</th>
                                    <th>class</th>
                                    <th>exam type</th>
                                    <th>student</th>
                                    <th>Subject</th>
                                    <th>mark</th>
                                    <th>result date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((result) => (
                                    <tr key={result.result_id}>
                                        <td>{result.result_id}</td>
                                        <td>{result.academic_year}</td>
                                        <td>{result.class_name}</td>
                                        <td>{result.exam_type}</td>
                                        <td>{result.std_name}</td>
                                        <td>{result.subject_name}</td>
                                        <td>{result.mark}</td>
                                        <td>{result?.rs_date?.split("T")[0]}</td>
                                        <td>
                                            <i className="bx bx-sm bx-edit text-success mr-2" onClick={() => handleUpdate(result)}></i>
                                            <i className="bx bx-sm bx-trash text-danger" onClick={() => handleDelete(result)}></i>
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

export default ExamResult;
