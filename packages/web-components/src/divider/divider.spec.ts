// import { expect, test, Locator, Page, FrameLocator } from "@playwright/test";
// import { checkA11y, injectAxe } from "axe-playwright";

// test.describe("Divider", () => {
//     let page: Page;
//     let iframe: FrameLocator;
//     let story: Locator;
//     test.beforeAll(async ({ browser }) => {
//         page = await browser.newPage();
//         await page.goto("?path=/docs/web-components-divider--divider");
//         await injectAxe(page);
//         iframe = page.frameLocator("iframe#storybook-preview-iframe");
//         story = iframe.locator("div#story-decorator");
//     });

//     test.afterAll(async () => {
//         await page.close();
//     });

//     test("simple accessibility run", async () => {
//         await checkA11y(page, "iframe#storybook-preview-iframe", undefined);
//     });
// });
