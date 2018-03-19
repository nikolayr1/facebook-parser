import {ElementHandle, JSHandle, Page} from "puppeteer";
import {ParsedUserDataInterface} from "../interfaces/parsedUserData.interface";
import {TransportService} from "./transport/transport-service";

/**
 * Parses peoples from facebook search result page
 */
export class PeoplesParser {
    private page: Page;
    private PEOPLE_TOTAL_NUMBER: number; // need to watch the progress. This number of users will be parsed.
    private peopleParsed: number;
    private transport: TransportService;

    public constructor(facebookSearchResultsPage: Page, transportService: TransportService, peopleTotalNumber?: number) {
        console.log('Running parsing module ...');
        this.page = facebookSearchResultsPage;
        this.PEOPLE_TOTAL_NUMBER = 7666;
        this.peopleParsed = 0;
        this.transport = transportService;
    }

    /**
     * Starts parsing
     * @returns {Promise<void>}
     */
    public async startParsing(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            while (this.peopleParsed < this.PEOPLE_TOTAL_NUMBER) {
                let loadedUsers: ParsedUserDataInterface[] = await this.parseLoadedUsers();
                this.transport.saveUsers(loadedUsers);
                // console.log('Parsed users:', loadedUsers);
                this.peopleParsed += loadedUsers.length;
                console.log('Parsed', this.peopleParsed, 'users from', this.PEOPLE_TOTAL_NUMBER, '(', Math.round(this.peopleParsed * 100 / this.PEOPLE_TOTAL_NUMBER) +'% )');
                await this.removeUserBlocksFromDom('[data-module-result-type=user] > div');
                await this.loadMoreUsers();
            }
            resolve();
        })
    }

    /**
     * Getting blocks of users info
     * @returns {Promise}
     */
    private getUserBlocksFromDom(): Promise<ElementHandle[]> {
        return new Promise(async (resolve, reject) => {
            // console.log('Getting user blocks from DOM...');
            let userBlocks: ElementHandle[] = await this.page.$$('[data-module-result-type=user] > div');
            if (userBlocks) {
                // console.log('Got', userBlocks.length, 'users from dom.');
                resolve(userBlocks);
            }
        });
    }

    /**
     * Removes blocks of users info
     * @returns {Promise}
     */
    private async removeUserBlocksFromDom(elementsSelector: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            await this.page.evaluate((elementsSelector: string) => {
                document.querySelectorAll(elementsSelector).forEach((element: HTMLElement) => {
                    element.remove();
                })
                // document.querySelector(elementsSelector).remove();
            }, elementsSelector);
            resolve();
        });
    }

    /**
     * Parsing info about all loaded users
     * @returns {ParsedUserDataInterface[]}
     */
    private async parseLoadedUsers(): Promise<ParsedUserDataInterface[]> {
        return new Promise<ParsedUserDataInterface[]>(async (resolve, reject) => {
            let promisesArray: Promise<ParsedUserDataInterface>[] = [];
            let userBlocks: ElementHandle[] = await this.getUserBlocksFromDom();
            userBlocks.forEach((userBlock: ElementHandle) => {
                promisesArray.push(this.parseUserInfoFromBlock(userBlock));
            });
            let result: ParsedUserDataInterface[] = await Promise.all(promisesArray);
            resolve(result);
        })
    }

    /**
     * Getting user id and full name from user DOM block
     * @param userBlock
     * @returns {{id: *, fullName: ElementTagNameMap[string] | Element}}
     * @constructor
     */
    private parseUserInfoFromBlock(userBlock: ElementHandle): Promise<ParsedUserDataInterface> {
        return new Promise<ParsedUserDataInterface>(async (resolve, reject) => {
            let link: string = await userBlock.$('a')
                    .then(($link: JSHandle) => $link.getProperty('href'))
                    .then((href: JSHandle) => href.jsonValue()),
                fullName: string = await userBlock.$('span')
                    .then(($span: ElementHandle) => $span.getProperty('innerHTML'))
                    .then((text: JSHandle) => text.jsonValue()),
                userData: ParsedUserDataInterface = {
                    id: 'not set',
                    fullName: 'not set',
                };

            if (link) {
                userData.id = this.parseUserIdFromUrl(link)
            }
            if (fullName) {
                userData.fullName = fullName.split(' ').join('_')
            }
            resolve(userData);
        });
    }

    /**
     * Parsing user id from user url
     * @param {string} url
     * @returns {string}
     */
    private parseUserIdFromUrl(url: string) {
        let link: string = url;
        let result: string = '';
        result = url.slice(link.indexOf('?id=') + 4, link.indexOf('&'));
        if (result.length < 20) { return result; }
        result = url.slice(link.indexOf('messages/thread/') + 16, link.indexOf('/?__xt'));
        if (result.length < 20) { return result; }
        return 'not_parsed';
    }

    /**
     * Scrolling down every 1 second until users will be loaded to the page
     * @returns {Promise}
     */
    private async loadMoreUsers() {
        return new Promise(async (resolve) => {
            await this.page.evaluate(()=>{
                window.scrollTo(0, 0);
                window.scrollTo(0, 999999);
            });
            await this.page.waitFor('[data-module-result-type=user] > div');
            resolve();
        })

    }
}