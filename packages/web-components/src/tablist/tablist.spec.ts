import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Tab } from '../tab/tab.js';
import type { Tablist } from './tablist.js';

test.describe('Tablist', () => {
  let page: Page;
  let element: Locator;
  let tabs: Locator;

  const template = /* html */ `
    <fluent-tablist>
        <fluent-tab>Tab one</fluent-tab>
        <fluent-tab>Tab two</fluent-tab>
        <fluent-tab>Tab three</fluent-tab>
    </fluent-tablist>
  `;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-tablist');

    tabs = element.locator('fluent-tab');

    await page.goto(fixtureURL('components-tabs--tabs-default'));
    await page.setContent(template);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should reset tab indicator offset and scale for horizontal orientation after animation', async () => {
    const tab = tabs.nth(2);
    await tab.click();

    const tabIndicatorValues = await page.evaluate(() => {
      const tabsElement = document.querySelector('fluent-tablist') as Element;
      return {
        offset: getComputedStyle(tabsElement).getPropertyValue('--tabIndicatorOffset').trim(),
        scale: getComputedStyle(tabsElement).getPropertyValue('--tabIndicatorScale').trim(),
      };
    });

    expect(tabIndicatorValues.offset).toBe('0px');
    expect(tabIndicatorValues.scale).toBe('1');
  });

  test('should animate the active tab indicator', async () => {
    // Reset the page content to ensure the tab indicator is reset
    page.setContent(template);

    const tab = tabs.nth(2);

    const valueBeforeClick = await page.evaluate(() => {
      const tabElement = document.querySelector('fluent-tab:nth-child(3)') as Element;
      return tabElement.getAttribute('data-animate');
    });

    expect(valueBeforeClick).toBe(null);

    await tab.click();

    const valueAfterClick = await page.evaluate(() => {
      const tabElement = document.querySelector('fluent-tab:nth-child(3)') as Element;
      return tabElement.getAttribute('data-animate');
    });

    expect(valueAfterClick).toBe('true');
  });

  test('should have reflect disabled attribute on control', async () => {
    await expect(element).not.toHaveAttribute('disabled', '');

    await element.evaluate((node: Tablist) => {
      node.disabled = true;
    });

    await expect(element).toHaveAttribute('disabled', '');
  });

  test('should have role of `tablist`', async () => {
    await expect(element).toHaveAttribute('role', 'tablist');
  });

  test('should set a default orientation value of `horizontal` when `orientation` is not provided', async () => {
    await expect(element).toHaveJSProperty('orientation', 'horizontal');
  });

  test('should set an `id` attribute on the active tab when an `id` is provided', async () => {
    const tabCount = await tabs.count();

    for (let i = 0; i < tabCount; i++) {
      const tab = tabs.nth(i);

      await tab.evaluate((node, i) => {
        node.id = `custom-id-${i}`;
      }, i);

      await expect(tab).toHaveAttribute('id', `custom-id-${i}`);
    }
  });

  test.describe('`id` NOT provided', () => {
    test('should set an `id` attribute on tab items with a unique ID when an `id` is NOT provided', async () => {
      const tabCount = await tabs.count();

      for (let i = 0; i < tabCount; i++) {
        const tab = tabs.nth(i);

        const id = await tab.getAttribute('id');

        // The ID function may not start at 0 so we need to check that the ID is unique
        expect(id).toMatch(/tab-\d+/);

        const tabPanel = element.locator(`#${id}`);

        await expect(tabPanel).toHaveCount(1);
      }
    });

    test('should default the first tab as the active index if `activeid` is NOT provided', async () => {
      await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

      await expect(element).toHaveJSProperty('activeTabIndex', 0);
    });
  });

  test.describe('active tab', () => {
    test('should set an `aria-selected` attribute on the active tab when `activeid` is provided', async () => {
      const secondTab = tabs.nth(1);

      const secondTabId = `${await secondTab.getAttribute('id')}`;

      await element.evaluate((node: Tablist, secondTabId) => {
        node.activeid = secondTabId;
      }, secondTabId);

      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });

    test('should update `aria-selected` attribute on the active tab when `activeId` is updated', async () => {
      await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

      const secondTab = tabs.nth(1);

      const secondTabId = `${await secondTab.getAttribute('id')}`;

      await element.evaluate((node: Tablist, secondTabId) => {
        node.setAttribute('activeId', secondTabId);
      }, secondTabId);

      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  test('should reflect appearance attribute values', async () => {
    await element.evaluate((node: Tablist) => {
      node.appearance = 'subtle';
    });
    await expect(element).toHaveAttribute('appearance', 'subtle');
    await expect(element).toHaveJSProperty('appearance', 'subtle');

    await element.evaluate((node: Tablist) => {
      node.appearance = 'transparent';
    });
    await expect(element).toHaveAttribute('appearance', 'transparent');
    await expect(element).toHaveJSProperty('appearance', 'transparent');
  });

  test('should reflect size attribute values', async () => {
    await element.evaluate((node: Tablist) => {
      node.size = 'small';
    });
    await expect(element).toHaveAttribute('size', 'small');
    await expect(element).toHaveJSProperty('size', 'small');

    await element.evaluate((node: Tablist) => {
      node.size = 'medium';
    });
    await expect(element).toHaveAttribute('size', 'medium');
    await expect(element).toHaveJSProperty('size', 'medium');

    await element.evaluate((node: Tablist) => {
      node.size = 'large';
    });
    await expect(element).toHaveAttribute('size', 'large');
    await expect(element).toHaveJSProperty('size', 'large');
  });

  test('should not allow selecting a tab that has been disabled after it has been connected', async () => {
    await page.setContent(/* html */ `
        <fluent-tablist>
            <fluent-tab id="tab-1">Tab one</fluent-tab>
            <fluent-tab id="tab-2">Tab two</fluent-tab>
            <fluent-tab id="tab-3">Tab three</fluent-tab>
        </fluent-tablist>
      `);

    await (await element.elementHandle())?.waitForElementState('stable');

    const firstTab = tabs.nth(0);

    const firstTabId = await firstTab.getAttribute('id');

    expect(firstTabId).toBe('tab-1');

    await element.evaluate((node: Tablist, firstTabId) => {
      node.activeid = `${firstTabId}`;
    }, firstTabId);

    await (await element.elementHandle())?.waitForElementState('stable');

    await expect(element).toHaveJSProperty('activeid', firstTabId);

    const secondTab = tabs.nth(1);

    await secondTab.evaluate((node: Tab) => {
      node.disabled = true;
    });

    await (await element.elementHandle())?.waitForElementState('stable');

    await secondTab.evaluate(node => {
      node.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        }),
      );
    });

    await expect(element).toHaveJSProperty('activeid', firstTabId);
  });

  test('should allow selecting tab that has been enabled after it has been connected', async () => {
    test.slow();

    await page.setContent(/* html */ `
      <fluent-tablist>
          <fluent-tab>Tab one</fluent-tab>
          <fluent-tab disabled>Tab two</fluent-tab>
          <fluent-tab>Tab three</fluent-tab>
      </fluent-tablist>
    `);

    const firstTab = tabs.nth(0);

    const secondTab = tabs.nth(1);

    const firstTabId = `${await firstTab.getAttribute('id')}`;
    const secondTabId = `${await secondTab.getAttribute('id')}`;

    await element.evaluate((node: Tablist, firstTabId) => {
      node.activeid = firstTabId;
    }, firstTabId);

    await expect(element).toHaveJSProperty('activeid', firstTabId);

    await secondTab.evaluate(node => {
      node.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        }),
      );
    });

    await expect(element).toHaveJSProperty('activeid', firstTabId);

    await secondTab.evaluate((node: Tab) => {
      node.disabled = false;
    });

    await (await element.elementHandle())?.waitForElementState('stable');

    await secondTab.evaluate(node => {
      node.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        }),
      );
    });
    await expect(element).toHaveJSProperty('activeid', secondTabId);
  });

  test('should not allow selecting hidden tab using arrow keys', async () => {
    test.slow();

    page.setContent(/* html */ `
      <fluent-tablist>
          <fluent-tab>Tab one</fluent-tab>
          <fluent-tab hidden>Tab two</fluent-tab>
          <fluent-tab>Tab three</fluent-tab>
      </fluent-tablist>
    `);

    const firstTab = tabs.nth(0);

    const thirdTab = tabs.nth(2);

    const firstTabId = `${await firstTab.getAttribute('id')}`;
    const thirdTabId = `${await thirdTab.getAttribute('id')}`;

    await element.evaluate((node: Tablist, firstTabId) => {
      node.activeid = firstTabId;
    }, firstTabId);

    await firstTab.press('ArrowRight');

    await expect(element).toHaveJSProperty('activeid', thirdTabId);
  });

  test('should not allow selecting hidden tab by pressing End', async () => {
    test.slow();
    page.setContent(/* html */ `
      <fluent-tablist>
          <fluent-tab>Tab one</fluent-tab>
          <fluent-tab>Tab two</fluent-tab>
          <fluent-tab hidden>Tab three</fluent-tab>
      </fluent-tablist>
    `);

    const firstTab = tabs.nth(0);

    const secondTab = tabs.nth(1);

    const firstTabId = `${await firstTab.getAttribute('id')}`;
    const secondTabId = `${await secondTab.getAttribute('id')}`;

    await element.evaluate((node: Tablist, firstTabId) => {
      node.activeid = firstTabId;
    }, firstTabId);

    await firstTab.press('End');

    await expect(element).toHaveJSProperty('activeid', secondTabId);
  });
});
