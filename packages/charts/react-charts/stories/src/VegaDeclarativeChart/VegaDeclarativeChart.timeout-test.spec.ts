import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const storyUrl = '?id=charts-vegadeclarativechart--default&viewMode=story';
const SCHEMAS_DIR = 'C:\\Users\\atisjai\\dev\\fluentui-charting-contrib\\vega_data';
const screenshotsDir = path.resolve(__dirname, '../../screenshots/timeout_test');

// Sample of BLANK schemas from the evaluation
const BLANK_SAMPLES = [
  'data_002_vega.json',
  'data_046_vega.json',
  'data_087_vega.json',
  'data_149_vega.json',
  'data_200_vega.json',
  'data_250_vega.json',
  'data_277_vega.json',
  'data_336_vega.json',
  'data_439_vega.json',
  'data_541_vega.json',
  'data_597_vega.json',
  'data_886_vega.json',
  'data_937_vega.json',
  'data_1013_vega.json',
  'data_1066_vega.json',
];

// Sample of ERROR schemas to capture exact error messages
const ERROR_SAMPLES = [
  'data_008_vega.json',
  'data_344_vega.json',
  'data_500_vega.json',
  'data_550_vega.json',
  'data_800_vega.json',
  'data_900_vega.json',
  'data_953_vega.json',
  'data_1107_vega.json',
];

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

test.describe('Timeout & Root Cause Investigation', () => {
  test.describe.configure({ retries: 0 });

  test('BLANK schemas with 5s timeout', async ({ page }) => {
    await page.goto(storyUrl);
    await page.waitForLoadState('networkidle');
    const textarea = page.locator('textarea');
    await expect(textarea).toBeVisible({ timeout: 15000 });

    for (const schemaFile of BLANK_SAMPLES) {
      const schemaPath = path.join(SCHEMAS_DIR, schemaFile);
      if (!fs.existsSync(schemaPath)) continue;
      const schemaName = schemaFile.replace('.json', '');
      const schemaJson = fs.readFileSync(schemaPath, 'utf-8');

      // Fill and wait with LONGER timeout (5s instead of 1.5s)
      await textarea.fill(schemaJson);
      await page.waitForTimeout(5000);

      await page.screenshot({
        path: path.join(screenshotsDir, `blank_5s_${schemaName}.png`),
        fullPage: true,
      });
    }
  });

  test('BLANK schemas with 10s timeout', async ({ page }) => {
    await page.goto(storyUrl);
    await page.waitForLoadState('networkidle');
    const textarea = page.locator('textarea');
    await expect(textarea).toBeVisible({ timeout: 15000 });

    // Test just 5 blanks with even longer timeout
    for (const schemaFile of BLANK_SAMPLES.slice(0, 5)) {
      const schemaPath = path.join(SCHEMAS_DIR, schemaFile);
      if (!fs.existsSync(schemaPath)) continue;
      const schemaName = schemaFile.replace('.json', '');
      const schemaJson = fs.readFileSync(schemaPath, 'utf-8');

      await textarea.fill(schemaJson);
      await page.waitForTimeout(10000);

      await page.screenshot({
        path: path.join(screenshotsDir, `blank_10s_${schemaName}.png`),
        fullPage: true,
      });
    }
  });

  test('ERROR schemas - capture error text', async ({ page }) => {
    await page.goto(storyUrl);
    await page.waitForLoadState('networkidle');
    const textarea = page.locator('textarea');
    await expect(textarea).toBeVisible({ timeout: 15000 });

    const results: string[] = [];

    for (const schemaFile of ERROR_SAMPLES) {
      const schemaPath = path.join(SCHEMAS_DIR, schemaFile);
      if (!fs.existsSync(schemaPath)) continue;
      const schemaName = schemaFile.replace('.json', '');
      const schemaJson = fs.readFileSync(schemaPath, 'utf-8');

      await textarea.fill(schemaJson);
      await page.waitForTimeout(2000);

      // Try to extract error text from the error boundary
      const errorEl = page.locator('h3:has-text("Error rendering chart")');
      const hasError = await errorEl.count() > 0;

      if (hasError) {
        // Get the error container text
        const errorContainer = page.locator('div').filter({ has: errorEl }).first();
        const errorText = await errorContainer.innerText();
        // Extract just the first line of the error
        const firstLine = errorText.split('\n').slice(1, 3).join(' | ');
        results.push(`ERROR: ${schemaName} → ${firstLine}`);
      } else {
        results.push(`NO_ERROR: ${schemaName}`);
      }

      await page.screenshot({
        path: path.join(screenshotsDir, `error_${schemaName}.png`),
        fullPage: true,
      });
    }

    // Log all results
    console.log('\n=== ERROR MESSAGE ANALYSIS ===');
    for (const r of results) {
      console.log(r);
    }
  });
});
