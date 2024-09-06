import { html, repeat } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';

const storyTemplate = html<StoryArgs<FluentDropdown>>`
  <div>
    <fluent-dropdown list="options"></fluent-dropdown>
    <fluent-dropdown-list id="options">
      ${repeat(
        [...Array(10).keys()].map(m => m + 1),
        html<string>` <fluent-option value="value${x => x}">Option ${x => x}</fluent-option> `,
      )}
    </fluient-dropdown-list>
  </div>
`;

export default {
  title: 'Components/Dropdown',
};

export const Dropdown = renderComponent(storyTemplate).bind({});
