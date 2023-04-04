import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Checkbox as FluentCheckbox } from './checkbox.js';
import './define.js';

type CheckboxStoryArgs = Args & FluentCheckbox;
type CheckboxStoryMeta = Meta<CheckboxStoryArgs>;

const storyTemplate = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}">
    <fluent-checkbox
      name="checkbox-group"
      :indeterminate="${x => x.indeterminate}"
      ?checked="${x => x.checked}"
      ?disabled="${x => x.disabled}"
      >Checkbox</fluent-checkbox
    >
  </form>
`;

export default {
  title: 'Components/Checkbox',
  args: {
    disabled: false,
    checked: false,
    indeterminate: false,
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
    checked: {
      description: 'Sets the checked state of the checkbox',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    indeterminate: {
      description: 'Sets the indeterminate state of the checkbox',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
  },
} as CheckboxStoryMeta;

export const Checkbox = renderComponent(storyTemplate).bind({});

// Disabled layout
const CheckboxDisabled = html<CheckboxStoryArgs>`
  <fluent-checkbox disabled>disabled</fluent-checkbox>
  <fluent-checkbox disabled checked>disabled</fluent-checkbox>
`;
export const Disabled = renderComponent(CheckboxDisabled).bind({});

// Disabled layout
const CheckboxIndeterminate = html<CheckboxStoryArgs>`
  <div style="align-items: start; display: flex; flex-direction: column">
    <fluent-checkbox checked="" indeterminate> Disabled (unchecked) </fluent-checkbox>
  </div>
`;
export const Indeterminate = renderComponent(CheckboxIndeterminate).bind({});
