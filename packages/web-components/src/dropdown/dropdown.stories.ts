import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';
import { FASTListboxOption } from '@microsoft/fast-foundation';
import './define.js';

type DropdownStoryArgs = Args & FluentDropdown;
type DropdownStoryMeta = Meta<DropdownStoryArgs>;

const dropdownTemplate = html<DropdownStoryArgs>`
  <div>
    <fluent-dropdown>
      <fast-option> Hi Hello </fast-option>
      <span>Peanut Butter</span>
    </fluent-dropdown>
  </div>
`;

export default {
  title: 'Components/Dropdown',
  args: {},
  argTypes: {},
} as DropdownStoryMeta;

export const Dropdown = renderComponent(dropdownTemplate).bind({});
