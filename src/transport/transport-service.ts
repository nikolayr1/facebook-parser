import {ParsedUserDataInterface} from "../../interfaces/parsedUserData.interface";

export abstract class TransportService {
    public constructor() {}
    /**
     * Saving users
     * @returns {Promise<void>}
     */
    public saveUsers(users: ParsedUserDataInterface[]): Promise<void>{
        return new Promise<void>((resolve => {
            resolve()
        }));
    }

    /**
     * Saving user
     * @returns {Promise<void>}
     */
    public saveUser(user: ParsedUserDataInterface): Promise<void>{
        return new Promise<void>((resolve => {
            resolve()
        }));
    }

    /**
     * Getting user by id
     * @param {string} userId
     * @returns {Promise<ParsedUserDataInterface>}
     */
    public getUser(userId: string): Promise<ParsedUserDataInterface> {
        return new Promise<ParsedUserDataInterface>((resolve)=> {
            resolve();
        })
    }

    /**
     * Updating user data in the firebase
     * @param {string} userId
     * @param data
     * @returns {Promise<void>}
     */
    public updateUser(userId: string, data: any) : Promise<void> {
        return new Promise<void>((resolve,reject)=> {
            resolve();
        })
    }

    /**
     * Getting all users ids
     * @returns {Promise<string[]>}
     */
    public async getUserIds(): Promise<string[]> {
        return new Promise<string[]>((resolve => {
            resolve();
        }))
    }

    /**
     * Returns transport greeting message
     */
    public greeting(): string {
        return 'Abstract transport has been chosen. Data will not be stored';
    }
}
