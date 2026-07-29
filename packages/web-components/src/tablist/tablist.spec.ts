import { expect, test } from '../../test/playwright/index.js';
import type { Tab } from '../tab/tab.js';
import { tagName as TabTagName } from '../tab/tab.options.js';
import type { Tablist } from './tablist.js';
import { TablistAppearance, TablistSize, tagName } from './tablist.options.js';

test.describe('Tablist', () => {
  test.use({
    tagName,
    innerHTML: /* html */ `
      <${TabTagName}>Tab one</${TabTagName}>
      <${TabTagName}>Tab two</${TabTagName}>
      <${TabTagName}>Tab three</${TabTagName}>
    `,
    waitFor: [TabTagName],
  });

  test('should create with document.createElement()', async ({ page, fastPage, innerHTML }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(tagName => {
      document.createElement(tagName);
    }, tagName);

    expect(hasError).toBe(false);
  });

  test('should have reflect disabled attribute on control', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).not.toHaveAttribute('disabled');

    await element.evaluate((node: Tablist) => {
      node.disabled = true;
    });

    await expect(element).toHaveAttribute('disabled');
  });

  test('should set aria-disabled on individual tabs when tablist is disabled', async ({ fastPage }) => {
    const { element } = fastPage;
    const tabs = element.locator(TabTagName);

    await fastPage.setTemplate();

    // Initially tabs should not have aria-disabled
    await expect(tabs.nth(0)).not.toHaveAttribute('aria-disabled');
    await expect(tabs.nth(1)).not.toHaveAttribute('aria-disabled');
    await expect(tabs.nth(2)).not.toHaveAttribute('aria-disabled');

    // Disable the tablist
    await element.evaluate((node: Tablist) => {
      node.disabled = true;
    });

    // All tabs should now have aria-disabled="true"
    await expect(tabs.nth(0)).toHaveAttribute('aria-disabled', 'true');
    await expect(tabs.nth(1)).toHaveAttribute('aria-disabled', 'true');
    await expect(tabs.nth(2)).toHaveAttribute('aria-disabled', 'true');

    // Re-enable the tablist
    await element.evaluate((node: Tablist) => {
      node.disabled = false;
    });

    // aria-disabled should be removed from all tabs
    await expect(tabs.nth(0)).not.toHaveAttribute('aria-disabled');
    await expect(tabs.nth(1)).not.toHaveAttribute('aria-disabled');
    await expect(tabs.nth(2)).not.toHaveAttribute('aria-disabled');
  });

  test('should have role of `tablist`', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('elementInternals.role', 'tablist');
  });

  test('should set a default orientation value of `horizontal` when `orientation` is not provided', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('orientation', 'horizontal');
  });

  test('should set an `id` attribute on the active tab when an `id` is provided', async ({ fastPage }) => {
    const { element } = fastPage;
    const tabs = element.locator(TabTagName);

    await fastPage.setTemplate();

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
      const tabs = element.locator(TabTagName);

      await fastPage.setTemplate();

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
      const tabs = element.locator(TabTagName);

      await fastPage.setTemplate();

      await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
    });
  });

  test.describe('active tab', () => {
    test('should select a tab when it’s clicked', async ({ fastPage }) => {
      const { element } = fastPage;
      const tabs = element.locator(TabTagName);

      await fastPage.setTemplate();

      const secondTab = tabs.nth(1);
      const secondTabId = (await secondTab.getAttribute('id')) as string;

      await secondTab.click();

      await expect(tabs.nth(0)).not.toHaveAttribute('aria-selected', 'true');
      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
      await expect(element).toHaveAttribute('activeid', secondTabId);
    });

    test('should select a tab when it’s focused', async ({ fastPage }) => {
      const { element } = fastPage;
      const tabs = element.locator(TabTagName);

      await fastPage.setTemplate();

      const secondTab = tabs.nth(1);
      const secondTabId = (await secondTab.getAttribute('id')) as string;

      await secondTab.focus();

      await expect(tabs.nth(0)).not.toHaveAttribute('aria-selected', 'true');
      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
      await expect(element).toHaveAttribute('activeid', secondTabId);
    });

    test('should select a tab when the focus is moved onto it', async ({ fastPage }) => {
      const { element } = fastPage;
      const tabs = element.locator(TabTagName);

      await fastPage.setTemplate();

      const firstTab = tabs.nth(0);
      const secondTabId = (await tabs.nth(1).getAttribute('id')) as string;

      await firstTab.focus();
      await firstTab.press('ArrowRight');

      await expect(firstTab).not.toHaveAttribute('aria-selected', 'true');
      await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
      await expect(element).toHaveAttribute('activeid', secondTabId);
    });

    test('should select a tab when `click()` is called on it', async ({ fastPage }) => {
      const { element } = fastPage;
      const tabs = element.locator(TabTagName);

      await fastPage.setTemplate();

      const secondTab = tabs.nth(1);
      const secondTabId = (await secondTab.getAttribute('id')) as string;

      await secondTab.evaluate((node: Tab) => {
        node.click();
      });

      await expect(tabs.nth(0)).not.toHaveAttribute('aria-selected', 'true');
      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
      await expect(element).toHaveAttribute('activeid', secondTabId);
    });

    test('should set an `aria-selected` attribute on the active tab when `activeid` is provided', async ({
      fastPage,
    }) => {
      const { element } = fastPage;
      const tabs = element.locator(TabTagName);

      await fastPage.setTemplate();

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
      const tabs = element.locator(TabTagName);

      await fastPage.setTemplate();

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

    await fastPage.setTemplate();

    for (const appearance of Object.values(TablistAppearance)) {
      await test.step(appearance, async () => {
        await fastPage.updateTemplate(element, { attributes: { appearance } });

        await expect(element).toHaveJSProperty('appearance', appearance);

        await expect(element).toHaveAttribute('appearance', appearance);
      });
    }
  });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    for (const size of Object.values(TablistSize)) {
      await test.step(size, async () => {
        await fastPage.updateTemplate(element, { attributes: { size } });

        await expect(element).toHaveJSProperty('size', size);

        await expect(element).toHaveAttribute('size', size);
      });
    }
  });

  test('should not allow selecting a tab that has been disabled after it has been connected', async ({ fastPage }) => {
    const { element } = fastPage;
    const tabs = element.locator(TabTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TabTagName} id="tab-1">Tab one</${TabTagName}>
        <${TabTagName} id="tab-2">Tab two</${TabTagName}>
        <${TabTagName} id="tab-3">Tab three</${TabTagName}>
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
    const tabs = element.locator(TabTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TabTagName}>Tab one</${TabTagName}>
        <${TabTagName} disabled>Tab two</${TabTagName}>
        <${TabTagName}>Tab three</${TabTagName}>
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

  test('should keep disabled selected tab focusable until it loses selected state', async ({ fastPage }) => {
    const { element, page } = fastPage;
    const tabs = element.locator(TabTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TabTagName}>Tab one</${TabTagName}>
        <${TabTagName}>Tab two</${TabTagName}>
        <${TabTagName}>Tab three</${TabTagName}>
      `,
    });

    const secondTab = tabs.nth(1);

    await secondTab.focus();
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');

    await secondTab.evaluate((node: Tab) => {
      node.disabled = true;
    });

    await secondTab.focus();
    await page.keyboard.press('ArrowLeft');

    await expect(tabs.nth(0)).toBeFocused();

    await page.keyboard.press('ArrowRight');

    await expect(tabs.nth(2)).toBeFocused();
  });

  test('should not allow selecting hidden tab using arrow keys', async ({ fastPage }) => {
    const { element } = fastPage;
    const tabs = element.locator(TabTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TabTagName}>Tab one</${TabTagName}>
        <${TabTagName} hidden>Tab two</${TabTagName}>
        <${TabTagName}>Tab three</${TabTagName}>
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
    const tabs = element.locator(TabTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${TabTagName}>Tab one</${TabTagName}>
        <${TabTagName}>Tab two</${TabTagName}>
        <${TabTagName} hidden>Tab three</${TabTagName}>
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
          <${tagName}>
              <${TabTagName} aria-controls="panel1">Tab one</${TabTagName}>
              <${TabTagName} aria-controls="panel2">Tab two</${TabTagName}>
              <${TabTagName} aria-controls="panel3">Tab three</${TabTagName}>
          </${tagName}>
          <div id="panel1">Panel one</div>
          <div id="panel2">Panel two</div>
          <div id="panel3">Panel three</div>
      `);

    const tabs = element.locator(TabTagName);
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
        <${TabTagName}>Tab one</${TabTagName}>
        <${TabTagName}><span slot="start">T</span>Tab two</${TabTagName}>
        <${TabTagName}>Tab three</${TabTagName}>
      `,
    });
    const tabs = element.locator(TabTagName);

    await expect(tabs.nth(0)).toHaveAttribute('data-hasIndent');
    await expect(tabs.nth(1)).toHaveAttribute('data-hasIndent');
    await expect(tabs.nth(2)).toHaveAttribute('data-hasIndent');
  });
});
