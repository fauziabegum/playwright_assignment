import { chromium, test } from "@playwright/test";

test("To launch a browser", async ({page}) => {

await page.goto("http://leaftaps.com/opentaps/control/main");

});