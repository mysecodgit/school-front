import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Route, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
import { AppConfig } from "./AppConfig";

import Dashboard from "./components/Dashboard";
// import ButtonDemo from "./components/ButtonDemo";
// import ChartDemo from "./components/ChartDemo";
// import Documentation from "./components/Documentation";
// import FileDemo from "./components/FileDemo";
// import FloatLabelDemo from "./components/FloatLabelDemo";
import FormLayoutDemo from "./components/FormLayoutDemo";
// import InputDemo from "./components/InputDemo";
// import ListDemo from "./components/ListDemo";
// import MenuDemo from "./components/MenuDemo";
// import MessagesDemo from "./components/MessagesDemo";
// import MiscDemo from "./components/MiscDemo";
// import OverlayDemo from "./components/OverlayDemo";
// import MediaDemo from "./components/MediaDemo";
// import PanelDemo from "./components/PanelDemo";
// import TableDemo from "./components/TableDemo";
// import TreeDemo from "./components/TreeDemo";
// import InvalidStateDemo from "./components/InvalidStateDemo";
// import BlocksDemo from "./components/BlocksDemo";
// import IconsDemo from "./components/IconsDemo";

// import Crud from "./pages/Crud";
// import EmptyPage from "./pages/EmptyPage";
// import TimelineDemo from "./pages/TimelineDemo";

import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import "./App.scss";
import ProjectDemo from "./components/projects/ProjectDemo";
import ProjectDetails from "./components/projects/ProjectDetails";
import Shifts from "./components/shifts/shifts";
import AcademicYear from "./components/academicYear/academicYear";
import ExamTypes from "./components/examType/examTypes";
import Classes from "./components/classes/classes";
import Subjects from "./components/subjects/subjects";
import Students from "./components/students/students";
import Parents from "./components/parents/parents";
import ExamResult from "./components/examResult/examResult";
import Attendance from "./components/attendance/attendance";
import ExamResultReport from "./components/examResult/examResultReport";
import FeeType from "./components/feeType/feeType";
import FeesAllocation from "./components/feesAllocation/feesAllocation";
import Payments from "./components/payment/payments";
import AttandenceReport from "./components/attendance/attendanceReport";
import StudentFeeReport from "./components/reports/studentFeeReport";
import StudentDetails from "./components/students/studentDetails";

const $ = require("jquery");
$.DataTable = require("datatables.net");

const App = () => {
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        $(".dtable").DataTable();
    });

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode);
    };

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode);
    };

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const menu = [
        {
            label: "Home",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    to: "/",
                },
            ],
        },
        {
            label: "UI Components",
            icon: "pi pi-fw pi-sitemap",
            items: [
                {
                    label: "Academic",
                    icon: "pi pi-fw pi-id-card",
                    items: [
                        { label: "Shifts", icon: "pi pi-fw pi-id-card", to: "/shifts" },
                        { label: "Academic year", icon: "pi pi-fw pi-id-card", to: "/academic-year" },
                        { label: "Classes", icon: "pi pi-fw pi-id-card", to: "/classes" },
                        { label: "Subjects", icon: "pi pi-fw pi-id-card", to: "/subjects" },
                        { label: "Students", icon: "pi pi-fw pi-id-card", to: "/students" },
                        { label: "Parents", icon: "pi pi-fw pi-id-card", to: "/parents" },
                    ],
                },
                {
                    label: "Exams",
                    icon: "pi pi-fw pi-id-card",
                    items: [
                        { label: "Exam types", icon: "pi pi-fw pi-id-card", to: "/exam-type" },
                        { label: "Exam Results", icon: "pi pi-fw pi-id-card", to: "/exam-result" },
                    ],
                },
                {
                    label: "Fee management",
                    icon: "pi pi-fw pi-id-card",
                    items: [
                        { label: "Fee type", icon: "pi pi-fw pi-id-card", to: "/fee-type" },
                        { label: "Fees Allocation", icon: "pi pi-fw pi-id-card", to: "/fee-allocation" },
                        { label: "payments", icon: "pi pi-fw pi-id-card", to: "/payments" },
                    ],
                },

                { label: "Attandence", icon: "pi pi-fw pi-id-card", to: "/attandece" },
                {
                    label: "Reports",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        { label: "exam report", icon: "pi pi-fw pi-bookmark", to: "/exam-result/report" },
                        { label: "attendance report", icon: "pi pi-fw pi-book", to: "/attandence/report" },
                        { label: "student fee report", icon: "pi pi-fw pi-book", to: "/student-fee/report" },
                    ],
                },
            ],
        },
    ];

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": ripple === false,
        "layout-theme-light": layoutColorMode === "light",
    });

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />
            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} />
                    <Route path="/shifts" component={Shifts} />
                    <Route path="/academic-year" component={AcademicYear} />
                    <Route path="/exam-type" component={ExamTypes} />
                    <Route path="/classes" component={Classes} />
                    <Route path="/subjects" component={Subjects} />
                    <Route path="/students" exact component={Students} />
                    <Route path="/students/view/:id" component={StudentDetails} />
                    <Route path="/parents" component={Parents} />
                    <Route path="/exam-result" exact component={ExamResult} />
                    <Route path="/attandece" exact component={Attendance} />
                    <Route path="/fee-type" component={FeeType} />
                    <Route path="/fee-allocation" component={FeesAllocation} />
                    <Route path="/payments" component={Payments} />
                    <Route path="/exam-result/report" component={ExamResultReport} />
                    <Route path="/attandence/report" component={AttandenceReport} />
                    <Route path="/student-fee/report" component={StudentFeeReport} />
                    {/*<Route path="/input" component={InputDemo} />
                    <Route path="/floatlabel" component={FloatLabelDemo} />
                    <Route path="/invalidstate" component={InvalidStateDemo} />
                    <Route path="/button" component={ButtonDemo} />
                    <Route path="/table" component={TableDemo} />
                    <Route path="/list" component={ListDemo} />
                    <Route path="/tree" component={TreeDemo} />
                    <Route path="/panel" component={PanelDemo} />
                    <Route path="/overlay" component={OverlayDemo} />
                    <Route path="/media" component={MediaDemo} />
                    <Route path="/menu" component={MenuDemo} />
                    <Route path="/messages" component={MessagesDemo} />
                    <Route path="/blocks" component={BlocksDemo} />
                    <Route path="/icons" component={IconsDemo} />
                    <Route path="/file" component={FileDemo} />
                    {/* <Route path="/chart" render={() => <ChartDemo colorMode={layoutColorMode} location={location} />} /> */}
                    {/* <Route path="/misc" component={MiscDemo} /> */}
                    {/* <Route path="/timeline" component={TimelineDemo} /> */}
                    {/* <Route path="/crud" component={Crud} /> */}
                    {/* <Route path="/empty" component={EmptyPage} />  */}
                    {/* <Route path="/documentation" component={Documentation} /> */}
                </div>

                {/* <AppFooter layoutColorMode={layoutColorMode} /> */}
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange} layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
        </div>
    );
};

export default App;
