import { expect, test } from '../../test/playwright/index.js';
import type { Tab } from '../tab/tab.js';
import type { Tabs } from './tabs.js';
import { TabsAppearance, TabsSize } from './tabs.options.js';

test.describe('Tabs', () => {
  test.use({
    tagName: 'fluent-tabs',
    waitFor: ['fluent-tab', 'fluent-tab-panel'],
    innerHTML: /* html */ `
      <fluent-tab>Tab one</fluent-tab>
      <fluent-tab>Tab two</fluent-tab>
      <fluent-tab>Tab three</fluent-tab>
      <fluent-tab-panel>Tab panel one</fluent-tab-panel>
      <fluent-tab-panel>Tab panel two</fluent-tab-panel>
      <fluent-tab-panel>Tab panel three</fluent-tab-panel>
    `,
  });

  test('should reset tab indicator offset and scale for horizontal orientation after animation', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const tabs = element.locator('fluent-tab');

    const tab = tabs.nth(2);

    await tab.click();

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

    await element.evaluate((node: Tabs) => {
      node.disabled = true;
    });

    await expect(element).toHaveAttribute('disabled');
  });

  test('should have an internal element with a role of `tablist`', async ({ fastPage }) => {
    const { element } = fastPage;
    const tablist = element.locator('.tablist');

    await expect(tablist).toHaveAttribute('role', 'tablist');
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

      for (const tab of await tabs.all()) {
        const id = await tab.getAttribute('id');

        // The ID function may not start at 0 so we need to check that the ID is unique
        expect(id).toMatch(/tab-\d+/);

        const tabPanel = element.locator(`#${id}`);

        await expect(tabPanel).toHaveCount(1);
      }
    });

    test('should set `aria-labelledby` on the tab panel and `aria-controls` on the tab which corresponds to the matching ID when IDs are NOT provided', async ({
      fastPage,
    }) => {
      const { element } = fastPage;
      const tabs = element.locator('fluent-tab');

      for (const tab of await tabs.all()) {
        const panelId = await tab.getAttribute('aria-controls');

        expect(panelId).toMatch(/panel-\d+/);

        const tabPanel = element.locator(`#${panelId}`);

        await expect(tabPanel).toHaveCount(1);

        const tabId = await tab.getAttribute('id');

        expect(tabId).toMatch(/tab-\d+/);

        await expect(tabPanel).toHaveAttribute('aria-labelledby', tabId!);

        await expect(tab).toHaveAttribute('aria-controls', panelId!);
      }
    });

    test('should set `aria-labelledby` on the tab panel and `aria-controls` on the tab which corresponds to the matching ID when IDs are NOT provided and additional tabs and panels are added', async ({
      fastPage,
    }) => {
      const { element } = fastPage;
      const tabs = element.locator('fluent-tab');

      for (const tab of await tabs.all()) {
        const panelId = await tab.getAttribute('aria-controls');

        expect(panelId).toMatch(/panel-\d+/);

        const tabPanel = element.locator(`#${panelId}`);

        await expect(tabPanel).toHaveCount(1);

        const tabId = await tab.getAttribute('id');

        expect(tabId).toMatch(/tab-\d+/);

        await expect(tabPanel).toHaveAttribute('aria-labelledby', tabId!);

        await expect(tab).toHaveAttribute('aria-controls', panelId!);
      }

      await element.evaluate(node => {
        const tabs = Array.from(node.querySelectorAll('fluent-tab'));

        const newTab = document.createElement('fluent-tab');
        newTab.textContent = 'New Tab';
        node.insertBefore(newTab, tabs[1]);

        const newPanel = document.createElement('fluent-tab-panel');
        newPanel.textContent = 'New Panel';
        node.insertBefore(newPanel, tabs[1]);
      });

      for (const tab of await tabs.all()) {
        const panelId = await tab.getAttribute('aria-controls');

        expect(panelId).toMatch(/panel-\d+/);

        const tabPanel = element.locator(`#${panelId}`);

        await expect(tabPanel).toHaveCount(1);

        const tabId = await tab.getAttribute('id');

        expect(tabId).toMatch(/tab-\d+/);

        await expect(tabPanel).toHaveAttribute('aria-labelledby', tabId!);

        await expect(tab).toHaveAttribute('aria-controls', panelId!);
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

      await element.evaluate((node: Tabs, secondTabId) => {
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

      const secondTabId = `${await secondTab.getAttribute('id')}`;

      await element.evaluate((node, secondTabId) => {
        node.setAttribute('activeId', secondTabId);
      }, secondTabId);

      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  test.describe('active tabpanel', () => {
    test('should set an `aria-labelledby` attribute on the tabpanel with a value of the tab id when `activeid` is provided', async ({
      fastPage,
    }) => {
      const { element } = fastPage;
      const tabs = element.locator('fluent-tab');

      const secondTab = tabs.nth(1);

      const secondTabId = `${await secondTab.getAttribute('id')}`;

      const tabPanels = element.locator('fluent-tab-panel');

      await element.evaluate((node: Tabs, secondTabId) => {
        node.activeid = secondTabId;
      }, secondTabId);

      await expect(tabPanels.nth(1)).toHaveAttribute('aria-labelledby', secondTabId);
    });

    test('should set an attribute of hidden if the tabpanel is not active', async ({ fastPage }) => {
      const { element } = fastPage;

      const tabPanels = element.locator('fluent-tab-panel');

      await expect(tabPanels.nth(0)).not.toHaveAttribute('hidden', '');

      await expect(tabPanels.nth(1)).toHaveAttribute('hidden', '');

      await expect(tabPanels.nth(2)).toHaveAttribute('hidden', '');
    });
  });

  test('should set the `appearance` property to match the `appearance` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const appearance of Object.values(TabsAppearance)) {
      await test.step(appearance, async () => {
        await fastPage.setTemplate({ attributes: { appearance } });

        await expect(element).toHaveJSProperty('appearance', appearance);

        await expect(element).toHaveAttribute('appearance', appearance);
      });
    }
  });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const size of Object.values(TabsSize)) {
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
    const firstTab = tabs.first();
    const secondTab = tabs.nth(1);

    await fastPage.setTemplate({
      attributes: { activeid: 'tab-1' },
      innerHTML: /* html */ `
        <fluent-tab id="tab-1">Tab one</fluent-tab>
        <fluent-tab id="tab-2">Tab two</fluent-tab>
        <fluent-tab id="tab-3">Tab three</fluent-tab>
        <fluent-tab-panel>Tab panel one</fluent-tab-panel>
        <fluent-tab-panel>Tab panel two</fluent-tab-panel>
        <fluent-tab-panel>Tab panel three</fluent-tab-panel>
      `,
    });

    for (const tab of await tabs.all()) {
      await expect(tab).toBeEnabled();
    }

    await expect(firstTab).toHaveId('tab-1');

    await expect(element).toHaveJSProperty('activeid', 'tab-1');

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
        <fluent-tab-panel>Tab panel one</fluent-tab-panel>
        <fluent-tab-panel>Tab panel two</fluent-tab-panel>
        <fluent-tab-panel>Tab panel three</fluent-tab-panel>
      `,
    });

    const firstTab = tabs.nth(0);

    const secondTab = tabs.nth(1);

    const firstTabId = await firstTab.getAttribute('id');

    const secondTabId = await secondTab.getAttribute('id');

    await element.evaluate((node: Tabs, firstTabId) => {
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
        <fluent-tab-panel>Tab panel one</fluent-tab-panel>
        <fluent-tab-panel>Tab panel two</fluent-tab-panel>
        <fluent-tab-panel>Tab panel three</fluent-tab-panel>
      `,
    });

    const firstTab = tabs.nth(0);

    const thirdTab = tabs.nth(2);

    const firstTabId = await firstTab.getAttribute('id');
    const thirdTabId = await thirdTab.getAttribute('id');

    await element.evaluate((node: Tabs, firstTabId) => {
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
        <fluent-tab-panel>Tab panel one</fluent-tab-panel>
        <fluent-tab-panel>Tab panel two</fluent-tab-panel>
        <fluent-tab-panel>Tab panel three</fluent-tab-panel>
      `,
    });

    const firstTab = tabs.nth(0);

    const secondTab = tabs.nth(1);

    const firstTabId = await firstTab.getAttribute('id');
    const secondTabId = await secondTab.getAttribute('id');

    await element.evaluate((node: Tabs, firstTabId) => {
      node.activeid = firstTabId;
    }, firstTabId!);

    await firstTab.press('End');

    await expect(element).toHaveJSProperty('activeid', secondTabId);
  });
});
