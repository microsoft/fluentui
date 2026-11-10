import { html, ref, repeat } from '@microsoft/fast-element';
import type { Field as FluentField } from '../field/field.js';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { ValidationFlags } from '../field/field.options.js';
import { getStorybookHelpers } from '../../.storybook/wc-toolkit-helpers.js';
import type { RadioGroup as FluentRadioGroup } from './radio-group.js';
import { RadioGroupOrientation } from './radio-group.options.js';

type Story = StoryObj<FluentRadioGroup>;
const { argTypes } = getStorybookHelpers<FluentRadioGroup>('fluent-radio-group');

const radioFieldTemplate = html<StoryArgs<FluentField>>`
  <fluent-field label-position="${story => story.labelPosition ?? 'after'}">
    ${story => story.labelSlottedContent?.()}
    <fluent-radio
      slot="input"
      name="${(x, c) => c.parent.name}"
      ?checked="${story => story.checked}"
      ?disabled="${story => story.disabled}"
      value="${story => story.value}"
    ></fluent-radio>
  </fluent-field>
`;

const storyTemplate = html<StoryArgs<FluentRadioGroup>>`
  <fluent-field label-position="above">
    ${story => story.labelSlottedContent?.()}
    <fluent-radio-group
      slot="input"
      aria-labelledby="${story => story.id}--label"
      ?disabled=${story => story.disabled}
      orientation="${story => story.orientation}"
      name="${story => story.name}"
      value="${story => story.value}"
      required="${story => story.required}"
      ${ref('radioGroup')}
    >
      ${story => story.slottedContent?.()}
    </fluent-radio-group>
    ${story => story.messageSlottedContent?.()}
  </fluent-field>
`;

export default {
  title: 'Components/RadioGroup',
  render: renderComponent(storyTemplate),
  args: {
    slottedContent: () => html`
      ${repeat(
        [
          {
            labelSlottedContent: () => html`<label slot="label">Apple</label>`,
            value: 'apple',
          },
          {
            labelSlottedContent: () => html`<label slot="label">Pear</label>`,
            value: 'pear',
          },
          {
            labelSlottedContent: () => html`<label slot="label">Banana</label>`,
            value: 'banana',
          },
          {
            labelSlottedContent: () => html`<label slot="label">Orange</label>`,
            value: 'orange',
          },
        ],
        radioFieldTemplate,
      )}
    `,
    labelSlottedContent: () => html`<label slot="label">Favorite Fruit</label>`,
    name: 'favorite-fruit',
  },
  argTypes: {
    ...argTypes,
    labelSlottedContent: { table: { disable: true } },
    messageSlottedContent: { table: { disable: true } },
  },
} as Meta<FluentRadioGroup>;

export const Default: Story = {};

export const VerticalOrientation: Story = {
  args: {
    id: 'radio-group-vertical',
    orientation: RadioGroupOrientation.vertical,
  },
};

export const InitialValue: Story = {
  args: {
    id: 'radio-group-default',
    value: 'banana',
  },
};

export const InitialCheckedRadio: Story = {
  args: {
    id: 'radio-group-checked',
    slottedContent: () => html`
      ${repeat(
        [
          {
            labelSlottedContent: () => html`<label slot="label">Apple</label>`,
            value: 'apple',
          },
          {
            labelSlottedContent: () => html`<label slot="label">Pear</label>`,
            checked: true,
            value: 'pear',
          },
          {
            labelSlottedContent: () => html`<label slot="label">Banana</label>`,
            value: 'banana',
          },
          {
            labelSlottedContent: () => html`<label slot="label">Orange</label>`,
            value: 'orange',
          },
        ],
        radioFieldTemplate,
      )}
    `,
  },
};

export const Disabled: Story = {
  args: {
    id: 'radio-group-disabled',
    disabled: true,
  },
};

export const DisabledItems: Story = {
  args: {
    orientation: RadioGroupOrientation.vertical,
    id: 'radio-group-disabled-items',
    slottedContent: () => html`
      ${repeat(
        [
          {
            labelSlottedContent: () => html`<label slot="label">Apple</label>`,
            value: 'apple',
          },
          {
            labelSlottedContent: () => html`<label slot="label">Pear</label>`,
            value: 'pear',
            disabled: true,
          },
          {
            labelSlottedContent: () => html`<label slot="label">Banana</label>`,
            value: 'banana',
            disabled: true,
          },
          {
            labelSlottedContent: () => html`<label slot="label">Orange</label>`,
            value: 'orange',
          },
          {
            labelSlottedContent: () => html`<label slot="label">Grape</label>`,
            value: 'grape',
          },
          {
            labelSlottedContent: () => html`<label slot="label">Kiwi</label>`,
            value: 'kiwi',
            disabled: true,
          },
        ],
        radioFieldTemplate,
      )}
    `,
  },
};

export const DisabledAndCheckedItem: Story = {
  args: {
    orientation: RadioGroupOrientation.vertical,
    id: 'radio-group-disabled-and-checked-item',
    value: 'pear',
    slottedContent: () => html`
      ${repeat(
        [
          {
            labelSlottedContent: () => html`<label slot="label">Apple</label>`,
            value: 'apple',
            disabled: true,
          },
          {
            labelSlottedContent: () => html`<label slot="label">Pear</label>`,
            value: 'pear',
            disabled: true,
          },
          {
            labelSlottedContent: () => html`<label slot="label">Banana</label>`,
            value: 'banana',
            disabled: true,
          },
          {
            labelSlottedContent: () => html`<label slot="label">Orange</label>`,
            value: 'orange',
          },
          {
            labelSlottedContent: () => html`<label slot="label">Grape</label>`,
            value: 'grape',
          },
          {
            labelSlottedContent: () => html`<label slot="label">Kiwi</label>`,
            value: 'kiwi',
            disabled: true,
          },
        ],
        radioFieldTemplate,
      )}
    `,
  },
};

export const Required: Story = {
  render: renderComponent(html<StoryArgs<FluentRadioGroup>>`
    <form
      @reset="${story => story.successMessage.toggleAttribute('hidden', true)}"
      @submit="${story => story.radioGroup.checkValidity() && story.successMessage.toggleAttribute('hidden', false)}"
      style="display: inline-flex; flex-direction: column; gap: 1rem; max-width: 400px;"
    >
      ${storyTemplate}
      <div>
        <fluent-button type="submit" appearance="primary">Submit</fluent-button>
        <fluent-button id="reset-button" type="reset" ${ref('resetButton')}>Reset</fluent-button>
      </div>
      <span id="success-message" hidden ${ref('successMessage')}> Form submitted successfully! </span>
    </form>
  `),
  args: {
    orientation: RadioGroupOrientation.vertical,
    required: true,
  },
};
