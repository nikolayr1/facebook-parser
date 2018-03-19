import {DataSnapshot} from "@firebase/database";

const firebase = require('firebase-admin');
import {ParsedUserDataInterface} from "../../interfaces/parsedUserData.interface";
import {TransportService} from "./transport-service";
import {FirebaseApp} from "@firebase/app-types";
import ENVIROMENT from "../../environment/environment";

export class FirebaseTransport implements TransportService{
    private firebase: FirebaseApp;
    public constructor(){
        this.firebase = firebase.initializeApp({
            credential: firebase.credential.cert(ENVIROMENT.FirebaseCredentials.serviceAccountKey),
            databaseURL: ENVIROMENT.FirebaseCredentials.databaseURL
        });
    }
    /**
     * Saves users to the firebase
     * @param {ParsedUserDataInterface[]} users
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
     * Getting user by his id
     * @param {string} userId
     * @returns {Promise<ParsedUserDataInterface>}
     */
    public getUser(userId: string): Promise<ParsedUserDataInterface> {
        return new Promise<ParsedUserDataInterface>(async (resolve, reject) => {
            let userSnapshot : DataSnapshot = await this.firebase.database().ref(userId).once('value');
            resolve(userSnapshot.val());
        })
    }

    /**
     * Getting all users ids
     * @returns {Promise<string[]>}
     */
    public getUserIds(): Promise<string[]> {
        return new Promise<string[]>((async resolve => {
            let dbSnapshot : DataSnapshot = await this.firebase.database().ref('/').once('value');
            resolve(Object.keys(dbSnapshot.toJSON()));
        }))
    }

    /**
     * Saving user to the firebase
     * @param {ParsedUserDataInterface} user
     * @returns {Promise<void>}
     */
    public saveUser(user: ParsedUserDataInterface) : Promise<void> {
        return new Promise<void>((resolve,reject)=> {
            this.firebase.database().ref(user.id).update(user).then(resolve).catch(reject);
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
            this.firebase.database().ref(userId).update(data).then(resolve).catch(reject);
        })
    }

    /**
     * Returns transport greeting message
     */
    public greeting() {
        return 'Firebase transport has been chosen. Data will be stored in your firebase account';
    }
}
