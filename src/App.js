import React, { useState, useEffect, useRef, createContext } from "react";
import classNames from "classnames";
import { Route, useLocation, Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
import { AppConfig } from "./AppConfig";

import Dashboard from "./components/dashboard/dashboard";
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
import Expenses from "./components/expense/expense";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import { Switch, BrowserRouter } from "react-router-dom";
import Teachers from "./components/teachers/teachers";
import DecideDashboard from "./components/dashboard/decideDashboard";

const $ = require("jquery");
$.DataTable = require("datatables.net");

export const userContext = createContext();

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

    if (location.pathname === "/") {
        console.log(location);
        window.location.href = "/#/dashboard";
    }

    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("loggedUser")));

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

    const menu = !loggedUser
        ? []
        : [
              {
                  label: "Home",
                  items: [
                      {
                          label: "Dashboard",
                          icon: "pi pi-fw pi-home",
                          to: "/dashboard",
                          roles: ["admin", "teacher", "student"],
                      },
                  ],
              },
              {
                  label: "Menu",
                  icon: "pi pi-fw pi-sitemap",
                  items: [
                      {
                          label: "Academic",
                          icon: "pi pi-fw pi-id-card",
                          items: [
                              { label: "Shifts", icon: "pi pi-fw pi-id-card", to: "/shifts", roles: ["admin"] },
                              { label: "Academic year", icon: "pi pi-fw pi-id-card", to: "/academic-year", roles: ["admin"] },
                              { label: "Classes", icon: "pi pi-fw pi-id-card", to: "/classes", roles: ["admin", "teacher"] },
                              { label: "Subjects", icon: "pi pi-fw pi-id-card", to: "/subjects", roles: ["admin", "teacher"] },
                              { label: "Students", icon: "pi pi-fw pi-id-card", to: "/students", roles: ["admin", "teacher", "student"] },
                              { label: "Parents", icon: "pi pi-fw pi-id-card", to: "/parents", roles: ["admin", "teacher"] },
                              { label: "Teachers", icon: "pi pi-fw pi-id-card", to: "/teachers", roles: ["admin"] },
                          ],
                          roles: ["admin", "teacher", "student"],
                      },
                      {
                          label: "Exams",
                          icon: "pi pi-fw pi-id-card",
                          items: [
                              { label: "Exam types", icon: "pi pi-fw pi-id-card", to: "/exam-type", roles: ["admin"] },
                              { label: "Exam Results", icon: "pi pi-fw pi-id-card", to: "/exam-result", roles: ["admin", "teacher"] },
                          ],
                          roles: ["admin", "teacher"],
                      },
                      {
                          label: "Fee management",
                          icon: "pi pi-fw pi-id-card",
                          items: [
                              { label: "Fee type", icon: "pi pi-fw pi-id-card", to: "/fee-type", roles: ["admin"] },
                              { label: "Fees Allocation", icon: "pi pi-fw pi-id-card", to: "/fee-allocation", roles: ["admin"] },
                              { label: "payments", icon: "pi pi-fw pi-id-card", to: "/payments", roles: ["admin"] },
                          ],
                          roles: ["admin"],
                      },

                      { label: "Attandence", icon: "pi pi-fw pi-id-card", to: "/attandece", roles: ["admin", "teacher", "student"] },
                      { label: "Expenses", icon: "pi pi-fw pi-id-card", to: "/expense", roles: ["admin"] },
                      {
                          label: "Reports",
                          icon: "pi pi-fw pi-bookmark",
                          items: [
                              { label: "exam report", icon: "pi pi-fw pi-bookmark", to: "/exam-result/report", roles: ["admin", "teacher", "student"] },
                              { label: "attendance report", icon: "pi pi-fw pi-book", to: "/attandence/report", roles: ["admin", "teacher", "student"] },
                              { label: "student fee report", icon: "pi pi-fw pi-book", to: "/student-fee/report", roles: ["admin", "teacher", "student"] },
                          ],
                          roles: ["admin", "teacher", "student"],
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

    if (!loggedUser) return (window.location.href = "/#/login");

    return (
        <userContext.Provider value={loggedUser}>
            <div className={wrapperClass} onClick={onWrapperClick} atbute="hello">
                <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

                <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />
                <div className="layout-sidebar" onClick={onSidebarClick}>
                    <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                </div>

                <div className="layout-main-container">
                    <div className="layout-main">
                        <ProtectedRoute allowedRoles={["admin", "teacher", "student"]} path="/dashboard" render={() => <DecideDashboard />} />
                        <ProtectedRoute allowedRoles={["admin"]} path="/shifts" component={Shifts} />
                        <ProtectedRoute allowedRoles={["admin"]} path="/academic-year" component={AcademicYear} />
                        <ProtectedRoute allowedRoles={["admin"]} path="/exam-type" component={ExamTypes} />
                        <ProtectedRoute allowedRoles={["admin", "teacher"]} path="/classes" component={Classes} />
                        <ProtectedRoute allowedRoles={["admin", "teacher"]} path="/subjects" component={Subjects} />
                        <ProtectedRoute allowedRoles={["admin", "teacher"]} path="/students" exact component={Students} />
                        <ProtectedRoute allowedRoles={["admin", "student"]} path="/students/view/:id" component={StudentDetails} />
                        <ProtectedRoute allowedRoles={["admin", "teacher"]} path="/parents" component={Parents} />
                        <ProtectedRoute allowedRoles={["admin"]} path="/teachers" component={Teachers} />
                        <ProtectedRoute allowedRoles={["admin"]} path="/exam-result" exact component={ExamResult} />
                        <ProtectedRoute allowedRoles={["admin", "teacher"]} path="/attandece" exact component={Attendance} />
                        <ProtectedRoute allowedRoles={["admin"]} path="/expense" exact component={Expenses} />
                        <ProtectedRoute allowedRoles={["admin"]} path="/fee-type" component={FeeType} />
                        <ProtectedRoute allowedRoles={["admin"]} path="/fee-allocation" component={FeesAllocation} />
                        <ProtectedRoute allowedRoles={["admin"]} path="/payments" component={Payments} />
                        <ProtectedRoute allowedRoles={["admin"]} path="/exam-result/report" component={ExamResultReport} />
                        <ProtectedRoute allowedRoles={["admin"]} path="/attandence/report" component={AttandenceReport} />
                        <ProtectedRoute allowedRoles={["admin"]} path="/student-fee/report" component={StudentFeeReport} />
                    </div>

                    {/* <AppFooter layoutColorMode={layoutColorMode} /> */}
                </div>

                <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange} layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

                <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                    <div className="layout-mask p-component-overlay"></div>
                </CSSTransition>
            </div>
        </userContext.Provider>
    );
};

export default App;
