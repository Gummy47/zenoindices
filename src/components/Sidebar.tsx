import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setSelectedCompany } from "../store/dashboardSlice";
import { AddIcon } from "./icons";
import "./Sidebar.scss";

const companies = [
    "Vallourec SA",
    "Air Liquide",
    "Airbus",
    "AXA",
    "BNP Paribas",
    "Carrefour",
    "Danone",
    "Engie",
    "L'Oréal",
    "LVMH",
    "Michelin",
    "Orange",
    "Electric",
    "Teleperformance",
    "Thales",
    "Vinci",
];

export default function Sidebar() {
    const dispatch = useAppDispatch();
    const selectedCompany = useAppSelector(
        state => state.dashboard.selectedCompany,
    );

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <img
                        src="/logo.svg"
                        alt="Zeno Indices"
                        className="logo-image"
                    />
                </div>
            </div>
            <div className="company-list">
                {companies.sort().map(company => (
                    <div
                        key={company}
                        className={`company-item ${selectedCompany === company ? "active" : ""}`}
                        onClick={() => dispatch(setSelectedCompany(company))}>
                        {company}
                    </div>
                ))}
            </div>
            <div className="add-button">
                <span>Add</span>
                <span className="plus-icon">
                    <AddIcon width={18} height={18} />
                </span>
            </div>
        </div>
    );
}
