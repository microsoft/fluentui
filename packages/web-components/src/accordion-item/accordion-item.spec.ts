import { expect, test } from '../../test/playwright/index.js';
import { AccordionItem } from './accordion-item.js';
import { AccordionItemSize } from './accordion-item.options.js';

test.describe('Accordion item', () => {
  test.use({
    innerHTML: 'Hello, World!',
    tagName: 'fluent-accordion-item',
    waitFor: ['fluent-accordion-item'],
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-accordion-item');
    });

    expect(hasError).toBe(false);
  });

  test('should set a default heading level of 2 when `headinglevel` is not provided', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <fluent-accordion>
        <fluent-accordion-item>
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
      </fluent-accordion>
    `);

    await expect(element).toHaveJSProperty('headinglevel', 2);
  });

  test('should set the `aria-level` attribute on the internal heading element equal to the heading level', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const heading = element.locator(`[role="heading"]`);

    await fastPage.setTemplate({
      attributes: { 'heading-level': '3' },
      innerHTML: /* html */ `
        <span slot="heading">Heading 1</span>
        <div>Content 1</div>
      `,
    });

    await expect(heading).toHaveAttribute('aria-level', '3');
  });

  test('should set `aria-expanded` property on the internal control equal to the `expanded` property', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const button = element.locator('button');

    await fastPage.setTemplate({ attributes: { expanded: true } });

    await expect(button).toHaveAttribute('aria-expanded', 'true');

    await element.evaluate<void, AccordionItem>(node => {
      node.expanded = false;
    });

    await expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('should set `disabled` attribute on the internal control equal to the `disabled` property', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const button = fastPage.element.locator('button');

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await expect(button).toHaveAttribute('disabled');

    await element.evaluate<void, AccordionItem>(node => {
      node.disabled = false;
    });

    await expect(button).not.toHaveAttribute('disabled');
  });

  test('accordion-item should NOT be expandable via click when accordion is disabled', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <fluent-accordion>
        <fluent-accordion-item>Item 1</fluent-accordion-item>
        <fluent-accordion-item disabled>Item 2</fluent-accordion-item>
        <fluent-accordion-item>Item 3</fluent-accordion-item>
      </fluent-accordion>
    `);
    const firstItem = element.nth(0);
    const secondItem = element.nth(1);

    await firstItem.click();
    await expect(firstItem).toHaveAttribute('expanded');
    await expect(firstItem).toHaveJSProperty('expanded', true);

    await secondItem.click();
    await expect(secondItem).not.toHaveAttribute('expanded');
    await expect(secondItem).toHaveJSProperty('expanded', false);

    await expect(firstItem).toHaveAttribute('expanded');
    await expect(firstItem).toHaveJSProperty('expanded', true);
  });

  test('should set internal properties to match the id when provided', async ({ fastPage }) => {
    const { element } = fastPage;
    const button = element.locator('button');

    await fastPage.setTemplate(/* html */ `
      <fluent-accordion>
        <fluent-accordion-item id="foo">Item 1</fluent-accordion-item>
      </fluent-accordion>
    `);

    await expect(element.locator(`[role="region"]`)).toHaveAttribute('aria-labelledby', 'foo');
    await expect(button).toHaveId('foo');
  });

  for (const size of Object.values(AccordionItemSize)) {
    test(`should set the \`size\` property to "${size}" when the attribute is set to "${size}"`, async ({
      fastPage,
    }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { size } });

      await expect(element).toHaveAttribute('size', size);

      await expect(element).toHaveJSProperty('size', size);
    });
  }

  test('should set the `block` property when the `block` attribute is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { block: true } });

    await expect(element).toHaveAttribute('block');

    await expect(element).toHaveJSProperty('block', true);

    await test.step('should remove the `block` attribute when the `block` property is set to `false`', async () => {
      await element.evaluate<void, AccordionItem>(node => {
        node.block = false;
      });

      await expect(element).not.toHaveAttribute('block');

      await expect(element).toHaveJSProperty('block', false);
    });
  });

  test('should set the `marker-position` attribute to the provided value', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: {
        'marker-position': 'end',
      },
    });

    await expect(element).toHaveAttribute('marker-position', 'end');

    await expect(element).toHaveJSProperty('markerPosition', 'end');

    await test.step('should set the `marker-position` attribute to `start` when the `markerPosition` property is set to `start`', async () => {
      await element.evaluate<void, AccordionItem>(node => {
        node.markerPosition = 'start';
      });

      await expect(element).toHaveAttribute('marker-position', 'start');

      await expect(element).toHaveJSProperty('markerPosition', 'start');
    });
  });
});
