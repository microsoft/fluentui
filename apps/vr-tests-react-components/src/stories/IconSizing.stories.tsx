import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Input } from '@fluentui/react-input';
import { SearchBox } from '@fluentui/react-search';
import { PresenceBadge } from '@fluentui/react-badge';
import { RatingDisplay } from '@fluentui/react-rating';
import { SearchRegular, DismissRegular } from '@fluentui/react-icons';
import { Steps, type StoryParameters } from 'storywright';
import { getStoryVariant, HIGH_CONTRAST, TestWrapperDecoratorFixedWidth } from '../utilities';
import { DefaultPresenceIcons, HalfStarExamples, IconSlotExamples } from './IconSizingSlots';

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

export default {
  title: 'Icon sizing',
  decorators: [TestWrapperDecoratorFixedWidth],
  beforeEach: ({ canvasElement }) => {
    canvasElement.removeAttribute('data-icon-story-ready');
  },
  // E2E focus changes must wait until Storybook has finished waiting for initial transitions.
  afterEach: ({ canvasElement }) => {
    canvasElement.setAttribute('data-icon-story-ready', 'true');
  },
  parameters: {
    storyWright: { steps: new Steps().snapshot('fixed icon sizes', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
} satisfies Meta;

export const DefaultTheme: StoryObj = {
  render: () => <Examples />,
};

export const DefaultIconSlots: StoryObj = {
  render: () => <IconSlotExamples kind="default" />,
};

export const AllPresenceIcons: StoryObj = {
  render: () => <DefaultPresenceIcons />,
};

export const HalfStarClipping: StoryObj = {
  render: () => <HalfStarExamples />,
};

const customSlotParameters = {
  storyWright: {
    steps: new Steps()
      .snapshot('custom slot content', { cropTo: '.testWrapper' })
      .click('[data-slot-case="SearchBox.small.contentAfter"] input')
      .snapshot('small search adornment focused', { cropTo: '[data-slot-case="SearchBox.small.contentAfter"]' })
      .click('[data-slot-case="SearchBox.medium.contentAfter"] input')
      .snapshot('medium search adornment focused', { cropTo: '[data-slot-case="SearchBox.medium.contentAfter"]' })
      .click('[data-slot-case="SearchBox.large.contentAfter"] input')
      .snapshot('large search adornment focused', { cropTo: '[data-slot-case="SearchBox.large.contentAfter"]' })
      .end(),
  },
} satisfies StoryParameters;

export const CustomIconSlots: StoryObj = {
  render: () => <IconSlotExamples kind="icon" />,
  parameters: customSlotParameters,
};

export const ItalicSlotContent: StoryObj = {
  render: () => <IconSlotExamples kind="italic" />,
  parameters: customSlotParameters,
};

export const MixedSlotContent: StoryObj = {
  render: () => <IconSlotExamples kind="mixed" />,
  parameters: customSlotParameters,
};

export const CustomSvgSlots: StoryObj = {
  render: () => <IconSlotExamples kind="svg" />,
  parameters: customSlotParameters,
};

export const CustomIconSlotsHighContrast = {
  ...getStoryVariant(CustomIconSlots, HIGH_CONTRAST),
  name: 'Custom icon slots high contrast',
};

export const MixedSlotContentHighContrast = {
  ...getStoryVariant(MixedSlotContent, HIGH_CONTRAST),
  name: 'Mixed slot content high contrast',
};
