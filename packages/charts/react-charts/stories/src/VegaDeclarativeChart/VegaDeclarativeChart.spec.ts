import { test, expect } from '@playwright/test';
import path from 'path';

const storyUrl = '?id=charts-vegadeclarativechart--default&viewMode=story';

// All 25 chart keys from VegaDeclarativeChartDefault.stories.tsx ALL_SCHEMAS
// Map from key to display text (matching the story's text generation logic)
const ALL_CHARTS: Array<{ key: string; text: string }> = [
  'adCtrScatter',
  'ageDistributionBar',
  'airQualityHeatmap',
  'apiResponseLine',
  'areaMultiSeriesNoStack',
  'areaSingleTozeroy',
  'areaStackedTonexty',
  'areachart',
  'attendanceBar',
  'attendanceHeatmap',
  'bandwidthStackedArea',
  'barchart',
  'biodiversityGrouped',
  'bmiScatter',
  'budgetActualGrouped',
  'bugPriorityDonut',
  'campaignPerformanceCombo',
  'cashflowCombo',
  'categorySalesStacked',
  'channelDistributionDonut',
  'climateZonesScatter',
  'co2EmissionsArea',
  'codeCommitsCombo',
  'conversionFunnel',
  'courseEnrollmentDonut',
].map(key => ({
  key,
  text: key
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '),
}));

const screenshotsDir = path.resolve(__dirname, '../../screenshots');

test.describe('VegaDeclarativeChart - Screenshot Tests', () => {
  for (const { key: chartKey, text: chartText } of ALL_CHARTS) {
    test(`should render ${chartKey} correctly`, async ({ page }) => {
      // Navigate to the story
      await page.goto(storyUrl);

      // Wait for the page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Locate the "Chart Type" dropdown using its Field label association
      const chartDropdown = page.getByRole('combobox', { name: 'Chart Type' });
      await expect(chartDropdown).toBeVisible({ timeout: 15000 });

      // Click the Chart Type dropdown to open it
      await chartDropdown.click();

      // Wait for the listbox popup to appear and select the option by text
      const option = page.getByRole('option', { name: chartText, exact: true });
      await expect(option).toBeVisible({ timeout: 5000 });
      await option.click();

      // Wait for the chart to render
      await page.waitForTimeout(2000);

      // Take a screenshot of the full page (includes chart preview)
      await page.screenshot({
        path: path.join(screenshotsDir, `${chartKey}.png`),
        fullPage: true,
      });
    });
  }
});
