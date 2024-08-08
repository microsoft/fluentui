import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Tab } from '../tab/tab.js';
import type { Tablist } from './tablist.js';
import { TablistAppearance, TablistSize } from './tablist.options.js';

test.describe('Tablist', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-tabs--tabs-default'));

    await page.waitForFunction(() =>
      Promise.all([customElements.whenDefined('fluent-tablist'), customElements.whenDefined('fluent-tab')]),
    );
  });

  test('should reset tab indicator offset and scale for horizontal orientation after animation', async ({ page }) => {
    const element = page.locator('fluent-tablist');
    const tabs = element.locator('fluent-tab');

    page.setContent(/* html */ `
      <fluent-tablist>
          <fluent-tab>Tab one</fluent-tab>
          <fluent-tab>Tab two</fluent-tab>
          <fluent-tab>Tab three</fluent-tab>
      </fluent-tablist>
    `);

    await tabs.nth(2).click();

    await expect(element).toHaveCSS('--tabIndicatorOffset', '0px');

    await expect(element).toHaveCSS('--tabIndicatorScale', '1');
  });

  test('should animate the active tab indicator', async ({ page }) => {
    const element = page.locator('fluent-tablist');
    const tabs = element.locator('fluent-tab');
    const tab = tabs.nth(2);

    page.setContent(/* html */ `
      <fluent-tablist>
          <fluent-tab>Tab one</fluent-tab>
          <fluent-tab>Tab two</fluent-tab>
          <fluent-tab>Tab three</fluent-tab>
      </fluent-tablist>
    `);

    await expect(tab).not.toHaveAttribute('data-animate');

    await tab.click();

    await expect(tab).toHaveAttribute('data-animate', 'true');
  });

  test('should have reflect disabled attribute on control', async ({ page }) => {
    const element = page.locator('fluent-tablist');

    page.setContent(/* html */ `
      <fluent-tablist>
          <fluent-tab>Tab one</fluent-tab>
          <fluent-tab>Tab two</fluent-tab>
          <fluent-tab>Tab three</fluent-tab>
      </fluent-tablist>
    `);

    await expect(element).not.toHaveAttribute('disabled');

    await element.evaluate((node: Tablist) => {
      node.disabled = true;
    });

    await expect(element).toHaveAttribute('disabled');
  });

  test('should have role of `tablist`', async ({ page }) => {
    const element = page.locator('fluent-tablist');

    page.setContent(/* html */ `
      <fluent-tablist>
          <fluent-tab>Tab one</fluent-tab>
          <fluent-tab>Tab two</fluent-tab>
          <fluent-tab>Tab three</fluent-tab>
      </fluent-tablist>
    `);

    await expect(element).toHaveAttribute('role', 'tablist');
  });

  test('should set a default orientation value of `horizontal` when `orientation` is not provided', async ({
    page,
  }) => {
    const element = page.locator('fluent-tablist');

    page.setContent(/* html */ `
      <fluent-tablist>
          <fluent-tab>Tab one</fluent-tab>
          <fluent-tab>Tab two</fluent-tab>
          <fluent-tab>Tab three</fluent-tab>
      </fluent-tablist>
    `);

    await expect(element).toHaveJSProperty('orientation', 'horizontal');
  });

  test('should set an `id` attribute on the active tab when an `id` is provided', async ({ page }) => {
    const element = page.locator('fluent-tablist');
    const tabs = element.locator('fluent-tab');

    page.setContent(/* html */ `
      <fluent-tablist>
          <fluent-tab>Tab one</fluent-tab>
          <fluent-tab>Tab two</fluent-tab>
          <fluent-tab>Tab three</fluent-tab>
      </fluent-tablist>
    `);

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
    test('should set an `id` attribute on tab items with a unique ID when an `id` is NOT provided', async ({
      page,
    }) => {
      const element = page.locator('fluent-tablist');
      const tabs = element.locator('fluent-tab');

      page.setContent(/* html */ `
        <fluent-tablist>
            <fluent-tab>Tab one</fluent-tab>
            <fluent-tab>Tab two</fluent-tab>
            <fluent-tab>Tab three</fluent-tab>
        </fluent-tablist>
      `);

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

    test('should default the first tab as the active index if `activeid` is NOT provided', async ({ page }) => {
      const element = page.locator('fluent-tablist');
      const tabs = element.locator('fluent-tab');

      page.setContent(/* html */ `
        <fluent-tablist>
            <fluent-tab>Tab one</fluent-tab>
            <fluent-tab>Tab two</fluent-tab>
            <fluent-tab>Tab three</fluent-tab>
        </fluent-tablist>
      `);

      await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

      await expect(element).toHaveJSProperty('activeTabIndex', 0);
    });
  });

  test.describe('active tab', () => {
    test('should set an `aria-selected` attribute on the active tab when `activeid` is provided', async ({ page }) => {
      const element = page.locator('fluent-tablist');
      const tabs = element.locator('fluent-tab');

      page.setContent(/* html */ `
        <fluent-tablist>
            <fluent-tab>Tab one</fluent-tab>
            <fluent-tab>Tab two</fluent-tab>
            <fluent-tab>Tab three</fluent-tab>
        </fluent-tablist>
      `);

      const secondTab = tabs.nth(1);

      const secondTabId = await secondTab.getAttribute('id');

      await element.evaluate((node: Tablist, secondTabId) => {
        node.activeid = secondTabId;
      }, secondTabId!);

      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });

    test('should update `aria-selected` attribute on the active tab when `activeId` is updated', async ({ page }) => {
      const element = page.locator('fluent-tablist');
      const tabs = element.locator('fluent-tab');

      page.setContent(/* html */ `
        <fluent-tablist>
            <fluent-tab>Tab one</fluent-tab>
            <fluent-tab>Tab two</fluent-tab>
            <fluent-tab>Tab three</fluent-tab>
        </fluent-tablist>
      `);

      await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

      const secondTab = tabs.nth(1);

      const secondTabId = await secondTab.getAttribute('id');

      await element.evaluate((node: Tablist, secondTabId) => {
        node.setAttribute('activeId', secondTabId);
      }, secondTabId!);

      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  for (const appearance in TablistAppearance) {
    test(`should set appearance to \`${appearance}\``, async ({ page }) => {
      const element = page.locator('fluent-tablist');

      page.setContent(/* html */ `
        <fluent-tablist appearance="${appearance}">
            <fluent-tab>Tab one</fluent-tab>
            <fluent-tab>Tab two</fluent-tab>
            <fluent-tab>Tab three</fluent-tab>
        </fluent-tablist>
      `);

      await expect(element).toHaveJSProperty('appearance', appearance);

      expect(await element.evaluate((node, appearance) => node.matches(`:state(${appearance})`), appearance)).toEqual(
        true,
      );
    });
  }

  for (const size in TablistSize) {
    test(`should set size to \`${size}\``, async ({ page }) => {
      const element = page.locator('fluent-tablist');

      page.setContent(/* html */ `
        <fluent-tablist size="${size}">
            <fluent-tab>Tab one</fluent-tab>
            <fluent-tab>Tab two</fluent-tab>
            <fluent-tab>Tab three</fluent-tab>
        </fluent-tablist>
      `);

      await expect(element).toHaveJSProperty('size', size);

      expect(await element.evaluate((node, size) => node.matches(`:state(${size})`), size)).toEqual(true);
    });
  }

  test('should not allow selecting a tab that has been disabled after it has been connected', async ({ page }) => {
    const element = page.locator('fluent-tablist');
    const tabs = element.locator('fluent-tab');

    await page.setContent(/* html */ `
        <fluent-tablist>
            <fluent-tab id="tab-1">Tab one</fluent-tab>
            <fluent-tab id="tab-2">Tab two</fluent-tab>
            <fluent-tab id="tab-3">Tab three</fluent-tab>
        </fluent-tablist>
    `);

    const firstTab = tabs.nth(0);

    const firstTabId = await firstTab.getAttribute('id');

    expect(firstTabId).toBe('tab-1');

    await element.evaluate((node: Tablist, firstTabId) => {
      node.activeid = `${firstTabId}`;
    }, firstTabId);

    await expect(element).toHaveJSProperty('activeid', firstTabId);

    const secondTab = tabs.nth(1);

    await secondTab.evaluate((node: Tab) => {
      node.disabled = true;
    });

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

  test('should allow selecting tab that has been enabled after it has been connected', async ({ page }) => {
    const element = page.locator('fluent-tablist');
    const tabs = element.locator('fluent-tab');

    await page.setContent(/* html */ `
      <fluent-tablist>
          <fluent-tab>Tab one</fluent-tab>
          <fluent-tab disabled>Tab two</fluent-tab>
          <fluent-tab>Tab three</fluent-tab>
      </fluent-tablist>
    `);

    const firstTab = tabs.nth(0);

    const secondTab = tabs.nth(1);

    const firstTabId = await firstTab.getAttribute('id');

    const secondTabId = await secondTab.getAttribute('id');

    await element.evaluate((node: Tablist, firstTabId) => {
      node.activeid = firstTabId;
    }, firstTabId!);

    await expect(element).toHaveJSProperty('activeid', firstTabId);

    // eslint-disable-next-line playwright/no-force-option
    await secondTab.click({ force: true });

    await expect(element).toHaveJSProperty('activeid', firstTabId);

    await secondTab.evaluate((node: Tab) => {
      node.disabled = false;
    });

    await secondTab.click();

    await expect(element).toHaveJSProperty('activeid', secondTabId);
  });

  test('should not allow selecting hidden tab using arrow keys', async ({ page }) => {
    const element = page.locator('fluent-tablist');
    const tabs = element.locator('fluent-tab');

    page.setContent(/* html */ `
      <fluent-tablist>
          <fluent-tab>Tab one</fluent-tab>
          <fluent-tab hidden>Tab two</fluent-tab>
          <fluent-tab>Tab three</fluent-tab>
      </fluent-tablist>
    `);

    const firstTab = tabs.nth(0);

    const thirdTab = tabs.nth(2);

    const firstTabId = await firstTab.getAttribute('id');
    const thirdTabId = await thirdTab.getAttribute('id');

    await element.evaluate((node: Tablist, firstTabId) => {
      node.activeid = firstTabId;
    }, firstTabId!);

    await firstTab.press('ArrowRight');

    await expect(element).toHaveJSProperty('activeid', thirdTabId);
  });

  test('should not allow selecting hidden tab by pressing End', async ({ page }) => {
    const element = page.locator('fluent-tablist');
    const tabs = element.locator('fluent-tab');

    page.setContent(/* html */ `
      <fluent-tablist>
          <fluent-tab>Tab one</fluent-tab>
          <fluent-tab>Tab two</fluent-tab>
          <fluent-tab hidden>Tab three</fluent-tab>
      </fluent-tablist>
    `);

    const firstTab = tabs.nth(0);

    const secondTab = tabs.nth(1);

    const firstTabId = await firstTab.getAttribute('id');
    const secondTabId = await secondTab.getAttribute('id');

    await element.evaluate((node: Tablist, firstTabId) => {
      node.activeid = firstTabId;
    }, firstTabId!);

    await firstTab.press('End');

    await expect(element).toHaveJSProperty('activeid', secondTabId);
  });
});
