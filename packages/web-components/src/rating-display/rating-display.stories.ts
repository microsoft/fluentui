import { html } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { RatingDisplay as FluentRatingDisplay } from './rating-display.js';
import { RatingDisplaySize } from './rating-display.options.js';

import './define.js';

const storyTemplate = html<StoryArgs<FluentRatingDisplay>>`
  <fluent-rating-display size=${x => x.size} value=${x => x.value} ?compact=${x => x.compact}> </fluent-rating-display>
`;

export default {
  title: 'Components/Rating Display',
  argTypes: {
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
    size: {
      options: Object.values(RatingDisplaySize),
      control: {
        type: 'select',
      },
    },
    value: {
      control: 'number',
      table: {
        type: {
          summary: 'The value of the rating',
        },
      },
    },
  },
} as Meta<FluentRatingDisplay>;

export const RatingDisplay: Story<FluentRatingDisplay> = renderComponent(storyTemplate).bind({});

export const Compact: Story<FluentRatingDisplay> = renderComponent(html<StoryArgs<FluentRatingDisplay>>`
  <fluent-rating-display>Default</fluent-rating-display>
`);
