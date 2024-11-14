import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
import { ChartDataPoint, ChartProps } from './horizontal-bar-chart.options.js';

const chartPoints1: ChartDataPoint[] = [
  {
    legend: 'Debit card numbers (EU and USA)',
    data: 40,
    color: '#0099BC',
  },
  {
    legend: 'Passport numbers (USA)',
    data: 23,
    color: '#77004D',
  },
  {
    legend: 'Social security numbers',
    data: 35,
    color: '#4F68ED',
  },
  {
    legend: 'Credit card Numbers',
    data: 87,
    color: '#AE8C00',
  },
  {
    legend: 'Tax identification numbers (USA)',
    data: 87,
    color: '#004E8C',
  },
];

const chartPoints2: ChartDataPoint[] = [
  {
    legend: 'Debit card numbers (EU and USA)',
    data: 40,
    color: '#0099BC',
  },
  {
    legend: 'Passport numbers (USA)',
    data: 56,
    color: '#77004D',
  },
  {
    legend: 'Social security numbers',
    data: 35,
    color: '#4F68ED',
  },
  {
    legend: 'Credit card Numbers',
    data: 92,
    color: '#AE8C00',
  },
  {
    legend: 'Tax identification numbers (USA)',
    data: 87,
    color: '#004E8C',
  },
];

const chartPoints3: ChartDataPoint[] = [
  {
    legend: 'Phone Numbers',
    data: 40,
    color: '#881798',
  },
  {
    legend: 'Credit card Numbers',
    data: 23,
    color: '#AE8C00',
  },
];

const basicChartTestData: ChartProps[] = [
  {
    chartTitle: 'Monitored First',
    chartData: chartPoints1,
  },
  {
    chartTitle: 'Monitored Second',
    chartData: chartPoints2,
  },
  {
    chartTitle: 'Unmonitored',
    chartData: chartPoints3,
  },
];

const singleBarHBCData = [
  {
    chartTitle: 'one',
    chartData: [
      {
        legend: 'one',
        data: 1543,
        total: 15000,
        color: '#637cef',
      },
    ],
  },
  {
    chartTitle: 'two',
    chartData: [
      {
        legend: 'two',
        data: 800,
        total: 15000,
        color: '#e3008c',
      },
    ],
  },
  {
    chartTitle: 'three',
    chartData: [
      {
        legend: 'three',
        data: 8888,
        total: 15000,
        color: '#2aa0a4',
      },
    ],
  },
  {
    chartTitle: 'four',
    chartData: [
      {
        legend: 'four',
        data: 15888,
        total: 15000,
        color: '#9373c0',
      },
    ],
  },
  {
    chartTitle: 'five',
    chartData: [
      {
        legend: 'five',
        data: 11444,
        total: 15000,
        color: '#13a10e',
      },
    ],
  },
  {
    chartTitle: 'six',
    chartData: [
      {
        legend: 'six',
        data: 14000,
        total: 15000,
        color: '#3a96dd',
      },
    ],
  },
  {
    chartTitle: 'seven',
    chartData: [
      {
        legend: 'seven',
        data: 9855,
        total: 15000,
        color: '#ca5010',
      },
    ],
  },
  {
    chartTitle: 'eight',
    chartData: [
      {
        legend: 'eight',
        data: 4250,
        total: 15000,
        color: '#57811b',
      },
    ],
  },
];

const singleBarNMVariantData = [
  {
    chartTitle: 'one',
    chartData: [
      {
        legend: 'one',
        data: 1543,
        total: 15000,
        color: '#637cef',
      },
    ],
  },
  {
    chartTitle: 'two',
    chartData: [
      {
        legend: 'two',
        data: 800,
        total: 15000,
        color: '#e3008c',
      },
    ],
  },
  {
    chartTitle: 'three',
    chartData: [
      {
        legend: 'three',
        data: 8888,
        total: 15000,
        color: '#2aa0a4',
      },
    ],
  },
  {
    chartTitle: 'four',
    chartData: [
      {
        legend: 'four',
        data: 15888,
        total: 15000,
        color: '#9373c0',
      },
    ],
  },
  {
    chartTitle: 'five',
    chartData: [
      {
        legend: 'five',
        data: 11444,
        total: 15000,
        color: '#13a10e',
      },
    ],
  },
  {
    chartTitle: 'six',
    chartData: [
      {
        legend: 'six',
        data: 14000,
        total: 15000,
        color: '#3a96dd',
      },
    ],
  },
  {
    chartTitle: 'seven',
    chartData: [
      {
        legend: 'seven',
        data: 9855,
        total: 15000,
        color: '#ca5010',
      },
    ],
  },
  {
    chartTitle: 'eight',
    chartData: [
      {
        legend: 'eight',
        data: 4250,
        total: 15000,
        color: '#57811b',
      },
    ],
  },
];

const singlePointData = [
  {
    chartTitle: 'one',
    chartData: [
      {
        legend: 'one',
        data: 1543,
        total: 15000,
        gradient: ['#637cef', '#e3008c'],
      },
    ],
  },
];

async function expectOptionsToBeVisible(
  element: { getByRole: (arg0: string, arg1: { name: any }) => any },
  options: string | any[],
) {
  for (let i = 0; i < options.length; i++) {
    await expect(element.getByRole('option', { name: options[i] })).toBeVisible();
  }
}

test.describe('horizontalbarchart - Basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-horizontalbarchart--basic'));
    await page.setContent(/* html */ `
      <div>
        <fluent-horizontal-bar-chart data='${JSON.stringify(basicChartTestData)}'>
        </fluent-horizontal-bar-chart>
      </div>
    `);
    await page.waitForFunction(() => customElements.whenDefined('fluent-horizontal-bar-chart'));
  });

  test('Should render horizontalbarchart properly', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    await expectOptionsToBeVisible(element, [
      'Debit card numbers (EU and USA)',
      'Passport numbers (USA)',
      'Social security numbers',
      'Credit card Numbers',
      'Phone Numbers',
    ]);
    await expect(page.getByText('Monitored First')).toBeVisible();
    await expect(page.getByText('Monitored Second')).toBeVisible();
    await expect(page.getByText('Unmonitored')).toBeVisible();
  });

  test('Should render legends data properly', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const legends = element.locator('.legend');
    await expect(legends).toHaveCount(6);
    const firstLegend = legends.first();
    await expect(firstLegend.locator('div').first()).toHaveCSS('background-color', 'rgb(0, 153, 188)');
    await expect(firstLegend).toHaveText('Debit card numbers (EU and USA)');
  });

  test('Should update bar css/opaity when mouse hover on legend', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const legends = element.locator('.legend');
    await expect(legends).toHaveCount(6);
    const firstLegend = legends.first();
    //mouse events
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar');
    await expect(bars).toHaveCount(12);
    for (let i = 0; i < (await bars.count()); i++) {
      if (i == 0 || i == 5) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
        await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
  });

  test('Should update bar css/opaity when mouse moved from one legend to another legend', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const legends = element.locator('.legend');
    await expect(legends).toHaveCount(6);
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar');
    for (let i = 0; i < (await bars.count()); i++) {
      if (i == 0 || i == 5) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
        await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
    await legends.nth(0).dispatchEvent('mouseout');
    await legends.nth(1).dispatchEvent('mouseover');
    for (let i = 0; i < (await bars.count()); i++) {
      if (i == 1 || i == 6) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
        await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
  });

  test('Should show callout when mouse hover on bar', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const bars = element.locator('.bar');
    const tooltip = element.locator('.tooltip');
    await expect(tooltip).toHaveCount(0);
    await bars.nth(0).dispatchEvent('mouseover');
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('Debit card numbers (EU and USA) 40');
  });

  test('Should update callout data when mouse moved from one bar to another bar', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const bars = element.locator('.bar');
    const tooltip = element.locator('.tooltip');
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

test.describe('horizontalbarchart - Single Bar HBC', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-horizontalbarchart--single-bar-hbc'));
    await page.setContent(/* html */ `
    <div>
        <fluent-horizontal-bar-chart data='${JSON.stringify(singleBarHBCData)}'>
        </fluent-horizontal-bar-chart>
    </div>
    `);
    await page.waitForFunction(() => customElements.whenDefined('fluent-horizontal-bar-chart'));
  });

  test('Should render Single Bar HBC  properly', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    await expectOptionsToBeVisible(element, ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']);
    const barsTitles = element.locator('.chart-title');
    await expect(barsTitles).toHaveCount(8);
    await expect(barsTitles.nth(0)).toHaveText('one');
    await expect(barsTitles.nth(1)).toHaveText('two');
    await expect(barsTitles.nth(2)).toHaveText('three');
    await expect(barsTitles.nth(3)).toHaveText('four');
    await expect(barsTitles.nth(4)).toHaveText('five');
    await expect(barsTitles.nth(5)).toHaveText('six');
    await expect(barsTitles.nth(6)).toHaveText('seven');
    await expect(barsTitles.nth(7)).toHaveText('eight');
    for (let i = 0; i < (await barsTitles.count()); i++) {
      await expect(barsTitles.nth(i)).toBeVisible();
    }
  });

  test('Should update bar css/opaity when mouse hover on legend', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const legends = element.locator('.legend');
    await expect(legends).toHaveCount(8);
    //mouse events
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar');
    await expect(bars).toHaveCount(8);
    for (let i = 1; i < (await bars.count()); i++) {
      if (i == 0) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
        await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
  });

  test('Should update bar css/opaity when mouse moved from one legend to another legend', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const legends = element.locator('.legend');
    await expect(legends).toHaveCount(8);
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar');
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    for (let i = 1; i < (await bars.count()); i++) {
      if (i == 0) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
        await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
    await legends.nth(0).dispatchEvent('mouseout');
    await legends.nth(1).dispatchEvent('mouseover');
    for (let i = 1; i < (await bars.count()); i++) {
      if (i == 1) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
        await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
  });

  test('Should update bar css/opaity when mouse click on legend', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const legends = element.locator('.legend');
    await expect(legends).toHaveCount(8);
    await legends.nth(0).click();
    const bars = element.locator('.bar');
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    for (let i = 1; i < (await bars.count()); i++) {
      if (i == 0) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
        await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
    await legends.nth(0).click();
    for (let i = 1; i < (await bars.count()); i++) {
      await expect(bars.nth(i)).toHaveCSS('opacity', '1');
    }
  });

  test('Should show callout when mouse hover on bar', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const bars = element.locator('.bar');
    const tooltip = element.locator('.tooltip');
    await expect(tooltip).toHaveCount(0);
    await bars.nth(0).dispatchEvent('mouseover');
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('one 1543');
  });

  test('Should update callout data when mouse moved from one bar to another bar', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const bars = element.locator('.bar');
    const tooltip = element.locator('.tooltip');
    await expect(tooltip).toHaveCount(0);
    await bars.nth(0).dispatchEvent('mouseover');
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('one 1543');
    await bars.nth(0).dispatchEvent('mouseout');
    await bars.nth(1).dispatchEvent('mouseover');
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('two 800');
  });
});

test.describe('horizontalbarchart - Single Bar NM Variant', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-horizontalbarchart--single-bar-nm-variant'));
    await page.setContent(/* html */ `
    <div>
        <fluent-horizontal-bar-chart data='${JSON.stringify(singleBarNMVariantData)}' variant="single-bar">
        </fluent-horizontal-bar-chart>
    </div>
    `);
    await page.waitForFunction(() => customElements.whenDefined('fluent-horizontal-bar-chart'));
  });

  test('Should render Single Bar HBC  properly', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    await expectOptionsToBeVisible(element, ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']);
  });

  test('Should render bars and bar labels properly', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const bars = element.locator('.bar');
    await expect(bars).toHaveCount(16);
    await expect(bars.nth(0)).toHaveCSS('fill', 'rgb(99, 124, 239)');
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    await expect(bars.nth(0)).toHaveAttribute(`height`, '12');

    let firstBarWidth = await bars.nth(0).getAttribute('width');
    let firstBarWidthEmptySpace = await bars.nth(1).getAttribute('width');
    expect(parseFloat(firstBarWidth)).toBeLessThan(parseFloat(firstBarWidthEmptySpace));
    expect(parseFloat(firstBarWidth) + parseFloat(firstBarWidthEmptySpace)).toBeGreaterThanOrEqual(99);

    let secondBarWidth = await bars.nth(2).getAttribute('width');
    let secondBarWidthEmptySpace = await bars.nth(3).getAttribute('width');
    expect(parseFloat(secondBarWidth)).toBeLessThan(parseFloat(secondBarWidthEmptySpace));
    expect(parseFloat(secondBarWidth) + parseFloat(secondBarWidthEmptySpace)).toBeGreaterThanOrEqual(99);

    let thirdBarWidth = await bars.nth(4).getAttribute('width');
    let thirdBarWidthEmptySpace = await bars.nth(5).getAttribute('width');
    expect(parseFloat(thirdBarWidth)).toBeGreaterThan(parseFloat(thirdBarWidthEmptySpace));
    expect(parseFloat(thirdBarWidth) + parseFloat(thirdBarWidthEmptySpace)).toBeGreaterThanOrEqual(99);

    let fourthBarWidth = await bars.nth(6).getAttribute('width');
    let fourthBarWidthEmptySpace = await bars.nth(7).getAttribute('width');
    expect(parseFloat(fourthBarWidth)).toBeGreaterThan(parseFloat(fourthBarWidthEmptySpace));
    expect(parseFloat(fourthBarWidth) + parseFloat(fourthBarWidthEmptySpace)).toBeGreaterThanOrEqual(99);

    let fifthBarWidth = await bars.nth(8).getAttribute('width');
    let fifthBarWidthEmptySpace = await bars.nth(9).getAttribute('width');
    expect(parseFloat(fifthBarWidth)).toBeGreaterThan(parseFloat(fifthBarWidthEmptySpace));
    expect(parseFloat(fifthBarWidth) + parseFloat(fifthBarWidthEmptySpace)).toBeGreaterThanOrEqual(99);

    let sixthBarWidth = await bars.nth(10).getAttribute('width');
    let sixthBarWidthEmptySpace = await bars.nth(11).getAttribute('width');
    expect(parseFloat(sixthBarWidth)).toBeGreaterThan(parseFloat(sixthBarWidthEmptySpace));
    expect(parseFloat(sixthBarWidth) + parseFloat(sixthBarWidthEmptySpace)).toBeGreaterThanOrEqual(98);

    let seventhBarWidth = await bars.nth(12).getAttribute('width');
    let seventhBarWidthEmptySpace = await bars.nth(13).getAttribute('width');
    expect(parseFloat(seventhBarWidth)).toBeGreaterThan(parseFloat(seventhBarWidthEmptySpace));
    expect(parseFloat(seventhBarWidth) + parseFloat(seventhBarWidthEmptySpace)).toBeGreaterThanOrEqual(99);

    let eigthBarWidth = await bars.nth(14).getAttribute('width');
    let eigthBarWidthEmptySpace = await bars.nth(15).getAttribute('width');
    expect(parseFloat(eigthBarWidth)).toBeLessThan(parseFloat(eigthBarWidthEmptySpace));
    expect(parseFloat(eigthBarWidth) + parseFloat(eigthBarWidthEmptySpace)).toBeGreaterThanOrEqual(99);
  });

  test('Should update bar css/opaity when mouse hover on legend', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const legends = element.locator('.legend');
    await expect(legends).toHaveCount(8);
    //mouse events
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar');
    await expect(bars).toHaveCount(16);
    for (let i = 1; i < (await bars.count()); i++) {
      if (i == 0) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
        await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
  });

  test('Should update bar css/opaity when mouse moved from one legend to another legend', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const legends = element.locator('.legend');
    await expect(legends).toHaveCount(8);
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar');
    for (let i = 1; i < (await bars.count()); i++) {
      if (i == 0) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
        await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
    await legends.nth(0).dispatchEvent('mouseout');
    await legends.nth(1).dispatchEvent('mouseover');
    for (let i = 1; i < (await bars.count()); i++) {
      if (i == 2) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
        await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
  });

  test('Should show callout when mouse hover on bar', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const bars = element.locator('.bar');
    const tooltip = element.locator('.tooltip');
    await expect(tooltip).toHaveCount(0);
    await bars.nth(0).dispatchEvent('mouseover');
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('one 1543');
  });

  test('Should update callout data when mouse moved from one bar to another bar', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const bars = element.locator('.bar');
    const tooltip = element.locator('.tooltip');
    await expect(tooltip).toHaveCount(0);
    await bars.nth(0).dispatchEvent('mouseover');
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('one 1543');
    await bars.nth(0).dispatchEvent('mouseout');
    await bars.nth(2).dispatchEvent('mouseover');
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('two 800');
  });
});

test.describe('horizontalbarchart - Single Data Point', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-horizontalbarchart--single-data-point'));
    await page.setContent(/* html */ `
    <div>
        <fluent-horizontal-bar-chart data='${JSON.stringify(singlePointData)}' variant="single-bar">
        </fluent-horizontal-bar-chart>
    </div>
    `);
    await page.waitForFunction(() => customElements.whenDefined('fluent-horizontal-bar-chart'));
  });

  test('Should render Single Bar HBC  properly', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    await expect(element.getByRole('option', { name: 'one' })).toBeVisible();
    const barsTitles = element.locator('.chart-title');
    await expect(barsTitles).toHaveCount(1);
    await expect(barsTitles.nth(0)).toHaveText('one');
    await expect(barsTitles.nth(0)).toBeVisible();
  });

  test('Should render bars and bar labels properly', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const bars = element.locator('.bar');
    await expect(bars).toHaveCount(2);
    await expect(bars.nth(0)).toHaveCSS('fill', 'url("#gradient-0-0")');
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    await expect(bars.nth(0)).toHaveAttribute(`height`, '12');
    let firstBarWidth = await bars.nth(0).getAttribute('width');
    let firstBarWidthEmptySpace = await bars.nth(1).getAttribute('width');
    expect(parseFloat(firstBarWidth)).toBeLessThan(parseFloat(firstBarWidthEmptySpace));
    expect(parseFloat(firstBarWidth) + parseFloat(firstBarWidthEmptySpace)).toBeGreaterThan(99);
  });

  test('Should update bar css/opaity when mouse hover on legend', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const legends = element.locator('.legend');
    await expect(legends).toHaveCount(1);
    //mouse events
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar');
    await expect(bars).toHaveCount(2);
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    await expect(bars.nth(1)).toHaveCSS('opacity', '0.1');
  });

  test('Should update bar css/opaity when mouse click on legend', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const legends = element.locator('.legend');
    await legends.nth(0).click();
    const bars = element.locator('.bar');
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    await expect(bars.nth(1)).toHaveCSS('opacity', '0.1');
    await legends.nth(0).click();
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    await expect(bars.nth(1)).toHaveCSS('opacity', '1');
  });

  test('Should show callout when mouse hover on bar', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const bars = element.locator('.bar');
    const tooltip = element.locator('.tooltip');
    await expect(tooltip).toHaveCount(0);
    await bars.nth(0).dispatchEvent('mouseover');
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('one 1543');
  });

  test('Should hide callout when mouve moved to bar offset', async ({ page }) => {
    const element = page.locator('fluent-horizontal-bar-chart');
    const bars = element.locator('.bar');
    const tooltip = element.locator('.tooltip');
    await expect(tooltip).toHaveCount(0);
    await bars.nth(0).dispatchEvent('mouseover');
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('one 1543');
    await bars.nth(0).dispatchEvent('mouseout');
    await bars.nth(1).dispatchEvent('mouseover');
    await expect(tooltip).toHaveCount(0);
  });
});
