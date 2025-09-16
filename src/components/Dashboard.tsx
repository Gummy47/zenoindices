import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    RadialLinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import { fetchCompanies } from "../store/actions/companies/fetchCompanies";
import { useAppDispatch, useTypedSelector } from "../store/hooks";
import "./Dashboard.scss";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import SteeringIndices from "./SteeringIndices";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
);

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const { current: currentCompany, viewMode } = useTypedSelector(
        state => state.companies,
    );

    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    const currentData = currentCompany
        ? viewMode === "Actual"
            ? currentCompany.data?.Company?.Actual
            : currentCompany.data?.Company?.Previous
        : null;

    return (
        <div className="dashboard">
            <Sidebar />
            {!currentData ? (
                <div className="main-content">
                    <div className="dashboard-body">
                        <Spinner text="Loading dashboard data..." size={64} />
                    </div>
                </div>
            ) : (
                <div className="main-content">
                    <DashboardHeader />
                    <div className="dashboard-body">
                        <div className="dashboard-grid">
                            {/* First row - 4 columns */}
                            {/* Company details column */}
                            <div className="company-details">
                                <ul>
                                    <li>
                                        <p>
                                            ISIN :{" "}
                                            <span className="accent">
                                                {currentData.Details.ISIN}
                                            </span>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Industry :{" "}
                                            <span className="accent">
                                                {
                                                    currentData.Details
                                                        .Sector.Name
                                                }
                                            </span>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Place of exchange :{" "}
                                            <span className="accent">
                                                {
                                                    currentData.Details[
                                                        "Place of Exchange"
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="uco-z-details">
                                <div className="uco-details">
                                    <div className="uco-item">
                                        <div className="uco-label">
                                            UCO1
                                        </div>
                                        <p>{currentData.UCO1}</p>
                                    </div>
                                    <div className="uco-item">
                                        <div className="uco-label">
                                            UCO2
                                        </div>
                                        <p>{currentData.UCO2}</p>
                                    </div>
                                </div>
                                <div className="z-details">
                                    <div className="z-item">
                                        <div className="z-label">Z1</div>
                                        <p>{currentData.Z1}</p>
                                    </div>
                                    <div className="z-item">
                                        <div className="z-label">Z2</div>
                                        <p>{currentData.Z2}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Market details column */}
                            <div className="market-cap-details">
                                <div>
                                    <div className="market-cap-label">
                                        Market capitalization
                                    </div>
                                    <p>
                                        <span className="market-cap-value">
                                            {currentData.Details[
                                                "Market Capitalization"
                                            ].toLocaleString("de-DE")}
                                        </span>
                                        €
                                    </p>
                                </div>
                            </div>
                            <div className="data-details">
                                <div>
                                    <div className="data-label">Data</div>
                                    <p>{currentData.Data}</p>
                                </div>
                            </div>

                            <div className="triangle-graph-legend">
                                <div className="legend-item">
                                    <span className="legend-color vallourec"></span>
                                    <span>
                                        {
                                            currentCompany?.data?.Company?.[
                                                "Company Common Name"
                                            ]
                                        }
                                    </span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-color sector"></span>
                                    <span>Sector mean</span>
                                </div>
                            </div>

                            <div className="triangle-graph">
                                <Scatter
                                    data={{
                                        datasets: [
                                            {
                                                label:
                                                    currentCompany?.data
                                                        ?.Company?.[
                                                        "Company Common Name"
                                                    ] || "Company",
                                                data: [
                                                    {
                                                        x: currentData.Z1,
                                                        y: currentData.Z2,
                                                    },
                                                ],
                                                backgroundColor: "#DE4D12",
                                                borderColor: "#DE4D12",
                                                pointRadius: 6,
                                            },
                                            {
                                                label: "Sector mean",
                                                data: [
                                                    {
                                                        x: currentData
                                                            .Details.Sector[
                                                            "Z1 Mean"
                                                        ],
                                                        y: currentData
                                                            .Details.Sector[
                                                            "Z2 Mean"
                                                        ],
                                                    },
                                                ],
                                                backgroundColor: "#5D699C",
                                                borderColor: "#5D699C",
                                                pointRadius: 6,
                                            },
                                            {
                                                label: "Risk Boundary",
                                                data: [
                                                    { x: 0.0, y: 0.0 },
                                                    { x: 0.5, y: 0.5 },
                                                    { x: 1.0, y: 0.0 },
                                                ],
                                                showLine: true,
                                                borderColor: "#999",
                                                borderDash: [3, 4],
                                                borderWidth: 1,
                                                backgroundColor:
                                                    "transparent",
                                                pointRadius: 0,
                                                fill: false,
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                display: false,
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function (
                                                        context,
                                                    ) {
                                                        return `${context.dataset.label} (Z1: ${context.parsed.x}, Z2: ${context.parsed.y})`;
                                                    },
                                                },
                                            },
                                        },
                                        scales: {
                                            x: {
                                                type: "linear",
                                                position: "bottom",
                                                min: 0,
                                                max: 1,
                                                title: {
                                                    display: true,
                                                    align: "end",
                                                    text: "Z1",
                                                    color: "#000",
                                                },
                                                ticks: {
                                                    color: "#000",
                                                },
                                                grid: {
                                                    display: true,
                                                    color: "#000",
                                                },
                                                border: {
                                                    color: "#000",
                                                },
                                            },
                                            y: {
                                                type: "linear",
                                                min: 0,
                                                max: 0.6,
                                                title: {
                                                    display: true,
                                                    align: "end",
                                                    text: "Z2",
                                                    color: "#000",
                                                },
                                                ticks: {
                                                    color: "#000",
                                                },
                                                grid: {
                                                    color: "#000",
                                                    display: false,
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>

                            <div className="risks-title">
                                <h1>Risks</h1>
                            </div>
                            <div className="risks-values">
                                <div className="risk-values-item">
                                    <div className="risk-label">
                                        Value at risk
                                    </div>
                                    <p>
                                        {
                                            currentData.Risks[
                                                "Value At Risk"
                                            ]
                                        }
                                    </p>
                                </div>
                                <div className="risk-values-item">
                                    <div className="risk-label">CE</div>
                                    <p>{currentData.Risks.CE}</p>
                                </div>
                            </div>

                            {/* Second row - 1 column + 3 column span */}
                            <div className="change-liquidity-group">
                                <div className="change-details">
                                    <div className="change-label">
                                        Recent changes
                                    </div>
                                    <p>
                                        <span className="change-value">
                                            {currentData["Recent Changes"]}
                                        </span>
                                    </p>
                                </div>
                                <div className="liquidity-details">
                                    <div className="liquidity-label">
                                        Liquidity
                                    </div>
                                    <p>
                                        <span className="liquidity-value">
                                            {currentData.Liquidity} %
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="group-details">
                                <div>
                                    <div className="group-label">Group</div>
                                    <p>
                                        <span className="group-value">
                                            {currentData.Group}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <SteeringIndices />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
