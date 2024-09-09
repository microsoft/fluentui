import { html, repeat } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import { LabelPosition, ValidationFlags } from '../field/field.options.js';
import { Meta, renderComponent, Story, StoryArgs } from '../helpers.stories.js';
import { Checkbox as FluentCheckbox } from './checkbox.js';
import { CheckboxShape, CheckboxSize } from './checkbox.options.js';

const storyTemplate = html<StoryArgs<FluentCheckbox>>`
  <fluent-checkbox
    ?checked="${x => x.checked}"
    ?disabled="${x => x.disabled}"
    id="${x => x.id}"
    :indeterminate="${x => x.indeterminate}"
    name="${x => x.name}"
    ?required="${x => x.required}"
    shape="${x => x.shape}"
    size="${x => x.size}"
    slot="${x => x.slot}"
  ></fluent-checkbox>
`;

const messageTemplate = html`
  <fluent-text slot="message" size="200" flag="${x => x.flag}">
    <span>${x => x.message}</span>
  </fluent-text>
`;

const fieldStoryTemplate = html<StoryArgs<FluentCheckbox>>`
  <fluent-field label-position="${x => x.labelPosition}">
    <label slot="label" for="${x => x.id}">${x => x.label}</label>
    ${x => x.storyContent} ${repeat(x => x.messages, messageTemplate)}
  </fluent-field>
`;

export default {
  title: 'Components/Checkbox',
  args: {
    name: 'checkbox',
  },
  argTypes: {
    checked: {
      description: 'Sets the checked state of the checkbox',
      control: 'boolean',
    },
    disabled: {
      description: 'Sets the disabled state of the checkbox',
      control: 'boolean',
    },
    indeterminate: {
      description: 'Sets the indeterminate state of the checkbox',
      control: 'boolean',
    },
    required: {
      description: 'Sets the checkbox as required',
      control: 'boolean',
    },
    shape: {
      description: 'Sets the shape of the checkbox',
      control: 'select',
      options: Object.values(CheckboxShape),
    },
    size: {
      description: 'Sets the size of the checkbox',
      control: 'select',
      options: Object.values(CheckboxSize),
    },
  },
} as Meta<FluentCheckbox>;

export const Checkbox: Story<FluentCheckbox> = renderComponent(storyTemplate).bind({});
Checkbox.args = {
  id: uniqueId('checkbox-'),
};

export const Checked: Story<FluentCheckbox> = renderComponent(html<StoryArgs<FluentCheckbox>>`
  ${repeat(x => x.storyContent, html<StoryArgs<FluentCheckbox>>`${fieldStoryTemplate}<br />`)}
`).bind({});
Checked.args = {
  storyContent: [
    {
      storyContent: storyTemplate,
      slot: 'input',
      labelPosition: LabelPosition.after,
      id: uniqueId('checkbox-'),
      checked: true,
      label: 'Checked (default)',
    },
    {
      storyContent: storyTemplate,
      slot: 'input',
      labelPosition: LabelPosition.after,
      id: uniqueId('checkbox-'),
      checked: true,
      shape: CheckboxShape.circular,
      label: 'Checked (circular)',
    },
  ],
};

export const Indeterminate: Story<FluentCheckbox> = renderComponent(html<StoryArgs<FluentCheckbox>>`
  ${repeat(x => x.storyContent, html<StoryArgs<FluentCheckbox>>`${fieldStoryTemplate}<br />`)}
`).bind({});
Indeterminate.args = {
  storyContent: [
    {
      storyContent: storyTemplate,
      id: uniqueId('checkbox-'),
      indeterminate: true,
      label: 'Indeterminate (default)',
      labelPosition: LabelPosition.after,
      slot: 'input',
    },
    {
      storyContent: storyTemplate,
      id: uniqueId('checkbox-'),
      indeterminate: true,
      label: 'Indeterminate (circular)',
      labelPosition: LabelPosition.after,
      shape: CheckboxShape.circular,
      slot: 'input',
    },
  ],
};

export const Disabled: Story<FluentCheckbox> = renderComponent(html<StoryArgs<FluentCheckbox>>`
  ${repeat(x => x.storyContent, html<StoryArgs<FluentCheckbox>>`${fieldStoryTemplate}<br />`)}
`).bind({});
Disabled.args = {
  storyContent: [
    {
      storyContent: storyTemplate,
      id: uniqueId('checkbox-'),
      disabled: true,
      label: 'Disabled unchecked',
      labelPosition: LabelPosition.after,
      slot: 'input',
    },
    {
      storyContent: storyTemplate,
      id: uniqueId('checkbox-'),
      disabled: true,
      label: 'Disabled circular unchecked',
      labelPosition: LabelPosition.after,
      shape: CheckboxShape.circular,
      slot: 'input',
    },
    {
      storyContent: storyTemplate,
      checked: true,
      disabled: true,
      id: uniqueId('checkbox-'),
      label: 'Disabled checked',
      labelPosition: LabelPosition.after,
      slot: 'input',
    },
    {
      storyContent: storyTemplate,
      checked: true,
      disabled: true,
      id: uniqueId('checkbox-'),
      label: 'Disabled circular checked',
      labelPosition: LabelPosition.after,
      shape: CheckboxShape.circular,
      slot: 'input',
    },
    {
      storyContent: storyTemplate,
      disabled: true,
      id: uniqueId('checkbox-'),
      indeterminate: true,
      label: 'Disabled indeterminate',
      labelPosition: LabelPosition.after,
      slot: 'input',
    },
    {
      storyContent: storyTemplate,
      disabled: true,
      id: uniqueId('checkbox-'),
      indeterminate: true,
      label: 'Disabled circular indeterminate',
      labelPosition: LabelPosition.after,
      shape: CheckboxShape.circular,
      slot: 'input',
    },
  ],
};

export const Required: Story<FluentCheckbox> = renderComponent(html<StoryArgs<FluentCheckbox>>`
  <form style="display: inline-flex; gap: 1em; align-items: baseline">
    <div>
      <fluent-checkbox id="required-fluent-checkbox" required></fluent-checkbox>
      <label for="required-fluent-checkbox">Required</label>
    </div>
    ${fieldStoryTemplate}
    <fluent-button type="submit">Submit</fluent-button>
  </form>
`).bind({});
Required.args = {
  storyContent: storyTemplate,
  slot: 'input',
  labelPosition: LabelPosition.after,
  id: uniqueId('checkbox-'),
  required: true,
  label: 'Required',
  messages: [{ message: 'This field is required', flag: ValidationFlags.valueMissing }],
};

export const Large: Story<FluentCheckbox> = renderComponent(html<StoryArgs<FluentCheckbox>>`
  ${repeat(x => x.storyContent, html<StoryArgs<FluentCheckbox>>`${fieldStoryTemplate}<br />`)}
`).bind({});
Large.args = {
  storyContent: [
    {
      storyContent: storyTemplate,
      id: uniqueId('checkbox-'),
      label: 'Large checkbox',
      labelPosition: LabelPosition.after,
      size: CheckboxSize.large,
      slot: 'input',
    },
    {
      storyContent: storyTemplate,
      id: uniqueId('checkbox-'),
      label: 'Large circular',
      labelPosition: LabelPosition.after,
      shape: CheckboxShape.circular,
      size: CheckboxSize.large,
      slot: 'input',
    },
    {
      storyContent: storyTemplate,
      id: uniqueId('checkbox-'),
      indeterminate: true,
      label: 'Large indeterminate',
      labelPosition: LabelPosition.after,
      size: CheckboxSize.large,
      slot: 'input',
    },
    {
      storyContent: storyTemplate,
      id: uniqueId('checkbox-'),
      indeterminate: true,
      label: 'Large circular indeterminate',
      labelPosition: LabelPosition.after,
      shape: CheckboxShape.circular,
      size: CheckboxSize.large,
      slot: 'input',
    },
  ],
};

export const LabelBefore: Story<FluentCheckbox> = renderComponent(fieldStoryTemplate).bind({});
LabelBefore.args = {
  storyContent: storyTemplate,
  id: uniqueId('checkbox-'),
  labelPosition: LabelPosition.before,
  label: 'Label before',
  slot: 'input',
};

export const LabelWrapping: Story<FluentCheckbox> = renderComponent(fieldStoryTemplate).bind({});
LabelWrapping.args = {
  storyContent: storyTemplate,
  id: uniqueId('checkbox-'),
  labelPosition: LabelPosition.after,
  label: 'Here is an example of a checkbox with a long label and it starts to wrap to a second line',
  slot: 'input',
};
LabelWrapping.decorators = [
  story => {
    const storyElement = story() as HTMLElement;
    storyElement.style.width = '400px';
    return storyElement;
  },
];

export const Circular: Story<FluentCheckbox> = renderComponent(html<StoryArgs<FluentCheckbox>>`
  ${repeat(x => x.storyContent, html<StoryArgs<FluentCheckbox>>`${fieldStoryTemplate}<br />`)}
`).bind({});
Circular.args = {
  storyContent: [
    {
      storyContent: storyTemplate,
      id: uniqueId('checkbox-'),
      label: 'Circular checkbox',
      labelPosition: LabelPosition.after,
      shape: CheckboxShape.circular,
      slot: 'input',
    },
    {
      storyContent: storyTemplate,
      id: uniqueId('checkbox-'),
      label: 'Circular checked',
      labelPosition: LabelPosition.after,
      shape: CheckboxShape.circular,
      checked: true,
      slot: 'input',
    },
    {
      storyContent: storyTemplate,
      id: uniqueId('checkbox-'),
      indeterminate: true,
      label: 'Circular indeterminate',
      labelPosition: LabelPosition.after,
      shape: CheckboxShape.circular,
      slot: 'input',
    },
  ],
};
