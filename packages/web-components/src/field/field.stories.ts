import { html, repeat } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { Field as FluentField } from './field.js';
import { LabelPosition, ValidationFlags } from './field.options.js';

import '../button/define.js';
import '../field/define.js';
import '../checkbox/define.js';
import '../label/define.js';
import '../radio/define.js';
import '../text-input/define.js';
import '../text/define.js';
import './define.js';

const messageTemplate = html`
  <fluent-text slot="message" size="200" flag="${x => x.flag}">
    <span>${x => x.message}</span>
  </fluent-text>
`;

export const storyTemplate = html<StoryArgs<FluentField>>`
  <fluent-field label-position="${x => x.labelPosition}">
    <label slot="label" for="${x => x.id}">
      <fluent-label>${x => x.label}</fluent-label>
    </label>
    ${x => x.storyContent} ${repeat(x => x.messages, messageTemplate)}
  </fluent-field>
`;

const formTemplate = html`
  <form action="#">
    ${storyTemplate}
    <fluent-button type="submit" appearance="primary">Submit</fluent-button>
  </form>
`;

export default {
  title: 'Components/Field',
  excludeStories: ['storyTemplate'],
  args: {
    label: 'Checkbox label',
    id: uniqueId('field-'),
    storyContent: html`<fluent-checkbox required slot="input" id="${x => x.id}"></fluent-checkbox>`,
    labelPosition: LabelPosition.above,
  },
  argTypes: {
    label: { table: { disable: true } },
    storyContent: { table: { disable: true } },
    id: { table: { disable: true } },
    labelPosition: {
      description: 'Sets the position of the label relative to the input',
      control: 'select',
      table: {
        defaultValue: { summary: LabelPosition.before },
      },
      options: Object.values(LabelPosition),
    },
  },
} as Meta<FluentField>;

export const Field: Story<FluentField> = renderComponent(formTemplate).bind({});
Field.args = {
  labelPosition: LabelPosition.after,
};

export const FieldWithRadio: Story<FluentField> = renderComponent(formTemplate).bind({});
FieldWithRadio.args = {
  storyContent: html`<fluent-radio slot="input" id="${x => x.id}"></fluent-radio> `,
  label: 'Radio label',
  labelPosition: LabelPosition.after,
  id: uniqueId('field-'),
};

export const FieldWithTextInput: Story<FluentField> = renderComponent(formTemplate).bind({});
FieldWithTextInput.args = {
  labelPosition: LabelPosition.before,
  storyContent: html`<fluent-text-input required slot="input" id="${x => x.id}"></fluent-text-input>`,
  label: 'Text input label',
  id: uniqueId('field-'),
  messages: [{ message: 'This value is required.', flag: ValidationFlags.valueMissing }],
};
