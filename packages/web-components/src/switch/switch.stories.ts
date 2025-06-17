import { html, ref, repeat } from '@microsoft/fast-element';
import { LabelPosition } from '../field/field.options.js';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Switch as FluentSwitch } from './switch.js';

type Story = StoryObj<FluentSwitch>;

const storyTemplate = html<StoryArgs<FluentSwitch>>`
  <fluent-switch
    ?checked="${story => story.checked}"
    ?disabled="${story => story.disabled}"
    id="${story => story.id}"
    name="${story => story.name}"
    ?required="${story => story.required}"
    slot="${story => story.slot}"
    ${ref('switch')}
  ></fluent-switch>
`;

const fieldStoryTemplate = html<StoryArgs<FluentSwitch>>`
  <fluent-field label-position="${story => story.labelPosition}">
    <label slot="label">${story => story.label}</label>
    ${storyTemplate}
  </fluent-field>
`;

export default {
  title: 'Components/Switch',
  render: renderComponent(storyTemplate),
  args: {
    name: 'switch',
    checked: false,
    disabled: false,
    required: false,
  },
  argTypes: {
    checked: {
      description: 'Sets the checked state of the switch',
      control: 'boolean',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    disabled: {
      description: 'Sets the disabled state of the switch',
      control: 'boolean',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    required: {
      description: 'Sets the switch as required',
      control: 'boolean',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
  },
} as Meta<FluentSwitch>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    slot: 'input',
    checked: true,
  },
};

export const Disabled: Story = {
  render: renderComponent(html<StoryArgs<FluentSwitch>>`
    ${repeat(
      [
        {
          disabled: true,
          label: 'Disabled unchecked',
          labelPosition: LabelPosition.after,
          slot: 'input',
        },
        {
          checked: true,
          disabled: true,
          label: 'Disabled checked',
          labelPosition: LabelPosition.after,
          slot: 'input',
        },
      ],
      html<StoryArgs<FluentSwitch>>`${fieldStoryTemplate}<br />`,
    )}
  `),
};

export const Required: Story = {
  render: renderComponent(html<StoryArgs<FluentSwitch>>`
    <form
      @reset="${story => story.successMessage.toggleAttribute('hidden', true)}"
      @submit="${story => story.switch.checkValidity() && story.successMessage.toggleAttribute('hidden', false)}"
      style="display: inline-flex; flex-direction: column; gap: 1rem; max-width: 400px;"
    >
      ${fieldStoryTemplate}
      <div>
        <fluent-button type="submit" appearance="primary">Submit</fluent-button>
        <fluent-button type="reset" ${ref('resetButton')}>Reset</fluent-button>
      </div>
      <span id="success-message" hidden ${ref('successMessage')}>Form submitted successfully!</span>
    </form>
  `),
  args: {
    slot: 'input',
    labelPosition: LabelPosition.after,
    required: true,
    label: 'Required',
  },
};

export const LabelBefore: Story = {
  render: renderComponent(fieldStoryTemplate),
  args: {
    labelPosition: LabelPosition.before,
    label: 'Label before',
    slot: 'input',
  },
};

export const LabelWrapping: Story = {
  render: renderComponent(fieldStoryTemplate),
  args: {
    labelPosition: LabelPosition.after,
    label: 'Here is an example of a switch with a long label and it starts to wrap to a second line',
    slot: 'input',
  },
  decorators: [
    story => {
      const storyElement = story() as HTMLElement;
      storyElement.style.width = '400px';
      return storyElement;
    },
  ],
};
