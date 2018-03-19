import {ParsedUserDataInterface} from "../../interfaces/parsedUserData.interface";
import {ParticipantAdvancedModel} from "../../models/participant-advanced.model";
import {PeoplesAnalyzer} from "../peoples-analyzer";
import {FirebaseFirestore} from "@firebase/firestore-types";
import ENVIROMENT from "../../environment/environment";

const Firestore = require('@google-cloud/firestore');

export class KpiGirls {
    private analyzer: PeoplesAnalyzer;
    private firestore: FirebaseFirestore;
    public constructor() {
        this.analyzer = new PeoplesAnalyzer();
        this.firestore = new Firestore({
            keyFilename: ENVIROMENT.FirestoreKpiGirlsCredentials.keyFilename,
            projectId: ENVIROMENT.FirestoreKpiGirlsCredentials.projectId
        });
    }

    public createParticipant(user: ParsedUserDataInterface): ParticipantAdvancedModel {
        let photo = this.analyzer.getUserPhoto(user.id);
        let url = this.analyzer.getUserUrl(user.id);
        let name = this.analyzer.getUserName(user);
        let surname = this.analyzer.getUserSurname(user);
        let partcipant = new ParticipantAdvancedModel(photo, url, name, surname);
        return partcipant;
    }

    public addParticipant(partcipant: ParticipantAdvancedModel): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            await this.firestore.collection('/participants').add(this.getData(partcipant));
            resolve();
        })
    }

    /**
     * Extracts participant data into non-typed-object
     * @returns {object}
     */
    public getData(object: any): any {
        const result: any = {};
        Object.keys(object).map(key => result[key] = object[key]);
        return result;
    }
}
