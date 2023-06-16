import React from "react";
import "../css/project.css";

const ProjectDetails = () => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-3 pl-2 mr-4">Project Overview</h3>
                <span>
                    <button className="btn bg-primary btn-sm">
                        <i className="bx bx-plus mr-1"></i>Board
                    </button>
                </span>
            </div>
            <div className="row ml-0 pl-0">
                <div class="md:col-8">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex">
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
                                    <h5 class="text-truncate font-size-15">New admin Design</h5>
                                    <p class="text-muted">It will be as simple as Occidental</p>
                                </div>
                            </div>
                            <h5 class="font-size-15 mt-2rem">Project Details :</h5>
                            <p class="text-muted">
                                To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,
                            </p>
                            {/* <div class="text-muted mt-4">
                                <p>
                                    <i class="mdi mdi-chevron-right text-primary me-1"></i>To achieve this, it would be necessary
                                </p>
                                <p>
                                    <i class="mdi mdi-chevron-right text-primary me-1"></i>Separate existence is a myth.
                                </p>
                                <p>
                                    <i class="mdi mdi-chevron-right text-primary me-1"></i>If several languages coalesce
                                </p>
                            </div> */}
                            <div class="task-dates row">
                                <div class="col-6 col-sm-4">
                                    <div class="mt-4">
                                        <h5 class="font-size-14">
                                            <i class="bx bx-calendar me-1 text-primary"></i> Start Date
                                        </h5>
                                        <p class="text-muted mb-0">08 Sept, 2019</p>
                                    </div>
                                </div>
                                <div class="col-6 col-sm-4">
                                    <div class="mt-4">
                                        <h5 class="font-size-14">
                                            <i class="bx bx-calendar-check me-1 text-primary"></i> Due Date
                                        </h5>
                                        <p class="text-muted mb-0">2019-10-15</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md:col-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="mb-4 card-title">Team Members</div>
                            <div class="table-responsive">
                                <table class="table align-middle table-nowrap table member-table">
                                    <tbody>
                                        <tr>
                                            <td style={{ width: "10px" }}>
                                                {/* <div class="avatar-xs">
                                                    <span class="avatar-title rounded-circle bg-primary text-white font-size-16">A</span>
                                                </div> */}
                                                <img src="/images/avatar/profile.jpg" className="rounded-circle avatar-xs" />
                                            </td>
                                            <td>
                                                <h5 class="font-size-14 m-0">
                                                    <a class="text-dark" href="/">
                                                        Janice Cole
                                                    </a>
                                                </h5>
                                            </td>
                                            <td>
                                                <div>
                                                    <a class="badge bg-primary bg-soft text-primary font-size-11 me-1" href="/projects-overview/0">
                                                        Frontend
                                                    </a>
                                                    <a class="badge bg-primary bg-soft text-primary font-size-11 me-1" href="/projects-overview/0">
                                                        UI
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "50px" }}>
                                                <div class="avatar-xs">
                                                    <span class="avatar-title rounded-circle bg-primary text-white font-size-16">A</span>
                                                </div>
                                            </td>
                                            <td>
                                                <h5 class="font-size-14 m-0">
                                                    <a class="text-dark" href="/">
                                                        Steve Foster
                                                    </a>
                                                </h5>
                                            </td>
                                            <td>
                                                <div>
                                                    <a class="badge bg-primary bg-soft text-primary font-size-11 me-1" href="/projects-overview/0">
                                                        UI/UX
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "10px" }}>
                                                <div class="avatar-xs">
                                                    <span class="avatar-title rounded-circle bg-primary text-white font-size-16">A</span>
                                                </div>
                                            </td>
                                            <td>
                                                <h5 class="font-size-14 m-0">
                                                    <a class="text-dark" href="/">
                                                        Aeffrey Walker
                                                    </a>
                                                </h5>
                                            </td>
                                            <td>
                                                <div>
                                                    <a class="badge bg-primary bg-soft text-primary font-size-11 me-1" href="/projects-overview/0">
                                                        Backend
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "10px" }}>
                                                <div class="avatar-xs">
                                                    <span class="avatar-title rounded-circle bg-primary text-white font-size-16">A</span>
                                                </div>
                                            </td>
                                            <td>
                                                <h5 class="font-size-14 m-0">
                                                    <a class="text-dark" href="/">
                                                        Daniel Candles
                                                    </a>
                                                </h5>
                                            </td>
                                            <td>
                                                <div>
                                                    <a class="badge bg-primary bg-soft text-primary font-size-11 me-1" href="/projects-overview/0">
                                                        Frontend
                                                    </a>
                                                    <a class="badge bg-primary bg-soft text-primary font-size-11 me-1" href="/projects-overview/0">
                                                        UI
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "10px" }}>
                                                <div class="avatar-xs">
                                                    <span class="avatar-title rounded-circle bg-primary text-white font-size-16">A</span>
                                                </div>
                                            </td>
                                            <td>
                                                <h5 class="font-size-14 m-0">
                                                    <a class="text-dark" href="/">
                                                        Steve Foster
                                                    </a>
                                                </h5>
                                            </td>
                                            <td>
                                                <div>
                                                    <a class="badge bg-primary bg-soft text-primary font-size-11 me-1" href="/projects-overview/0">
                                                        UI/UX
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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

export default React.memo(ProjectDetails, comparisonFn);
