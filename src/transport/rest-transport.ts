import {TransportService} from "./transport-service";
import {ParsedUserDataInterface} from "../../interfaces/parsedUserData.interface";
import {default as Axios, AxiosInstance, AxiosResponse} from "axios";

export class RestTransport implements TransportService{
    private axios: AxiosInstance;
    public constructor() {
        this.axios = Axios.create();
    }
    /**
     * Saving user
     * @returns {Promise<void>}
     */
    public saveUsers(users: ParsedUserDataInterface[]): Promise<void>{
        return new Promise<void>(async (resolve, reject)=>{
            let saveUserPromises: Promise<any>[] = [];
            users.forEach((user: ParsedUserDataInterface) => {
                saveUserPromises.push(this.saveUser(user));
            });
            await Promise.all(saveUserPromises);
            resolve();
        })
    }

    /**
     * Saving user to the firebase
     * @param {ParsedUserDataInterface} user
     * @returns {Promise<void>}
     */
    public saveUser(user: ParsedUserDataInterface) : Promise<void> {
        return new Promise<void>(async (resolve,reject)=> {
            let result: AxiosResponse = await this.axios.get('http://fb-parser.nikolay-r.com/api/add-member.php', {
                params: {
                    id: user.id,
                    name: user.fullName
                }
            });
            if (result.status !== 200) {
                console.log('Status', result.status);
            }
            resolve();
        })
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
     * Getting all users ids
     * @returns {Promise<string[]>}
     */
    public async getUserIds(): Promise<string[]> {
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
    public greeting(): string {
        return 'REST transport has been chosen. Data will stored in MySQL DB';
    }
}