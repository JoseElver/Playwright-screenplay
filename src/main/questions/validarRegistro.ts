import { fixture } from "../../hooks/pageFixture";
const { expect } = require('@playwright/test');
const { LoginPage } = require('../userinterfaces/LoginPage');

class validarRegistro {
    datos = {
        mensaje: async () => {
            const element = await fixture.page.$(LoginPage.LBL_PRODUCTS);
            if (!element) {
                throw new Error(`No se encontró el elemento con el selector: ${LoginPage.LBL_PRODUCTS}`);
            }
            return element;
        }
    }

    async on(dato) {
        const mensajeElement = await this.datos.mensaje();
        await expect(mensajeElement).toBeVisible();
    }
}

module.exports = new validarRegistro();