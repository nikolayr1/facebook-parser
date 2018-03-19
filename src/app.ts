import {LoginModule} from "./login";
import {FirebaseTransport} from "./transport/firebase-transport";
import {TransportService} from "./transport/transport-service";
import {LocalTransport} from "./transport/local-transport";
import {PeoplesParser} from "./peoples-parser";
import {Page} from "puppeteer";
import {TransportType} from "../types/storage.type";
import {PeoplesAnalyzer} from "./peoples-analyzer";
import {RestTransport} from "./transport/rest-transport";
import {KpiGirls} from "./transport/kpi-girls";
import ENVIROMENT from "../environment/environment";
import {ParticipantAdvancedModel} from "../models/participant-advanced.model";

const puppeteer = require('puppeteer');

parseFacebook();
// forvardParticipantsToKPIGirls();

/**
 * Starts facebook parsing
 * @returns {Promise<void>}
 */
async function parseFacebook(): Promise<void> {
    return new Promise<void>(async (resolve) => {
        const browser = await puppeteer.launch();
        const login = new LoginModule(ENVIROMENT.LoginCredentials, browser);
        const transport = chooseTransport();
        let page: Page = await login.login();
        await page.goto('https://m.facebook.com/graphsearch/184829834894371/likers?source=pivot');
        await page.screenshot({path: 'screenshots/kpi-live-likers-page.png'});
        const parser = new PeoplesParser(page, transport);
        await parser.startParsing();
        await browser.close();
        resolve();
    })
}

async function forvardParticipantsToKPIGirls(): Promise<void> {
    return new Promise<void>(async(resolve) => {
        const analyzer = new PeoplesAnalyzer();
        const transport = chooseTransport();
        const kpiGirls = new KpiGirls();
        const uids = await transport.getUserIds();
        let currentUser = 0;
        let usersTotal = uids.length;
        uids.forEach(async (uid: string) => {
            let user = await transport.getUser(uid);
            let gender = user.genderDefinedByName;
            if (gender === 'female') {
                let newParticipant: ParticipantAdvancedModel = kpiGirls.createParticipant(user);
                await kpiGirls.addParticipant(newParticipant);
                currentUser++;
                console.log(currentUser,' / ', usersTotal);
            }
        });
    });
}

/**
 * Choosing transport service implementation
 * @returns {TransportService}
 */
function chooseTransport(): TransportService {
    let choosenTransport: TransportService,
        selectedStorageType: TransportType = ENVIROMENT.Storage;
    if (selectedStorageType === 'firebase') {
        choosenTransport = new FirebaseTransport();
    }
    else if (selectedStorageType === 'file') {
        choosenTransport = new LocalTransport();
    }
    else if (selectedStorageType === 'rest') {
        choosenTransport = new RestTransport();
    }
    console.log(choosenTransport.greeting());
    return choosenTransport;
}
