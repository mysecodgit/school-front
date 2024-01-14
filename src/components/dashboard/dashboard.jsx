import { useEffect, useState } from "react";
import WidgetCard from "./widgetCard";
import axios from "axios";
const url = "http://localhost:5000/dashboard/";

const Dashboard = () => {
    const [cardsInfo, setCardsInfo] = useState({});

    const getCardInfo = async () => {
        const { data } = await axios.get(url + "summary");
        setCardsInfo(data);
    };

    useEffect(() => {
        getCardInfo();
    }, []);

    return (
        <>
            <h3 className="mb-5">Dashboard</h3>
            <div className="grid">
                {/* cards starts */}
                <WidgetCard title={"Classes"} value={cardsInfo?.totalClasses} icon="pi pi-shopping-cart text-blue-500" />
                <WidgetCard title={"Students"} value={cardsInfo?.totalStudents} icon="pi pi-map-marker text-orange-500" />
                <WidgetCard title={"Parents"} value={cardsInfo?.totalParents} icon="pi pi-map-marker text-orange-500" />
                <WidgetCard title={"Teachers"} value={cardsInfo?.totalTeachers} icon="pi pi-inbox text-cyan-500" />
                <WidgetCard title={"Users"} value={cardsInfo?.totalUsers} icon="pi pi-comment text-purple-500" />
                <WidgetCard title={"Fee Due (this month)"} value={cardsInfo?.due} valuePrefix={"$"} icon="pi pi-comment text-purple-500" />
                <WidgetCard title={"Collected (this month)"} value={cardsInfo?.collected} valuePrefix={"$"} icon="pi pi-comment text-purple-500" />
                <WidgetCard title={"Expense (this month)"} value={cardsInfo?.expense} valuePrefix={"$"} icon="pi pi-comment text-purple-500" />
                {/* cards ends */}
            </div>
        </>
    );
};

export default Dashboard;
