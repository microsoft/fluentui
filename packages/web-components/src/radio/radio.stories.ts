import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Radio as FluentRadio } from './radio.js';

type RadioStoryArgs = Args & FluentRadio;
type RadioStoryMeta = Meta<RadioStoryArgs>;

const storyTemplate = html<RadioStoryArgs>`
  <form @submit="${() => false}">
    <fluent-radio ?checked="${x => x.checked}" ?disabled="${x => x.disabled}" name="radio-story" value="option1"
      >Option 1</fluent-radio
    >
  </form>
`;

export default {
  title: 'Components/Radio',
  args: {
    checked: false,
    disabled: false,
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
  },
} as RadioStoryMeta;

export const Radio = renderComponent(storyTemplate).bind({});

export const Checked = renderComponent(html<RadioStoryArgs>`
  <fluent-radio checked value="Apple">Apple</fluent-radio>
`);

export const Disabled = renderComponent(html<RadioStoryArgs>`
  <fluent-radio disabled value="Apple">Apple</fluent-radio>
`);
