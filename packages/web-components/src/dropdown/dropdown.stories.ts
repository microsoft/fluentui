import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';
import './define.js';
import '../option/define';
import { DropdownAppearance, DropdownStyleSizes } from './dropdown.options.js';

type DropdownStoryArgs = Args & FluentDropdown;
type DropdownStoryMeta = Meta<DropdownStoryArgs>;

const dropdownTemplate = html<DropdownStoryArgs>`
  <div>
    <fluent-dropdown appearance="${x => x.appearance}" style-sizes="${x => x.styleSizes}">
      <fluent-option>Option 1</fluent-option>
      <fluent-option>Option 2</fluent-option>
      <fluent-option>Option 3</fluent-option>
      <fluent-option>Option 4</fluent-option>
    </fluent-dropdown>
  </div>
`;

export default {
  title: 'Components/Dropdown',
  argTypes: {
    appearance: {
      options: Object.values(DropdownAppearance),
      control: {
        type: 'select',
      },
    },
    styleSizes: {
      options: Object.values(DropdownStyleSizes),
      control: {
        type: 'select',
      },
    },
  },
} as DropdownStoryMeta;

export const Dropdown = renderComponent(dropdownTemplate).bind({});
