import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addCompany } from "../store/actions/companies/addCompany";
import { customToast } from "../utils/toast";
import type { ICompanyDocument } from "../core/interfaces";
import "./AddCompanyForm.scss";

interface AddCompanyFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export default function AddCompanyForm({
    onSuccess,
    onCancel,
}: AddCompanyFormProps) {
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state for company data
    const [formData, setFormData] = useState({
        // Company Basic Info
        companyCommonName: "",

        // Actual Details
        actualISIN: "",
        actualSectorName: "",
        actualZ1Mean: 0,
        actualZ2Mean: 0,
        actualSectorProfitability: 0,
        actualSectorLeverage: 0,
        actualSectorEnvironment: 0,
        actualSectorSocial: 0,
        actualSectorControversies: 0,
        actualMarketCapitalization: 0,
        actualPlaceOfExchange: "",
        actualData: "",
        actualUCO1: "",
        actualZ1: 0,
        actualUCO2: "",
        actualZ2: 0,
        actualSteeringProfitabilityScore: 0,
        actualSteeringProfitabilityTrends: "Equal" as "Up" | "Down" | "Equal",
        actualSteeringLeverageScore: 0,
        actualSteeringLeverageTrends: "Equal" as "Up" | "Down" | "Equal",
        actualSteeringEnvironmentScore: 0,
        actualSteeringEnvironmentTrends: "Equal" as "Up" | "Down" | "Equal",
        actualSteeringSocialScore: 0,
        actualSteeringSocialTrends: "Equal" as "Up" | "Down" | "Equal",
        actualSteeringControversiesScore: 0,
        actualSteeringControversiesTrends: "Equal" as "Up" | "Down" | "Equal",
        actualRecentChanges: "",
        actualLiquidity: 0,
        actualGroup: "",
        actualValueAtRisk: 0,
        actualCE: 0,

        // Previous Details (similar structure)
        previousISIN: "",
        previousSectorName: "",
        previousZ1Mean: 0,
        previousZ2Mean: 0,
        previousSectorProfitability: 0,
        previousSectorLeverage: 0,
        previousSectorEnvironment: 0,
        previousSectorSocial: 0,
        previousSectorControversies: 0,
        previousMarketCapitalization: 0,
        previousPlaceOfExchange: "",
        previousData: "",
        previousUCO1: "",
        previousZ1: 0,
        previousUCO2: "",
        previousZ2: 0,
        previousSteeringProfitabilityScore: 0,
        previousSteeringProfitabilityTrends: "Equal" as "Up" | "Down" | "Equal",
        previousSteeringLeverageScore: 0,
        previousSteeringLeverageTrends: "Equal" as "Up" | "Down" | "Equal",
        previousSteeringEnvironmentScore: 0,
        previousSteeringEnvironmentTrends: "Equal" as "Up" | "Down" | "Equal",
        previousSteeringSocialScore: 0,
        previousSteeringSocialTrends: "Equal" as "Up" | "Down" | "Equal",
        previousSteeringControversiesScore: 0,
        previousSteeringControversiesTrends: "Equal" as "Up" | "Down" | "Equal",
        previousRecentChanges: "",
        previousLiquidity: 0,
        previousGroup: "",
        previousValueAtRisk: 0,
        previousCE: 0,
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.companyCommonName.trim()) {
            customToast.error("Company name is required");
            return;
        }

        setIsSubmitting(true);

        try {
            // Transform form data to ICompanyDocument structure
            const companyData: Pick<ICompanyDocument, "data"> = {
                data: {
                    Company: {
                        "Company Common Name": formData.companyCommonName,
                        Actual: {
                            Details: {
                                ISIN: formData.actualISIN,
                                Sector: {
                                    Name: formData.actualSectorName,
                                    "Z1 Mean": formData.actualZ1Mean,
                                    "Z2 Mean": formData.actualZ2Mean,
                                    "Steering Indices": {
                                        Profitability:
                                            formData.actualSectorProfitability,
                                        Leverage: formData.actualSectorLeverage,
                                        Environment:
                                            formData.actualSectorEnvironment,
                                        Social: formData.actualSectorSocial,
                                        Controversies:
                                            formData.actualSectorControversies,
                                    },
                                },
                                "Market Capitalization":
                                    formData.actualMarketCapitalization,
                                "Place of Exchange":
                                    formData.actualPlaceOfExchange,
                            },
                            Data: formData.actualData,
                            UCO1: formData.actualUCO1,
                            Z1: formData.actualZ1,
                            UCO2: formData.actualUCO2,
                            Z2: formData.actualZ2,
                            "Steering Indices": {
                                Profitability: {
                                    Score: formData.actualSteeringProfitabilityScore,
                                    Trends: formData.actualSteeringProfitabilityTrends,
                                },
                                Leverage: {
                                    Score: formData.actualSteeringLeverageScore,
                                    Trends: formData.actualSteeringLeverageTrends,
                                },
                                Environment: {
                                    Score: formData.actualSteeringEnvironmentScore,
                                    Trends: formData.actualSteeringEnvironmentTrends,
                                },
                                Social: {
                                    Score: formData.actualSteeringSocialScore,
                                    Trends: formData.actualSteeringSocialTrends,
                                },
                                Controversies: {
                                    Score: formData.actualSteeringControversiesScore,
                                    Trends: formData.actualSteeringControversiesTrends,
                                },
                            },
                            "Recent Changes": formData.actualRecentChanges,
                            Liquidity: formData.actualLiquidity,
                            Group: formData.actualGroup,
                            Risks: {
                                "Value At Risk": formData.actualValueAtRisk,
                                CE: formData.actualCE,
                            },
                        },
                        Previous: {
                            Details: {
                                ISIN: formData.previousISIN,
                                Sector: {
                                    Name: formData.previousSectorName,
                                    "Z1 Mean": formData.previousZ1Mean,
                                    "Z2 Mean": formData.previousZ2Mean,
                                    "Steering Indices": {
                                        Profitability:
                                            formData.previousSectorProfitability,
                                        Leverage:
                                            formData.previousSectorLeverage,
                                        Environment:
                                            formData.previousSectorEnvironment,
                                        Social: formData.previousSectorSocial,
                                        Controversies:
                                            formData.previousSectorControversies,
                                    },
                                },
                                "Market Capitalization":
                                    formData.previousMarketCapitalization,
                                "Place of Exchange":
                                    formData.previousPlaceOfExchange,
                            },
                            Data: formData.previousData,
                            UCO1: formData.previousUCO1,
                            Z1: formData.previousZ1,
                            UCO2: formData.previousUCO2,
                            Z2: formData.previousZ2,
                            "Steering Indices": {
                                Profitability: {
                                    Score: formData.previousSteeringProfitabilityScore,
                                    Trends: formData.previousSteeringProfitabilityTrends,
                                },
                                Leverage: {
                                    Score: formData.previousSteeringLeverageScore,
                                    Trends: formData.previousSteeringLeverageTrends,
                                },
                                Environment: {
                                    Score: formData.previousSteeringEnvironmentScore,
                                    Trends: formData.previousSteeringEnvironmentTrends,
                                },
                                Social: {
                                    Score: formData.previousSteeringSocialScore,
                                    Trends: formData.previousSteeringSocialTrends,
                                },
                                Controversies: {
                                    Score: formData.previousSteeringControversiesScore,
                                    Trends: formData.previousSteeringControversiesTrends,
                                },
                            },
                            "Recent Changes": formData.previousRecentChanges,
                            Liquidity: formData.previousLiquidity,
                            Group: formData.previousGroup,
                            Risks: {
                                "Value At Risk": formData.previousValueAtRisk,
                                CE: formData.previousCE,
                            },
                        },
                    },
                },
            };

            await dispatch(addCompany(companyData));
            customToast.success(
                `Successfully added: ${formData.companyCommonName}`,
            );
            onSuccess();
        } catch (error) {
            console.error("Error adding company:", error);
            customToast.error("Failed to add company. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-company-form">
            {/* Basic Company Info */}
            <div className="form-section">
                <h3>Company Information</h3>
                <div className="form-group">
                    <label htmlFor="companyCommonName">Company Name *</label>
                    <input
                        id="companyCommonName"
                        type="text"
                        value={formData.companyCommonName}
                        onChange={e =>
                            handleInputChange(
                                "companyCommonName",
                                e.target.value,
                            )
                        }
                        required
                    />
                </div>
            </div>

            {/* Actual Data Section */}
            <div className="form-section">
                <h3>Actual Data</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="actualISIN">ISIN</label>
                        <input
                            id="actualISIN"
                            type="text"
                            value={formData.actualISIN}
                            onChange={e =>
                                handleInputChange("actualISIN", e.target.value)
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="actualSectorName">Sector Name</label>
                        <input
                            id="actualSectorName"
                            type="text"
                            value={formData.actualSectorName}
                            onChange={e =>
                                handleInputChange(
                                    "actualSectorName",
                                    e.target.value,
                                )
                            }
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="actualMarketCapitalization">
                            Market Capitalization
                        </label>
                        <input
                            id="actualMarketCapitalization"
                            type="number"
                            value={formData.actualMarketCapitalization}
                            onChange={e =>
                                handleInputChange(
                                    "actualMarketCapitalization",
                                    parseFloat(e.target.value) || 0,
                                )
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="actualPlaceOfExchange">
                            Place of Exchange
                        </label>
                        <input
                            id="actualPlaceOfExchange"
                            type="text"
                            value={formData.actualPlaceOfExchange}
                            onChange={e =>
                                handleInputChange(
                                    "actualPlaceOfExchange",
                                    e.target.value,
                                )
                            }
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="actualZ1">Z1</label>
                        <input
                            id="actualZ1"
                            type="number"
                            step="0.01"
                            value={formData.actualZ1}
                            onChange={e =>
                                handleInputChange(
                                    "actualZ1",
                                    parseFloat(e.target.value) || 0,
                                )
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="actualZ2">Z2</label>
                        <input
                            id="actualZ2"
                            type="number"
                            step="0.01"
                            value={formData.actualZ2}
                            onChange={e =>
                                handleInputChange(
                                    "actualZ2",
                                    parseFloat(e.target.value) || 0,
                                )
                            }
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="actualLiquidity">Liquidity (%)</label>
                        <input
                            id="actualLiquidity"
                            type="number"
                            step="0.1"
                            value={formData.actualLiquidity}
                            onChange={e =>
                                handleInputChange(
                                    "actualLiquidity",
                                    parseFloat(e.target.value) || 0,
                                )
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="actualValueAtRisk">Value At Risk</label>
                        <input
                            id="actualValueAtRisk"
                            type="number"
                            step="0.01"
                            value={formData.actualValueAtRisk}
                            onChange={e =>
                                handleInputChange(
                                    "actualValueAtRisk",
                                    parseFloat(e.target.value) || 0,
                                )
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Previous Data Section (simplified for brevity) */}
            <div className="form-section">
                <h3>Previous Data</h3>
                <p className="form-note">
                    Previous period data (similar structure to actual data)
                </p>
                {/* Add similar fields for previous data if needed */}
            </div>

            {/* Form Actions */}
            <div className="form-actions">
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-secondary"
                    disabled={isSubmitting}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Company"}
                </button>
            </div>
        </form>
    );
}
