import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadCompanyData } from "../store/dashboardSlice";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import SteeringIndices from "./SteeringIndices";
import Spinner from "./Spinner";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);
import data from "../../data.json";
import "./Dashboard.scss";

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const { selectedCompany, viewMode, companies } = useAppSelector(
        state => state.dashboard,
    );

    useEffect(() => {
        dispatch(loadCompanyData(data));
    }, [dispatch]);

    const currentCompany = companies.find(c => c.name === selectedCompany);
    const currentData = currentCompany
        ? viewMode === "Actual"
            ? currentCompany.actual
            : currentCompany.previous
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
                            <div className="grid-item col">
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
                                                        currentData.Details
                                                            .PlaceOfExchange
                                                    }
                                                </span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="uco-details">
                                    <div className="uco-item">
                                        <div className="uco-label">UCO1</div>
                                        <p>{currentData.UCO1}</p>
                                    </div>
                                    <div className="uco-item">
                                        <div className="uco-label">UCO2</div>
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
                            <div className="grid-item col space-between">
                                <div className="market-cap-details">
                                    <div className="market-cap-label">
                                        Market capitalization
                                    </div>
                                    <p>
                                        <span className="market-cap-value">
                                            {currentData.Details.MarketCapitalization.toLocaleString(
                                                "de-DE",
                                            )}
                                        </span>
                                        €
                                    </p>
                                </div>
                                <div className="data-details">
                                    <div className="data-label">Data</div>
                                    <p>{currentData.Data}</p>
                                </div>
                            </div>

                            <div className="grid-item col space-between">
                                <div className="legend">
                                    <div className="legend-item">
                                        <span className="legend-color vallourec"></span>
                                        <span>
                                            {currentCompany?.commonName}
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
                                                        currentCompany?.commonName ||
                                                        "Company",
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
                                                                .Details.Sector
                                                                .Z1Mean,
                                                            y: currentData
                                                                .Details.Sector
                                                                .Z2Mean,
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
                                                    borderColor: "#bbb",
                                                    borderDash: [4, 4],
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
                                                    },
                                                    grid: {
                                                        display: false,
                                                    },
                                                },
                                                y: {
                                                    type: "linear",
                                                    min: 0,
                                                    max: 1,
                                                    title: {
                                                        display: true,
                                                        align: "end",
                                                        text: "Z2",
                                                    },
                                                    grid: {
                                                        display: false,
                                                    },
                                                },
                                            },
                                        }}
                                        height={200}
                                    />
                                </div>
                            </div>

                            <div className="grid-item col">
                                <div className="risks-details">
                                    <h1>Risks</h1>
                                    <div className="risks-values">
                                        <div className="risk-values-item">
                                            <div className="risk-label">
                                                Value at risk
                                            </div>
                                            <p>
                                                {currentData.Risks.ValueAtRisk}
                                            </p>
                                        </div>
                                        <div className="risk-values-item">
                                            <div className="risk-label">CE</div>
                                            <p>{currentData.Risks.CE}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Second row - 1 column + 3 column span */}
                            <div className="grid-item left-panel">
                                <div className="recent-changes">
                                    <div className="section-header">
                                        Recent Changes
                                    </div>
                                    <div className="changes-content">
                                        <div className="change-label">
                                            {currentData.RecentChanges}
                                        </div>
                                        <div className="change-item">
                                            <div className="change-metric">
                                                Liquidity
                                            </div>
                                            <div className="change-value">
                                                {currentData.Liquidity} %
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="group-section">
                                    <div className="section-header">Group</div>
                                    <div className="group-value">
                                        {currentData.Group}
                                    </div>
                                </div>
                            </div>

                            <div className="grid-item steering-panel">
                                <SteeringIndices />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
