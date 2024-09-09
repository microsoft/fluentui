import { html, repeat } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import { LabelPosition, ValidationFlags } from '../field/field.options.js';
import { Meta, renderComponent, Story, StoryArgs } from '../helpers.stories.js';
import type { Switch as FluentSwitch } from './switch.js';

const storyTemplate = html<StoryArgs<FluentSwitch>>`
  <fluent-switch
    ?checked="${x => x.checked}"
    ?disabled="${x => x.disabled}"
    id="${x => x.id}"
    name="${x => x.name}"
    ?required="${x => x.required}"
    slot="${x => x.slot}"
  ></fluent-switch>
`;

const messageTemplate = html`
  <fluent-text slot="message" size="200" flag="${x => x.flag}">
    <span>${x => x.message}</span>
  </fluent-text>
`;

const fieldStoryTemplate = html<StoryArgs<FluentSwitch>>`
  <fluent-field label-position="${x => x.labelPosition}">
    <label slot="label" for="${x => x.id}">${x => x.label}</label>
    ${x => x.storyContent} ${repeat(x => x.messages, messageTemplate)}
  </fluent-field>
`;

export default {
  title: 'Components/Switch',
  args: {
    name: 'switch',
  },
  argTypes: {
    checked: {
      description: 'Sets the checked state of the switch',
      control: 'boolean',
    },
    disabled: {
      description: 'Sets the disabled state of the switch',
      control: 'boolean',
    },
    required: {
      description: 'Sets the switch as required',
      control: 'boolean',
    },
  },
} as Meta<FluentSwitch>;

export const Switch: Story<FluentSwitch> = renderComponent(storyTemplate).bind({});
Switch.args = {
  id: uniqueId('switch-'),
};

export const Checked: Story<FluentSwitch> = renderComponent(storyTemplate).bind({});
Checked.args = {
  storyContent: storyTemplate,
  slot: 'input',
  labelPosition: LabelPosition.after,
  id: uniqueId('switch-'),
  checked: true,
  label: 'Checked (default)',
};

export const Disabled: Story<FluentSwitch> = renderComponent(html<StoryArgs<FluentSwitch>>`
  ${repeat(x => x.storyContent, html<StoryArgs<FluentSwitch>>`${fieldStoryTemplate}<br />`)}
`).bind({});
Disabled.args = {
  storyContent: [
    {
      storyContent: storyTemplate,
      id: uniqueId('switch-'),
      disabled: true,
      label: 'Disabled unchecked',
      labelPosition: LabelPosition.after,
      slot: 'input',
    },
    {
      storyContent: storyTemplate,
      checked: true,
      disabled: true,
      id: uniqueId('switch-'),
      label: 'Disabled checked',
      labelPosition: LabelPosition.after,
      slot: 'input',
    },
  ],
};

export const Required: Story<FluentSwitch> = renderComponent(html<StoryArgs<FluentSwitch>>`
  <form style="display: inline-flex; gap: 1em; align-items: baseline">
    <div>
      <fluent-switch id="required-fluent-switch" required></fluent-switch>
      <label for="required-fluent-switch">Required</label>
    </div>
    ${fieldStoryTemplate}
    <fluent-button type="submit">Submit</fluent-button>
  </form>
`).bind({});
Required.args = {
  storyContent: storyTemplate,
  slot: 'input',
  labelPosition: LabelPosition.after,
  id: uniqueId('switch-'),
  required: true,
  label: 'Required',
  messages: [{ message: 'This field is required', flag: ValidationFlags.valueMissing }],
};

export const LabelBefore: Story<FluentSwitch> = renderComponent(fieldStoryTemplate).bind({});
LabelBefore.args = {
  storyContent: storyTemplate,
  id: uniqueId('switch-'),
  labelPosition: LabelPosition.before,
  label: 'Label before',
  slot: 'input',
};

export const LabelWrapping: Story<FluentSwitch> = renderComponent(fieldStoryTemplate).bind({});
LabelWrapping.args = {
  storyContent: storyTemplate,
  id: uniqueId('switch-'),
  labelPosition: LabelPosition.after,
  label: 'Here is an example of a switch with a long label and it starts to wrap to a second line',
  slot: 'input',
};
LabelWrapping.decorators = [
  story => {
    const storyElement = story() as HTMLElement;
    storyElement.style.width = '400px';
    return storyElement;
  },
];
