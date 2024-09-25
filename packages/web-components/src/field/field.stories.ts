import { html, repeat } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import { type NewMeta as Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { colorStatusDangerForeground1, colorStatusSuccessBackground3 } from '../theme/design-tokens.js';
import type { TextInput as FluentTextInput } from '../text-input/text-input.js';
import type { Field as FluentField } from './field.js';
import { LabelPosition, ValidationFlags } from './field.options.js';

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
      id: uniqueId('field-'),
      text: 'Example',
    },
    message: {
      message: 'This is a success message',
      icon: () => html`${SuccessIcon}`,
    },
    labelSlottedContent: () =>
      html`<label slot="label" for="${story => story.label.id}">${story => story.label.text}</label>`,
    inputSlottedContent: () =>
      html`<fluent-text-input slot="input" id="${story => story.label.id}"></fluent-text-input>`,
    messageSlottedContent: () =>
      html`<fluent-text slot="message" flag="${story => story.message?.flag}" size="200"
        >${story => story.message?.icon?.()} ${story => story.message?.message}</fluent-text
      >`,
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
      description: 'The content to be placed in the heading.',
      name: 'heading',
      table: { category: 'slots', type: {} },
    },
    inputSlottedContent: {
      control: false,
      description: 'The content to be placed in the heading.',
      name: 'heading',
      table: { category: 'slots', type: {} },
    },
    messageSlottedContent: {
      control: false,
      description: 'The content to be placed in the heading.',
      name: 'heading',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentField>;

export const Default: Story = {};

export const Field: Story = {
  args: {
    messages: {
      message: 'This is a success message',
      icon: () => html`${SuccessIcon}`,
    },
  },
};

export const LabelPositions: Story = {
  render: renderComponent(html<StoryArgs<FluentField>>`
    ${repeat(
      story => story.storyItems,
      html`
        <div>
          <fluent-field label-position="${story => story.labelPosition}">
            <label slot="label" for="${story => story.id}">${story => story.label}</label>
            <fluent-text-input slot="input" id="${story => story.id}"></fluent-text-input
          ></fluent-field>
        </div>
        <br />
      `,
    )}
  `),
  args: {
    storyItems: Object.values(LabelPosition).map(labelPosition => ({
      labelPosition,
      label: `Label position: ${labelPosition}`,
      id: uniqueId('field-'),
    })),
  },
};

export const Required: Story = {
  args: {
    label: {
      text: 'Required field',
    },
    inputSlottedContent: () =>
      html`<fluent-text-input required slot="input" id="${story => story.label.id}"></fluent-text-input>`,
  },
};

export const DisabledControl: Story = {
  args: {
    label: {
      text: 'Disabled field',
    },
    inputSlottedContent: () =>
      html`<fluent-text-input disabled slot="input" id="${story => story.label.id}"></fluent-text-input>`,
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

export const ValidationMessage: Story = {
  render: renderComponent(html<StoryArgs<FluentField>>`
    <form id="validation-messages-form" action="#" style="display:flex;flex-flow:column;align-items:start;gap:10px;">
      <fluent-field>
        <label slot="label" for="field-required">Required</label>
        <fluent-text-input required slot="input" id="field-required"></fluent-text-input>
        <fluent-text slot="message" flag="value-missing" size="200" style="color: ${colorStatusDangerForeground1}">
          This field is required.
        </fluent-text>
      </fluent-field>
      <fluent-field>
        <label slot="label" for="field-pattern-mismatch">Unique ID</label>
        <fluent-text-input
          pattern="\\w+"
          slot="input"
          id="field-pattern-mismatch"
          value="Cool Username 123"
        ></fluent-text-input>
        <fluent-text slot="message" flag="pattern-mismatch" size="200" style="color: ${colorStatusDangerForeground1}">
          <span style="vertical-align: middle">Only letters and numbers please, spaces not allowed</span>
        </fluent-text>
      </fluent-field>
      <fluent-field>
        <label slot="label" for="field-too-long">Too Long</label>
        <fluent-text-input maxlength="5" value="123456789" slot="input" id="field-too-long"></fluent-text-input>
        <fluent-text slot="message" flag="too-long" size="200" style="color: ${colorStatusDangerForeground1}">
          This value is too long.
        </fluent-text>
      </fluent-field>
      <fluent-field>
        <label slot="label" for="field-too-short">Too Short</label>
        <fluent-text-input minlength="5" value="123" slot="input" id="field-too-short"></fluent-text-input>
        <fluent-text slot="message" flag="too-short" size="200" style="color: ${colorStatusDangerForeground1}">
          This value is too short.
        </fluent-text>
      </fluent-field>
      <fluent-field>
        <label slot="label" for="field-range-overflow">Range Overflow</label>
        <fluent-text-input type="number" max="5" value="7" slot="input" id="field-range-overflow"></fluent-text-input>
        <fluent-text slot="message" flag="range-overflow" size="200" style="color: ${colorStatusDangerForeground1}">
          This value must be less than 5.
        </fluent-text>
      </fluent-field>
      <fluent-field>
        <label slot="label" for="field-range-underflow">Range Underflow</label>
        <fluent-text-input type="number" min="5" value="3" slot="input" id="field-range-underflow"></fluent-text-input>
        <fluent-text slot="message" flag="range-underflow" size="200" style="color: ${colorStatusDangerForeground1}">
          This value must be greater than 5.
        </fluent-text>
      </fluent-field>
      <fluent-field>
        <label slot="label" for="field-step-mismatch">Step Mismatch</label>
        <fluent-text-input type="number" step="5" value="0" slot="input" id="field-step-mismatch"></fluent-text-input>
        <fluent-text slot="message" flag="step-mismatch" size="200" style="color: ${colorStatusDangerForeground1}">
          This value must be a multiple of 5.
        </fluent-text>
      </fluent-field>
      <fluent-field>
        <label slot="label" for="field-type-mismatch">Type Mismatch</label>
        <fluent-text-input value="not an email" type="email" slot="input" id="field-type-mismatch"></fluent-text-input>
        <fluent-text slot="message" flag="type-mismatch" size="200" style="color: ${colorStatusDangerForeground1}">
          This value is not a valid email address.
        </fluent-text>
      </fluent-field>
      <fluent-field>
        <label slot="label" for="field-type-tooshort2">Too short (TextArea)</label>
        <fluent-textarea minlength="10" slot="input" id="field-type-tooshort2"> 12345 </fluent-textarea>
        <fluent-text slot="message" flag="too-short" size="200" style="color: ${colorStatusDangerForeground1}">
          This field requires at least 10 characters.
        </fluent-text>
      </fluent-field>
      <fluent-field>
        <label slot="label" for="field-type-toolong2">Too long (TextArea)</label>
        <fluent-textarea maxlength="2" slot="input" id="field-type-toolong2"> 123456789 </fluent-textarea>
        <fluent-text slot="message" flag="too-long" size="200" style="color: ${colorStatusDangerForeground1}">
          This field can only have up to 2 characters
        </fluent-text>
      </fluent-field>
    </form>
  `),
  decorators: [
    Story => {
      setTimeout(() => {
        const flags = Object.fromEntries(Object.entries(ValidationFlags).map(a => a.reverse()));
        document
          .getElementById('validation-messages-form')
          ?.querySelectorAll<FluentField>('fluent-field')
          .forEach(field => {
            const message = field.querySelector<FluentTextInput>('fluent-text');
            field.input?.setValidity?.(
              { [flags[message!.getAttribute('flag') as ValidationFlags]]: true },
              message!.textContent!,
            );
            field.input?.checkValidity();
          });
      }, 0);

      return Story();
    },
  ],
};

export const Hint: Story = {
  args: {
    label: {
      text: 'Hint text',
    },
    message: {
      message: 'Hint text',
    },
  },
};

export const ComponentExamples: Story = {
  render: renderComponent(html`
    <div style="display: flex; flex-direction: column; gap: 10px;">
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
          <fluent-radio value="Apple">Apple</fluent-radio>
          <fluent-radio value="pear">Pear</fluent-radio>
          <fluent-radio value="banana">Banana</fluent-radio>
          <fluent-radio value="orange">Orange</fluent-radio>
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
      <fluent-field label-position="before">
        <label slot="label" for="native-checkbox">Checkbox</label>
        <input slot="input" type="checkbox" id="native-checkbox" />
      </fluent-field>
    </form>
  `),
};
