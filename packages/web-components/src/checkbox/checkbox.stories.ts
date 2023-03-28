import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Checkbox as FluentCheckbox } from './checkbox.js';
import './define.js';

type CheckboxStoryArgs = Args & FluentCheckbox;
type CheckboxStoryMeta = Meta<CheckboxStoryArgs>;

const imageTemplate = html<CheckboxStoryArgs>`
  <div>
    <fluent-checkbox>Checkbox</fluent-checkbox>
  </div>
`;

export default {
  title: 'Components/Checkbox',
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      description: 'Sets the disabled state of the checkbox',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
  },
} as CheckboxStoryMeta;

export const Checkbox = renderComponent(imageTemplate).bind({});

// Block layout
const CheckboxDisabled = html<CheckboxStoryArgs>` <fluent-checkbox>disabled</fluent-checkbox> `;
export const BlockLayout = renderComponent(CheckboxDisabled).bind({});
