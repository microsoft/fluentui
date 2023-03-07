import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { RadioGroup as FluentRadioGroup } from './radio-group.js';
import './define.js';
import '../radio/define.js';

type RadioGroupStoryArgs = Args & FluentRadioGroup;
type RadioGroupStoryMeta = Meta<RadioGroupStoryArgs>;

const storyTemplate = html<RadioGroupStoryArgs>`
  <fluent-radio-group
    aria-labelledby="label-1"
    ?disabled=${(x: { disabled: boolean }) => x.disabled}
    ?stacked=${(x: { stacked: boolean }) => x.stacked}
    orientation=${(x: { orientation: 'vertical' | 'horizontal' }) => x.orientation}
    name="radio-story"
  >
    <span id="label-1" slot="label">Favorite Fruit</span>
    <fluent-radio ?checked=${(x: { checked: any }) => x.checked} value="apple">Apple</fluent-radio>
    <fluent-radio value="pear"> Pear </fluent-radio>
    <fluent-radio value="banana"> Banana </fluent-radio>
    <fluent-radio value="orange"> Orange </fluent-radio>
  </fluent-radio-group>
`;

export default {
  title: 'Components/RadioGroup',
  args: {
    disabled: false,
    orientation: 'horizontal',
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

export const RadioGroupLabelledby = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group aria-labelledby="label-2" role="radiogroup" name="radio-story">
    <span id="label-2" slot="label">Favorite Fruit</span>
    <fluent-radio value="apple"> Apple </fluent-radio>
    <fluent-radio value="pear"> Pear </fluent-radio>
    <fluent-radio value="banana"> Banana </fluent-radio>
    <fluent-radio value="orange"> Orange </fluent-radio>
  </fluent-radio-group>
`);

export const RadioGroupLayoutVertical = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group aria-labelledby="label-3" orientation="vertical" role="radiogroup" name="radio-story">
    <span id="label-3" slot="label">Favorite Fruit</span>
    <fluent-radio value="apple"> Apple </fluent-radio>
    <fluent-radio value="pear"> Pear </fluent-radio>
    <fluent-radio value="banana"> Banana </fluent-radio>
    <fluent-radio value="orange"> Orange </fluent-radio>
  </fluent-radio-group>
`);

export const RadioGroupLayoutHorizontal = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group aria-labelledby="label-4" orientation="horizontal" role="radiogroup" name="radio-story">
    <span id="label-4" slot="label">Favorite Fruit</span>
    <fluent-radio value="apple"> Apple </fluent-radio>
    <fluent-radio value="pear"> Pear </fluent-radio>
    <fluent-radio value="banana"> Banana </fluent-radio>
    <fluent-radio value="orange"> Orange </fluent-radio>
  </fluent-radio-group>
`);

export const RadioGroupLayoutHorizontalStacked = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group stacked aria-labelledby="label-5" orientation="horizontal" role="radiogroup" name="radio-story">
    <span id="label-5" slot="label">Favorite Fruit</span>
    <fluent-radio value="apple"> Apple </fluent-radio>
    <fluent-radio value="pear"> Pear </fluent-radio>
    <fluent-radio value="banana"> Banana </fluent-radio>
    <fluent-radio value="orange"> Orange </fluent-radio>
  </fluent-radio-group>
`);

export const RadioGroupDefaultChecked = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group aria-labelledby="label-6" orientation="horizontal" role="radiogroup" name="radio-story">
    <span id="label-6" slot="label">Favorite Fruit</span>
    <fluent-radio value="apple"> Apple </fluent-radio>
    <fluent-radio checked value="pear"> Pear </fluent-radio>
    <fluent-radio value="banana"> Banana </fluent-radio>
    <fluent-radio value="orange"> Orange </fluent-radio>
  </fluent-radio-group>
`);

export const RadioGroupDisabled = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group disabled aria-labelledby="label-7" role="radiogroup" name="radio-story">
    <span id="label-7" slot="label">Favorite Fruit</span>
    <fluent-radio checked value="apple"> Apple </fluent-radio>
    <fluent-radio checked value="pear"> Pear </fluent-radio>
    <fluent-radio value="banana"> Banana </fluent-radio>
    <fluent-radio value="orange"> Orange </fluent-radio>
  </fluent-radio-group>
`);

export const RadioGroupDisabledItem = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group aria-labelledby="label-8" role="radiogroup" name="radio-story">
    <span id="label-8" slot="label">Favorite Fruit</span>
    <fluent-radio checked value="apple"> Apple </fluent-radio>
    <fluent-radio disabled value="pear"> Pear </fluent-radio>
    <fluent-radio value="banana"> Banana </fluent-radio>
    <fluent-radio value="orange"> Orange </fluent-radio>
  </fluent-radio-group>
`);
