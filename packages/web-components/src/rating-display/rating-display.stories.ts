import { html } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { RatingDisplay as FluentRatingDisplay } from './rating-display.js';
import { RatingDisplayColor, RatingDisplaySize } from './rating-display.options.js';

import './define.js';

const storyTemplate = html<StoryArgs<FluentRatingDisplay>>`
  <fluent-rating-display
    color=${x => x.color}
    compact=${x => x.compact}
    count=${x => x.count}
    max=${x => x.max}
    size=${x => x.size}
    value=${x => x.value}
  >
  </fluent-rating-display>
`;

export default {
  title: 'Components/Rating Display',
  argTypes: {
    color: {
      options: Object.values(RatingDisplayColor),
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'The rating item color',
        },
        defaultValue: {
          summary: RatingDisplayColor.marigold,
        },
      },
    },
    compact: {
      control: 'boolean',
      table: {
        type: {
          summary: 'Renders a single filled icon with a label next to it',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    count: {
      control: 'number',
      table: {
        type: {
          summary: 'The number of ratings',
        },
      },
    },
    max: {
      control: 'number',
      table: {
        type: {
          summary: 'The maximum possible value of the rating. This attribute determines the number of icons displayed.',
        },
        defaultValue: {
          summary: 5,
        },
      },
    },
    size: {
      options: Object.values(RatingDisplaySize),
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'The component size',
        },
        defaultValue: {
          summary: RatingDisplaySize.medium,
        },
      },
    },
    value: {
      control: 'number',
      table: {
        type: {
          summary: 'The value of the rating',
        },
        defaultValue: {
          summary: 0,
        },
      },
    },
  },
} as Meta<FluentRatingDisplay>;

export const RatingDisplay: Story<FluentRatingDisplay> = renderComponent(storyTemplate).bind({});
RatingDisplay.args = {
  value: 3.5,
};

export const Color: Story<FluentRatingDisplay> = renderComponent(html<StoryArgs<FluentRatingDisplay>>`
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <fluent-rating-display value="3.7" color=${RatingDisplayColor.brand}></fluent-rating-display>
    <fluent-rating-display value="3.7" color=${RatingDisplayColor.marigold}></fluent-rating-display>
    <fluent-rating-display value="3.7" color=${RatingDisplayColor.neutral}></fluent-rating-display>
  </div>
`);

export const Compact: Story<FluentRatingDisplay> = renderComponent(html<StoryArgs<FluentRatingDisplay>>`
  <fluent-rating-display value="4.1" compact="true"></fluent-rating-display>
`);

export const Count: Story<FluentRatingDisplay> = renderComponent(html<StoryArgs<FluentRatingDisplay>>`
  <fluent-rating-display value="4" count="3391"></fluent-rating-display>
`);

export const Max: Story<FluentRatingDisplay> = renderComponent(html<StoryArgs<FluentRatingDisplay>>`
  <fluent-rating-display value="8.6" max="10"></fluent-rating-display>
`);

export const Size: Story<FluentRatingDisplay> = renderComponent(html<StoryArgs<FluentRatingDisplay>>`
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <fluent-rating-display value="2.8" size=${RatingDisplaySize.small}></fluent-rating-display>
    <fluent-rating-display value="2.8" size=${RatingDisplaySize.medium}></fluent-rating-display>
    <fluent-rating-display value="2.8" size=${RatingDisplaySize.large}></fluent-rating-display>
  </div>
`);
