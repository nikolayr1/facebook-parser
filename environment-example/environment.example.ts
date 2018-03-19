import {LoginCredentialsInterface} from "../interfaces/login-credentials.interface";
import {TransportType} from "../types/storage.type";

const LoginCredentials:LoginCredentialsInterface = {
    email: '*******',
    password: '*******'
};

const Storage: TransportType = 'file'; // 'file' or 'firebase'

// If you want to use firebase you have to provide your firebase credentials
// You can get this json here:
// https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk
const FirebaseCredentials = {
    serviceAccountKey: {
        "type": "service_account",
        "project_id": "*******",
        "private_key_id": "*******",
        "private_key": "*******",
        "client_email": "*******",
        "client_id": "*******",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "*******"
    },
    databaseURL: '*******'
};

const FirestoreKpiGirlsCredentials = {
    keyFilename: 'environment/firestoreConfig.json',
    projectId: '*******'
};



let ENVIROMENT: any = {
    LoginCredentials,
    Storage,
    FirebaseCredentials,
    FirestoreKpiGirlsCredentials,
};

export default ENVIROMENT;