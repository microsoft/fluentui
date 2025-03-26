import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
import type { ChartDataPoint, ChartProps } from './donut-chart.options.js';

const points: ChartDataPoint[] = [
  {
    legend: 'first',
    data: 20000,
  },
  {
    legend: 'second',
    data: 39000,
  },
];

const data: ChartProps = {
  chartTitle: 'Donut chart basic example',
  chartData: points,
};

test.describe('Donut-chart - Basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-donutchart--basic'));
    await page.setContent(/* html */ `
      <div>
        <fluent-donut-chart value-inside-donut="39,000" inner-radius="55" data='${JSON.stringify(data)}'>
        </fluent-donut-chart>
      </div>
    `);
    await page.waitForFunction(() => customElements.whenDefined('fluent-donut-chart'));
  });

  test('Should render chart properly', async ({ page }) => {
    const element = page.locator('fluent-donut-chart');
    const legends = element.locator('.legend-text');
    await expect(legends.nth(0).getByText('first')).toBeVisible();
    await expect(legends.nth(1).getByText('second')).toBeVisible();
    await expect(element.getByText('39,000')).toBeVisible();
  });

  test('Should render path with proper attributes and css', async ({ page }) => {
    const element = page.locator('fluent-donut-chart');
    const arcList = element.locator('.arc');
    await expect(arcList).toHaveCount(2);
    await expect(arcList.nth(0)).toHaveAttribute('fill', '#637cef');
    await expect(arcList.nth(0)).toHaveAttribute('aria-label', 'first, 20000.');
    await expect(arcList.nth(0)).toHaveAttribute(
      'd',
      'M-76.547,47.334A90,90,0,0,1,-1.055,-89.994L-1.055,-54.99A55,55,0,0,0,-46.993,28.577Z',
    );
    await expect(arcList.nth(0)).toHaveCSS('fill', 'rgb(99, 124, 239)');
    await expect(arcList.nth(0)).toHaveCSS('--borderRadiusMedium', '4px');

    await expect(arcList.nth(1)).toHaveAttribute('fill', '#e3008c');
    await expect(arcList.nth(1)).toHaveAttribute('aria-label', 'second, 39000.');
    await expect(arcList.nth(1)).toHaveAttribute(
      'd',
      'M1.055,-89.994A90,90,0,1,1,-75.417,49.115L-45.863,30.358A55,55,0,1,0,1.055,-54.99Z',
    );
    await expect(arcList.nth(1)).toHaveCSS('fill', 'rgb(227, 0, 140)');
    await expect(arcList.nth(1)).toHaveCSS('--borderRadiusMedium', '4px');
  });

  test('Should render legends data properly', async ({ page }) => {
    const element = page.locator('fluent-donut-chart');
    const legends = element.getByRole('option');
    await expect(legends).toHaveCount(2);
    const firstLegend = element.getByRole('option', { name: 'First' });
    const secondLegend = element.getByRole('option', { name: 'Second' });
    await expect(firstLegend).toBeVisible();
    await expect(firstLegend).toHaveText('first');
    await expect(firstLegend).toHaveCSS('--borderRadiusMedium', '4px');
    await expect(secondLegend).toBeVisible();
    await expect(secondLegend).toHaveText('second');
    await expect(secondLegend).toHaveCSS('--borderRadiusMedium', '4px');
  });

  test('Should update path css values with mouse click event on legend', async ({ page }) => {
    const element = page.locator('fluent-donut-chart');
    const firstPath = element.getByLabel('first,');
    const secondPath = element.getByLabel('second,');
    const firstLegend = element.getByRole('option', { name: 'First' });
    //mouse events
    await firstLegend.click();
    await expect(firstPath).toHaveCSS('opacity', '1');
    await expect(secondPath).toHaveCSS('opacity', '0.1');
    await firstLegend.click();
    await expect(firstPath).toHaveCSS('opacity', '1');
    await expect(secondPath).toHaveCSS('opacity', '1');
  });

  test('Should update path css values with mouse hover event on legend', async ({ page }) => {
    const element = page.locator('fluent-donut-chart');
    const firstPath = element.getByLabel('first,');
    const secondPath = element.getByLabel('second,');
    const firstLegend = element.getByRole('option', { name: 'First' });
    //mouse events
    await firstLegend.dispatchEvent('mouseover');
    await expect(firstPath).toHaveCSS('opacity', '1');
    await expect(secondPath).toHaveCSS('opacity', '0.1');
    await firstLegend.dispatchEvent('mouseout');
    await expect(firstPath).toHaveCSS('opacity', '1');
    await expect(secondPath).toHaveCSS('opacity', '1');
  });

  test('Should show callout with mouse hover event on path', async ({ page }) => {
    const element = page.locator('fluent-donut-chart');
    const firstPath = element.getByLabel('first,');
    const calloutRoot = element.locator('.tooltip');
    await expect(calloutRoot).toHaveCount(0);
    await firstPath.dispatchEvent('mouseover');
    await expect(calloutRoot).toHaveCount(1);
    await expect(calloutRoot).toHaveCSS('opacity', '1');
    const calloutLegendText = element.locator('.tooltip-legend-text');
    await expect(calloutLegendText).toHaveText('first');
    const calloutContentY = element.locator('.tooltip-content-y');
    await expect(calloutContentY).toHaveText('20000');
    await firstPath.dispatchEvent('mouseout');
    await expect(calloutRoot).not.toHaveCSS('opacity', '0');
  });

  test('Should update callout data when mouse moved from one path to another path', async ({ page }) => {
    const element = page.locator('fluent-donut-chart');
    const firstPath = element.getByLabel('first,');
    const calloutRoot = element.locator('.tooltip');
    await expect(calloutRoot).toHaveCount(0);
    await firstPath.dispatchEvent('mouseover');
    await expect(calloutRoot).toHaveCSS('opacity', '1');
    const calloutLegendText = element.locator('.tooltip-legend-text');
    await expect(calloutLegendText).toHaveText('first');
    const calloutContentY = element.locator('.tooltip-content-y');
    await expect(calloutContentY).toHaveText('20000');
    const secondPath = element.getByLabel('second,');
    await secondPath.dispatchEvent('mouseover');
    await expect(calloutRoot).toHaveCSS('opacity', '1');
    await expect(calloutLegendText).toHaveText('second');
    await expect(calloutContentY).toHaveText('39000');
  });
});
