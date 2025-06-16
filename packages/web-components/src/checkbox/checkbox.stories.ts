import { html, ref, repeat } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import { LabelPosition } from '../field/field.options.js';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Checkbox as FluentCheckbox } from './checkbox.js';
import { CheckboxShape, CheckboxSize } from './checkbox.options.js';

type Story = StoryObj<FluentCheckbox>;

const storyTemplate = html<StoryArgs<FluentCheckbox>>`
  <fluent-checkbox
    ?checked="${story => story.checked}"
    ?disabled="${story => story.disabled}"
    id="${story => story.id}"
    :indeterminate="${story => story.indeterminate}"
    name="${story => story.name}"
    ?required="${story => story.required}"
    shape="${story => story.shape}"
    size="${story => story.size}"
    slot="${story => story.slot}"
    ${ref('checkbox')}
  >
    ${story => story.checkedIndicatorContent?.()} ${story => story.indeterminateIndicatorContent?.()}
  </fluent-checkbox>
`;

const fieldStoryTemplate = html<StoryArgs<FluentCheckbox>>`
  <fluent-field label-position="${story => story.labelPosition}">
    <label slot="label" for="${story => story.id}">${story => story.label}</label>
    ${story => story.storyContent}
  </fluent-field>
`;

export default {
  title: 'Components/Checkbox',
  render: renderComponent(storyTemplate),
  args: {
    disabled: false,
  },
  argTypes: {
    autofocus: {
      control: 'boolean',
      description: 'Sets the checkbox to autofocus',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    checked: {
      control: 'boolean',
      description: 'Sets the checked state of the checkbox',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Sets the disabled state of the checkbox',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    form: {
      control: 'text',
      description: 'The form element that the checkbox belongs to',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Sets the indeterminate state of the checkbox',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    name: {
      control: 'text',
      description: 'The name of the checkbox',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    required: {
      control: 'boolean',
      description: 'Sets the checkbox as required',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    value: {
      control: 'text',
      description: 'The value of the checkbox',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    shape: {
      description: 'Sets the shape of the checkbox',
      control: 'select',
      options: Object.values(CheckboxShape),
      mapping: { '': null, ...CheckboxShape },
      table: {
        category: 'attributes',
        type: { summary: Object.values(CheckboxShape).join('|') },
      },
    },
    size: {
      description: 'Sets the size of the checkbox',
      control: 'select',
      options: Object.values(CheckboxSize),
      mapping: { '': null, ...CheckboxSize },
      table: {
        category: 'attributes',
        type: { summary: Object.values(CheckboxSize).join('|') },
      },
    },
    checkedIndicatorContent: {
      control: false,
      description: 'Slot for checked indicator',
      name: 'start',
      table: { category: 'slots', type: {} },
    },
    indeterminateIndicatorContent: {
      control: false,
      description: 'Slot for indeterminate indicator',
      name: 'end',
      table: { category: 'slots', type: {} },
    },
    label: { table: { disable: true } },
  },
} as Meta<FluentCheckbox>;

export const Default: Story = {};

export const Checkbox: Story = {
  render: renderComponent(storyTemplate),
  args: {
    id: uniqueId('checkbox-'),
  },
};

export const Checked: Story = {
  render: renderComponent(html<StoryArgs<FluentCheckbox>>`
    ${repeat(story => story.storyContent, html<StoryArgs<FluentCheckbox>>`${fieldStoryTemplate}<br />`)}
  `),
  args: {
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
  },
};

export const Indeterminate: Story = {
  render: renderComponent(html<StoryArgs<FluentCheckbox>>`
    ${repeat(story => story.storyContent, html<StoryArgs<FluentCheckbox>>`${fieldStoryTemplate}<br />`)}
  `),
  args: {
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
  },
};

export const Disabled: Story = {
  render: renderComponent(html<StoryArgs<FluentCheckbox>>`
    ${repeat(story => story.storyContent, html<StoryArgs<FluentCheckbox>>`${fieldStoryTemplate}<br />`)}
  `),
  args: {
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
  },
};

export const Required: Story = {
  render: renderComponent(html<StoryArgs<FluentCheckbox>>`
    <form
      @reset="${story => story.successMessage.toggleAttribute('hidden', true)}"
      @submit="${story => story.checkbox.checkValidity() && story.successMessage.toggleAttribute('hidden', false)}"
      style="display: inline-flex; flex-direction: column; gap: 1rem; max-width: 400px;"
    >
      ${fieldStoryTemplate}
      <div>
        <fluent-button type="submit">Submit</fluent-button>
        <fluent-button type="reset">Reset</fluent-button>
      </div>
      <fluent-text ${ref('successMessage')} hidden>Form submitted successfully!</fluent-text>
    </form>
  `),
  args: {
    storyContent: storyTemplate,
    slot: 'input',
    labelPosition: LabelPosition.after,
    id: uniqueId('checkbox-'),
    required: true,
    label: 'Check this to submit the form',
  },
};

export const Large: Story = {
  render: renderComponent(html<StoryArgs<FluentCheckbox>>`
    ${repeat(story => story.storyContent, html<StoryArgs<FluentCheckbox>>`${fieldStoryTemplate}<br />`)}
  `),
  args: {
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
  },
};

export const LabelBefore: Story = {
  render: renderComponent(fieldStoryTemplate),
  args: {
    storyContent: storyTemplate,
    id: uniqueId('checkbox-'),
    labelPosition: LabelPosition.before,
    label: 'Label before',
    slot: 'input',
  },
};

export const LabelWrapping: Story = {
  render: renderComponent(fieldStoryTemplate),
  args: {
    storyContent: storyTemplate,
    id: uniqueId('checkbox-'),
    labelPosition: LabelPosition.after,
    label: 'Here is an example of a checkbox with a long label and it starts to wrap to a second line',
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

export const Circular: Story = {
  render: renderComponent(html<StoryArgs<FluentCheckbox>>`
    ${repeat(story => story.storyContent, html<StoryArgs<FluentCheckbox>>`${fieldStoryTemplate}<br />`)}
  `),
  args: {
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
  },
};
