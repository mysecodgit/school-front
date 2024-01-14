import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";

const url = "http://localhost:5000/";

const SubjectTeacherModal = ({ visible, setVisible, classId }) => {
    const [rowsData, setRowsData] = useState([]);

    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const handleAddRow = () => {
        const rowInput = {
            classId,
            subjectId: "",
            teacherId: "",
        };

        setRowsData([...rowsData, rowInput]);
    };

    const handleDeleteRow = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const rows = [...rowsData];
        rows[index][name] = value;
        setRowsData(rows);
    };

    const getSubjects = async () => {
        const { data } = await axios.get(url + "subject/list");
        setSubjects(data);
    };

    const getTeachers = async () => {
        const { data } = await axios.get(url + "teacher/list");
        setTeachers(data);
    };

    const getClassSubjects = async (id) => {
        const { data } = await axios.get(url + `class/${id}/subjects`);
        if (data.length > 0) {
            setRowsData(data);
        } else {
            setRowsData([
                {
                    classId,
                    subjectId: "",
                    teacherId: "",
                },
            ]);
        }
    };

    useEffect(() => {
        getSubjects();
        getTeachers();
    }, []);

    useEffect(() => {
        getClassSubjects(classId);
    }, [classId]);

    const handleSave = async () => {
        const res = await axios.post(url + "class/subjects/assign", { classId, data: rowsData });
        if (res.status === 200) {
            setVisible(false);
        }
    };

    const padding = {
        padding: "8px",
    };

    return (
        <Dialog header={"subjects of class " + classId} position="top" visible={visible} style={{ width: "40vw" }} modal onHide={() => setVisible(false)}>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Teacher</th>
                        <th>
                            <button className="btn btn-success btn-sm px-3 py-2 text-white" onClick={() => handleAddRow()}>
                                <i className="bx bx-plus"></i>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rowsData.map((row, index) => (
                        <tr key={index}>
                            <td style={padding}>
                                <Dropdown name="subjectId" value={row.subjectId} placeholder="Select subject" options={subjects} optionLabel="subject_name" optionValue="subject_id" onChange={(e) => handleChange(index, e)} />
                            </td>
                            <td style={padding}>
                                <Dropdown name="teacherId" value={row.teacherId} placeholder="Select teacher" options={teachers} optionLabel="teacher_name" optionValue="teacher_id" onChange={(e) => handleChange(index, e)} />
                            </td>
                            <td style={padding}>
                                <button className="btn bg-danger btn-sm" onClick={() => handleDeleteRow(index)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="btn bg-primary w-full mt-2" onClick={handleSave}>
                Save
            </button>
        </Dialog>
    );
};

export default SubjectTeacherModal;
