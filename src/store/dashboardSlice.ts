import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type WithTrends<T> = T & {
    Trends: "Up" | "Down" | "Equal";
};

export interface SteeringIndex {
    Score: number;
}

export interface SteeringIndices {
    Profitability: SteeringIndex;
    Leverage: SteeringIndex;
    Environment: SteeringIndex;
    Social: SteeringIndex;
    Controversies: SteeringIndex;
}

export interface SteeringIndicesWithTrends {
    Profitability: WithTrends<SteeringIndex>;
    Leverage: WithTrends<SteeringIndex>;
    Environment: WithTrends<SteeringIndex>;
    Social: WithTrends<SteeringIndex>;
    Controversies: WithTrends<SteeringIndex>;
}

export interface CompanyData {
    Details: {
        ISIN: string;
        Sector: {
            Name: string;
            Z1Mean: number;
            Z2Mean: number;
            SteeringIndices: SteeringIndices;
        };
        MarketCapitalization: number;
        PlaceOfExchange: string;
    };
    Data: string;
    UCO1: string;
    Z1: number;
    UCO2: string;
    Z2: number;
    SteeringIndices: SteeringIndicesWithTrends;
    RecentChanges: string;
    Liquidity: number;
    Group: string;
    Risks: {
        ValueAtRisk: number;
        CE: number;
    };
}

export interface Company {
    name: string;
    commonName: string;
    actual: CompanyData;
    previous: CompanyData;
}

interface DashboardState {
    selectedCompany: string;
    viewMode: "Actual" | "Previous";
    companies: Company[];
}

const initialState: DashboardState = {
    selectedCompany: "Vallourec SA",
    viewMode: "Actual",
    companies: [],
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setSelectedCompany: (state, action: PayloadAction<string>) => {
            state.selectedCompany = action.payload;
        },
        setViewMode: (state, action: PayloadAction<"Actual" | "Previous">) => {
            state.viewMode = action.payload;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        loadCompanyData: (state, action: PayloadAction<any>) => {
            const rawData = action.payload;
            const company: Company = {
                name: rawData.Company["Company Common Name"],
                commonName: rawData.Company["Company Common Name"],
                actual: {
                    Details: {
                        ISIN: rawData.Company.Actual.Details.ISIN,
                        Sector: {
                            Name: rawData.Company.Actual.Details.Sector.Name,
                            Z1Mean: rawData.Company.Actual.Details.Sector[
                                "Z1 Mean"
                            ],
                            Z2Mean: rawData.Company.Actual.Details.Sector[
                                "Z2 Mean"
                            ],
                            SteeringIndices:
                                rawData.Company.Actual.Details.Sector[
                                    "Steering Indices"
                                ],
                        },
                        MarketCapitalization:
                            rawData.Company.Actual.Details[
                                "Market Capitalization"
                            ],
                        PlaceOfExchange:
                            rawData.Company.Actual.Details["Place of Exchange"],
                    },
                    Data: rawData.Company.Actual.Data,
                    UCO1: rawData.Company.Actual.UCO1,
                    Z1: rawData.Company.Actual.Z1,
                    UCO2: rawData.Company.Actual.UCO2,
                    Z2: rawData.Company.Actual.Z2,
                    SteeringIndices: rawData.Company.Actual["Steering Indices"],
                    RecentChanges: rawData.Company.Actual["Recent Changes"],
                    Liquidity: rawData.Company.Actual.Liquidity,
                    Group: rawData.Company.Actual.Group,
                    Risks: {
                        ValueAtRisk:
                            rawData.Company.Actual.Risks["Value At Risk"],
                        CE: rawData.Company.Actual.Risks.CE,
                    },
                },
                previous: {
                    Details: {
                        ISIN: rawData.Company.Previous.Details.ISIN,
                        Sector: {
                            Name: rawData.Company.Previous.Details.Sector.Name,
                            Z1Mean: rawData.Company.Previous.Details.Sector[
                                "Z1 Mean"
                            ],
                            Z2Mean: rawData.Company.Previous.Details.Sector[
                                "Z2 Mean"
                            ],
                            SteeringIndices:
                                rawData.Company.Previous.Details.Sector[
                                    "Steering Indices"
                                ],
                        },
                        MarketCapitalization:
                            rawData.Company.Previous.Details[
                                "Market Capitalization"
                            ],
                        PlaceOfExchange:
                            rawData.Company.Previous.Details[
                                "Place of Exchange"
                            ],
                    },
                    Data: rawData.Company.Previous.Data,
                    UCO1: rawData.Company.Previous.UCO1,
                    Z1: rawData.Company.Previous.Z1,
                    UCO2: rawData.Company.Previous.UCO2,
                    Z2: rawData.Company.Previous.Z2,
                    SteeringIndices:
                        rawData.Company.Previous["Steering Indices"],
                    RecentChanges: rawData.Company.Previous["Recent Changes"],
                    Liquidity: rawData.Company.Previous.Liquidity,
                    Group: rawData.Company.Previous.Group,
                    Risks: {
                        ValueAtRisk:
                            rawData.Company.Previous.Risks["Value At Risk"],
                        CE: rawData.Company.Previous.Risks.CE,
                    },
                },
            };

            state.companies = [company];
            state.selectedCompany = company.name;
        },
    },
});

export const { setSelectedCompany, setViewMode, loadCompanyData } =
    dashboardSlice.actions;

export default dashboardSlice.reducer;
