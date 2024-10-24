import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
import { IChartDataPoint, IChartProps } from './donut-chart.options.js';



const points: IChartDataPoint[] = [
  {
    legend: 'first',
    data: 20000,
    color: '#0099BC',
  },
  {
    legend: 'second',
    data: 39000,
    color: '#77004D',
  },
];

const data: IChartProps = {
  chartTitle: 'Donut chart basic example',
  chartData: points,
};


test.describe('Donut-chart - Basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-donutchart--basic'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-donut-chart'));
  });

  test('Should render chart properly', async ({ page }) => {
    const element = page.locator('fluent-donut-chart');
    //chart attributes
    await expect(element.getByRole('button', { name: 'First' })).toBeVisible();
    await expect(element.getByRole('button', { name: 'Second' })).toBeVisible();
    await expect(page.getByText('35,000')).toBeVisible();
  });

  test('Should render path with proper attributes and css', async ({ page }) => {
    const element = page.locator('fluent-donut-chart');
    const firstPath = element.getByLabel('first,');
    await expect(firstPath).toHaveAttribute('fill', '#0099BC');
    await expect(firstPath).toHaveAttribute('aria-label', 'first, 20000.');
    await expect(firstPath).
    toHaveAttribute('d', 'M-76.547,47.334A90,90,0,0,1,-1.055,-89.994L-1.055,-54.99A55,55,0,0,0,-46.993,28.577Z');
    await expect(firstPath).toHaveCSS('fill', 'rgb(0, 153, 188)');
    await expect(firstPath).toHaveCSS('--borderRadiusMedium', '4px');

    const secondPath = element.getByLabel('second,');
    await expect(secondPath).toHaveAttribute('fill', '#77004D');
    await expect(secondPath).toHaveAttribute('aria-label', 'second, 39000.');
    await expect(secondPath).
    toHaveAttribute('d', 'M1.055,-89.994A90,90,0,1,1,-75.417,49.115L-45.863,30.358A55,55,0,1,0,1.055,-54.99Z');
  });

  test('Should render legends data properly', async ({ page }) => {
    const element = page.locator('fluent-donut-chart');
    const legends = element.getByRole('button');
    await expect(legends).toHaveCount(2);
    const firstLegend = element.getByRole('button', { name: 'First' });
    const secondLegend = element.getByRole('button', { name: 'Second' });
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
    const firstLegend = element.getByRole('button', { name: 'First' });
    //mouse events
    await firstLegend.click();
    await expect(firstPath).toHaveCSS('opacity', '1');
    await expect(secondPath).toHaveCSS('opacity', '0.1');
    await firstLegend.click();
    await expect(firstPath).toHaveCSS('opacity', '1');
    await expect(secondPath).toHaveCSS('opacity', '1');
  });
})
