import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setViewMode } from "../store/dashboardSlice";
import { EditIcon, TrashIcon } from "./icons";
import "./DashboardHeader.scss";

export default function DashboardHeader() {
    const dispatch = useAppDispatch();
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

    const formatMarketCap = (value: number): string => {
        if (value >= 1e9) {
            return `${(value / 1e9).toFixed(2)}B`;
        } else if (value >= 1e6) {
            return `${(value / 1e6).toFixed(0)}M`;
        }
        return value.toString();
    };

    return (
        <div className="dashboard-header">
            <div className="company-info">
                <div className="company-title">
                    <div className="orange-bar"></div>
                    <h1 className="company-name">
                        {currentCompany?.commonName}
                    </h1>
                </div>
                <div className="company-details">
                    <div className="detail-item">
                        <span className="detail-label">ISIN:</span>
                        <span className="detail-value isin">
                            {currentData.Details.ISIN}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Industry:</span>
                        <span className="detail-value industry">
                            {currentData.Details.Sector.Name}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Place of Exchange:</span>
                        <span className="detail-value exchange">
                            {currentData.Details.PlaceOfExchange}
                        </span>
                    </div>
                </div>
            </div>

            <div className="market-cap">
                <div className="market-cap-label">Market Capitalization:</div>
                <div className="market-cap-content">
                    <div className="market-cap-value">
                        {formatMarketCap(
                            currentData.Details.MarketCapitalization,
                        )}
                    </div>
                    <div className="market-cap-currency">€</div>
                </div>
            </div>

            <div className="header-actions">
                <div className="view-toggle">
                    <button
                        className={`toggle-btn ${viewMode === "Actual" ? "active" : ""}`}
                        onClick={() => dispatch(setViewMode("Actual"))}>
                        Actual
                    </button>
                    <button
                        className={`toggle-btn ${viewMode === "Previous" ? "active" : ""}`}
                        onClick={() => dispatch(setViewMode("Previous"))}>
                        Previous
                    </button>
                </div>

                <div className="header-icons">
                    <button className="icon-btn edit">
                        <EditIcon width={16} height={16} />
                    </button>
                    <button className="icon-btn delete">
                        <TrashIcon width={16} height={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
