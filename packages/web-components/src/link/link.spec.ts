import type { Locator } from '@playwright/test';
import { expect, test } from '../../test/playwright/index.js';
import type { Link } from './link.js';
import { tagName } from './link.options.js';

const attributes = {
  download: 'download',
  href: 'href',
  ping: 'ping',
  hreflang: 'en-GB',
  referrerpolicy: 'no-referrer',
  rel: 'external',
  target: '_blank',
  type: 'foo',
};

test.describe('Link', () => {
  test.use({
    innerHTML: 'Link',
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

  test(`should set each property to match its corresponding attribute`, async ({ fastPage }) => {
    const { element } = fastPage;
    const anchor = element.locator('a');

    await fastPage.setTemplate();

    for (const [attribute, value] of Object.entries(attributes)) {
      await test.step(`should set the \`${attribute}\` property to match the \`${attribute}\` attribute`, async () => {
        await fastPage.updateTemplate(element, { attributes: { [attribute]: value } });

        await expect(element).toHaveAttribute(attribute, value);

        await expect(element).toHaveJSProperty(attribute, value);
      });

      await test.step(`should set the \`${attribute}\` attribute on the internal anchor element`, async () => {
        await expect(anchor).toHaveAttribute(attribute, value);
      });
    }
  });

  test('should emit a single click event when clicked', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '#foo' } });

    await element.evaluate((link: Link) => {
      let clickCount = 0;
      link.addEventListener('click', () => {
        clickCount += 1;
        link.setAttribute('data-click-count', String(clickCount));
      });
      link.setAttribute('data-click-count', '0');
    });

    await element.evaluate((node: HTMLElement) => {
      node.click();
    });

    await expect(element).toHaveAttribute('data-click-count', '1');
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
      { name: 'modified Enter', activate: (element: Locator) => element.press('ControlOrMeta+Enter') },
      { name: 'Control+Enter', activate: (element: Locator) => element.press('Control+Enter') },
    ]) {
      test(`should preserve ${name} on ${activation.name}`, async ({ context, fastPage, page }) => {
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
