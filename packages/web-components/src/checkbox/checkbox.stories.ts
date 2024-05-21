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
      required="${x => x.required}"
    >
      <fluent-label disabled="${x => x.disabled}" required="${x => x.required}">Checkbox</fluent-label>
    </fluent-checkbox>
  </form>
`;

export default {
  title: 'Components/Checkbox',
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    labelPosition: CheckboxLabelPosition.after,
    required: false,
    shape: CheckboxShape.square,
    size: CheckboxSize.medium,
  },
  argTypes: {
    checked: {
      description: 'Sets the checked state of the checkbox',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    disabled: {
      description: 'Sets the disabled state of the checkbox',
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
    required: {
      description: 'Sets the checkbox as required',
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

// disabled
const CheckboxDisabled = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}" style="display: flex; flex-direction: column;">
    <fluent-checkbox name="checkbox-group" disabled> Disabled unchecked </fluent-checkbox>

    <fluent-checkbox name="checkbox-group" disabled shape="${CheckboxShape.circular}">
      Disabled circular unchecked
    </fluent-checkbox>

    <fluent-checkbox checked disabled> Disabled checked </fluent-checkbox>

    <fluent-checkbox checked disabled shape="${CheckboxShape.circular}"> Disabled circular checked </fluent-checkbox>

    <fluent-checkbox disabled :indeterminate="${x => x.indeterminate}"> Disabled indeterminate </fluent-checkbox>

    <fluent-checkbox disabled :indeterminate="${x => x.indeterminate}" shape="${CheckboxShape.circular}">
      Disabled circular indeterminate
    </fluent-checkbox>
  </form>
`;

export const Disabled: Args = renderComponent(CheckboxDisabled).bind({});
Disabled.args = { indeterminate: true };

// disabled
const CheckboxRequired = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}">
    <fluent-checkbox required name="checkbox-group"><fluent-label required>Required</fluent-label></fluent-checkbox>
  </form>
`;

export const Required: Args = renderComponent(CheckboxRequired).bind({});

// size
const CheckboxSizes = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}" style="display: flex; gap: 50px">
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <fluent-checkbox checked>Medium</fluent-checkbox>
      <fluent-checkbox checked shape="${CheckboxShape.circular}">Medium circular</fluent-checkbox>

      <fluent-checkbox :indeterminate="${x => x.indeterminate}">Medium indeterminate</fluent-checkbox>
      <fluent-checkbox :indeterminate="${x => x.indeterminate}" shape="${CheckboxShape.circular}"
        >Medium circular indeterminate</fluent-checkbox
      >
    </div>
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <fluent-checkbox checked size="${CheckboxSize.large}">Large checkbox</fluent-checkbox>
      <fluent-checkbox checked size="${CheckboxSize.large}" shape="${CheckboxShape.circular}"
        >Large circular</fluent-checkbox
      >

      <fluent-checkbox size="${CheckboxSize.large}" :indeterminate="${x => x.indeterminate}"
        >Large indeterminate</fluent-checkbox
      >
      <fluent-checkbox
        size="${CheckboxSize.large}"
        :indeterminate="${x => x.indeterminate}"
        shape="${CheckboxShape.circular}"
        >Large circular indeterminate</fluent-checkbox
      >
    </div>
  </form>
`;
export const Size: Args = renderComponent(CheckboxSizes).bind({});
Size.args = { indeterminate: true };

// label before
const labelBeforeTemplate = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}">
    <fluent-checkbox checked label-position="${CheckboxLabelPosition.before}">Label before</fluent-checkbox>
  </form>
`;
export const LabelBefore = renderComponent(labelBeforeTemplate).bind({});

// label wrapping
const labelWrappingTemplate = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}">
    <fluent-checkbox checked style="max-width: 400px; display: inline-flex; align-items: flex-start;">
      Here is an example of a checkbox with a long label and it starts to wrap to a second line
    </fluent-checkbox>
  </form>
`;
export const LabelWrapping: Args = renderComponent(labelWrappingTemplate).bind({});

// circular
const CheckboxCircular = html<CheckboxStoryArgs>`
  <form class="checkbox-group" @submit="${() => false}">
    <fluent-checkbox checked shape="${CheckboxShape.circular}">Circular</fluent-checkbox>
    <fluent-checkbox :indeterminate="${x => x.indeterminate}" shape="${CheckboxShape.circular}"
      >Circular indeterminate</fluent-checkbox
    >
  </form>
`;
export const Circular: Args = renderComponent(CheckboxCircular).bind({});
Circular.args = { indeterminate: true };
