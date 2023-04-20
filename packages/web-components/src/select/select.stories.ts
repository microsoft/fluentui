import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { SelectSize as SelectSetSize } from './select.options.js';
import type { Select as FluentSelect } from './select.js';
import './define.js';

type SelectStoryArgs = Args & FluentSelect;
type SelectStoryMeta = Meta<SelectStoryArgs>;

const storyTemplate = html<SelectStoryArgs>`
  <fluent-select>
    <label slot="label">Label</label>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <optgroup label="Group 1">
      <option value="option3">Option 3</option>
      <option value="option4">Option 4</option>
    </optgroup>
  </fluent-select>
`;

export default {
  title: 'Components/Select',
  args: {
    disabled: false,
    label: 'Select an option',
    size: SelectSetSize.medium,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    size: {
      control: {
        type: 'inline-radio',
        options: Object.values(SelectSetSize),
      },
    },
  },
} as SelectStoryMeta;

export const Select = renderComponent(storyTemplate).bind({});

export const SelectSmallSize = renderComponent(html<SelectStoryArgs>`
  <fluent-select size="small">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <optgroup label="Group 1">
      <option value="option3">Option 3</option>
      <option value="option4">Option 4</option>
    </optgroup>
  </fluent-select>
`);

export const SelectLargeSize = renderComponent(html<SelectStoryArgs>`
  <fluent-select size="large">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <optgroup label="Group 1">
      <option value="option3">Option 3</option>
      <option value="option4">Option 4</option>
    </optgroup>
  </fluent-select>
`);

export const DisabledSelect = renderComponent(html<SelectStoryArgs>`
  <fluent-select disabled>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <optgroup label="Group 1">
      <option value="option3">Option 3</option>
      <option value="option4">Option 4</option>
    </optgroup>
  </fluent-select>
`);
