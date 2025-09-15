import type { TrendDirection } from "./types";

// Individual steering index with score and trends
export interface ISteeringIndex {
    Score: number;
    Trends: TrendDirection;
}

// Collection of all steering indices
export interface ISteeringIndices {
    Profitability: ISteeringIndex;
    Leverage: ISteeringIndex;
    Environment: ISteeringIndex;
    Social: ISteeringIndex;
    Controversies: ISteeringIndex;
}

// Sector-level steering indices (just numbers)
export interface ISectorSteeringIndices {
    Profitability: number;
    Leverage: number;
    Environment: number;
    Social: number;
    Controversies: number;
}

// Sector information including means and indices
export interface ISector {
    Name: string;
    "Z1 Mean": number;
    "Z2 Mean": number;
    "Steering Indices": ISectorSteeringIndices;
}

// Company details section
export interface ICompanyDetails {
    ISIN: string;
    Sector: ISector;
    "Market Capitalization": number;
    "Place of Exchange": string;
}

// Risk information
export interface IRisks {
    "Value At Risk": number;
    CE: number;
}

// Main company data structure (for both Actual and Previous)
export interface ICompanyData {
    Details: ICompanyDetails;
    Data: string;
    UCO1: string;
    Z1: number;
    UCO2: string;
    Z2: number;
    "Steering Indices": ISteeringIndices;
    "Recent Changes": string;
    Liquidity: number;
    Group: string;
    Risks: IRisks;
}

// Company structure with common name and time periods
export interface ICompany {
    "Company Common Name": string;
    Actual: ICompanyData;
    Previous: ICompanyData;
}

// Root data structure
export interface ICompanyRootData {
    Company: ICompany;
}

// Firebase document wrapper with ID
export interface ICompanyDocument {
    id: string;
    data: ICompanyRootData;
}
