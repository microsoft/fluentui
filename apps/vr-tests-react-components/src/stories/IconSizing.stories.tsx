import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Input } from '@fluentui/react-input';
import { SearchBox } from '@fluentui/react-search';
import { PresenceBadge } from '@fluentui/react-badge';
import { RatingDisplay } from '@fluentui/react-rating';
import { FluentProvider } from '@fluentui/react-provider';
import { SearchRegular, DismissRegular } from '@fluentui/react-icons';
import { Steps, type StoryParameters } from 'storywright';
import { getStoryVariant, HIGH_CONTRAST, TestWrapperDecoratorFixedWidth } from '../utilities';

const inputSizes = ['small', 'medium', 'large'] as const;
const presenceSizes = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'] as const;
const ratingSizes = ['small', 'medium', 'large', 'extra-large'] as const;

const Examples = () => (
  <>
    {inputSizes.map(size => (
      <div key={size} data-testid={`input-${size}`}>
        <Input size={size} contentBefore={<SearchRegular />} contentAfter={<DismissRegular />} />
        <SearchBox size={size} defaultValue="Search" />
      </div>
    ))}
    {presenceSizes.map(size => (
      <div key={size} data-testid={`presence-${size}`}>
        <PresenceBadge size={size} />
      </div>
    ))}
    {ratingSizes.map(size => (
      <div key={size} data-testid={`rating-${size}`}>
        <RatingDisplay size={size} value={2.5} />
      </div>
    ))}
  </>
);

// TODO: Design CI enforcement for these manual play checks; StoryWright does not await or gate on their failures.
const assertFixedIconSizes: NonNullable<StoryObj['play']> = async ({ canvasElement }) => {
  const targetDocument = canvasElement.ownerDocument;
  const targetWindow = targetDocument.defaultView;
  if (!targetWindow) {
    throw new Error('Icon sizing assertions require a browser');
  }
  await targetDocument.fonts.ready;

  const assertIcons = (selector: string, count: number, size: number) => {
    const icons = canvasElement.querySelectorAll<SVGElement | HTMLElement>(selector);
    if (icons.length !== count) {
      throw new Error(`${selector}: expected ${count} icons, found ${icons.length}`);
    }
    for (const icon of Array.from(icons)) {
      const style = targetWindow.getComputedStyle(icon);
      const rect = icon.getBoundingClientRect();
      if (Math.abs(rect.width - size) > 0.1 || Math.abs(rect.height - size) > 0.1) {
        throw new Error(`${selector}: expected ${size}px icon, received ${rect.width}x${rect.height}px`);
      }
      if (icon.localName === 'i') {
        if (
          !icon.textContent ||
          !targetDocument.fonts.check(`${style.fontSize} ${style.fontFamily}`, icon.textContent)
        ) {
          throw new Error(`${selector}: font glyph has not loaded`);
        }
      }
    }
  };

  inputSizes.forEach((size, index) => {
    const pixels = [16, 20, 24][index];
    const root = `[data-testid="input-${size}"]`;
    assertIcons(`${root} .fui-Input:not(.fui-SearchBox) svg, ${root} .fui-Input:not(.fui-SearchBox) i`, 2, pixels);
    assertIcons(`${root} .fui-SearchBox svg, ${root} .fui-SearchBox i`, 2, pixels);
  });
  presenceSizes.forEach((size, index) => {
    const root = `[data-testid="presence-${size}"]`;
    assertIcons(`${root} svg, ${root} i`, 1, [6, 10, 12, 16, 20, 28][index]);
  });
  ratingSizes.forEach((size, index) => {
    const root = `[data-testid="rating-${size}"]`;
    assertIcons(`${root} svg, ${root} i`, 6, [12, 16, 20, 28][index]);
  });
};

export default {
  title: 'Icon sizing',
  decorators: [TestWrapperDecoratorFixedWidth],
  parameters: {
    storyWright: { steps: new Steps().snapshot('fixed icon sizes', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
} satisfies Meta;

export const DefaultTheme: StoryObj = {
  render: () => <Examples />,
  play: assertFixedIconSizes,
};

export const OverriddenTokens: StoryObj = {
  name: 'Overridden tokens',
  render: () => (
    <FluentProvider
      theme={{
        fontSizeBase400: '40px',
        fontSizeBase500: '50px',
        fontSizeBase600: '60px',
        fontSizeHero700: '70px',
        fontSizeHero800: '80px',
        spacingHorizontalSNudge: '18px',
        strokeWidthThin: '5px',
      }}
    >
      <Examples />
    </FluentProvider>
  ),
  play: assertFixedIconSizes,
};

export const OverriddenTokensHighContrast = getStoryVariant(OverriddenTokens, HIGH_CONTRAST);
