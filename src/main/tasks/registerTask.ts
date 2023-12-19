import { expect, Page } from "@playwright/test";
import Events from "../interactions/Events";
import * as datos from "../userinterfaces/registerUI"

export default class RegisterPage {

    private base: Events;

    constructor(private page: Page) {
        this.base = new Events(page);
    }

    async navigateToRegisterPage() {
        await this.base.goto(process.env.BASEURL + "register")
    }
    async registerUser(firstname: string, lastname: string, userName: string,
        password: string, confirmPassword: string,
        gender: string) {
        await this.page.fill(datos.TXT_FIRSTNAME, firstname);
        await this.page.fill(datos.TXT_LASTNAME, lastname);
        await this.enterUsername(userName);
        await this.page.fill(datos.TXT_PASSWORD, password);
        await this.page.fill(datos.TXT_CONFIRM_PASSWORD, confirmPassword);
        if (gender == "m") {
            await this.page.click(datos.RADIOBTN_MALE);
            await expect(this.page.locator(datos.INP_MALE)).toBeChecked();
        } else {
            await this.page.click(datos.RADIOBTN_FEMALE);
            await expect(this.page.locator(datos.INP_FEMALE)).toBeChecked();
        }
        await this.base.waitAndClick(datos.BTN_REGISTER);
    }
    async enterUsername(userName: string) {
        await this.page.fill(datos.TXT_USERNAME, userName);
        const [response] = await Promise.all([
            this.page.waitForResponse(res => {
                return res.status() == 200
                    &&
                    res.url() == `https://bookcart.azurewebsites.net/api/user/validateUserName/${userName}`
            })
        ]);
        await response.finished();
    }
}