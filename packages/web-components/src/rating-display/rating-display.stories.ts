import { html } from '@microsoft/fast-element';
import { type NewMeta as Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { RatingDisplay as FluentRatingDisplay } from './rating-display.js';
import { RatingDisplayColor, RatingDisplaySize } from './rating-display.options.js';

type Story = StoryObj<FluentRatingDisplay>;

const storyTemplate = html<StoryArgs<FluentRatingDisplay>>`
  <fluent-rating-display
    color=${story => story.color}
    ?compact=${story => story.compact}
    count=${story => story.count}
    max=${story => story.max}
    size=${story => story.size}
    value=${story => story.value}
  ></fluent-rating-display>
`;

export default {
  title: 'Components/Rating Display',
  render: renderComponent(storyTemplate),
  argTypes: {
    color: {
      control: 'select',
      description: 'The color of the filled count indicator',
      mapping: { '': null, ...RatingDisplayColor },
      options: ['', ...Object.values(RatingDisplayColor)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(RatingDisplayColor).join('|') },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the rating display',
      mapping: { '': null, ...RatingDisplaySize },
      options: ['', ...Object.values(RatingDisplaySize)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(RatingDisplaySize).join('|') },
      },
    },
    compact: {
      control: 'boolean',
      description: 'Sets the compact styling on the rating display',
      name: 'compact',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    count: {
      control: 'number',
      description: 'The number of ratings',
      table: { category: 'attributes', type: { summary: 'number' } },
    },
    max: {
      control: 'number',
      description: 'The maximum possible value of the rating. This attribute determines the number of icons displayed.',
      table: { category: 'attributes', type: { summary: 'number' } },
    },
    value: {
      control: 'number',
      description: 'The value of the rating',
      table: { category: 'attributes', type: { summary: 'number' } },
    },
  },
} as Meta<FluentRatingDisplay>;

export const Default: Story = {
  args: {
    value: 3.5,
  },
};

export const Count: Story = {
  args: {
    value: 4,
    count: 3391,
  },
};

export const Max: Story = {
  args: {
    value: 8.6,
    max: 10,
  },
};

export const ColorNeutral: Story = {
  args: {
    value: 3.5,
    color: 'neutral',
  },
};

export const ColorBrand: Story = {
  args: {
    value: 3.5,
    color: 'brand',
  },
};

export const SizeSmall: Story = {
  args: {
    value: 3.5,
    size: 'small',
  },
};

export const SizeLarge: Story = {
  args: {
    value: 3.5,
    size: 'large',
  },
};

export const Compact: Story = {
  args: {
    value: 3.5,
    compact: true,
  },
};
