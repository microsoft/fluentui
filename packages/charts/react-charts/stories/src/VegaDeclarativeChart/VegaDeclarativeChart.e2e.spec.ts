import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const storyUrl = '?id=charts-vegadeclarativechart--default&viewMode=story';
const SCHEMAS_DIR = 'C:\\Users\\atisjai\\dev\\fluentui-charting-contrib\\vega_data';
const screenshotsDir = path.resolve(__dirname, '../../screenshots/vega_data');

// Read all schema files at test definition time
const schemaFiles = fs
  .readdirSync(SCHEMAS_DIR)
  .filter(f => /^data_\d+_vega\.json$/.test(f))
  .sort();

// Split into batches of 50 for parallel execution across workers
const BATCH_SIZE = 50;
const batches: string[][] = [];
for (let i = 0; i < schemaFiles.length; i += BATCH_SIZE) {
  batches.push(schemaFiles.slice(i, i + BATCH_SIZE));
}

// Ensure screenshots directory exists
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

test.describe('VegaDeclarativeChart - 1000+ Schema Screenshots', () => {
  // Disable retries for batch tests (each batch handles errors internally)
  test.describe.configure({ retries: 0 });

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    const batchStart = batchIndex * BATCH_SIZE + 1;
    const batchEnd = batchStart + batch.length - 1;

    test(`batch ${batchIndex + 1}: schemas ${batchStart}-${batchEnd}`, async ({ page }) => {
      // Navigate to the story once per batch
      await page.goto(storyUrl);
      await page.waitForLoadState('networkidle');

      // Wait for the textarea to be available
      const textarea = page.locator('textarea');
      await expect(textarea).toBeVisible({ timeout: 15000 });

      for (const schemaFile of batch) {
        const schemaPath = path.join(SCHEMAS_DIR, schemaFile);
        const schemaName = schemaFile.replace('.json', '');
        const screenshotPath = path.join(screenshotsDir, `${schemaName}.png`);

        try {
          // Read the schema file
          const schemaJson = fs.readFileSync(schemaPath, 'utf-8');

          // Fill the textarea with the new schema
          await textarea.fill(schemaJson);

          // Wait for chart to re-render (5s needed for complex schemas)
          await page.waitForTimeout(5000);

          // Take screenshot
          await page.screenshot({
            path: screenshotPath,
            fullPage: true,
          });
        } catch (err) {
          // Log error but continue with next schema
          console.error(`Failed to screenshot ${schemaFile}: ${err}`);
        }
      }
    });
  }
});
