import { useContext } from "react";
import Dashboard from "./dashboard";
import { userContext } from "../../App";
import TeacherDashboard from "./teacherDashboard";
import StudentDashboard from "./studentDashboard";

const DecideDashboard = () => {
    const user = useContext(userContext);

    if (user.role === "admin") return <Dashboard />;
    if (user.role === "teacher") return <TeacherDashboard />;
    if (user.role === "student") return <StudentDashboard />;
    return "something";
};

export default DecideDashboard;
