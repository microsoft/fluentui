import { html } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import { HorizontalBarChart as FluentHorizontalBarChart } from './horizontalbarchart.js';

const storyTemplate = html<StoryArgs<FluentHorizontalBarChart>>`
  <fluent-horizontalbarchart> </fluent-horizontalbarchart>
`;

export default {
  title: 'Components/HorizontalBarChart',
} as Meta<FluentHorizontalBarChart>;

export const Basic: Story<FluentHorizontalBarChart> = renderComponent(storyTemplate).bind({});

export const RTL: Story<FluentHorizontalBarChart> = renderComponent(html<StoryArgs<FluentHorizontalBarChart>>`
  <div style="display: flex; flex-direction: column; gap: 1rem;" dir="rtl">
    <div>
      <fluent-horizontalbarchart> </fluent-horizontalbarchart>
    </div>
  </div>
`);
