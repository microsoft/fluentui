import { html, when } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';

const storyTemplate = html<StoryArgs<FluentDropdown>>`
  <fluent-dropdown list="options"></fluent-dropdown>
  <fluent-dropdown-list id="options">
    <fluent-option value="value1">Option 1</fluent-option>
    <fluent-option value="value2">Option 2</fluent-option>
    <fluent-option value="value3">Option 3</fluent-option>
  </fluient-dropdown-list>
`;

export default {
  title: 'Components/Dropdown',
}

export const Dropdown = renderComponent(storyTemplate).bind({});
