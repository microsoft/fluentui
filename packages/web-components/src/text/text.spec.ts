import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import { Text } from './text.js';
import { TextAlign, TextFont, TextSize, TextWeight } from './text.options.js';

test.describe('Text Component', () => {
  let page: Page;
  let element: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    element = page.locator('fluent-text');
    await page.goto(fixtureURL('components-text--text'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  const sizeAttributes = {
    _100: '100',
    _200: '200',
    _300: '300',
    _400: '400',
    _500: '500',
    _600: '600',
    _700: '700',
    _800: '800',
    _900: '900',
    _1000: '1000',
  };

  const weightAttributes = {
    medium: 'medium',
    regular: 'regular',
    semibold: 'semibold',
    bold: 'bold',
  };

  const alignAttributes = {
    start: 'start',
    end: 'end',
    center: 'center',
    justify: 'justify',
  };

  const fontAttributes = {
    base: 'base',
    numeric: 'numeric',
    monospace: 'monospace',
  };

  test('should render without crashing', async () => {
    await page.waitForSelector('fluent-text');
    await expect(element).toBeVisible();
  });

  test(`should set and reflect and update the nowrap attribute and property when provided`, async () => {
    await element.evaluate((node: Text) => {
      node.nowrap = true;
    });
    await expect(element).toHaveAttribute('nowrap', '');
    await expect(element).toHaveJSProperty('nowrap', true);

    await element.evaluate((node: Text) => {
      node.nowrap = false;
    });

    await expect(element).not.toHaveAttribute('nowrap', '');
    await expect(element).toHaveJSProperty('nowrap', false);
  });

  test(`should add a custom state matching the nowrap for the font attribute when provided`, async () => {
    await element.evaluate((node: Text) => {
      node.nowrap = true;
    });

    expect(await element.evaluate((node: Text) => node.elementInternals.states.has('nowrap'))).toBe(true);

    await element.evaluate((node: Text) => {
      node.nowrap = false;
    });

    expect(await element.evaluate((node: Text) => node.elementInternals.states.has('nowrap'))).toBe(false);
  });

  test(`should set and reflect and update the truncate attribute and property when provided`, async () => {
    await element.evaluate((node: Text) => {
      node.truncate = true;
    });
    await expect(element).toHaveAttribute('truncate', '');
    await expect(element).toHaveJSProperty('truncate', true);

    await element.evaluate((node: Text) => {
      node.truncate = false;
    });

    await expect(element).not.toHaveAttribute('truncate', '');
    await expect(element).toHaveJSProperty('truncate', false);
  });

  test(`should add a custom state matching the truncate for the font attribute when provided`, async () => {
    await element.evaluate((node: Text) => {
      node.truncate = true;
    });

    expect(await element.evaluate((node: Text) => node.elementInternals.states.has('truncate'))).toBe(true);

    await element.evaluate((node: Text) => {
      node.truncate = false;
    });

    expect(await element.evaluate((node: Text) => node.elementInternals.states.has('truncate'))).toBe(false);
  });

  test(`should set and reflect and update the italic attribute and property when provided`, async () => {
    await element.evaluate((node: Text) => {
      node.italic = true;
    });
    await expect(element).toHaveAttribute('italic', '');
    await expect(element).toHaveJSProperty('italic', true);

    await element.evaluate((node: Text) => {
      node.italic = false;
    });

    await expect(element).not.toHaveAttribute('italic', '');
    await expect(element).toHaveJSProperty('italic', false);
  });

  test(`should add a custom state matching the italic for the font attribute when provided`, async () => {
    await element.evaluate((node: Text) => {
      node.italic = true;
    });

    expect(await element.evaluate((node: Text) => node.elementInternals.states.has('italic'))).toBe(true);

    await element.evaluate((node: Text) => {
      node.italic = false;
    });

    expect(await element.evaluate((node: Text) => node.elementInternals.states.has('italic'))).toBe(false);
  });

  test(`should set and reflect and update the underline attribute and property when provided`, async () => {
    await element.evaluate((node: Text) => {
      node.underline = true;
    });
    await expect(element).toHaveAttribute('underline', '');
    await expect(element).toHaveJSProperty('underline', true);

    await element.evaluate((node: Text) => {
      node.underline = false;
    });

    await expect(element).not.toHaveAttribute('underline', '');
    await expect(element).toHaveJSProperty('underline', false);
  });

  test(`should add a custom state matching the underline for the font attribute when provided`, async () => {
    await element.evaluate((node: Text) => {
      node.underline = true;
    });

    expect(await element.evaluate((node: Text) => node.elementInternals.states.has('underline'))).toBe(true);

    await element.evaluate((node: Text) => {
      node.underline = false;
    });

    expect(await element.evaluate((node: Text) => node.elementInternals.states.has('underline'))).toBe(false);
  });

  test(`should set and reflect and update the strikethrough attribute and property when provided`, async () => {
    await element.evaluate((node: Text) => {
      node.strikethrough = true;
    });
    await expect(element).toHaveAttribute('strikethrough', '');
    await expect(element).toHaveJSProperty('strikethrough', true);

    await element.evaluate((node: Text) => {
      node.strikethrough = false;
    });

    await expect(element).not.toHaveAttribute('strikethrough', '');
    await expect(element).toHaveJSProperty('strikethrough', false);
  });

  test(`should add a custom state matching the strikethrough for the font attribute when provided`, async () => {
    await element.evaluate((node: Text) => {
      node.strikethrough = true;
    });

    expect(await element.evaluate((node: Text) => node.elementInternals.states.has('strikethrough'))).toBe(true);

    await element.evaluate((node: Text) => {
      node.strikethrough = false;
    });

    expect(await element.evaluate((node: Text) => node.elementInternals.states.has('strikethrough'))).toBe(false);
  });

  test(`should set and reflect and update the block attribute and property when provided`, async () => {
    await element.evaluate((node: Text) => {
      node.block = true;
    });
    await expect(element).toHaveAttribute('block', '');
    await expect(element).toHaveJSProperty('block', true);

    await element.evaluate((node: Text) => {
      node.block = false;
    });

    await expect(element).not.toHaveAttribute('block', '');
    await expect(element).toHaveJSProperty('block', false);
  });

  test(`should add a custom state matching the block for the font attribute when provided`, async () => {
    await element.evaluate((node: Text) => {
      node.block = true;
    });

    expect(await element.evaluate((node: Text) => node.elementInternals.states.has('block'))).toBe(true);

    await element.evaluate((node: Text) => {
      node.block = false;
    });

    expect(await element.evaluate((node: Text) => node.elementInternals.states.has('block'))).toBe(false);
  });

  for (const [, value] of Object.entries(sizeAttributes)) {
    test(`should set and reflect the size attribute to \`${value}\` when provided`, async () => {
      await element.evaluate((node: Text, sizeValue: string) => {
        node.size = sizeValue as TextSize;
      }, value as string);

      await expect(element).toHaveJSProperty('size', `${value}`);
      await expect(element).toHaveAttribute('size', `${value}`);
    });

    test(`should add a custom state matching the  \`${value}\` for the size attribute when provided`, async () => {
      await element.evaluate((node: Text, sizeValue: string) => {
        node.size = sizeValue as TextSize;
      }, value as string);

      expect(
        await element.evaluate((node: Text, value: string) => node.elementInternals.states.has(`size-${value}`), value),
      ).toBe(true);

      await element.evaluate((node: Text) => {
        node.size = undefined;
      });

      expect(
        await element.evaluate((node: Text, value: string) => node.elementInternals.states.has(`size-${value}`), value),
      ).toBe(false);
    });
  }
  for (const [, value] of Object.entries(weightAttributes)) {
    test(`should set and reflect the weight attribute to \`${value}\` when provided`, async () => {
      await element.evaluate((node: Text, weightValue: string) => {
        node.weight = weightValue as TextWeight;
      }, value as string);

      await expect(element).toHaveJSProperty('weight', `${value}`);
      await expect(element).toHaveAttribute('weight', `${value}`);
    });

    test(`should add a custom state matching the  \`${value}\` for the weight attribute when provided`, async () => {
      await element.evaluate((node: Text, weightValue: string) => {
        node.weight = weightValue as TextWeight;
      }, value as string);

      expect(
        await element.evaluate((node: Text, value: string) => node.elementInternals.states.has(value), value),
      ).toBe(true);

      await element.evaluate((node: Text) => {
        node.weight = undefined;
      });

      expect(
        await element.evaluate((node: Text, value: string) => node.elementInternals.states.has(value), value),
      ).toBe(false);
    });
  }
  for (const [, value] of Object.entries(alignAttributes)) {
    test(`should set and reflect the align attribute to \`${value}\` when provided`, async () => {
      await element.evaluate((node: Text, alignValue: string) => {
        node.align = alignValue as TextAlign;
      }, value as string);

      await expect(element).toHaveJSProperty('align', `${value}`);
      await expect(element).toHaveAttribute('align', `${value}`);
    });

    test(`should add a custom state matching the  \`${value}\` for the align attribute when provided`, async () => {
      await element.evaluate((node: Text, alignValue: string) => {
        node.align = alignValue as TextAlign;
      }, value as string);

      expect(
        await element.evaluate((node: Text, value: string) => node.elementInternals.states.has(value), value),
      ).toBe(true);

      await element.evaluate((node: Text) => {
        node.align = undefined;
      });

      expect(
        await element.evaluate((node: Text, value: string) => node.elementInternals.states.has(value), value),
      ).toBe(false);
    });
  }
  for (const [, value] of Object.entries(fontAttributes)) {
    test(`should set and reflect the font attribute to \`${value}\` when provided`, async () => {
      await element.evaluate((node: Text, fontValue: string) => {
        node.font = fontValue as TextFont;
      }, value as string);

      await expect(element).toHaveJSProperty('font', `${value}`);
      await expect(element).toHaveAttribute('font', `${value}`);
    });

    test(`should add a custom state matching the  \`${value}\` for the font attribute when provided`, async () => {
      await element.evaluate((node: Text, fontValue: string) => {
        node.font = fontValue as TextFont;
      }, value as string);

      expect(
        await element.evaluate((node: Text, value: string) => node.elementInternals.states.has(value), value),
      ).toBe(true);

      await element.evaluate((node: Text) => {
        node.font = undefined;
      });

      expect(
        await element.evaluate((node: Text, value: string) => node.elementInternals.states.has(value), value),
      ).toBe(false);
    });
  }
});
