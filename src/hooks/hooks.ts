import {Before, After, BeforeAll, AfterAll, AfterStep} from "@cucumber/cucumber"
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/logs/logger";
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
})

Before(async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos",
        },
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});

AfterStep(async function ({ pickle }) {
    const img = await fixture.page.screenshot(
        { path: `./test-results/screenshots/${pickle.name}.png`, type: "png" });
        this.attach(img, "image/png");
})

After(async function ({ pickle, result }) {
    const path = `./test-results/trace/${pickle.name}.zip`;
    let videoPath = await fixture.page.video()?.path();
    await context.tracing.stop({ path: path });
    await fixture.page.close();
    await context.close();
    this.attach(fs.readFileSync(videoPath),'video/webm');
    const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
    this.attach(`Trace file: ${traceFileLink}`, 'text/html');
});

AfterAll(async function () {
    browser.close();
})