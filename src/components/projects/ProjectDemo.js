import React from "react";
import { Link } from "react-router-dom";
import "../css/project.css";

const ProjectDemo = () => {
    return (
        <>
            <h3 className="mb-3 pl-2">Projects</h3>
            <div className="row ml-0 pl-0">
                <div className="col-12 md:col-4">
                    <div className="card no-padding">
                        <div className="card-body proj-card-padding">
                            <div className="d-flex">
                                <div className="avatar-md mr-4">
                                    <span className="avatar-title rounded-circle bg-light text-danger font-size-16">
                                        <div class="avatar-group-item">
                                            <a class="d-inline-block" id="member3" href="/projects-grid">
                                                <div class="avatar-xls">
                                                    <span class="avatar-title rounded-circle bg-danger text-white font-size-16">NP</span>
                                                </div>
                                            </a>
                                        </div>
                                    </span>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h5 class="text-truncate font-size-15">
                                        <Link class="text-dark" to="/projects/details">
                                            New admin Design
                                        </Link>
                                    </h5>
                                    <p class="text-muted mb-4">It will be as simple as Occidental </p>
                                    <div class="avatar-group">
                                        <div class="avatar-group-item">
                                            <a class="d-inline-block" id="member3" href="/projects-grid">
                                                <div class="avatar-xs">
                                                    <span class="avatar-title rounded-circle bg-danger text-white font-size-16">A</span>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="avatar-group-item">
                                            <a class="d-inline-block" id="member3" href="/projects-grid">
                                                <div class="avatar-xs">
                                                    <span class="avatar-title rounded-circle bg-success text-white font-size-16">A</span>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="avatar-group-item">
                                            <a class="d-inline-block" id="member3" href="/projects-grid">
                                                <div class="avatar-xs">
                                                    <span class="avatar-title rounded-circle bg-primary text-white font-size-16">A</span>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="avatar-group-item">
                                            <a class="d-inline-block" id="member3" href="/projects-grid">
                                                <div class="avatar-xs">
                                                    <span class="avatar-title rounded-circle bg-secondary text-white font-size-16">A</span>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="avatar-group-item">
                                            <a class="d-inline-block" id="member3" href="/projects-grid">
                                                <div class="avatar-xs">
                                                    <span class="avatar-title rounded-circle bg-warning text-white font-size-16">A</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-3 border-top">
                            <ul class="list-inline mb-0">
                                <li class="list-inline-item">
                                    <span class="bg-success badge bg-success">Completed</span>
                                </li>
                                <li class="list-inline-item" id="dueDate">
                                    <i class="pi pi-calendar mr-05"></i> 2019-10-15
                                </li>
                                <li class="list-inline-item" id="comments">
                                    <i class="bx bx-comment-dots mr-05"></i> 214
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(ProjectDemo, comparisonFn);
