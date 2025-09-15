import { useTypedSelector, useAppDispatch } from "../store/hooks";
import { setCurrent } from "../store/companiesSlice";
import { addCompany } from "../store/actions/companies/addCompany";
import { AddIcon } from "./icons";
import { customToast } from "../utils/toast";
import { useGlobalModal } from "../context/ModalContext";
import AddCompanyForm from "./AddCompanyForm";
import "./Sidebar.scss";
import type { ICompanyDocument } from "../core/interfaces";
import { useEffect, useMemo, useRef } from "react";

export default function Sidebar() {
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { openModal, closeModal } = useGlobalModal();

    const { current: currentCompany, entities: companies } = useTypedSelector(
        state => state.companies,
    );

    // Sort companies alphabetically by "Company Common Name"
    const sortedCompanies = useMemo(
        () =>
            [...companies].sort((c1, c2) =>
                c1.data.Company["Company Common Name"] >
                c2.data.Company["Company Common Name"]
                    ? 1
                    : -1,
            ),
        [companies],
    );

    // Automatically select the first company if none is selected
    useEffect(() => {
        if (!currentCompany && sortedCompanies.length > 0) {
            dispatch(setCurrent(sortedCompanies.at(0)!));
        }
    }, [currentCompany, dispatch, sortedCompanies]);

    const handleAdd = () => {
        openModal({
            title: "Add New Company",
            content: (
                <AddCompanyForm
                    onSuccess={handleAddSuccess}
                    onCancel={handleAddCancel}
                />
            ),
            size: "large",
            closeOnOverlayClick: false,
        });
    };

    const handleAddSuccess = () => {
        closeModal();
    };

    const handleAddCancel = () => {
        closeModal();
    };

    const handleImport = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith(".json")) {
            customToast.error("Please select a JSON file");
            return;
        }

        try {
            const text = await file.text();
            const jsonData = JSON.parse(text);

            // Validate that the JSON has the expected structure
            if (!jsonData.Company || !jsonData.Company["Company Common Name"]) {
                customToast.error(
                    "Invalid JSON format. Expected a company data structure.",
                );
                return;
            }

            // Dispatch the addCompany action
            await dispatch(addCompany({
                data: jsonData,
            }));
        } catch (error) {
            console.error("Error importing company data:", error);
            customToast.error(
                "Error importing file. Please check the file format.",
            );
        } finally {
            // Clear the file input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

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
                {sortedCompanies.map((company: ICompanyDocument) => (
                    <div
                        key={`company-${company.id}`}
                        className={`company-item ${currentCompany?.id === company.id ? "active" : ""}`}
                        onClick={() => dispatch(setCurrent(company))}>
                        {company.data
                            ? company.data.Company["Company Common Name"]
                            : "Malformed data"}
                    </div>
                ))}
            </div>
            <div className="add-button">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                />
                <div className="button-row">
                    <button title="Import company JSON file" onClick={handleImport}>
                        <span>⤴ Import</span>
                    </button>
                    <button title="Add company" onClick={handleAdd}>
                        <span>Add</span>
                        <AddIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}
