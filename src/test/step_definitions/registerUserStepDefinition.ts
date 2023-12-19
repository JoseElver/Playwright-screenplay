import { Given, When, Then } from "@cucumber/cucumber"
import RegisterPage from "../../main/tasks/registerTask";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../main/questions/assert";
import * as data from "../../main/utils/registerUser.json";
import ValidarRegistro from "../../main/questions/validarRegistro"

let registerPage: RegisterPage;
let assert: Assert;
let ValidarRegistro: validarRegistro;

Given('I navigate to the register page', async function () {
  registerPage = new RegisterPage(fixture.page);
  assert = new Assert(fixture.page);
  await registerPage.navigateToRegisterPage();
  fixture.logger.info("Navigated to the application")
});

When('I create a new user', async function () {
  const userName = data.userName + Date.now().toString();
  await registerPage.registerUser(data.firstName, data.lastName, 
        userName, data.password, data.confirmPassword, "m");
});

Then('I confirm user registration is success', async function () {
  await validarRegistro
});