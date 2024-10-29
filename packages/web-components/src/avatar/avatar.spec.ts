import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
import type { Avatar } from './avatar.js';
import type { AvatarAppearance, AvatarColor, AvatarSize } from './avatar.options.js';

test.describe('Avatar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-avatar--image'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-avatar'));
  });

  const colorAttributes = {
    neutral: 'neutral',
    brand: 'brand',
    colorful: 'colorful',
    darkRed: 'dark-red',
    cranberry: 'cranberry',
    red: 'red',
    pumpkin: 'pumpkin',
    peach: 'peach',
    marigold: 'marigold',
    gold: 'gold',
    brass: 'brass',
    brown: 'brown',
    forest: 'forest',
    seafoam: 'seafoam',
    darkGreen: 'dark-green',
    lightTeal: 'light-teal',
    teal: 'teal',
    steel: 'steel',
    blue: 'blue',
    royalBlue: 'royal-blue',
    cornflower: 'cornflower',
    navy: 'navy',
    lavender: 'lavender',
    purple: 'purple',
    grape: 'grape',
    lilac: 'lilac',
    pink: 'pink',
    magenta: 'magenta',
    plum: 'plum',
    beige: 'beige',
    mink: 'mink',
    platinum: 'platinum',
    anchor: 'anchor',
  };

  const appearanceAttributes = {
    ring: 'ring',
    shadow: 'shadow',
    ringShadow: 'ring-shadow',
  };

  const sizeAttributes = {
    _16: 16,
    _20: 20,
    _24: 24,
    _28: 28,
    _32: 32,
    _36: 36,
    _40: 40,
    _48: 48,
    _56: 56,
    _64: 64,
    _72: 72,
    _96: 96,
    _120: 120,
    _128: 128,
  };

  test('should render without crashing', async ({ page }) => {
    const element = page.locator('fluent-avatar');
    await page.setContent(/* html */ `
      <fluent-avatar></fluent-avatar>
    `);

    await expect(element).toBeVisible();
  });

  test('should have a role of img', async ({ page }) => {
    const element = page.locator('fluent-avatar');

    await expect(element).toHaveJSProperty('elementInternals.role', 'img');
  });

  test('When no name value is set, should render with custom initials based on the provided initials value', async ({
    page,
  }) => {
    const element = page.locator('fluent-avatar');

    await page.setContent(/* html */ `
      <fluent-avatar initials="JD"></fluent-avatar>
    `);

    await expect(element).toHaveText('JD');
  });

  test('When name value is set, should generate initials based on the provided name value', async ({ page }) => {
    const element = page.locator('fluent-avatar');

    await page.setContent(/* html */ `
      <fluent-avatar name="John Doe"></fluent-avatar>
    `);

    await expect(element).toHaveText('JD');
  });

  test('When name value and custom initials are set, should prioritize the provided initials', async ({ page }) => {
    const element = page.locator('fluent-avatar');

    await page.setContent(/* html */ `
      <fluent-avatar name="Julie Wright" initials="JJ"></fluent-avatar>
    `);

    await expect(element).toHaveText('JJ');
  });

  test('should render correctly in active state', async ({ page }) => {
    const element = page.locator('fluent-avatar');

    await element.evaluate((node: Avatar) => {
      node.active = 'active';
    });

    await expect(element).toHaveJSProperty('active', 'active');
  });

  test('should render correctly in inactive state', async ({ page }) => {
    const element = page.locator('fluent-avatar');

    await element.evaluate((node: Avatar) => {
      node.active = 'inactive';
    });

    await expect(element).toHaveJSProperty('active', 'inactive');
  });

  test('default color should be neutral', async ({ page }) => {
    const element = page.locator('fluent-avatar');

    await expect(element).toHaveCustomState('neutral');
  });

  test('should add a custom state of `brand` when `brand is provided as the color', async ({ page }) => {
    const element = page.locator('fluent-avatar');

    await page.setContent(/* html */ `
      <fluent-avatar color-id="pumpkin" name="John Doe" color="brand"></fluent-avatar>
    `);

    await expect(element).toHaveCustomState('brand');
  });

  test('should prioritize color derivation from colorId over name when set to "colorful"', async ({ page }) => {
    const element = page.locator('fluent-avatar');

    await page.setContent(/* html */ `
      <fluent-avatar color-id="pumpkin" name="Steve Smith" color="colorful"></fluent-avatar>
    `);

    await expect(element).toHaveCustomState('pumpkin');
  });

  test(`should set the color attribute on the internal control`, async ({ page }) => {
    const element = page.locator('fluent-avatar');

    for (const [, value] of Object.entries(colorAttributes)) {
      await test.step(value, async () => {
        await element.evaluate((node: Avatar, colorValue: string) => {
          node.color = colorValue as AvatarColor;
        }, value as string);

        await expect(element).toHaveJSProperty('color', `${value}`);

        await expect(element).toHaveAttribute('color', `${value}`);
      });
    }
  });

  test(`should set the size attribute on the internal control`, async ({ page }) => {
    const element = page.locator('fluent-avatar');

    for (const [, value] of Object.entries(sizeAttributes)) {
      await test.step(`${value}`, async () => {
        await element.evaluate((node: Avatar, sizeValue: number) => {
          node.size = sizeValue as AvatarSize;
        }, value as number);

        await expect(element).toHaveJSProperty('size', value);

        await expect(element).toHaveAttribute('size', `${value}`);
      });
    }
  });

  test(`should set and reflect the appearance attribute on the internal control`, async ({ page }) => {
    const element = page.locator('fluent-avatar');

    for (const [, value] of Object.entries(appearanceAttributes)) {
      await test.step(value, async () => {
        await element.evaluate((node: Avatar, appearanceValue: string) => {
          node.appearance = appearanceValue as AvatarAppearance;
        }, value as string);

        await expect(element).toHaveJSProperty('appearance', `${value}`);
        await expect(element).toHaveAttribute('appearance', `${value}`);
      });
    }
  });
});
