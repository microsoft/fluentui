
import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
import { teamsDarkTheme } from '@fluentui/tokens';
import { colorNeutralBackground1 } from '../theme/design-tokens.js';

async function expectOptionsToBeVisible(element:
  { getByRole: (arg0: string, arg1: { name: any; }) => any; },  options: string | any[])
  {
  for (let i = 0; i < options.length; i++) {
    await expect(element.getByRole('option', { name: options[i] })).toBeVisible();
  }
}

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
    await expectOptionsToBeVisible(element, [
      'Debit card numbers (EU and USA)', 'Passport numbers (USA)', 'Social security numbers', 'Credit card Numbers', 'Phone Numbers'
    ]);
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
    for (let i = 0; i < await bars.count(); i++) {
      if (i == 0 || i == 5) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
        await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
  });

  test('Should update bar css/opaity when mouse moved from one legend to another legend', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const legends = element.locator('.legend')
    await expect(legends).toHaveCount(6);
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar')
    for (let i = 0; i < await bars.count(); i++) {
      if (i == 0 || i == 5) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
        await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
    await legends.nth(0).dispatchEvent('mouseout');
    await legends.nth(1).dispatchEvent('mouseover');
    for (let i = 0; i < await bars.count(); i++) {
      if (i == 1 || i == 6) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
        await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
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

test.describe('horizontalbarchart - Single Bar HBC', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-horizontalbarchart--single-bar-hbc'));
    await page.setContent(/* html */ `
    <div>
        <fluent-horizontalbarchart style="width: 100%" data="[{&quot;chartTitle&quot;:&quot;one&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;one&quot;,&quot;data&quot;:1543,&quot;total&quot;:15000,&quot;color&quot;:&quot;#637cef&quot;}]},{&quot;chartTitle&quot;:&quot;two&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;two&quot;,&quot;data&quot;:800,&quot;total&quot;:15000,&quot;color&quot;:&quot;#e3008c&quot;}]},{&quot;chartTitle&quot;:&quot;three&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;three&quot;,&quot;data&quot;:8888,&quot;total&quot;:15000,&quot;color&quot;:&quot;#2aa0a4&quot;}]},{&quot;chartTitle&quot;:&quot;four&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;four&quot;,&quot;data&quot;:15888,&quot;total&quot;:15000,&quot;color&quot;:&quot;#9373c0&quot;}]},{&quot;chartTitle&quot;:&quot;five&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;five&quot;,&quot;data&quot;:11444,&quot;total&quot;:15000,&quot;color&quot;:&quot;#13a10e&quot;}]},{&quot;chartTitle&quot;:&quot;six&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;six&quot;,&quot;data&quot;:14000,&quot;total&quot;:15000,&quot;color&quot;:&quot;#3a96dd&quot;}]},{&quot;chartTitle&quot;:&quot;seven&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;seven&quot;,&quot;data&quot;:9855,&quot;total&quot;:15000,&quot;color&quot;:&quot;#ca5010&quot;}]},{&quot;chartTitle&quot;:&quot;eight&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;eight&quot;,&quot;data&quot;:4250,&quot;total&quot;:15000,&quot;color&quot;:&quot;#57811b&quot;}]}]">
        </fluent-horizontalbarchart>
    </div>
    `);
    await page.waitForFunction(() => customElements.whenDefined('fluent-horizontalbarchart'));
  });

  test('Should render Single Bar HBC  properly', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    await expectOptionsToBeVisible(element, [
      'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'
    ]);
    const barsTitles = element.locator('.chart-title')
    await expect(barsTitles).toHaveCount(8);
    await expect(barsTitles.nth(0)).toHaveText('one');
    await expect(barsTitles.nth(1)).toHaveText('two');
    await expect(barsTitles.nth(2)).toHaveText('three');
    await expect(barsTitles.nth(3)).toHaveText('four');
    await expect(barsTitles.nth(4)).toHaveText('five');
    await expect(barsTitles.nth(5)).toHaveText('six');
    await expect(barsTitles.nth(6)).toHaveText('seven');
    await expect(barsTitles.nth(7)).toHaveText('eight');
    for (let i = 0; i < await barsTitles.count(); i++) {
      await expect(barsTitles.nth(i)).toBeVisible();
    }
   });

   test('Should render bars and bar labels properly', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const bars = element.locator('.bar')
    await expect(bars).toHaveCount(8);
    await expect(bars.nth(0)).toHaveCSS('fill', 'rgb(99, 124, 239)');
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    await expect(bars.nth(0)).toHaveAttribute(`height`, '12');
    let firstBarWidth = await  bars.nth(0).getAttribute('width');
    expect(parseFloat(firstBarWidth)).toBeLessThan(10);
    let secondBarWidth = await  bars.nth(1).getAttribute('width');
    expect(parseFloat(secondBarWidth)).toBeLessThan(6);
    let thirdBarWidth = await  bars.nth(2).getAttribute('width');
    expect(parseFloat(thirdBarWidth)).toBeLessThan(56);
    let forthBarWidth = await  bars.nth(3).getAttribute('width');
    expect(parseFloat(forthBarWidth)).toBe(100);
    let fifthBarWidth = await  bars.nth(4).getAttribute('width');
    expect(parseFloat(fifthBarWidth)).toBeLessThan(75);
    let sixthBarWidth = await  bars.nth(5).getAttribute('width');
    expect(parseFloat(sixthBarWidth)).toBeLessThan(90);
    let seventhBarWidth = await  bars.nth(6).getAttribute('width');
    expect(parseFloat(seventhBarWidth)).toBeLessThan(63);
    let eithBarWidth = await  bars.nth(7).getAttribute('width');
    expect(parseFloat(eithBarWidth)).toBeLessThan(27);
    const barLabels = element.locator('.bar-label')
    await expect(barLabels).toHaveCount(8);
    const firstBarLabel = barLabels.first();
    await expect(firstBarLabel).toHaveText('1543');
    await expect(firstBarLabel).toHaveAttribute(`aria-label`, 'Total: 1543');
  });

  test('Should update bar css/opaity when mouse hover on legend', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const legends = element.locator('.legend')
    await expect(legends).toHaveCount(8);
    //mouse events
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar')
    await expect(bars).toHaveCount(8);
    for (let i = 1; i < await bars.count(); i++) {
      if (i == 0) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
      await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
  });

  test('Should update bar css/opaity when mouse moved from one legend to another legend', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const legends = element.locator('.legend')
    await expect(legends).toHaveCount(8);
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar')
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    for (let i = 1; i < await bars.count(); i++) {
      if (i == 0) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
      await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
    await legends.nth(0).dispatchEvent('mouseout');
    await legends.nth(1).dispatchEvent('mouseover');
    for (let i = 1; i < await bars.count(); i++) {
      if (i == 1) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
      await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
  });

  test('Should update bar css/opaity when mouse click on legend', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const legends = element.locator('.legend')
    await expect(legends).toHaveCount(8);
    await legends.nth(0).click();
    const bars = element.locator('.bar')
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    for (let i = 1; i < await bars.count(); i++) {
      if (i == 0) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
      await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
    await legends.nth(0).click();
    for (let i = 1; i < await bars.count(); i++) {
      await expect(bars.nth(i)).toHaveCSS('opacity', '1');
    }
  });

  test('Should show callout when mouse hover on bar', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const bars = element.locator('.bar')
    const tooltip = element.locator('.tooltip')
    await expect(tooltip).toHaveCount(0);
    await bars.nth(0).dispatchEvent('mouseover');
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('one 1543');
  });

  test('Should update callout data when mouse moved from one bar to another bar', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const bars = element.locator('.bar')
    const tooltip = element.locator('.tooltip')
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
        <fluent-horizontalbarchart style="width: 100%" variant="single-bar" data="[{&quot;chartTitle&quot;:&quot;one&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;one&quot;,&quot;data&quot;:1543,&quot;total&quot;:15000,&quot;color&quot;:&quot;#637cef&quot;}]},{&quot;chartTitle&quot;:&quot;two&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;two&quot;,&quot;data&quot;:800,&quot;total&quot;:15000,&quot;color&quot;:&quot;#e3008c&quot;}]},{&quot;chartTitle&quot;:&quot;three&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;three&quot;,&quot;data&quot;:8888,&quot;total&quot;:15000,&quot;color&quot;:&quot;#2aa0a4&quot;}]},{&quot;chartTitle&quot;:&quot;four&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;four&quot;,&quot;data&quot;:15888,&quot;total&quot;:15000,&quot;color&quot;:&quot;#9373c0&quot;}]},{&quot;chartTitle&quot;:&quot;five&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;five&quot;,&quot;data&quot;:11444,&quot;total&quot;:15000,&quot;color&quot;:&quot;#13a10e&quot;}]},{&quot;chartTitle&quot;:&quot;six&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;six&quot;,&quot;data&quot;:14000,&quot;total&quot;:15000,&quot;color&quot;:&quot;#3a96dd&quot;}]},{&quot;chartTitle&quot;:&quot;seven&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;seven&quot;,&quot;data&quot;:9855,&quot;total&quot;:15000,&quot;color&quot;:&quot;#ca5010&quot;}]},{&quot;chartTitle&quot;:&quot;eight&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;eight&quot;,&quot;data&quot;:4250,&quot;total&quot;:15000,&quot;color&quot;:&quot;#57811b&quot;}]}]">
        </fluent-horizontalbarchart>
    </div>
    `);
    await page.waitForFunction(() => customElements.whenDefined('fluent-horizontalbarchart'));
  });

  test('Should render Single Bar HBC  properly', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    await expectOptionsToBeVisible(element, [
      'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'
    ]);
   });

   test('Should render bars and bar labels properly', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const bars = element.locator('.bar')
    await expect(bars).toHaveCount(16);
    await expect(bars.nth(0)).toHaveCSS('fill', 'rgb(99, 124, 239)');
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    await expect(bars.nth(0)).toHaveAttribute(`height`, '12');

    let firstBarWidth = await  bars.nth(0).getAttribute('width');
    let firstBarWidthEmptySpace = await  bars.nth(1).getAttribute('width');
    expect(parseFloat(firstBarWidth)).toBeLessThan(parseFloat(firstBarWidthEmptySpace));
    expect(parseFloat(firstBarWidth) + parseFloat(firstBarWidthEmptySpace)).toBeGreaterThan(99);

    let secondBarWidth = await  bars.nth(2).getAttribute('width');
    let secondBarWidthEmptySpace = await  bars.nth(3).getAttribute('width');
    expect(parseFloat(secondBarWidth)).toBeLessThan(parseFloat(secondBarWidthEmptySpace));
    expect(parseFloat(secondBarWidth) + parseFloat(secondBarWidthEmptySpace)).toBeGreaterThan(99);

    let thirdBarWidth = await  bars.nth(4).getAttribute('width');
    let thirdBarWidthEmptySpace = await  bars.nth(5).getAttribute('width');
    expect(parseFloat(thirdBarWidth)).toBeGreaterThan(parseFloat(thirdBarWidthEmptySpace));
    expect(parseFloat(thirdBarWidth) + parseFloat(thirdBarWidthEmptySpace)).toBeGreaterThan(99);

    let fourthBarWidth = await  bars.nth(6).getAttribute('width');
    let fourthBarWidthEmptySpace = await  bars.nth(7).getAttribute('width');
    expect(parseFloat(fourthBarWidth)).toBeGreaterThan(parseFloat(fourthBarWidthEmptySpace));
    expect(parseFloat(fourthBarWidth) + parseFloat(fourthBarWidthEmptySpace)).toBeGreaterThan(99);

    let fifthBarWidth = await  bars.nth(8).getAttribute('width');
    let fifthBarWidthEmptySpace = await  bars.nth(9).getAttribute('width');
    expect(parseFloat(fifthBarWidth)).toBeGreaterThan(parseFloat(fifthBarWidthEmptySpace));
    expect(parseFloat(fifthBarWidth) + parseFloat(fifthBarWidthEmptySpace)).toBeGreaterThan(99);

    let sixthBarWidth = await  bars.nth(10).getAttribute('width');
    let sixthBarWidthEmptySpace = await  bars.nth(11).getAttribute('width');
    expect(parseFloat(sixthBarWidth)).toBeGreaterThan(parseFloat(sixthBarWidthEmptySpace));
    expect(parseFloat(sixthBarWidth) + parseFloat(sixthBarWidthEmptySpace)).toBeGreaterThan(99);

    let seventhBarWidth = await  bars.nth(12).getAttribute('width');
    let seventhBarWidthEmptySpace = await  bars.nth(13).getAttribute('width');
    expect(parseFloat(seventhBarWidth)).toBeGreaterThan(parseFloat(seventhBarWidthEmptySpace));
    expect(parseFloat(seventhBarWidth) + parseFloat(seventhBarWidthEmptySpace)).toBeGreaterThan(99);

    let eigthBarWidth = await  bars.nth(14).getAttribute('width');
    let eigthBarWidthEmptySpace = await  bars.nth(15).getAttribute('width');
    expect(parseFloat(eigthBarWidth)).toBeLessThan(parseFloat(eigthBarWidthEmptySpace));
    expect(parseFloat(eigthBarWidth) + parseFloat(eigthBarWidthEmptySpace)).toBeGreaterThan(99);
  });

  test('Should update bar css/opaity when mouse hover on legend', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const legends = element.locator('.legend')
    await expect(legends).toHaveCount(8);
    //mouse events
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar')
    await expect(bars).toHaveCount(16);
    for (let i = 1; i < await bars.count(); i++) {
      if (i == 0) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
      await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
  });

  test('Should update bar css/opaity when mouse moved from one legend to another legend', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const legends = element.locator('.legend')
    await expect(legends).toHaveCount(8);
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar')
    for (let i = 1; i < await bars.count(); i++) {
      if (i == 0) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
      await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
    await legends.nth(0).dispatchEvent('mouseout');
    await legends.nth(1).dispatchEvent('mouseover');
    for (let i = 1; i < await bars.count(); i++) {
      if (i == 2) {
        await expect(bars.nth(i)).toHaveCSS('opacity', '1');
      } else {
      await expect(bars.nth(i)).toHaveCSS('opacity', '0.1');
      }
    }
  });

  test('Should show callout when mouse hover on bar', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const bars = element.locator('.bar')
    const tooltip = element.locator('.tooltip')
    await expect(tooltip).toHaveCount(0);
    await bars.nth(0).dispatchEvent('mouseover');
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('one 1543');
  });

  test('Should update callout data when mouse moved from one bar to another bar', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const bars = element.locator('.bar')
    const tooltip = element.locator('.tooltip')
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

test.describe('horizontalbarchart - Theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-horizontalbarchart--basic'));
    await page.waitForFunction(() => customElements.whenDefined('fluent-donut-chart'));
  });

  test('Should render chart properly in teamsDarkTheme mode', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    await page.setContent(/* html */ `
      <style>
        body {
          background-color: ${colorNeutralBackground1};
       }
      </style>
      <fluent-horizontalbarchart data="[{&quot;chartTitle&quot;:&quot;Monitored First&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;Debit card numbers (EU and USA)&quot;,&quot;data&quot;:40,&quot;color&quot;:&quot;#0099BC&quot;},{&quot;legend&quot;:&quot;Passport numbers (USA)&quot;,&quot;data&quot;:23,&quot;color&quot;:&quot;#77004D&quot;},{&quot;legend&quot;:&quot;Social security numbers&quot;,&quot;data&quot;:35,&quot;color&quot;:&quot;#4F68ED&quot;},{&quot;legend&quot;:&quot;Credit card Numbers&quot;,&quot;data&quot;:87,&quot;color&quot;:&quot;#AE8C00&quot;},{&quot;legend&quot;:&quot;Tax identification numbers (USA)&quot;,&quot;data&quot;:87,&quot;color&quot;:&quot;#004E8C&quot;}]},{&quot;chartTitle&quot;:&quot;Monitored Second&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;Debit card numbers (EU and USA)&quot;,&quot;data&quot;:40,&quot;color&quot;:&quot;#0099BC&quot;},{&quot;legend&quot;:&quot;Passport numbers (USA)&quot;,&quot;data&quot;:56,&quot;color&quot;:&quot;#77004D&quot;},{&quot;legend&quot;:&quot;Social security numbers&quot;,&quot;data&quot;:35,&quot;color&quot;:&quot;#4F68ED&quot;},{&quot;legend&quot;:&quot;Credit card Numbers&quot;,&quot;data&quot;:92,&quot;color&quot;:&quot;#AE8C00&quot;},{&quot;legend&quot;:&quot;Tax identification numbers (USA)&quot;,&quot;data&quot;:87,&quot;color&quot;:&quot;#004E8C&quot;}]},{&quot;chartTitle&quot;:&quot;Unmonitored&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;Phone Numbers&quot;,&quot;data&quot;:40,&quot;color&quot;:&quot;#881798&quot;},{&quot;legend&quot;:&quot;Credit card Numbers&quot;,&quot;data&quot;:23,&quot;color&quot;:&quot;#AE8C00&quot;}]}]"> </fluent-horizontalbarchart>
    `)
    await page.evaluate( theme => {
       window.setTheme(theme);
    }, teamsDarkTheme);
    await expect(element).toHaveScreenshot();
  });
});

test.describe('horizontalbarchart - Single Data Point', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-horizontalbarchart--single-data-point'));
    await page.setContent(/* html */ `
    <div>
        <fluent-horizontalbarchart style="width: 100%" variant="single-bar" data="[{&quot;chartTitle&quot;:&quot;one&quot;,&quot;chartData&quot;:[{&quot;legend&quot;:&quot;one&quot;,&quot;data&quot;:1543,&quot;total&quot;:15000,&quot;gradient&quot;:[&quot;#637cef&quot;,&quot;#e3008c&quot;]}]}]">
        </fluent-horizontalbarchart>
    </div>
    `);
    await page.waitForFunction(() => customElements.whenDefined('fluent-horizontalbarchart'));
  });

  test('Should render Single Bar HBC  properly', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    await expect(element.getByRole('option', { name: 'one' })).toBeVisible();
    const barsTitles = element.locator('.chart-title')
    await expect(barsTitles).toHaveCount(1);
    await expect(barsTitles.nth(0)).toHaveText('one');
    await expect(barsTitles.nth(0)).toBeVisible();
   });

   test('Should render bars and bar labels properly', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const bars = element.locator('.bar')
    await expect(bars).toHaveCount(2);
    await expect(bars.nth(0)).toHaveCSS('fill', 'url(\"#gradient-0-0\")');
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    await expect(bars.nth(0)).toHaveAttribute(`height`, '12');
    let firstBarWidth = await  bars.nth(0).getAttribute('width');
    let firstBarWidthEmptySpace = await  bars.nth(1).getAttribute('width');
    expect(parseFloat(firstBarWidth)).toBeLessThan(parseFloat(firstBarWidthEmptySpace));
    expect(parseFloat(firstBarWidth) + parseFloat(firstBarWidthEmptySpace)).toBeGreaterThan(99);
  });

  test('Should update bar css/opaity when mouse hover on legend', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const legends = element.locator('.legend')
    await expect(legends).toHaveCount(1);
    //mouse events
    await legends.nth(0).dispatchEvent('mouseover');
    const bars = element.locator('.bar')
    await expect(bars).toHaveCount(2);
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    await expect(bars.nth(1)).toHaveCSS('opacity', '0.1');
  });

  test('Should update bar css/opaity when mouse click on legend', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const legends = element.locator('.legend')
    await legends.nth(0).click();
    const bars = element.locator('.bar')
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    await expect(bars.nth(1)).toHaveCSS('opacity', '0.1');
    await legends.nth(0).click();
    await expect(bars.nth(0)).toHaveCSS('opacity', '1');
    await expect(bars.nth(1)).toHaveCSS('opacity', '1');
  });

  test('Should show callout when mouse hover on bar', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const bars = element.locator('.bar')
    const tooltip = element.locator('.tooltip')
    await expect(tooltip).toHaveCount(0);
    await bars.nth(0).dispatchEvent('mouseover');
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip.nth(0)).toHaveCSS('opacity', '1');
    await expect(tooltip.nth(0).locator('div').first()).toHaveText('one 1543');
  });

  test('Should hide callout when mouve moved to bar offset', async ({ page }) => {
    const element = page.locator('fluent-horizontalbarchart');
    const bars = element.locator('.bar')
    const tooltip = element.locator('.tooltip')
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
