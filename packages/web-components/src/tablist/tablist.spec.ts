import { expect, test } from '../../test/playwright/index.js';
import type { Tab } from '../tab/tab.js';
import type { Tablist } from './tablist.js';
import { TablistAppearance, TablistSize } from './tablist.options.js';

test.describe('Tablist', () => {
  test.use({
    tagName: 'fluent-tablist',
    waitFor: ['fluent-tab'],
    innerHTML: /* html */ `
      <fluent-tab>Tab one</fluent-tab>
      <fluent-tab>Tab two</fluent-tab>
      <fluent-tab>Tab three</fluent-tab>
    `,
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-tablist');
    });

    expect(hasError).toBe(false);
  });

  test('should reset tab indicator offset and scale for horizontal orientation after animation', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const tabs = element.locator('fluent-tab');

    await tabs.nth(2).click();

    await expect(element).toHaveCSS('--tabIndicatorOffset', '0px');

    await expect(element).toHaveCSS('--tabIndicatorScale', '1');
  });

  test('should animate the active tab indicator', async ({ fastPage }) => {
    const { element } = fastPage;
    const tabs = element.locator('fluent-tab');
    const tab = tabs.nth(2);

    await expect(tab).not.toHaveAttribute('data-animate');

    await tab.click();

    await expect(tab).toHaveAttribute('data-animate', 'true');
  });

  test('should have reflect disabled attribute on control', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).not.toHaveAttribute('disabled');

    await element.evaluate((node: Tablist) => {
      node.disabled = true;
    });

    await expect(element).toHaveAttribute('disabled');
  });

  test('should have role of `tablist`', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveAttribute('role', 'tablist');
  });

  test('should set a default orientation value of `horizontal` when `orientation` is not provided', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('orientation', 'horizontal');
  });

  test('should set an `id` attribute on the active tab when an `id` is provided', async ({ fastPage }) => {
    const { element } = fastPage;
    const tabs = element.locator('fluent-tab');

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
      fastPage,
    }) => {
      const { element } = fastPage;
      const tabs = element.locator('fluent-tab');

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

    test('should default the first tab as the active index if `activeid` is NOT provided', async ({ fastPage }) => {
      const { element } = fastPage;
      const tabs = element.locator('fluent-tab');

      await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

      await expect(element).toHaveJSProperty('activeTabIndex', 0);
    });
  });

  test.describe('active tab', () => {
    test('should set an `aria-selected` attribute on the active tab when `activeid` is provided', async ({
      fastPage,
    }) => {
      const { element } = fastPage;
      const tabs = element.locator('fluent-tab');

      const secondTab = tabs.nth(1);

      const secondTabId = await secondTab.getAttribute('id');

      await element.evaluate((node: Tablist, secondTabId) => {
        node.activeid = secondTabId;
      }, secondTabId!);

      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });

    test('should update `aria-selected` attribute on the active tab when `activeId` is updated', async ({
      fastPage,
    }) => {
      const { element } = fastPage;
      const tabs = element.locator('fluent-tab');

      await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

      const secondTab = tabs.nth(1);

      const secondTabId = await secondTab.getAttribute('id');

      await element.evaluate((node: Tablist, secondTabId) => {
        node.setAttribute('activeId', secondTabId);
      }, secondTabId!);

      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  test('should set the `appearance` property to match the `appearance` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const appearance of Object.values(TablistAppearance)) {
      await test.step(appearance, async () => {
        await fastPage.setTemplate({ attributes: { appearance } });

        await expect(element).toHaveJSProperty('appearance', appearance);

        await expect(element).toHaveAttribute('appearance', appearance);
      });
    }
  });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const size of Object.values(TablistSize)) {
      await test.step(size, async () => {
        await fastPage.setTemplate({ attributes: { size } });

        await expect(element).toHaveJSProperty('size', size);

        await expect(element).toHaveAttribute('size', size);
      });
    }
  });

  test('should not allow selecting a tab that has been disabled after it has been connected', async ({ fastPage }) => {
    const { element } = fastPage;
    const tabs = element.locator('fluent-tab');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-tab id="tab-1">Tab one</fluent-tab>
        <fluent-tab id="tab-2">Tab two</fluent-tab>
        <fluent-tab id="tab-3">Tab three</fluent-tab>
      `,
    });

    const firstTab = tabs.nth(0);

    await expect(firstTab).toHaveId('tab-1');

    await element.evaluate((node: Tablist) => {
      node.activeid = 'tab-1';
    });

    await expect(element).toHaveJSProperty('activeid', 'tab-1');

    const secondTab = tabs.nth(1);

    await secondTab.evaluate((node: Tab) => {
      node.disabled = true;
    });

    // eslint-disable-next-line playwright/no-force-option
    await secondTab.click({ force: true });

    await expect(element).toHaveJSProperty('activeid', 'tab-1');
  });

  test('should allow selecting tab that has been enabled after it has been connected', async ({ fastPage }) => {
    const { element } = fastPage;
    const tabs = element.locator('fluent-tab');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-tab>Tab one</fluent-tab>
        <fluent-tab disabled>Tab two</fluent-tab>
        <fluent-tab>Tab three</fluent-tab>
      `,
    });

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

  test('should not allow selecting hidden tab using arrow keys', async ({ fastPage }) => {
    const { element } = fastPage;
    const tabs = element.locator('fluent-tab');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-tab>Tab one</fluent-tab>
        <fluent-tab hidden>Tab two</fluent-tab>
        <fluent-tab>Tab three</fluent-tab>
      `,
    });

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

  test('should not allow selecting hidden tab by pressing End', async ({ fastPage }) => {
    const { element } = fastPage;
    const tabs = element.locator('fluent-tab');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-tab>Tab one</fluent-tab>
        <fluent-tab>Tab two</fluent-tab>
        <fluent-tab hidden>Tab three</fluent-tab>
      `,
    });

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

  test('should associate panel elements with `aria-controls` attributes', async ({ fastPage, page }) => {
    const { element } = fastPage;
    await fastPage.setTemplate(`
          <fluent-tablist>
              <fluent-tab aria-controls="panel1">Tab one</fluent-tab>
              <fluent-tab aria-controls="panel2">Tab two</fluent-tab>
              <fluent-tab aria-controls="panel3">Tab three</fluent-tab>
          </fluent-tablist>
          <div id="panel1">Panel one</div>
          <div id="panel2">Panel two</div>
          <div id="panel3">Panel three</div>
      `);

    const tabs = element.getByRole('tab');
    const firstTab = tabs.nth(0);
    const secondTab = tabs.nth(1);
    const firstPanel = page.getByText('Panel one');
    const secondPanel = page.getByText('Panel two');
    const thirdPanel = page.getByText('Panel three');

    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
    await expect(firstPanel).toBeVisible();
    await expect(firstPanel).toHaveRole('tabpanel');
    await expect(secondPanel).toBeHidden();
    await expect(secondPanel).toHaveRole('tabpanel');
    await expect(thirdPanel).toBeHidden();
    await expect(thirdPanel).toHaveRole('tabpanel');

    await secondTab.click();

    await expect(firstPanel).toBeHidden();
    await expect(secondPanel).toBeVisible();
    await expect(thirdPanel).toBeHidden();
  });

  test('should set data-hasIndent on all tabs when any tab has a start slot', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({
      attributes: { orientation: 'vertical' },
      innerHTML: /* html */ `
        <fluent-tab>Tab one</fluent-tab>
        <fluent-tab><span slot="start">T</span>Tab two</fluent-tab>
        <fluent-tab>Tab three</fluent-tab>
      `,
    });
    const tabs = element.locator('fluent-tab');

    await expect(tabs.nth(0)).toHaveAttribute('data-hasIndent');
    await expect(tabs.nth(1)).toHaveAttribute('data-hasIndent');
    await expect(tabs.nth(2)).toHaveAttribute('data-hasIndent');
  });
});
