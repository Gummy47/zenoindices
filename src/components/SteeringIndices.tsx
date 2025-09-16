import { Radar } from "react-chartjs-2";
import { TrendDirections } from "../core/constants";
import type { TrendDirection } from "../core/types";
import { useTypedSelector } from "../store/hooks";
import { DownIcon, EqualIcon, UpIcon } from "./icons";
import "./SteeringIndices.scss";

export default function SteeringIndices() {
    const { current: currentCompany, viewMode } = useTypedSelector(
        state => state.companies,
    );

    const currentData = currentCompany
        ? viewMode === "Actual"
            ? currentCompany.data.Company.Actual
            : currentCompany.data.Company.Previous
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

    const getTrendIcon = (trend: TrendDirection) => {
        switch (trend) {
            case TrendDirections.UP:
                return <UpIcon width={16} height={16} />;
            case TrendDirections.DOWN:
                return <DownIcon width={16} height={16} />;
            case TrendDirections.EQUAL:
                return <EqualIcon width={16} height={16} />;
            default:
                return <EqualIcon width={16} height={16} />;
        }
    };

    const getTrendClass = (trend: TrendDirection) => {
        switch (trend) {
            case TrendDirections.UP:
                return "trend-up";
            case TrendDirections.DOWN:
                return "trend-down";
            case TrendDirections.EQUAL:
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
                    currentData.Details.Sector["Steering Indices"].Environment,
                    currentData.Details.Sector["Steering Indices"].Social,
                    currentData.Details.Sector["Steering Indices"]
                        .Controversies,
                    currentData.Details.Sector["Steering Indices"].Leverage,
                    currentData.Details.Sector["Steering Indices"]
                        .Profitability,
                ],
                backgroundColor: "rgba(93, 105, 156, 0.1)",
                borderColor: "#5D699C",
                borderWidth: 2,
                pointBackgroundColor: "#5D699C",
                pointRadius: 0,
            },
            {
                label:
                    currentCompany?.data.Company["Company Common Name"] ||
                    "Company",
                data: [
                    currentData["Steering Indices"].Environment.Score,
                    currentData["Steering Indices"].Social.Score,
                    currentData["Steering Indices"].Controversies.Score,
                    currentData["Steering Indices"].Leverage.Score,
                    currentData["Steering Indices"].Profitability.Score,
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
                <h3>Steering indices</h3>
                <div className="legend">
                    <div className="legend-item">
                        <span className="legend-color vallourec"></span>
                        <span>{currentCompany?.data.Company["Company Common Name"]}</span>
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
                            currentData["Steering Indices"][
                                index.key as keyof (typeof currentData)["Steering Indices"]
                            ];
                        return (
                            <div key={index.key} className="index-item">
                                <div
                                    className={`index-trend ${getTrendClass(data.Trends)}`}>
                                    {getTrendIcon(data.Trends)}
                                </div>
                                <div className="index-label">
                                    <div className="index-position">
                                        {index.position}
                                    </div>
                                    {index.label}
                                </div>
                                <div className="index-score">{data.Score}</div>
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
                                        color: "#000",
                                        showLabelBackdrop: false,
                                        backdropPadding: 0,
                                    },
                                    grid: {
                                        color: "#777",
                                        lineWidth: 1,
                                        // borderDash: [2, 2], should work but doesnt?
                                    },
                                    /** @ts-expect-error this works but shouldnt...? cfr https://github.com/reactchartjs/react-chartjs-2/issues/1155#issuecomment-1513154353 */
                                    border: { dash: [4, 2] },
                                    angleLines: {
                                        color: "#000",
                                    },
                                    pointLabels: {
                                        display: true,
                                        font: {
                                            size: 16,
                                        },
                                        color: "#000",
                                        callback: function (_label, index) {
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
