import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { getStorybookHelpers } from '../../.storybook/wc-toolkit-helpers.js';
import type { RatingDisplay as FluentRatingDisplay } from './rating-display.js';
import { RatingDisplayColor, RatingDisplaySize } from './rating-display.options.js';

type Story = StoryObj<FluentRatingDisplay>;
const { argTypes } = getStorybookHelpers<FluentRatingDisplay>('fluent-rating-display');

const storyTemplate = html<StoryArgs<FluentRatingDisplay>>`
  <fluent-rating-display
    color=${story => story.color}
    ?compact=${story => story.compact}
    count=${story => story.count}
    max=${story => story.max}
    size=${story => story.size}
    value=${story => story.value}
    aria-label=${story => story.ariaLabel}
    >${story => story.iconSlottedContent?.()}</fluent-rating-display
  >
`;

export default {
  title: 'Components/Rating Display',
  render: renderComponent(storyTemplate),
  argTypes: {
    ...argTypes,
    ariaLabel: { name: 'aria-label', control: 'text', table: { category: 'demo' } },
  },
} as Meta<FluentRatingDisplay>;

export const Default: Story = {
  args: {
    value: 3.5,
    ariaLabel: 'Rated 3.5 out of 5',
  },
};

export const Count: Story = {
  args: {
    value: 4,
    count: 3391,
    ariaLabel: 'Rated 4 out of 5 based on 3391 ratings',
  },
};

export const Max: Story = {
  args: {
    value: 8.6,
    max: 10,
    ariaLabel: 'Rated 8.6 out of 10',
  },
};

export const ColorNeutral: Story = {
  args: {
    value: 3.5,
    color: 'neutral',
    ariaLabel: 'Rated 3.5 out of 5',
  },
};

export const ColorBrand: Story = {
  args: {
    value: 3.5,
    color: 'brand',
    ariaLabel: 'Rated 3.5 out of 5',
  },
};

export const SizeSmall: Story = {
  args: {
    value: 3.5,
    size: 'small',
    ariaLabel: 'Rated 3.5 out of 5',
  },
};

export const SizeLarge: Story = {
  args: {
    value: 3.5,
    size: 'large',
    ariaLabel: 'Rated 3.5 out of 5',
  },
};

export const Compact: Story = {
  args: {
    value: 3.5,
    compact: true,
    ariaLabel: 'Rated 3.5 out of 5',
  },
};

export const CustomIcon: Story = {
  args: {
    value: 3.7,
    ariaLabel: 'Rated 3.7 out of 5',
    iconSlottedContent: () => html`<svg slot="icon">
      <path
        d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z"
      />
    </svg>`,
  },
};
