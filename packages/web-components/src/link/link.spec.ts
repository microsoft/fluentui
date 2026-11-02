import { expect, test } from '../../test/playwright/index.js';
import { Link } from './link.js';
import { LinkAppearance, tagName } from './link.options.js';

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

  test('should set the `appearance` property to match the `appearance` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    for (const appearance of Object.values(LinkAppearance)) {
      await test.step(appearance, async () => {
        await fastPage.updateTemplate(element, { attributes: { appearance } });

        await expect(element).toHaveJSProperty('appearance', appearance);

        await expect(element).toHaveAttribute('appearance', appearance);
      });
    }
  });

  test('should add an "inline" attribute when the `inline` property is true', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await element.evaluate((node: Link) => {
      node.inline = true;
    });

    await expect(element).toHaveAttribute('inline');

    await element.evaluate((node: Link) => {
      node.inline = false;
    });

    await expect(element).not.toHaveAttribute('inline');
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

  test('should emit a single click event and navigate when clicked with a pointer', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '#foo' }, innerHTML: 'Link' });

    await element.evaluate((link: Link) => {
      let clickCount = 0;
      link.addEventListener('click', () => {
        clickCount += 1;
        link.setAttribute('data-click-count', String(clickCount));
      });
      link.setAttribute('data-click-count', '0');
    });

    await element.click();

    await expect(element).toHaveAttribute('data-click-count', '1');

    expect(page.url()).toMatch('#foo');
  });

  test('should expose the internal anchor to pointer interaction so the browser can surface the link target', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '#foo' }, innerHTML: 'Link' });

    const anchor = element.locator('a');

    await expect(anchor).toHaveJSProperty('inert', false);
    await expect(anchor).toHaveAttribute('aria-hidden', 'true');
    await expect(anchor).toHaveAttribute('tabindex', '-1');

    const isHitTarget = await element.evaluate(node => {
      const { x, y, width, height } = node.getBoundingClientRect();
      return node.ownerDocument.elementFromPoint(x + width / 2, y + height / 2) === node.querySelector('a');
    });

    expect(isHitTarget).toBe(true);
  });

  test('should expose a single link to assistive technology', async ({ browserName, fastPage, page }) => {
    // Playwright's role engine does not read `ElementInternals` roles, so query the browser's accessibility tree.
    test.skip(browserName !== 'chromium', 'Reads the accessibility tree via the Chrome DevTools Protocol.');

    await fastPage.setTemplate({ attributes: { href: '#foo' }, innerHTML: 'Link' });

    const client = await page.context().newCDPSession(page);
    const { nodes } = await client.send('Accessibility.getFullAXTree');

    expect(nodes.filter(node => !node.ignored && node.role?.value === 'link')).toHaveLength(1);
  });

  test('should keep focus on the host element when clicked', async ({ browserName, fastPage }) => {
    test.skip(browserName === 'webkit', 'WebKit does not move focus on click.');

    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { href: '#foo' }, innerHTML: 'Link' });

    await element.click();

    await expect(element).toBeFocused();
    await expect(element.locator('a')).not.toBeFocused();
  });

  test('should open the provided url in a new page on middle click', async ({
    browserName,
    context,
    fastPage,
    page,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'Playwright does not reliably open new pages on middle click outside Chromium.',
    );

    const { element } = fastPage;

    const expectedUrl = '#foo';

    await fastPage.setTemplate({ attributes: { href: expectedUrl }, innerHTML: 'Link' });

    const newPagePromise = context.waitForEvent('page');

    await element.click({ button: 'middle' });

    const newPage = await newPagePromise;

    await expect(newPage).toHaveURL(new RegExp(`${expectedUrl}$`));

    expect(page.url()).not.toMatch(expectedUrl);

    expect(context.pages()).toHaveLength(2);

    await newPage.close();
  });
});
