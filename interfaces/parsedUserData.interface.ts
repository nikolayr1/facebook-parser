import {GenderType} from "../types/gender.type";

export interface ParsedUserDataInterface {
    id: string;
    fullName: string;
    genderDefinedByName? : GenderType;
}
