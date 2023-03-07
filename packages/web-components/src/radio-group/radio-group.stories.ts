import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { RadioGroup as FluentRadioGroup } from './radio-group.js';
import './define.js';
import '../radio/define.js';

type RadioGroupStoryArgs = Args & FluentRadioGroup;
type RadioGroupStoryMeta = Meta<RadioGroupStoryArgs>;

const storyTemplate = html<RadioGroupStoryArgs>`
  <fluent-radio-group orientation=${x => x.orientation} stacked=${x => x.stacked} role="radiogroup" name="radio-story">
    <span slot="label">Radio Group Label</span>
    <fluent-radio ?disabled=${x => x.disabled} value="apple"> Apple </fluent-radio>
    <fluent-radio ?disabled=${x => x.disabled} value="pear"> Pear </fluent-radio>
    <fluent-radio ?disabled=${x => x.disabled} value="banana"> Banana </fluent-radio>
    <fluent-radio ?disabled=${x => x.disabled} value="orange"> Orange </fluent-radio>
  </fluent-radio-group>
`;

export default {
  title: 'Components/RadioGroup',
  args: {
    disabled: false,
    orientation: 'horizontal',
  },
  argTypes: {
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
    stacked: {
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary: 'Sets layout of radio buttons',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    orientation: {
      control: {
        type: 'select',
        options: ['horizontal', 'vertical'],
      },
      table: {
        type: {
          summary: 'Sets orientation of radio group',
        },
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
  },
} as RadioGroupStoryMeta;

export const RadioGroup = renderComponent(storyTemplate).bind({});
