
import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';

test.describe('horizontalbarchart - Basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-horizontalbarchart--basic'));
    await page.setContent(/* html */ `
      <fluent-horizontalbarchart data="[{&quot;chartTitle&quot;:&quot;Monitored First&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;Debit card numbers (EU and USA)&quot;,&quot;data&quot;:40,&quot;color&quot;:&quot;#0099BC&quot;},{&quot;legend&quot;:&quot;Passport numbers (USA)&quot;,&quot;data&quot;:23,&quot;color&quot;:&quot;#77004D&quot;},{&quot;legend&quot;:&quot;Social security numbers&quot;,&quot;data&quot;:35,&quot;color&quot;:&quot;#4F68ED&quot;},{&quot;legend&quot;:&quot;Credit card Numbers&quot;,&quot;data&quot;:87,&quot;color&quot;:&quot;#AE8C00&quot;},{&quot;legend&quot;:&quot;Tax identification numbers (USA)&quot;,&quot;data&quot;:87,&quot;color&quot;:&quot;#004E8C&quot;}]},{&quot;chartTitle&quot;:&quot;Monitored Second&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;Debit card numbers (EU and USA)&quot;,&quot;data&quot;:40,&quot;color&quot;:&quot;#0099BC&quot;},{&quot;legend&quot;:&quot;Passport numbers (USA)&quot;,&quot;data&quot;:56,&quot;color&quot;:&quot;#77004D&quot;},{&quot;legend&quot;:&quot;Social security numbers&quot;,&quot;data&quot;:35,&quot;color&quot;:&quot;#4F68ED&quot;},{&quot;legend&quot;:&quot;Credit card Numbers&quot;,&quot;data&quot;:92,&quot;color&quot;:&quot;#AE8C00&quot;},{&quot;legend&quot;:&quot;Tax identification numbers (USA)&quot;,&quot;data&quot;:87,&quot;color&quot;:&quot;#004E8C&quot;}]},{&quot;chartTitle&quot;:&quot;Unmonitored&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;Phone Numbers&quot;,&quot;data&quot;:40,&quot;color&quot;:&quot;#881798&quot;},{&quot;legend&quot;:&quot;Credit card Numbers&quot;,&quot;data&quot;:23,&quot;color&quot;:&quot;#AE8C00&quot;}]}]"> </fluent-horizontalbarchart>
    `);
    await page.waitForFunction(() => customElements.whenDefined('fluent-horizontalbarchart'));
  });

  test('Should render horizontalbarchart properly', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    await expect(element.getByRole('option', { name: 'Debit card numbers (EU and USA)' })).toBeVisible();
    await expect(element.getByRole('option', { name: 'Passport numbers (USA)' })).toBeVisible();
    await expect(element.getByRole('option', { name: 'Social security numbers' })).toBeVisible();
    await expect(element.getByRole('option', { name: 'Credit card Numbers' })).toBeVisible();
    await expect(element.getByRole('option', { name: 'Phone Numbers' })).toBeVisible();
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
    const barLabels = element.locator('.bar-label')
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

  test('Should update bar css/opaity when mouse hover on legend', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const legends = element.locator('.legend')
    await expect(legends).toHaveCount(6);
    const firstLegend = legends.first();
    //mouse events
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar')
    await expect(bars).toHaveCount(12);
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    await expect(bars.nth(1)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(2)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(3)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(4)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(5)).toHaveCSS('opacity', '1');
    await expect(bars.nth(6)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(7)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(8)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(9)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(10)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(11)).toHaveCSS('opacity', '0.1');
  });

  test('Should update bar css/opaity when mouse moved from one legend to another legend', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const legends = element.locator('.legend')
    await expect(legends).toHaveCount(6);
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar')
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    await expect(bars.nth(1)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(2)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(3)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(4)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(5)).toHaveCSS('opacity', '1');
    await expect(bars.nth(6)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(7)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(8)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(9)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(10)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(11)).toHaveCSS('opacity', '0.1');
    await legends.nth(0).dispatchEvent('mouseout');
    await legends.nth(1).dispatchEvent('mouseover');
    await expect(bars.nth(0)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(1)).toHaveCSS('opacity', '1');
    await expect(bars.nth(2)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(3)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(4)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(5)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(6)).toHaveCSS('opacity', '1');
    await expect(bars.nth(7)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(8)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(9)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(10)).toHaveCSS('opacity', '0.1');
    await expect(bars.nth(11)).toHaveCSS('opacity', '0.1');
  });

  test('Should show callout when mouse hover on bar', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const bars = element.locator('.bar')
    const tooltip = element.locator('.tooltip')
    await expect(tooltip).toHaveCount(0);
    await bars.nth(0).dispatchEvent('mouseover');
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('Debit card numbers (EU and USA) 40');
  });

  test('Should update callout data when mouse moved from one bar to another bar', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const bars = element.locator('.bar')
    const tooltip = element.locator('.tooltip')
    await expect(tooltip).toHaveCount(0);
    await bars.nth(0).dispatchEvent('mouseover');
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('Debit card numbers (EU and USA) 40');
    await bars.nth(0).dispatchEvent('mouseout');
    await bars.nth(1).dispatchEvent('mouseover');
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('Passport numbers (USA) 23');
  });
});

test.describe('horizontalbarchart - RTL', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-horizontalbarchart--basic'));
    await page.waitForFunction(() => customElements.whenDefined('fluent-horizontalbarchart'));
  });

  test('Should render chart properly in RTL mode', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    await page.setContent(/* html */ `
      <div dir="rtl">
        <div>
             <fluent-horizontalbarchart _isrtl="true" data="[{&quot;chartTitle&quot;:&quot;Monitored First&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;Debit card numbers (EU and USA)&quot;,&quot;data&quot;:40,&quot;color&quot;:&quot;#0099BC&quot;},{&quot;legend&quot;:&quot;Passport numbers (USA)&quot;,&quot;data&quot;:23,&quot;color&quot;:&quot;#77004D&quot;},{&quot;legend&quot;:&quot;Social security numbers&quot;,&quot;data&quot;:35,&quot;color&quot;:&quot;#4F68ED&quot;},{&quot;legend&quot;:&quot;Credit card Numbers&quot;,&quot;data&quot;:87,&quot;color&quot;:&quot;#AE8C00&quot;},{&quot;legend&quot;:&quot;Tax identification numbers (USA)&quot;,&quot;data&quot;:87,&quot;color&quot;:&quot;#004E8C&quot;}]},{&quot;chartTitle&quot;:&quot;Monitored Second&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;Debit card numbers (EU and USA)&quot;,&quot;data&quot;:40,&quot;color&quot;:&quot;#0099BC&quot;},{&quot;legend&quot;:&quot;Passport numbers (USA)&quot;,&quot;data&quot;:56,&quot;color&quot;:&quot;#77004D&quot;},{&quot;legend&quot;:&quot;Social security numbers&quot;,&quot;data&quot;:35,&quot;color&quot;:&quot;#4F68ED&quot;},{&quot;legend&quot;:&quot;Credit card Numbers&quot;,&quot;data&quot;:92,&quot;color&quot;:&quot;#AE8C00&quot;},{&quot;legend&quot;:&quot;Tax identification numbers (USA)&quot;,&quot;data&quot;:87,&quot;color&quot;:&quot;#004E8C&quot;}]},{&quot;chartTitle&quot;:&quot;Unmonitored&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;Phone Numbers&quot;,&quot;data&quot;:40,&quot;color&quot;:&quot;#881798&quot;},{&quot;legend&quot;:&quot;Credit card Numbers&quot;,&quot;data&quot;:23,&quot;color&quot;:&quot;#AE8C00&quot;}]}]"> </fluent-horizontalbarchart>
        </div>
      </div>
    `);
    await expect(element).toHaveScreenshot();
  });
});
