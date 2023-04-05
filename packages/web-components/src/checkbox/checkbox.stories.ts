import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Checkbox as FluentCheckbox } from './checkbox.js';
import './define.js';
import { CheckboxLabelPosition, CheckboxShape, CheckboxSize } from './checkbox.options.js';

type CheckboxStoryArgs = Args & FluentCheckbox;
type CheckboxStoryMeta = Meta<CheckboxStoryArgs>;

const storyTemplate = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}">
    <fluent-checkbox
      name="checkbox-group"
      :indeterminate="${x => x.indeterminate}"
      ?checked="${x => x.checked}"
      ?disabled="${x => x.disabled}"
      shape="${x => x.shape}"
      size="${x => x.size}"
      label-position="${x => x.labelPosition}"
    >
      Label
    </fluent-checkbox>
  </form>
`;

export default {
  title: 'Components/Checkbox',
  args: {
    disabled: false,
    checked: false,
    indeterminate: false,
    shape: CheckboxShape.square,
    size: CheckboxSize.medium,
    labelPosition: CheckboxLabelPosition.after,
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
    shape: {
      description: 'Sets the shape of the checkbox',
      table: {
        defaultValue: { summary: CheckboxShape.square },
      },
      control: {
        type: 'select',
        options: Object.values(CheckboxShape),
      },
      defaultValue: CheckboxShape.square,
    },
    size: {
      description: 'Sets the size of the checkbox',
      table: {
        defaultValue: { summary: CheckboxSize.medium },
      },
      control: {
        type: 'select',
        options: Object.values(CheckboxSize),
      },
      defaultValue: CheckboxSize.medium,
    },
    labelPosition: {
      description: 'Sets the position of the label relative to the input',
      table: {
        defaultValue: { summary: CheckboxLabelPosition.after },
      },
      control: {
        type: 'select',
        options: Object.values(CheckboxLabelPosition),
      },
      defaultValue: CheckboxLabelPosition.after,
    },
  },
} as CheckboxStoryMeta;

export const Checkbox = renderComponent(storyTemplate).bind({});

// checked
const CheckboxChecked = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}" style="display: flex; flex-direction: column; gap: 4px;">
    <fluent-checkbox checked>Checked</fluent-checkbox>
    <fluent-checkbox checked shape="${CheckboxShape.circular}">Checked circular</fluent-checkbox>
  </form>
`;
export const Checked = renderComponent(CheckboxChecked).bind({});

// mixed
const mixedTemplate = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}" style="display: flex; flex-direction: column; gap: 4px;">
    <fluent-checkbox name="checkbox-group" :indeterminate="${x => x.indeterminate}"> Indeterminate </fluent-checkbox>
    <fluent-checkbox name="checkbox-group" :indeterminate="${x => x.indeterminate}" shape="${CheckboxShape.circular}">
      Indeterminate circular
    </fluent-checkbox>
  </form>
`;

export const Mixed: Args = renderComponent(mixedTemplate).bind({});
Mixed.args = { indeterminate: true };

// Disabled
const CheckboxDisabled = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}" style="display: flex; flex-direction: column;">
    <fluent-checkbox name="checkbox-group" disabled> Disabled </fluent-checkbox>

    <fluent-checkbox name="checkbox-group" disabled shape="${CheckboxShape.circular}">
      Disabled circular
    </fluent-checkbox>

    <fluent-checkbox checked disabled> disabled checked </fluent-checkbox>

    <fluent-checkbox checked disabled shape="${CheckboxShape.circular}"> disabled checked circular </fluent-checkbox>

    <fluent-checkbox disabled :indeterminate="${x => x.indeterminate}"> indeterminate disabled </fluent-checkbox>

    <fluent-checkbox disabled :indeterminate="${x => x.indeterminate}" shape="${CheckboxShape.circular}">
      circular indeterminate disabled
    </fluent-checkbox>
  </form>
`;

export const Disabled: Args = renderComponent(CheckboxDisabled).bind({});
Disabled.args = { indeterminate: true };

// large
const CheckboxSizes = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}" style="display: flex; flex-direction: column;">
    <fluent-checkbox size="${CheckboxSize.large}">Large</fluent-checkbox>
    <fluent-checkbox size="${CheckboxSize.large}" shape="${CheckboxShape.circular}">Large circular</fluent-checkbox>
  </form>
`;
export const Size = renderComponent(CheckboxSizes).bind({});

// label before
const labelBeforeTemplate = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}">
    <fluent-checkbox label-position="${CheckboxLabelPosition.before}">Label before</fluent-checkbox>
  </form>
`;
export const LabelBefore = renderComponent(labelBeforeTemplate).bind({});

// label wrapping
const labelWrappingTemplate = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}">
    <fluent-checkbox style="max-width: 400px"
      >Here is an example of a checkbox with a long label and it starts to wrap to a second line</fluent-checkbox
    >
  </form>
`;
export const LabelWrapping = renderComponent(labelWrappingTemplate).bind({});

// circular
const CheckboxCircular = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}">
    <fluent-checkbox shape="${CheckboxShape.circular}">Circular</fluent-checkbox>
  </form>
`;
export const Circular = renderComponent(CheckboxCircular).bind({});
