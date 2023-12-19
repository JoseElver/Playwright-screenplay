import { Given,When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { fixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async function () {
    await fixture.page.goto(process.env.BASEURL);
    fixture.logger.info("Navigated to the application")
});

Given('User click on the login link', async function () {
  await fixture.page.locator("//span[text()='Login']").click();
});

Given('User enter the username as {string}', async function (username) {
  await fixture.page.getByLabel('Username *').click()
  await fixture.page.getByLabel('Username *').fill(username);
  
});

Given('User enter the password as {string}', async function (password) {
  await fixture.page.getByLabel('Password *').click();
  await fixture.page.getByLabel('Password *').fill(password);
});

When('User click on the login button', async function () {
  await fixture.page.locator('mat-card-actions').getByRole('button', { name: 'Login' }).click();
});

Then('Login should be success', async function () {
  const user = await fixture.page.getByRole('button', { name: 'ortoni11' });
  await expect(user).toBeVisible();
  await (user).textContent();
  console.log("username: " + user);
  fixture.logger.info("Username: " + user)
});

When('Login should fail', async function () {
    await expect(fixture.page.getByText('Username or Password is')).toBeVisible();
});