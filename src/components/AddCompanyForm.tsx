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

    const renderFieldGroup = (prefix: "actual" | "previous", title: string) => (
        <div className="column">
            <h4 className="column-header">{title}</h4>
            
            {/* Details Section */}
            <div className="field-group">
                <div className="field-group-title">Details</div>
                <div className="form-group">
                    <label htmlFor={`${prefix}ISIN`}>ISIN</label>
                    <input
                        id={`${prefix}ISIN`}
                        type="text"
                        value={formData[`${prefix}ISIN` as keyof typeof formData] as string}
                        onChange={e => handleInputChange(`${prefix}ISIN`, e.target.value)}
                        placeholder="e.g. US0378331005"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SectorName`}>Sector Name</label>
                    <input
                        id={`${prefix}SectorName`}
                        type="text"
                        value={formData[`${prefix}SectorName` as keyof typeof formData] as string}
                        onChange={e => handleInputChange(`${prefix}SectorName`, e.target.value)}
                        placeholder="e.g. Technology, Healthcare"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}MarketCapitalization`}>Market Capitalization</label>
                    <input
                        id={`${prefix}MarketCapitalization`}
                        type="number"
                        value={formData[`${prefix}MarketCapitalization` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}MarketCapitalization`, parseFloat(e.target.value) || 0)}
                        placeholder="Market cap in millions"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}PlaceOfExchange`}>Place of Exchange</label>
                    <input
                        id={`${prefix}PlaceOfExchange`}
                        type="text"
                        value={formData[`${prefix}PlaceOfExchange` as keyof typeof formData] as string}
                        onChange={e => handleInputChange(`${prefix}PlaceOfExchange`, e.target.value)}
                        placeholder="e.g. NYSE, NASDAQ"
                    />
                </div>
            </div>

            {/* Sector Means */}
            <div className="field-group">
                <div className="field-group-title">Sector Means</div>
                <div className="form-group">
                    <label htmlFor={`${prefix}Z1Mean`}>Z1 Mean</label>
                    <input
                        id={`${prefix}Z1Mean`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}Z1Mean` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}Z1Mean`, parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}Z2Mean`}>Z2 Mean</label>
                    <input
                        id={`${prefix}Z2Mean`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}Z2Mean` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}Z2Mean`, parseFloat(e.target.value) || 0)}
                    />
                </div>
            </div>

            {/* Core Data */}
            <div className="field-group">
                <div className="field-group-title">Core Data</div>
                <div className="form-group">
                    <label htmlFor={`${prefix}Data`}>Data</label>
                    <input
                        id={`${prefix}Data`}
                        type="text"
                        value={formData[`${prefix}Data` as keyof typeof formData] as string}
                        onChange={e => handleInputChange(`${prefix}Data`, e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}UCO1`}>UCO1</label>
                    <input
                        id={`${prefix}UCO1`}
                        type="text"
                        value={formData[`${prefix}UCO1` as keyof typeof formData] as string}
                        onChange={e => handleInputChange(`${prefix}UCO1`, e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}Z1`}>Z1</label>
                    <input
                        id={`${prefix}Z1`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}Z1` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}Z1`, parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}UCO2`}>UCO2</label>
                    <input
                        id={`${prefix}UCO2`}
                        type="text"
                        value={formData[`${prefix}UCO2` as keyof typeof formData] as string}
                        onChange={e => handleInputChange(`${prefix}UCO2`, e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}Z2`}>Z2</label>
                    <input
                        id={`${prefix}Z2`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}Z2` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}Z2`, parseFloat(e.target.value) || 0)}
                    />
                </div>
            </div>

            {/* Sector Steering Indices */}
            <div className="field-group">
                <div className="field-group-title">Sector Steering Indices</div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SectorProfitability`}>Profitability</label>
                    <input
                        id={`${prefix}SectorProfitability`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}SectorProfitability` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}SectorProfitability`, parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SectorLeverage`}>Leverage</label>
                    <input
                        id={`${prefix}SectorLeverage`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}SectorLeverage` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}SectorLeverage`, parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SectorEnvironment`}>Environment</label>
                    <input
                        id={`${prefix}SectorEnvironment`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}SectorEnvironment` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}SectorEnvironment`, parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SectorSocial`}>Social</label>
                    <input
                        id={`${prefix}SectorSocial`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}SectorSocial` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}SectorSocial`, parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SectorControversies`}>Controversies</label>
                    <input
                        id={`${prefix}SectorControversies`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}SectorControversies` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}SectorControversies`, parseFloat(e.target.value) || 0)}
                    />
                </div>
            </div>

            {/* Steering Indices */}
            <div className="field-group">
                <div className="field-group-title">Steering Indices</div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SteeringProfitabilityScore`}>Profitability Score</label>
                    <input
                        id={`${prefix}SteeringProfitabilityScore`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}SteeringProfitabilityScore` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}SteeringProfitabilityScore`, parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SteeringProfitabilityTrends`}>Profitability Trends</label>
                    <select
                        id={`${prefix}SteeringProfitabilityTrends`}
                        value={formData[`${prefix}SteeringProfitabilityTrends` as keyof typeof formData] as string}
                        onChange={e => handleInputChange(`${prefix}SteeringProfitabilityTrends`, e.target.value as "Up" | "Down" | "Equal")}
                    >
                        <option value="Equal">Equal</option>
                        <option value="Up">Up</option>
                        <option value="Down">Down</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SteeringLeverageScore`}>Leverage Score</label>
                    <input
                        id={`${prefix}SteeringLeverageScore`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}SteeringLeverageScore` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}SteeringLeverageScore`, parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SteeringLeverageTrends`}>Leverage Trends</label>
                    <select
                        id={`${prefix}SteeringLeverageTrends`}
                        value={formData[`${prefix}SteeringLeverageTrends` as keyof typeof formData] as string}
                        onChange={e => handleInputChange(`${prefix}SteeringLeverageTrends`, e.target.value as "Up" | "Down" | "Equal")}
                    >
                        <option value="Equal">Equal</option>
                        <option value="Up">Up</option>
                        <option value="Down">Down</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SteeringEnvironmentScore`}>Environment Score</label>
                    <input
                        id={`${prefix}SteeringEnvironmentScore`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}SteeringEnvironmentScore` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}SteeringEnvironmentScore`, parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SteeringEnvironmentTrends`}>Environment Trends</label>
                    <select
                        id={`${prefix}SteeringEnvironmentTrends`}
                        value={formData[`${prefix}SteeringEnvironmentTrends` as keyof typeof formData] as string}
                        onChange={e => handleInputChange(`${prefix}SteeringEnvironmentTrends`, e.target.value as "Up" | "Down" | "Equal")}
                    >
                        <option value="Equal">Equal</option>
                        <option value="Up">Up</option>
                        <option value="Down">Down</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SteeringSocialScore`}>Social Score</label>
                    <input
                        id={`${prefix}SteeringSocialScore`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}SteeringSocialScore` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}SteeringSocialScore`, parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SteeringSocialTrends`}>Social Trends</label>
                    <select
                        id={`${prefix}SteeringSocialTrends`}
                        value={formData[`${prefix}SteeringSocialTrends` as keyof typeof formData] as string}
                        onChange={e => handleInputChange(`${prefix}SteeringSocialTrends`, e.target.value as "Up" | "Down" | "Equal")}
                    >
                        <option value="Equal">Equal</option>
                        <option value="Up">Up</option>
                        <option value="Down">Down</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SteeringControversiesScore`}>Controversies Score</label>
                    <input
                        id={`${prefix}SteeringControversiesScore`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}SteeringControversiesScore` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}SteeringControversiesScore`, parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}SteeringControversiesTrends`}>Controversies Trends</label>
                    <select
                        id={`${prefix}SteeringControversiesTrends`}
                        value={formData[`${prefix}SteeringControversiesTrends` as keyof typeof formData] as string}
                        onChange={e => handleInputChange(`${prefix}SteeringControversiesTrends`, e.target.value as "Up" | "Down" | "Equal")}
                    >
                        <option value="Equal">Equal</option>
                        <option value="Up">Up</option>
                        <option value="Down">Down</option>
                    </select>
                </div>
            </div>

            {/* Additional Data */}
            <div className="field-group">
                <div className="field-group-title">Additional Data</div>
                <div className="form-group">
                    <label htmlFor={`${prefix}RecentChanges`}>Recent Changes</label>
                    <input
                        id={`${prefix}RecentChanges`}
                        type="text"
                        value={formData[`${prefix}RecentChanges` as keyof typeof formData] as string}
                        onChange={e => handleInputChange(`${prefix}RecentChanges`, e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}Liquidity`}>Liquidity</label>
                    <input
                        id={`${prefix}Liquidity`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}Liquidity` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}Liquidity`, parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}Group`}>Group</label>
                    <input
                        id={`${prefix}Group`}
                        type="text"
                        value={formData[`${prefix}Group` as keyof typeof formData] as string}
                        onChange={e => handleInputChange(`${prefix}Group`, e.target.value)}
                    />
                </div>
            </div>

            {/* Risks */}
            <div className="field-group">
                <div className="field-group-title">Risks</div>
                <div className="form-group">
                    <label htmlFor={`${prefix}ValueAtRisk`}>Value At Risk</label>
                    <input
                        id={`${prefix}ValueAtRisk`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}ValueAtRisk` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}ValueAtRisk`, parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`${prefix}CE`}>CE</label>
                    <input
                        id={`${prefix}CE`}
                        type="number"
                        step="0.01"
                        value={formData[`${prefix}CE` as keyof typeof formData] as number}
                        onChange={e => handleInputChange(`${prefix}CE`, parseFloat(e.target.value) || 0)}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="add-company-form">
            {/* Company Name Header - Outside scrollable area */}
            <div className="company-name-section">
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
                        placeholder="Enter the company's common name"
                        required
                    />
                </div>
            </div>

            {/* Scrollable form content */}
            <div className="form-content">
                {/* Two-column layout for Actual vs Previous */}
                <div className="two-column-layout">
                    {renderFieldGroup("actual", "Current Period")}
                    {renderFieldGroup("previous", "Previous Period")}
                </div>
            </div>

            {/* Form Actions - Outside scrollable area */}
            <div className="form-actions">
                <div className="form-actions-info">
                    Review all data before submitting. All fields are optional except company name.
                </div>
                <div className="form-actions-buttons">
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
                        {isSubmitting ? "Adding Company..." : "Add Company"}
                    </button>
                </div>
            </div>
        </form>
    );
}
