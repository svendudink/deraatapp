// Define specific values for 'group' and 'type'
type Group = "fireResistantClassification" | "burglaryClassification" | "kluizenwijzer" | "dimensions" | "weight" | "other";
type Type = "switch" | "inputField";

// Base interface for common fields
interface BaseInput {
    id: string;
    label: string;
    group: Group;
    type: Type;
}

// Interface for inputs of type 'switch'
interface SwitchInput extends BaseInput {
    value: boolean;
    searchArray: string[];
    logoText?: string; // Optional
    time?: number;
}

interface SpecialInput {
    searchArray: string[];
    logoText: string;
}

// Interface for inputs of type 'inputField'
interface InputFieldInput extends BaseInput {
    fields: {
        innerHeightMin?: string;
        innerHeightMax?: string;
        outerHeightMin?: string;
        outerHeightMax?: string;
        innerWidthMin?: string;
        innerWidthMax?: string;
        outerWidthMin?: string;
        outerWidthMax?: string;
        innerDepthMin?: string;
        innerDepthMax?: string;
        outerDepthMin?: string;
        outerDepthMax?: string;
        weightMin?: string;
        weightMax?: string;
        shelvesMin?: string;
        shelvesMax?: string;
        drawersMin?: string;
        drawersMax?: string;
        hooksMin?: string;
        hooksMax?: string;
        gunHoldersMin?: string;
        gunHoldersMax?: string;
    };
}

// Union type for all input types
export type Input = SwitchInput | InputFieldInput | SpecialInput;