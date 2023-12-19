import {When, Then, setDefaultTimeout} from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { fixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

When('user search for a {string}', async function (book) {
    await fixture.page.getByPlaceholder('Search books or authors').isEnabled();
    fixture.logger.info("Searching for a book: " + book)
    await fixture.page.getByPlaceholder('Search books or authors').click();
    await fixture.page.getByPlaceholder('Search books or authors').fill(book);
    await fixture.page.getByRole('option', { name: book }).locator('span').click();
});

When('user add the book to the cart', async function () {
    await fixture.page.getByRole('button', { name: 'Add to Cart' }).click();
});

Then('the cart badge should get updated', async function () {
    const badgeCount = await fixture.page.locator("#mat-badge-content-0").textContent();
    expect(Number(badgeCount)).toBeGreaterThanOrEqual(0);
});