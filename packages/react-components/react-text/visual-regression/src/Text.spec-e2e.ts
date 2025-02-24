import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';

const actualRoot = join(__dirname, '../dist/screenshots');
const actualSnapshots = readdirSync(actualRoot);

const expectedRoot = __filename + '-snapshots';
const expectedSnapshots = readdirSync(expectedRoot);

console.log({ actualSnapshots, expectedSnapshots });

actualSnapshots.forEach(async actualSnapshotFileName => {
  test(`${actualSnapshotFileName}`, async ({ page }) => {
    const actualImg = readFileSync(join(actualRoot, actualSnapshotFileName), 'base64');

    // Create an HTML page to render the image
    await page.setContent(`
    <html>
      <body>
        <img id="image" src="data:image/png;base64,${actualImg}" />
      </body>
    </html>
  `);

    // Compare the rendered image with the baseline
    await expect(page.locator('#image')).toHaveScreenshot();
  });
});
