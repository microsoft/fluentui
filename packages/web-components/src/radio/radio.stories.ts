import { html } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { Radio as FluentRadio } from './radio.js';

const storyTemplate = html<StoryArgs<FluentRadio>>`
  <fluent-radio
    slot="${x => x.slot}"
    id="${x => x.id}"
    ?checked="${x => x.checked}"
    ?disabled="${x => x.disabled}"
    name="${x => x.name}"
    ?required="${x => x.required}"
    value="${x => x.value}"
  ></fluent-radio>
`;

const fieldTemplate = html<StoryArgs<FluentRadio>>`
  <fluent-field label-position="after">
    <label slot="label">${x => x.value}</label>
    ${storyTemplate}
  </fluent-field>
`;

export default {
  title: 'Components/Radio',
  args: {
    slot: 'input',
  },
  argTypes: {
    checked: {
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary: 'Sets checked state on radio',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary: 'Sets disabled state on radio',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    slot: { table: { disable: true } },
  },
} as Meta<FluentRadio>;

export const Radio: Story<FluentRadio> = renderComponent(storyTemplate).bind({});
Radio.args = {
  slot: null,
  checked: false,
  disabled: false,
};

export const Checked: Story<FluentRadio> = renderComponent(html<StoryArgs<FluentRadio>>`
  <fluent-radio checked value="Apple"></fluent-radio>
`);

export const Disabled: Story<FluentRadio> = renderComponent(fieldTemplate).bind({});
Disabled.args = {
  value: 'Disabled Radio',
  disabled: true,
};

export const Field: Story<FluentRadio> = renderComponent(fieldTemplate).bind({});
Field.args = {
  id: uniqueId('radio-'),
  value: 'Apple',
};
