import { useTypedSelector } from "../store/hooks";
import "./MetricsSection.scss";

export default function MetricsSection() {
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

    return (
        <div className="metrics-section">
            <div className="metrics-row">
                <div className="uco-section">
                    <div className="uco-item">
                        <div className="uco-label">UCO1</div>
                        <div className="uco-value">{currentData.UCO1}</div>
                    </div>
                    <div className="uco-item">
                        <div className="uco-label">UCO2</div>
                        <div className="uco-value">{currentData.UCO2}</div>
                    </div>
                </div>

                <div className="z-values">
                    <div className="z-item">
                        <div className="z-label">Z1</div>
                        <div className="z-value">{currentData.Z1}</div>
                    </div>
                    <div className="z-item">
                        <div className="z-label">Z2</div>
                        <div className="z-value">{currentData.Z2}</div>
                    </div>
                    <div className="data-source">
                        <div className="data-label">Data</div>
                        <div className="data-value">{currentData.Data}</div>
                    </div>
                </div>

                <div className="altares-chart">
                    <div className="chart-container">
                        <svg viewBox="0 0 100 60" className="line-chart">
                            <polyline
                                fill="none"
                                stroke="#ff6b35"
                                strokeWidth="2"
                                points="10,50 25,45 40,30 55,25 70,35 85,40"
                            />
                            <circle cx="55" cy="25" r="3" fill="#ff6b35" />
                        </svg>
                        <div className="chart-axes">
                            <div className="x-axis">
                                <span>0.0</span>
                                <span>0.2</span>
                                <span>0.4</span>
                                <span>0.6</span>
                                <span>0.8</span>
                                <span>1.0</span>
                                <span>Z1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="risk-section">
                <div className="risk-header">RISHS</div>
                <div className="risk-metrics">
                    <div className="risk-item">
                        <div className="risk-label">Value At Risk</div>
                        <div className="risk-value">
                            {currentData.Risks["Value At Risk"]}
                        </div>
                    </div>
                    <div className="risk-item">
                        <div className="risk-label">CE</div>
                        <div className="risk-value">{currentData.Risks.CE}</div>
                    </div>
                </div>
            </div>

            <div className="recent-changes">
                <div className="changes-header">Recent Changes</div>
                <div className="changes-content">
                    <div className="changes-label">
                        {currentData["Recent Changes"]}
                    </div>
                    <div className="liquidity-section">
                        <div className="liquidity-label">Liquidity</div>
                        <div className="liquidity-value">
                            {currentData.Liquidity} %
                        </div>
                    </div>
                    <div className="group-info">
                        <div className="group-label">Group</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
