import { html, repeat } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { colorStatusSuccessBackground3 } from '../theme/design-tokens.js';
import type { Field as FluentField } from './field.js';
import { LabelPosition } from './field.options.js';

type Story = StoryObj<FluentField>;

const SuccessIcon = html.partial(/* html */ `
  <svg fill="${colorStatusSuccessBackground3}" aria-hidden="true" width="1em" height="1em" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 6a5 5 0 1 1 10 0A5 5 0 0 1 1 6Zm7.35-.9a.5.5 0 1 0-.7-.7L5.5 6.54 4.35 5.4a.5.5 0 1 0-.7.7l1.5 1.5c.2.2.5.2.7 0l2.5-2.5Z" fill="${colorStatusSuccessBackground3}" />
  </svg>
`);

export const storyTemplate = html<StoryArgs<FluentField>>`
  <fluent-field label-position="${story => story.labelPosition}">
    ${story => story.labelSlottedContent?.()} ${story => story.inputSlottedContent?.()}
    ${story => story.messageSlottedContent?.()}
  </fluent-field>
`;

export default {
  title: 'Components/Field',
  render: renderComponent(storyTemplate),
  excludeStories: ['storyTemplate'],
  args: {
    label: {
      text: 'Example field',
    },
    message: {
      message: 'This is a success message',
      icon: () => html`${SuccessIcon}`,
    },
    labelSlottedContent: () => html`<label slot="label">${story => story.label.text}</label>`,
    inputSlottedContent: () => html`<fluent-text-input slot="input"></fluent-text-input>`,
    labelPosition: LabelPosition.above,
  },
  argTypes: {
    label: { table: { disable: true } },
    message: { table: { disable: true } },
    labelPosition: {
      control: 'select',
      description: 'Sets the position of the label relative to the input',
      name: 'size',
      mapping: { '': null, ...LabelPosition },
      options: ['', ...Object.values(LabelPosition)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(LabelPosition).join('|') },
      },
    },
    labelSlottedContent: {
      control: false,
      description: 'The associated label for the control. This should be a label element.',
      name: 'label',
      table: { category: 'slots', type: {} },
    },
    inputSlottedContent: {
      control: false,
      description: 'The input control for the field.',
      name: 'input',
      table: { category: 'slots', type: {} },
    },
    messageSlottedContent: {
      control: false,
      description: 'Hint or validation messages for the field.',
      name: 'message',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentField>;

export const Default: Story = {};

export const LabelPositions: Story = {
  render: renderComponent(html<StoryArgs<FluentField>>`
    ${repeat(
      story => story.storyItems,
      html`
        <div>
          <fluent-field label-position="${story => story.labelPosition}">
            <label slot="label">${story => story.label}</label>
            <fluent-text-input slot="input"></fluent-text-input>
          </fluent-field>
        </div>
        <br />
      `,
    )}
  `),
  args: {
    storyItems: Object.values(LabelPosition).map(labelPosition => ({
      labelPosition,
      label: `Label position: ${labelPosition}`,
    })),
  },
};

export const Required: Story = {
  args: {
    label: {
      text: 'Required field',
    },
    inputSlottedContent: () => html`<fluent-text-input required slot="input"></fluent-text-input>`,
    messageSlottedContent: undefined,
  },
};

export const DisabledControl: Story = {
  args: {
    label: {
      text: 'Disabled field',
    },
    inputSlottedContent: () => html`<fluent-text-input disabled slot="input"></fluent-text-input>`,
    messageSlottedContent: undefined,
  },
};

export const Size: Story = {
  render: renderComponent(html`
    <fluent-field size="small">
      <label slot="label" for="field-small-size">Small field</label>
      <fluent-text-input control-size="small" slot="input" id="field-small-size"></fluent-text-input>
    </fluent-field>
    <fluent-field size="medium">
      <label slot="label" for="field-medium-size">Medium field</label>
      <fluent-text-input control-size="medium" slot="input" id="field-medium-size"></fluent-text-input>
    </fluent-field>
    <fluent-field size="large">
      <label slot="label" for="field-large-size">Large field</label>
      <fluent-text-input control-size="large" slot="input" id="field-large-size"></fluent-text-input>
    </fluent-field>
  `),
};

export const Hint: Story = {
  args: {
    label: {
      text: 'Example with hint',
    },
    message: {
      message: 'Sample hint text.',
    },
    inputSlottedContent: () =>
      html`<fluent-text-input slot="input" aria-describedby="hint-message"></fluent-text-input>`,
    messageSlottedContent: () =>
      html`<fluent-text slot="message" size="200" id="hint-message">${story => story.message?.message}</fluent-text>`,
  },
};

export const ComponentExamples: Story = {
  render: renderComponent(html`
    <div style="display: flex; flex-direction: column; row-gap: 16px;">
      <fluent-field label-position="above">
        <label slot="label" for="field-text">Text Input</label>
        <fluent-text-input slot="input" id="field-text"></fluent-text-input>
      </fluent-field>
      <fluent-field label-position="above" style="max-width: 400px">
        <label slot="label" for="field-slider">Slider</label>
        <fluent-slider size="medium" slot="input" id="field-slider"></fluent-slider>
      </fluent-field>
      <fluent-field label-position="after">
        <label slot="label" for="field-checkbox">Checkbox</label>
        <fluent-checkbox slot="input" id="field-checkbox"></fluent-checkbox>
      </fluent-field>
      <fluent-field label-position="above">
        <label slot="label" for="field-radio">Radio Group</label>
        <fluent-radio-group slot="input" name="field-radio" orientation="vertical">
          <fluent-field label-position="after">
            <label slot="label">Apple</label>
            <fluent-radio slot="input" value="apple"></fluent-radio>
          </fluent-field>
          <fluent-field label-position="after">
            <label slot="label">Pear</label>
            <fluent-radio slot="input" value="pear"></fluent-radio>
          </fluent-field>
          <fluent-field label-position="after">
            <label slot="label">Banana</label>
            <fluent-radio slot="input" value="banana"></fluent-radio>
          </fluent-field>
          <fluent-field label-position="after">
            <label slot="label">Orange</label>
            <fluent-radio slot="input" value="orange"></fluent-radio>
          </fluent-field>
        </fluent-radio-group>
      </fluent-field>
      <fluent-field>
        <label slot="label" for="field-textarea">Text Area</label>
        <fluent-textarea slot="input" id="field-textarea" placeholder="Placeholder text" resize="both">
        </fluent-textarea>
      </fluent-field>
    </div>
  `),
};

export const ThirdPartyControls: Story = {
  render: renderComponent(html`
    <form action="#" style="display:flex;flex-flow:column;align-items:start;gap:10px">
      <fluent-field label-position="above" style="max-width: 400px">
        <label slot="label" for="native-text-input">Text Input</label>
        <input slot="input" id="native-text-input" required />
      </fluent-field>
      <fluent-field label-position="after">
        <label slot="label" for="native-checkbox">Checkbox</label>
        <input slot="input" type="checkbox" id="native-checkbox" />
      </fluent-field>
    </form>
  `),
};
