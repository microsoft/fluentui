import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Radio as FluentRadio } from './radio.js';
import './define.js';
import '../radio-group/define.js';

type RadioStoryArgs = Args & FluentRadio;
type RadioStoryMeta = Meta<RadioStoryArgs>;

const storyTemplate = html<RadioStoryArgs>`
  <fluent-radio-group orientation="vertical" role="radiogroup" name="radio-story">
    <fluent-radio
      ?disabled=${(x: { disabled: boolean }) => x.disabled}
      ?checked=${(x: { checked: boolean }) => x.checked}
      value="Apple"
    >
      Apple
    </fluent-radio>
    <fluent-radio ?disabled=${(x: { disabled: boolean }) => x.disabled} value="Pear"> Pear </fluent-radio>
    <fluent-radio ?disabled=${(x: { disabled: boolean }) => x.disabled} value="Banana"> Banana </fluent-radio>
    <fluent-radio ?disabled=${(x: { disabled: boolean }) => x.disabled} value="Orange"> Orange </fluent-radio>
  </fluent-radio-group>
`;

export default {
  title: 'Components/Radio',
  args: {
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
          summary: 'Sets default state on radio',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
} as RadioStoryMeta;

export const Radio = renderComponent(storyTemplate).bind({});
