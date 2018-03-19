const fs = require('fs');
import {GenderType} from "../types/gender.type";
import {ParsedUserDataInterface} from "../interfaces/parsedUserData.interface";

export class PeoplesAnalyzer {
    private maleNames: string;
    private femaleNames: string;
    public constructor() {
        // reading male names
        this.maleNames = fs.readFileSync('data/names_male.txt').toString();
        // reading female names
        this.femaleNames = fs.readFileSync('data/names_female.txt').toString();
    }
    public getUserPhoto(userId: string): string {
        return 'https://graph.facebook.com/' + userId + '/picture?type=large'
    }
    public getUserUrl(userId: string): string {
        return 'https://facebook.com/' + userId + '/'
    }
    public getUserName(user: ParsedUserDataInterface): string {
        return user.fullName.split('_')[0];
    }
    public getUserSurname(user: ParsedUserDataInterface): string {
        return user.fullName.split('_')[1];
    }
    /**
     * Defines
     * @param {ParsedUserDataInterface} user
     * @returns {GenderType}
     */
    public defineUserGender(user: ParsedUserDataInterface): GenderType {
        let result: GenderType = 'undefined';
        let userName = user.fullName.split('_')[0];
        if (this.maleNames.indexOf(userName) !== -1) {
            result = 'male'
        } else if (this.femaleNames.indexOf(userName) !== -1) {
            result = 'female'
        }
        return result;
    }
}