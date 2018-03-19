import {TransportService} from "./transport-service";

const fs = require('fs');
import {ParsedUserDataInterface} from "../../interfaces/parsedUserData.interface";

export class LocalTransport implements TransportService {
    /**
     * Saving user
     * @returns {Promise<void>}
     */
    public saveUsers(users: ParsedUserDataInterface[]): Promise<void>{
        return new Promise<void>((resolve, reject)=>{
            let usersString: string = '';
            users.forEach((user: ParsedUserDataInterface) => {
                usersString += JSON.stringify(user);
                usersString += '\n';
            });
            fs.appendFile('data/users.txt', usersString, ()=>{});
            resolve();
        });
    }

    /**
     * Saving user
     * @returns {Promise<void>}
     */
    public saveUser(user: ParsedUserDataInterface): Promise<void>{
        return new Promise<void>((resolve, reject)=>{
            this.saveUsers([user]);
            resolve();
        });
    }

    /**
     * Getting user by his id
     * @param {string} userId
     * @returns {Promise<ParsedUserDataInterface>}
     */
    public getUser(userId: string): Promise<ParsedUserDataInterface> {
        return new Promise<ParsedUserDataInterface>(resolve => {

        })
    }

    /**
     * Getting all users ids
     * @returns {Promise<string[]>}
     */
    public getUserIds(): Promise<string[]> {
        return new Promise<string[]>((resolve => {
            resolve();
        }))
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
     * Returns transport greeting message
     */
    public greeting() {
        return 'Local transport has been chosen. Data will be stored in data/users.txt file.';
    }
}
