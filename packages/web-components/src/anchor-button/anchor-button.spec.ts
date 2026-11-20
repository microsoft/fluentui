import type { Locator } from '@playwright/test';
import { expect, pauseHydration, test } from '../../test/playwright/index.js';
import type { BaseAnchor } from './anchor-button.base.js';
import { tagName } from './anchor-button.options.js';

test.describe('Anchor Button', () => {
  test.use({
    innerHTML: 'Anchor Button',
    tagName,
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
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

  test('should set the `href` property to match the `href` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '#foo' } });

    await expect(element).toHaveJSProperty('href', '#foo');

    await test.step('should set the `href` property and attribute on the internal anchor element', async () => {
      const anchor = element.locator('a');

      await expect(anchor).toHaveAttribute('href', '#foo');
    });
  });

  test('should set the `hreflang` property to match the `hreflang` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { hreflang: 'en-GB' } });

    await expect(element).toHaveJSProperty('hreflang', 'en-GB');

    await test.step('should set the `hreflang` property and attribute on the internal anchor element', async () => {
      const anchor = element.locator('a');

      await expect(anchor).toHaveAttribute('hreflang', 'en-GB');
    });
  });

  test('should set the `ping` property to match the `ping` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { ping: 'ping' } });

    await expect(element).toHaveJSProperty('ping', 'ping');

    await test.step('should set the `ping` property and attribute on the internal anchor element', async () => {
      const anchor = element.locator('a');

      await expect(anchor).toHaveAttribute('ping', 'ping');
    });
  });

  test('should set the `referrerpolicy` property to match the `referrerpolicy` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { referrerpolicy: 'no-referrer' } });

    await expect(element).toHaveJSProperty('referrerpolicy', 'no-referrer');

    await test.step('should set the `referrerpolicy` property and attribute on the internal anchor element', async () => {
      const anchor = element.locator('a');

      await expect(anchor).toHaveAttribute('referrerpolicy', 'no-referrer');
    });
  });

  test('should set the `rel` property to match the `rel` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { rel: 'external' } });

    await expect(element).toHaveJSProperty('rel', 'external');

    await test.step('should set the `rel` property and attribute on the internal anchor element', async () => {
      const anchor = element.locator('a');

      await expect(anchor).toHaveAttribute('rel', 'external');
    });
  });

  test('should set the `target` property to match the `target` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { target: '_blank' } });

    await expect(element).toHaveJSProperty('target', '_blank');

    await test.step('should set the `target` property and attribute on the internal anchor element', async () => {
      const anchor = element.locator('a');

      await expect(anchor).toHaveAttribute('target', '_blank');
    });
  });

  test('should set the `type` property to match the `type` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { type: 'foo' } });

    await expect(element).toHaveJSProperty('type', 'foo');

    await test.step('should set the `type` property and attribute on the internal anchor element', async () => {
      const anchor = element.locator('a');

      await expect(anchor).toHaveAttribute('type', 'foo');
    });
  });

  test('should navigate to the provided url when clicked', async ({ fastPage, page }) => {
    const { element } = fastPage;

    const expectedUrl = '#foo';

    await fastPage.setTemplate({ attributes: { href: expectedUrl } });

    expect(page.url()).not.toMatch(expectedUrl);

    await element.click();

    expect(page.url()).toMatch(expectedUrl);
  });

  test('should navigate to the provided url when clicked while pressing the `Control` key on Windows or `Meta` on Mac', async ({
    context,
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    const expectedUrl = '#foo';

    await fastPage.setTemplate({ attributes: { href: expectedUrl } });

    const newPagePromise = context.waitForEvent('page');

    await element.click({ modifiers: ['ControlOrMeta'] });

    const newPage = await newPagePromise;

    await expect(page).not.toHaveURL(/#foo/);

    await expect(newPage).toHaveURL(/#foo/);

    await newPage.close();
  });

  test('should navigate to the provided url when `Enter` is pressed via keyboard', async ({ fastPage, page }) => {
    const { element } = fastPage;

    const expectedUrl = '#foo';

    await fastPage.setTemplate({ attributes: { href: expectedUrl } });

    await element.focus();

    await element.press('Enter');

    expect(page.url()).toMatch(expectedUrl);
  });

  test('should navigate to the provided url when `ctrl` and `Enter` are pressed via keyboard', async ({
    context,
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    const expectedUrl = '/foo';

    await fastPage.setTemplate({ attributes: { href: expectedUrl } });

    const newPagePromise = context.waitForEvent('page');

    await element.focus();

    await expect(element).toBeFocused();

    await element.press('ControlOrMeta+Enter');

    const newPage = await newPagePromise;

    await expect(page).not.toHaveURL(expectedUrl);

    await expect(newPage).toHaveURL(expectedUrl);

    await newPage.close();
  });

  test('should forward reflected property changes and empty anchor attributes', async ({ fastPage }) => {
    const { element } = fastPage;
    const anchor = element.locator('a');

    await fastPage.setTemplate({ attributes: { href: '#initial', download: 'initial.txt' } });

    await expect(anchor).toHaveAttribute('download', 'initial.txt');

    await element.evaluate((node: BaseAnchor) => {
      node.href = '#updated';
      node.download = '';
      node.setAttribute('title', 'Host-only title');
      node.setAttribute('constructor', 'host-only');
    });

    await expect(anchor).toHaveAttribute('href', '#updated');
    await expect(anchor).toHaveAttribute('download', '');
    await expect(anchor).not.toHaveAttribute('title');
    await expect(anchor).not.toHaveAttribute('constructor');

    await element.evaluate((node: BaseAnchor) => {
      node.href = undefined;
      node.download = undefined;
    });

    await expect(anchor).not.toHaveAttribute('href');
    await expect(anchor).not.toHaveAttribute('download');
  });

  test('should synchronize attributes changed or removed while disconnected', async ({ fastPage }) => {
    const { element } = fastPage;
    const anchor = element.locator('a');

    await fastPage.setTemplate({
      attributes: { href: '#initial', rel: 'external', 'aria-label': 'Initial name' },
    });

    await expect(anchor).toHaveAttribute('href', '#initial');
    await expect(anchor).toHaveAccessibleName('Initial name');

    await element.evaluate(node => {
      const parent = node.parentNode!;
      const next = node.nextSibling;
      node.remove();
      node.removeAttribute('href');
      node.removeAttribute('aria-label');
      node.setAttribute('rel', 'noreferrer');
      parent.insertBefore(node, next);
    });

    await expect(anchor).not.toHaveAttribute('href');
    await expect(anchor).not.toHaveAttribute('aria-label');
    await expect(anchor).toHaveAttribute('rel', 'noreferrer');
    await expect(anchor).toHaveAccessibleName('');
  });

  test('should expose the native anchor to pointer interactions', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '#foo' } });

    await element.hover();

    const pointerHref = await element.evaluate(node => {
      const { x, y, width, height } = node.getBoundingClientRect();
      const target = node.shadowRoot!.elementsFromPoint(x + width / 2, y + height / 2);
      console.log(node.shadowRoot, target);
      return target.find(t => t instanceof HTMLAnchorElement)?.href;
    });

    expect(pointerHref).toBe(new URL('#foo', page.url()).href);

    await element.evaluate(node => {
      for (const eventType of ['contextmenu', 'auxclick']) {
        node.addEventListener(eventType, event => {
          node.setAttribute(
            `data-${eventType}-anchor`,
            String(event.composedPath().includes(node.shadowRoot!.querySelector('a[href]')!)),
          );
          event.preventDefault();
        });
      }
    });

    await element.click({ button: 'right' });

    await expect(element).toHaveAttribute('data-contextmenu-anchor', 'true');

    await element.click({ button: 'middle' });

    await expect(element).toHaveAttribute('data-auxclick-anchor', 'true');
  });

  test('should open native links in a new tab on middle-click', async ({ browserName, context, fastPage, page }) => {
    test.skip(browserName === 'webkit', 'Playwright WebKit does not open tabs when middle-clicking native anchors.');

    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '/foo' } });

    const sourceURL = page.url();
    const newPagePromise = context.waitForEvent('page');

    await element.click({ button: 'middle' });

    const newPage = await newPagePromise;

    await expect(newPage).toHaveURL('/foo');
    await expect(page).toHaveURL(sourceURL);

    await newPage.close();
  });

  test('should allow click handlers to prevent native navigation on pointer click', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '#foo' } });

    const sourceUrl = page.url();

    await element.evaluate(node => {
      node.addEventListener('click', event => event.preventDefault());
    });

    await element.click();

    await expect(page).toHaveURL(sourceUrl);
  });

  test('should allow click handlers to prevent native navigation on programmatic click', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '#foo' } });

    const sourceUrl = page.url();

    await element.evaluate(node => {
      node.addEventListener('click', event => event.preventDefault());
    });

    await element.evaluate((node: BaseAnchor) => node.click());

    await expect(page).toHaveURL(sourceUrl);
  });

  test('should allow click handlers to prevent native navigation on Enter', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '#foo' } });

    const sourceUrl = page.url();

    await element.evaluate(node => {
      node.addEventListener('click', event => event.preventDefault());
    });

    await element.press('Enter');

    await expect(page).toHaveURL(sourceUrl);
  });

  test.describe('native focus before and after hydration', () => {
    test.skip(({ ssr }) => !ssr, 'Requires server-rendered markup');

    test('should preserve native keyboard focus', async ({ browserName, fastPage, page }) => {
      const { element } = fastPage;
      const anchor = element.locator('a');

      const resumeHydration = await pauseHydration(page);
      const rendered = fastPage.setTemplate({ attributes: { href: '#foo' } });

      try {
        await expect(element).toBeVisible();
        expect(await element.evaluate(node => node.matches(':defined'))).toBe(false);

        await element.evaluate(node => {
          const previous = node.ownerDocument.createElement('button');
          previous.textContent = 'Previous control';
          node.before(previous);
        });
        await page.getByRole('button', { name: 'Previous control' }).focus();
        // Safari uses Option+Tab to include links in sequential focus navigation.
        await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');

        await expect(anchor).toBeFocused();
      } finally {
        resumeHydration();
        await rendered;
      }

      await page.waitForFunction(() => customElements.whenDefined('fluent-anchor-button'));

      expect(await element.evaluate(node => node.matches(':defined'))).toBe(true);
      await expect(anchor).toBeFocused();

      await expect.poll(() => element.evaluate(node => node.matches(':state(focus-visible)'))).toBe(true);
    });

    test('should preserve native pointer focus', async ({ browserName, fastPage, page }) => {
      test.skip(browserName === 'webkit', 'Safari does not focus links on pointer click');

      const { element } = fastPage;
      const anchor = element.locator('a');

      const resumeHydration = await pauseHydration(page);
      const rendered = fastPage.setTemplate({ attributes: { href: '#foo' } });

      try {
        await expect(element).toBeVisible();
        expect(await element.evaluate(node => node.matches(':defined'))).toBe(false);

        await anchor.evaluate(node => {
          node.addEventListener('click', event => event.preventDefault(), { once: true });
        });

        const point = await element.evaluate(node => {
          const { x, y, width, height } = node.getBoundingClientRect();
          return { x: x + width / 2, y: y + height / 2 };
        });

        // Locator clicks can wait for the navigation whose hydration scripts are paused.
        await page.mouse.click(point.x, point.y);

        await expect(anchor).toBeFocused();
      } finally {
        resumeHydration();
        await rendered;
      }

      await page.waitForFunction(() => customElements.whenDefined('fluent-anchor-button'));

      expect(await element.evaluate(node => node.matches(':defined'))).toBe(true);
      await expect(anchor).toBeFocused();

      await expect.poll(() => element.evaluate(node => node.matches(':state(focus-visible)'))).toBe(false);
    });
  });

  test('should delegate keyboard and programmatic focus to the native link with a single tab stop', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const anchor = element.locator('a');
    const previous = page.getByRole('button', { name: 'Previous control' });
    const next = page.getByRole('button', { name: 'Next control' });

    await fastPage.setTemplate(/* html */ `
      <button>Previous control</button>
      <${tagName} href="#foo">Link</${tagName}>
      <button>Next control</button>
    `);

    await previous.focus();

    await page.keyboard.press('Tab');

    await expect(element).toBeFocused();

    await expect(anchor).toBeFocused();

    await page.keyboard.press('Tab');

    await expect(next).toBeFocused();

    await page.keyboard.press('Shift+Tab');

    await expect(anchor).toBeFocused();

    await page.keyboard.press('Shift+Tab');

    await expect(previous).toBeFocused();

    await element.focus();

    await expect(anchor).toBeFocused();

    await element.click();

    await expect(anchor).toBeFocused();
  });

  test('should exclude `tabindex="-1"` from sequential focus while allowing programmatic focus', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const anchor = element.locator('a');
    const previous = page.getByRole('button', { name: 'Previous control' });
    const next = page.getByRole('button', { name: 'Next control' });

    await fastPage.setTemplate(/* html */ `
      <button>Previous control</button>
      <${tagName} href="#foo" tabindex="-1">Link</${tagName}>
      <button>Next control</button>
    `);

    await previous.focus();
    await page.keyboard.press('Tab');

    await expect(next).toBeFocused();

    await element.focus();

    await expect(element).toBeFocused();

    await expect(anchor).toBeFocused();
  });

  test('should preserve accessible names and descriptions on the native link', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '#foo' } });

    const anchor = element.locator('a');

    await expect(page.getByRole('link')).toHaveCount(1);
    await expect(anchor).toHaveAccessibleName('Link');

    await fastPage.updateTemplate(element, {
      attributes: { 'aria-label': 'Custom link name', 'aria-current': 'page' },
    });

    await expect(anchor).toHaveAccessibleName('Custom link name');
    await expect(anchor).toHaveAttribute('aria-current', 'page');

    await element.evaluate(node => {
      const label = node.ownerDocument.createElement('span');
      label.id = 'link-label';
      label.textContent = 'External label';
      const description = node.ownerDocument.createElement('span');
      description.id = 'link-description';
      description.textContent = 'External description';
      node.before(label, description);
    });

    await fastPage.updateTemplate(element, {
      attributes: { 'aria-labelledby': 'link-label', 'aria-describedby': 'link-description' },
    });

    // Playwright's accessible-name matcher does not read ARIA element references.
    const references = () =>
      element.evaluate((node: BaseAnchor) => ({
        labels: node.control.ariaLabelledByElements?.map(element => element.textContent),
        descriptions: node.control.ariaDescribedByElements?.map(element => element.textContent),
      }));

    await expect.poll(references).toEqual({ labels: ['External label'], descriptions: ['External description'] });

    await element.evaluate(node => {
      node.ownerDocument.getElementById('link-label')!.textContent = 'Updated label';
      node.ownerDocument.getElementById('link-description')!.textContent = 'Updated description';
    });

    await expect.poll(references).toEqual({ labels: ['Updated label'], descriptions: ['Updated description'] });

    await element.evaluate(node => {
      node.removeAttribute('aria-labelledby');
      node.removeAttribute('aria-describedby');
      node.removeAttribute('aria-label');
    });

    await expect(anchor).toHaveAccessibleName('Link');
    await expect(anchor).toHaveAccessibleDescription('');
    await expect(page.getByRole('link')).toHaveCount(1);
  });

  test('should allow programmatic clicks before the native control is rendered', async ({ fastPage }) => {
    await fastPage.setTemplate();

    const clickCount = await fastPage.element.evaluate(node => {
      const disconnected = node.ownerDocument.createElement(node.localName);
      let count = 0;
      disconnected.addEventListener('click', () => {
        count += 1;
      });
      disconnected.click();
      return count;
    });

    expect(clickCount).toBe(1);
  });

  test('should navigate and emit a single click event on pointer click', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '#foo' } });

    const expectedUrl = new URL('#foo', page.url()).href;

    await element.evaluate(node => {
      let clickCount = 0;
      node.addEventListener('click', () => {
        clickCount += 1;
        node.setAttribute('data-click-count', String(clickCount));
      });
      node.setAttribute('data-click-count', '0');
    });

    await element.click();

    await expect(element).toHaveAttribute('data-click-count', '1');
    await expect(page).toHaveURL(expectedUrl);
  });

  test('should navigate and emit a single click event on programmatic click', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '#foo' } });

    const expectedUrl = new URL('#foo', page.url()).href;

    await element.evaluate(node => {
      let clickCount = 0;
      node.addEventListener('click', () => {
        clickCount += 1;
        node.setAttribute('data-click-count', String(clickCount));
      });
      node.setAttribute('data-click-count', '0');
    });

    await element.evaluate((node: BaseAnchor) => {
      node.click();
    });

    await expect(element).toHaveAttribute('data-click-count', '1');
    await expect(page).toHaveURL(expectedUrl);
  });

  test('should navigate and emit a single click event on Enter', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '#foo' } });

    const expectedUrl = new URL('#foo', page.url()).href;

    await element.evaluate(node => {
      let clickCount = 0;
      node.addEventListener('click', () => {
        clickCount += 1;
        node.setAttribute('data-click-count', String(clickCount));
      });
      node.setAttribute('data-click-count', '0');
    });

    await element.press('Enter');

    await expect(element).toHaveAttribute('data-click-count', '1');
    await expect(page).toHaveURL(expectedUrl);
  });

  for (const { name, attributes } of [
    { name: 'rel="noopener noreferrer"', attributes: { rel: 'noopener noreferrer' } },
    { name: 'rel="noreferrer"', attributes: { rel: 'noreferrer' } },
    { name: 'referrerpolicy="no-referrer"', attributes: { referrerpolicy: 'no-referrer' } },
    { name: 'mixed-case referrer policy', attributes: { referrerpolicy: 'No-ReFeRrEr' } },
    { name: 'rel="noopener"', attributes: { rel: 'noopener' } },
    { name: 'mixed-case rel tokens', attributes: { rel: '\tNOOPENER\nNoReFeRrEr\f' } },
    { name: 'partial rel tokens', attributes: { rel: 'noopener notnoreferrer' } },
  ]) {
    for (const activation of [
      { name: 'click', activate: (element: Locator) => element.click() },
      { name: 'modified click', activate: (element: Locator) => element.click({ modifiers: ['ControlOrMeta'] }) },
      { name: 'Enter', activate: (element: Locator) => element.press('Enter') },
      { name: 'ControlOrMeta+Enter', activate: (element: Locator) => element.press('ControlOrMeta+Enter') },
      {
        name: 'ControlOrMeta+Shift+Enter',
        activate: (element: Locator) => element.press('ControlOrMeta+Shift+Enter'),
      },
    ]) {
      test(`should preserve ${name} on ${activation.name}`, async ({ browserName, context, fastPage, page }) => {
        test.slow(browserName === 'firefox', 'Firefox needs additional time for native new-tab navigation.');

        const { element } = fastPage;
        const href = '/?anchor-navigation-result';

        await fastPage.setTemplate({ attributes: { ...attributes, href, target: '_blank' } });

        const sourceUrl = page.url();
        const expectedUrl = new URL(href, sourceUrl).href;

        const newPagePromise = context.waitForEvent('page');

        await activation.activate(element);

        const newPage = await newPagePromise;

        await expect(newPage).toHaveURL(expectedUrl);
        await newPage.waitForLoadState('domcontentloaded');

        const { openerIsNull, referrer } = await newPage.locator('html').evaluate(root => ({
          openerIsNull: root.ownerDocument.defaultView!.opener === null,
          referrer: root.ownerDocument.referrer,
        }));

        expect(openerIsNull).toBe(true);
        expect(referrer).toBe(
          /\bnoreferrer\b/i.test(attributes.rel ?? '') || attributes.referrerpolicy?.toLowerCase() === 'no-referrer'
            ? ''
            : sourceUrl,
        );

        await expect(page).toHaveURL(sourceUrl);

        await newPage.close();
      });
    }
  }
});
