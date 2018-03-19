import { LoginCredentialsInterface } from "../interfaces/login-credentials.interface";
import { Browser, ElementHandle, Page } from "puppeteer";

export class LoginModule {
    private loginPageUrl: string;
    private userLogin: string;
    private userPassword: string;
    private page: Page;
    private browser: Browser;

    constructor(loginCredentials: LoginCredentialsInterface, browser: Browser) {
        console.log('Running login module ...');
        this.loginPageUrl = 'https://m.facebook.com/login';
        this.userLogin = loginCredentials.email;
        this.userPassword = loginCredentials.password;
        this.browser = browser;
    }

    /**
     * Login into user profile
     * @returns {Promise<void>}
     */
    public async login(): Promise<Page> {
        return new Promise<Page>(async (resolve: any)=> {
            console.log('Running login function...');
            await this.openLoginPage();
            await this.page.screenshot({path: 'screenshots/facebook-login-page.png'});
            await this.inputCredentials();
            await this.page.screenshot({path: 'screenshots/facebook-save-device-page.png'});
            await this.saveDevice();
            await this.page.screenshot({path: 'screenshots/facebook-home-page.png'});
            resolve(this.page);
        })
    }

    /**
     * Opening facebook login page
     * @returns {Promise<void>}
     */

    private async openLoginPage(): Promise<void> {
        console.log('Opening login page...');
        this.page = await this.browser.newPage();
        await this.page.goto(this.loginPageUrl);
    }

    /**
     * Inputting user credentials
     * @returns {Promise<void>}
     */
    private inputCredentials(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            console.log('Inputting credentials...');
            const $email: ElementHandle = await this.page.$('input[name=email]');
            const $pass: ElementHandle = await this.page.$('input[name=pass]');
            const $submit: ElementHandle = await this.page.$('button[name=login]');
            if ($email) {
                await $email.type(this.userLogin);
            } else {
                reject();
            }
            if ($pass) {
                await $pass.type(this.userPassword);
            } else {
                reject();
            }
            if ($submit) {
                await $submit.click();
                await this.page.waitForNavigation({waitUntil: 'load'});
                resolve();
            } else {
                reject();
            }
        });
    }

    /**
     * Dont save this device after login
     * @returns {Promise<void>}
     */
    private async saveDevice(): Promise<void> {
        return new Promise<void>(async (resolve) => {
            const $button: ElementHandle = await this.page.$('button[type=submit]');
            if ($button) {
                console.log('Save device dialog...');
                await $button.click();
                await this.page.waitForNavigation({waitUntil: 'load'});
                resolve();
            } else {
                resolve();
            }
        })
    }
}