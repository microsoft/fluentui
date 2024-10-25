
import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';

test.describe('horizontalbarchart - Basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-horizontalbarchart--basic'));
    await page.waitForFunction(() => customElements.whenDefined('fluent-horizontalbarchart'));
  });

  test('Should render chart properly', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    await expect(element.getByRole('button', { name: 'Debit card numbers (EU and USA)' })).toBeVisible();
    await expect(element.getByRole('button', { name: 'Passport numbers (USA)' })).toBeVisible();
    await expect(element.getByRole('button', { name: 'Social security numbers' })).toBeVisible();
    await expect(element.getByRole('button', { name: 'Credit card Numbers' })).toBeVisible();
    await expect(element.getByRole('button', { name: 'Phone Numbers' })).toBeVisible();
    await expect(page.getByText('Monitored First')).toBeVisible();
    await expect(page.getByText('Monitored Second')).toBeVisible();
    await expect(page.getByText('Unmonitored')).toBeVisible();
  });

  test('Should render bars and bar labels properly', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const bars = element.locator('.bar')
    await expect(bars).toHaveCount(12);
    const firstBar = bars.first();
    await expect(firstBar).toHaveCSS('fill', 'rgb(0, 153, 188)');
    await expect(firstBar).toHaveCSS('opacity', '1');
    await expect(firstBar).toHaveAttribute(`height`, '12');
    const barLabels = element.locator('.barLabel')
    await expect(barLabels).toHaveCount(12);
    const firstBarLabel = barLabels.first();
    await expect(firstBarLabel).toHaveText('272');
    await expect(firstBarLabel).toHaveAttribute(`aria-label`, 'Total: 272');
  });

  test('Should render legends data properly', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const legends = element.locator('.legend')
    await expect(legends).toHaveCount(6);
    const firstLegend = legends.first();
    await expect(firstLegend.locator('div').first()).toHaveCSS('background-color', 'rgb(0, 153, 188)');
    await expect(firstLegend).toHaveText('Debit card numbers (EU and USA)');
  });
});
