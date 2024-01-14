import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { userContext } from "./App";

export const AppTopbar = (props) => {
    const user = useContext(userContext);
    const handleLogut = () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "/#/login";
    };
    return (
        <div className="layout-topbar">
            <div className="toop-left">
                <Link to="/" className="layout-topbar-logo">
                    <img src={props.layoutColorMode === "light" ? "assets/layout/images/logo-dark.svg" : "assets/layout/images/logo-white.svg"} alt="logo" />
                    <span>SAKAI</span>
                </Link>
            </div>
            <div className="toop-right">
                <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                    <i className="pi pi-bars" />
                </button>

                <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                    <i className="pi pi-ellipsis-v" />
                </button>

                <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                    <li>
                        <span>{user.role + " " + user.username}</span>
                    </li>
                    {/* <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-calendar" />
                            <span>Events</span>
                        </button>
                    </li> */}
                    {/* <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-cog" />
                            <span>Settings</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-user" />
                            <span>Profile</span>
                        </button>
                    </li> */}
                    <li>
                        <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={handleLogut}>
                            logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};
