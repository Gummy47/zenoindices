import { useAppSelector } from "../store/hooks";
import { UpIcon, DownIcon, EqualIcon } from "./icons";
import { Radar } from "react-chartjs-2";
import "./SteeringIndices.scss";

export default function SteeringIndices() {
    const { selectedCompany, viewMode, companies } = useAppSelector(
        state => state.dashboard,
    );

    const currentCompany = companies.find(c => c.name === selectedCompany);
    const currentData = currentCompany
        ? viewMode === "Actual"
            ? currentCompany.actual
            : currentCompany.previous
        : null;

    if (!currentData) {
        return <div>No data available</div>;
    }

    const indices = [
        { key: "Environment", label: "Environment", position: 1 },
        { key: "Social", label: "Social", position: 2 },
        { key: "Controversies", label: "Controversies", position: 3 },
        { key: "Leverage", label: "Leverage", position: 4 },
        { key: "Profitability", label: "Profitability", position: 5 },
    ];

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case "Up":
                return <UpIcon width={16} height={16} />;
            case "Down":
                return <DownIcon width={16} height={16} />;
            case "Equal":
                return <EqualIcon width={16} height={16} />;
            default:
                return <EqualIcon width={16} height={16} />;
        }
    };

    const getTrendClass = (trend: string) => {
        switch (trend) {
            case "Up":
                return "trend-up";
            case "Down":
                return "trend-down";
            case "Equal":
                return "trend-equal";
            default:
                return "trend-equal";
        }
    };

    const radarData = {
        labels: [
            "Environment",
            "Social",
            "Controversies",
            "Leverage",
            "Profitability",
        ],
        datasets: [
            {
                label: "Sector Mean",
                data: [
                    currentData.Details.Sector.SteeringIndices.Environment,
                    currentData.Details.Sector.SteeringIndices.Social,
                    currentData.Details.Sector.SteeringIndices.Controversies,
                    currentData.Details.Sector.SteeringIndices.Leverage,
                    currentData.Details.Sector.SteeringIndices.Profitability,
                ],
                backgroundColor: "rgba(93, 105, 156, 0.1)",
                borderColor: "#5D699C",
                borderWidth: 2,
                pointBackgroundColor: "#5D699C",
                pointRadius: 0,
            },
            {
                label: currentCompany?.commonName || "Company",
                data: [
                    currentData.SteeringIndices.Environment.Score,
                    currentData.SteeringIndices.Social.Score,
                    currentData.SteeringIndices.Controversies.Score,
                    currentData.SteeringIndices.Leverage.Score,
                    currentData.SteeringIndices.Profitability.Score,
                ],
                backgroundColor: "rgba(222, 77, 18, 0.1)",
                borderColor: "#DE4D12",
                borderWidth: 2,
                pointBackgroundColor: "#DE4D12",
                pointRadius: 0,
            },
        ],
    };

    return (
        <div className="steering-indices">
            <div className="steering-header">
                <h3>Steering Indices</h3>
                <div className="legend">
                    <div className="legend-item">
                        <span className="legend-color vallourec"></span>
                        <span>Vallourec SA Current</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color sector"></span>
                        <span>Sector Mean</span>
                    </div>
                </div>
            </div>

            <div className="radar-container">
                <div className="indices-list">
                    {indices.map(index => {
                        const data =
                            currentData.SteeringIndices[
                                index.key as keyof typeof currentData.SteeringIndices
                            ];
                        return (
                            <div key={index.key} className="index-item">
                                <div className="index-position">
                                    {index.position}
                                </div>
                                <div className="index-label">{index.label}</div>
                                <div className="index-score">{data.Score}</div>
                                <div
                                    className={`index-trend ${getTrendClass(data.Trends)}`}>
                                    {getTrendIcon(data.Trends)}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="radar-chart">
                    <Radar
                        data={radarData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            return `${context.dataset.label}: ${context.parsed.r}`;
                                        },
                                    },
                                },
                            },
                            scales: {
                                r: {
                                    min: 0,
                                    max: 100,
                                    ticks: {
                                        stepSize: 20,
                                        display: true,
                                        font: {
                                            size: 10,
                                        },
                                        color: "#999",
                                    },
                                    grid: {
                                        color: "#e0e0e0",
                                        lineWidth: 1,
                                        // borderDash: [2, 2], should work but doesnt?
                                    },
                                    /** @ts-expect-error this works but shouldnt...? cfr https://github.com/reactchartjs/react-chartjs-2/issues/1155#issuecomment-1513154353 */
                                    border: { dash: [2, 2] },
                                    angleLines: {
                                        color: "#e0e0e0",
                                    },
                                    pointLabels: {
                                        display: true,
                                        font: {
                                            size: 12,
                                        },
                                        color: "#666",
                                        callback: function (label, index) {
                                            return (index + 1).toString();
                                        },
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
