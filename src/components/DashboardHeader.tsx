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

    const handleEdit = () => {
        alert("Edit company - feature not implemented yet.");
    }

    const handleDelete = () => {
        alert("Delete company - feature not implemented yet.");
    }

    return (
        <div className="dashboard-header">
            <div className="company-title">
                <h1 className="company-name">{currentCompany?.commonName}</h1>
            </div>

            <div className="header-actions">
                <div className="view-toggle">
                    <button
                        title="View actual data"
                        className={`toggle-btn ${viewMode === "Actual" ? "active" : ""}`}
                        onClick={() => dispatch(setViewMode("Actual"))}>
                        Actual
                    </button>
                    <button
                        title="View previous data"
                        className={`toggle-btn ${viewMode === "Previous" ? "active" : ""}`}
                        onClick={() => dispatch(setViewMode("Previous"))}>
                        Previous
                    </button>
                </div>

                <div className="header-icons">
                    <button className="icon-btn edit" title="Edit company" onClick={handleEdit}>
                        <EditIcon />
                    </button>
                    <button className="icon-btn delete" title="Delete company" onClick={handleDelete}>
                        <TrashIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}
