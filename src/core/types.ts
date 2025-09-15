import type { TrendDirections, ViewModes } from "./constants";

export type TrendDirection =
    (typeof TrendDirections)[keyof typeof TrendDirections];
export type ViewMode = (typeof ViewModes)[keyof typeof ViewModes];
