import { useTypedSelector, useAppDispatch } from "../store/hooks";
import { setViewMode } from "../store/companiesSlice";
import { deleteCompany } from "../store/actions/companies/deleteCompany";
import { EditIcon, TrashIcon } from "./icons";
import { customToast } from "../utils/toast";
import { useGlobalModal } from "../context/ModalContext";
import AddCompanyForm from "./AddCompanyForm";
import "./DashboardHeader.scss";

export default function DashboardHeader() {
    const dispatch = useAppDispatch();
    const { openModal, closeModal } = useGlobalModal();

    const { current: currentCompany, viewMode } = useTypedSelector(
        state => state.companies,
    );

    const handleEdit = () => {
        if (!currentCompany) {
            customToast.error("No company selected to edit.");
            return;
        }

        openModal({
            title: "Edit Company",
            content: (
                <AddCompanyForm
                    company={currentCompany}
                    onSuccess={handleEditSuccess}
                    onCancel={handleEditCancel}
                />
            ),
            size: "large",
            closeOnOverlayClick: false,
        });
    };

    const handleEditSuccess = () => {
        closeModal();
    };

    const handleEditCancel = () => {
        closeModal();
    };

    const handleDelete = async () => {
        if (!currentCompany) {
            customToast.error("No company selected to delete.");
            return;
        }

        const companyName =
            currentCompany.data?.Company?.["Company Common Name"];

        const confirmMessage = `Are you sure you want to delete "${companyName}"?\n\nThis action cannot be undone.`;

        if (window.confirm(confirmMessage)) {
            try {
                await dispatch(deleteCompany({ 
                    id: currentCompany.id, 
                    name: companyName || "Unknown Company" 
                })).unwrap();
            } catch (error) {
                console.error("Error deleting company:", error);
                customToast.error(`Failed to delete company: ${error}`);
            }
        }
    };

    return (
        <div className="dashboard-header">
            <div className="company-title">
                <h1 className="company-name">
                    {currentCompany?.data?.Company?.["Company Common Name"]}
                </h1>
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
                    <button
                        className="icon-btn edit"
                        title="Edit company"
                        onClick={handleEdit}>
                        <EditIcon />
                    </button>
                    <button
                        className="icon-btn delete"
                        title="Delete company"
                        onClick={handleDelete}>
                        <TrashIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}
