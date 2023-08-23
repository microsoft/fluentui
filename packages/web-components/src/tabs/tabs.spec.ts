import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Tab } from '../tab/tab.js';
import type { Tabs } from './tabs.js';

test.describe('Tabs', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;
  let tablist: Locator;
  let tabs: Locator;

  const template = /* html */ `
        <fluent-tabs>
            <fluent-tab>Tab one</fluent-tab>
            <fluent-tab>Tab two</fluent-tab>
            <fluent-tab>Tab three</fluent-tab>
            <fluent-tab-panel>Tab panel one</fluent-tab-panel>
            <fluent-tab-panel>Tab panel two</fluent-tab-panel>
            <fluent-tab-panel>Tab panel three</fluent-tab-panel>
        </fluent-tabs>
    `;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-tabs');

    root = page.locator('#root');

    tablist = element.locator('.tablist');

    tabs = element.locator('fluent-tab');

    await page.goto(fixtureURL('components-tabs--tabs-default'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should reset tab indicator offset and scale for horizontal orientation after animation', async () => {
    await root.evaluate(
      (node, { template }) => {
        node.innerHTML = template;
      },
      { template },
    );

    const tab = tabs.nth(2);
    await tab.click();

    const tabIndicatorValues = await page.evaluate(() => {
      const tabsElement = document.querySelector('fluent-tabs') as Element;
      return {
        offset: getComputedStyle(tabsElement).getPropertyValue('--tabIndicatorOffset').trim(),
        scale: getComputedStyle(tabsElement).getPropertyValue('--tabIndicatorScale').trim(),
      };
    });

    expect(tabIndicatorValues.offset).toBe('0px');
    expect(tabIndicatorValues.scale).toBe('1');
  });

  test('should animate the active tab indicator', async () => {
    await root.evaluate(
      (node, { template }) => {
        node.innerHTML = template;
      },
      { template },
    );

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
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-tabs></fluent-tabs>
        `;
    });
    await expect(element).not.toHaveAttribute('disabled', '');

    await element.evaluate((node: Tabs) => {
      node.disabled = true;
    });

    await expect(element).toHaveAttribute('disabled', '');
  });

  test('should have an internal element with a role of `tablist`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
              <fluent-tabs></fluent-tabs>
          `;
    });

    await expect(tablist).toHaveAttribute('role', 'tablist');
  });

  test('should set a default orientation value of `horizontal` when `orientation` is not provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                  <fluent-tabs></fluent-tabs>
              `;
    });

    await expect(element).toHaveJSProperty('orientation', 'horizontal');
  });

  test('should set an `id` attribute on the active tab when an `id` is provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                  <fluent-tabs></fluent-tabs>
              `;
    });

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
      await root.evaluate(
        (node, { template }) => {
          node.innerHTML = template;
        },
        { template },
      );

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

    test('should set `aria-labelledby` on the tab panel and `aria-controls` on the tab which corresponds to the matching ID when IDs are NOT provided', async () => {
      await root.evaluate(
        (node, { template }) => {
          node.innerHTML = template;
        },
        { template },
      );

      const tabCount = await tabs.count();

      for (let i = 0; i < tabCount; i++) {
        const tab = tabs.nth(i);

        const panelId = (await tab.getAttribute('aria-controls')) as string;

        expect(panelId).toMatch(/panel-\d+/);

        const tabPanel = element.locator(`#${panelId}`);

        await expect(tabPanel).toHaveCount(1);

        const tabId = (await tab.getAttribute('id')) as string;

        expect(tabId).toMatch(/tab-\d+/);

        await expect(tabPanel).toHaveAttribute('aria-labelledby', tabId);

        await expect(tab).toHaveAttribute('aria-controls', panelId);
      }
    });

    test('should set `aria-labelledby` on the tab panel and `aria-controls` on the tab which corresponds to the matching ID when IDs are NOT provided and additional tabs and panels are added', async () => {
      await root.evaluate(
        (node, { template }) => {
          node.innerHTML = template;
        },
        { template },
      );

      let tabCount = await tabs.count();

      for (let i = 0; i < tabCount; i++) {
        const tab = tabs.nth(i);

        const panelId = (await tab.getAttribute('aria-controls')) as string;

        expect(panelId).toMatch(/panel-\d+/);

        const tabPanel = element.locator(`#${panelId}`);

        await expect(tabPanel).toHaveCount(1);

        const tabId = (await tab.getAttribute('id')) as string;

        expect(tabId).toMatch(/tab-\d+/);

        await expect(tabPanel).toHaveAttribute('aria-labelledby', tabId);

        await expect(tab).toHaveAttribute('aria-controls', panelId);
      }

      await element.evaluate<void, Tabs>(node => {
        const tabs = Array.from(node.querySelectorAll('fluent-tab'));

        const newTab = document.createElement('fluent-tab');
        newTab.textContent = 'New Tab';
        node.insertBefore(newTab, tabs[1]);

        const newPanel = document.createElement('fluent-tab-panel');
        newPanel.textContent = 'New Panel';
        node.insertBefore(newPanel, tabs[1]);
      });

      tabCount = await tabs.count();

      for (let i = 0; i < tabCount; i++) {
        const tab = tabs.nth(i);

        const panelId = (await tab.getAttribute('aria-controls')) as string;

        expect(panelId).toMatch(/panel-\d+/);

        const tabPanel = element.locator(`#${panelId}`);

        await expect(tabPanel).toHaveCount(1);

        const tabId = (await tab.getAttribute('id')) as string;

        expect(tabId).toMatch(/tab-\d+/);

        await expect(tabPanel).toHaveAttribute('aria-labelledby', tabId);

        await expect(tab).toHaveAttribute('aria-controls', panelId);
      }
    });

    test('should default the first tab as the active index if `activeid` is NOT provided', async () => {
      await root.evaluate(
        (node, { template }) => {
          node.innerHTML = template;
        },
        { template },
      );

      await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

      await expect(element).toHaveJSProperty('activeTabIndex', 0);
    });
  });

  test.describe('active tab', () => {
    test('should set an `aria-selected` attribute on the active tab when `activeid` is provided', async () => {
      await root.evaluate(
        (node, { template }) => {
          node.innerHTML = template;
        },
        { template },
      );

      const secondTab = tabs.nth(1);

      const secondTabId = `${await secondTab.getAttribute('id')}`;

      await element.evaluate((node: Tabs, secondTabId) => {
        node.activeid = secondTabId;
      }, secondTabId);

      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });

    test('should update `aria-selected` attribute on the active tab when `activeId` is updated', async () => {
      await root.evaluate(
        (node, { template }) => {
          node.innerHTML = template;
        },
        { template },
      );

      await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

      const secondTab = tabs.nth(1);

      const secondTabId = `${await secondTab.getAttribute('id')}`;

      await element.evaluate((node: Tabs, secondTabId) => {
        node.setAttribute('activeId', secondTabId);
      }, secondTabId);

      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  test.describe('active tabpanel', () => {
    test('should set an `aria-labelledby` attribute on the tabpanel with a value of the tab id when `activeid` is provided', async () => {
      await root.evaluate(
        (node, { template }) => {
          node.innerHTML = template;
        },
        { template },
      );

      const secondTab = tabs.nth(1);

      const secondTabId = `${await secondTab.getAttribute('id')}`;

      const tabPanels = element.locator('fluent-tab-panel');

      await element.evaluate((node: Tabs, secondTabId) => {
        node.activeid = secondTabId;
      }, secondTabId);

      await expect(tabPanels.nth(1)).toHaveAttribute('aria-labelledby', secondTabId);
    });

    test('should set an attribute of hidden if the tabpanel is not active', async () => {
      await root.evaluate(
        (node, { template }) => {
          node.innerHTML = template;
        },
        { template },
      );

      const tabPanels = element.locator('fluent-tab-panel');

      await expect(tabPanels.nth(0)).not.toHaveAttribute('hidden', '');

      await expect(tabPanels.nth(1)).toHaveAttribute('hidden', '');

      await expect(tabPanels.nth(2)).toHaveAttribute('hidden', '');
    });
  });

  test('should reflect appearance attribute values', async () => {
    await element.evaluate((node: Tabs) => {
      node.appearance = 'subtle';
    });
    await expect(element).toHaveAttribute('appearance', 'subtle');
    await expect(element).toHaveJSProperty('appearance', 'subtle');

    await element.evaluate((node: Tabs) => {
      node.appearance = 'transparent';
    });
    await expect(element).toHaveAttribute('appearance', 'transparent');
    await expect(element).toHaveJSProperty('appearance', 'transparent');
  });

  test('should reflect size attribute values', async () => {
    await element.evaluate((node: Tabs) => {
      node.size = 'small';
    });
    await expect(element).toHaveAttribute('size', 'small');
    await expect(element).toHaveJSProperty('size', 'small');

    await element.evaluate((node: Tabs) => {
      node.size = 'medium';
    });
    await expect(element).toHaveAttribute('size', 'medium');
    await expect(element).toHaveJSProperty('size', 'medium');

    await element.evaluate((node: Tabs) => {
      node.size = 'large';
    });
    await expect(element).toHaveAttribute('size', 'large');
    await expect(element).toHaveJSProperty('size', 'large');
  });

  test('should not allow selecting a tab that has been disabled after it has been connected', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                  <fluent-tabs>
                      <fluent-tab id="tab-1">Tab one</fluent-tab>
                      <fluent-tab id="tab-2">Tab two</fluent-tab>
                      <fluent-tab id="tab-3">Tab three</fluent-tab>
                      <fluent-tab-panel>Tab panel one</fluent-tab-panel>
                      <fluent-tab-panel>Tab panel two</fluent-tab-panel>
                      <fluent-tab-panel>Tab panel three</fluent-tab-panel>
                  </fluent-tabs>
              `;
    });

    await (await element.elementHandle())?.waitForElementState('stable');

    const firstTab = tabs.nth(0);

    const firstTabId = await firstTab.getAttribute('id');

    expect(firstTabId).toBe('tab-1');

    await element.evaluate((node: Tabs, firstTabId) => {
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

    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                  <fluent-tabs>
                      <fluent-tab>Tab one</fluent-tab>
                      <fluent-tab disabled>Tab two</fluent-tab>
                      <fluent-tab>Tab three</fluent-tab>
                      <fluent-tab-panel>Tab panel one</fluent-tab-panel>
                      <fluent-tab-panel>Tab panel two</fluent-tab-panel>
                      <fluent-tab-panel>Tab panel three</fluent-tab-panel>
                  </fluent-tabs>
              `;
    });

    const firstTab = tabs.nth(0);

    const secondTab = tabs.nth(1);

    const firstTabId = `${await firstTab.getAttribute('id')}`;
    const secondTabId = `${await secondTab.getAttribute('id')}`;

    await element.evaluate((node: Tabs, firstTabId) => {
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

    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                  <fluent-tabs>
                      <fluent-tab>Tab one</fluent-tab>
                      <fluent-tab hidden>Tab two</fluent-tab>
                      <fluent-tab>Tab three</fluent-tab>
                      <fluent-tab-panel>Tab panel one</fluent-tab-panel>
                      <fluent-tab-panel>Tab panel two</fluent-tab-panel>
                      <fluent-tab-panel>Tab panel three</fluent-tab-panel>
                  </fluent-tabs>
              `;
    });

    const firstTab = tabs.nth(0);

    const thirdTab = tabs.nth(2);

    const firstTabId = `${await firstTab.getAttribute('id')}`;
    const thirdTabId = `${await thirdTab.getAttribute('id')}`;

    await element.evaluate((node: Tabs, firstTabId) => {
      node.activeid = firstTabId;
    }, firstTabId);

    await firstTab.press('ArrowRight');

    await expect(element).toHaveJSProperty('activeid', thirdTabId);
  });

  test('should not allow selecting hidden tab by pressing End', async () => {
    test.slow();

    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                  <fluent-tabs>
                      <fluent-tab>Tab one</fluent-tab>
                      <fluent-tab>Tab two</fluent-tab>
                      <fluent-tab hidden>Tab three</fluent-tab>
                      <fluent-tab-panel>Tab panel one</fluent-tab-panel>
                      <fluent-tab-panel>Tab panel two</fluent-tab-panel>
                      <fluent-tab-panel>Tab panel three</fluent-tab-panel>
                  </fluent-tabs>
              `;
    });

    const firstTab = tabs.nth(0);

    const secondTab = tabs.nth(1);

    const firstTabId = `${await firstTab.getAttribute('id')}`;
    const secondTabId = `${await secondTab.getAttribute('id')}`;

    await element.evaluate((node: Tabs, firstTabId) => {
      node.activeid = firstTabId;
    }, firstTabId);

    await firstTab.press('End');

    await expect(element).toHaveJSProperty('activeid', secondTabId);
  });
});
