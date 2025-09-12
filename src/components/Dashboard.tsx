import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadCompanyData } from "../store/dashboardSlice";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import SteeringIndices from "./SteeringIndices";
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
                <p>Loading...</p>
            ) : (
                <div className="main-content">
                    <DashboardHeader />
                    <div className="dashboard-body">
                        <div className="top-section">
                            <div className="uco-section">
                                <div className="uco-item">
                                    <div className="uco-label">UCO1</div>
                                    <div className="uco-value">
                                        {currentData.UCO1}
                                    </div>
                                </div>
                                <div className="uco-item">
                                    <div className="uco-label">UCO2</div>
                                    <div className="uco-value">
                                        {currentData.UCO2}
                                    </div>
                                </div>
                            </div>
                            <div className="z-metrics">
                                <div className="z-item">
                                    <div className="z-label">Z1</div>
                                    <div className="z-value">
                                        {currentData.Z1}
                                    </div>
                                </div>
                                <div className="z-item">
                                    <div className="z-label">Z2</div>
                                    <div className="z-value">
                                        {currentData.Z2}
                                    </div>
                                </div>
                            </div>
                            <div className="data-section">
                                <div className="data-header">Data</div>
                                <div className="data-provider">
                                    {currentData.Data}
                                </div>
                            </div>
                            <div className="rishs-section">
                                <div className="rishs-header">RISHS</div>
                                <div className="rishs-metrics">
                                    <div className="risk-item">
                                        <div className="risk-label">
                                            Value At Risk
                                        </div>
                                        <div className="risk-value">
                                            {currentData.Risks.ValueAtRisk}
                                        </div>
                                    </div>
                                    <div className="risk-item">
                                        <div className="risk-label">CE</div>
                                        <div className="risk-value">
                                            {currentData.Risks.CE}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-section">
                            <div className="left-panel">
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
                            <div className="right-panel">
                                <SteeringIndices />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
