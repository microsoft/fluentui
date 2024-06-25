import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { RadioGroup as FluentRadioGroup } from './radio-group.js';
import { RadioGroupOrientation } from './radio-group.options.js';

type RadioGroupStoryArgs = Args & FluentRadioGroup;
type RadioGroupStoryMeta = Meta<RadioGroupStoryArgs>;

const storyTemplate = html<RadioGroupStoryArgs>`
  <fluent-radio-group
    aria-labelledby="label-1"
    ?disabled=${x => x.disabled}
    ?stacked=${x => x.stacked}
    orientation=${x => x.orientation}
    name="radio-story"
  >
    <span id="label-1" slot="label">Favorite Fruit</span>
    <fluent-radio ?checked="${x => x.checked}" value="apple">Apple</fluent-radio>
    <fluent-radio value="pear">Pear</fluent-radio>
    <fluent-radio value="banana">Banana</fluent-radio>
    <fluent-radio value="orange">Orange</fluent-radio>
  </fluent-radio-group>
`;

export default {
  title: 'Components/RadioGroup',
  args: {
    disabled: false,
    orientation: RadioGroupOrientation.horizontal,
  },
  argTypes: {
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
    stacked: {
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary: 'Creates a stacked layout for horizontal radio buttons',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    orientation: {
      control: {
        type: 'select',
        options: Object.values(RadioGroupOrientation),
      },
      defaultValue: RadioGroupOrientation.horizontal,
      table: {
        type: {
          summary: 'Sets orientation of radio group',
        },
        defaultValue: {
          summary: RadioGroupOrientation.horizontal,
        },
      },
    },
    change: {
      action: 'change',
      table: {
        type: {
          summary: 'Event that is fired when the selected radio button changes',
        },
        defaultValue: {
          summary: null,
        },
      },
    },
  },
} as RadioGroupStoryMeta;

export const RadioGroup = renderComponent(storyTemplate).bind({});

export const RadioGroupLabelledby = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group aria-labelledby="label-2" name="radio-story">
    <span id="label-2" slot="label">Favorite Fruit</span>
    <fluent-radio value="apple">Apple</fluent-radio>
    <fluent-radio value="pear">Pear</fluent-radio>
    <fluent-radio value="banana">Banana</fluent-radio>
    <fluent-radio value="orange">Orange</fluent-radio>
  </fluent-radio-group>
`);

export const RadioGroupLayoutVertical = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group aria-labelledby="label-3" orientation="vertical" name="radio-story">
    <span id="label-3" slot="label">Favorite Fruit</span>
    <fluent-radio value="apple">Apple</fluent-radio>
    <fluent-radio value="pear">Pear</fluent-radio>
    <fluent-radio value="banana">Banana</fluent-radio>
    <fluent-radio value="orange">Orange</fluent-radio>
  </fluent-radio-group>
`);

export const RadioGroupLayoutHorizontal = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group aria-labelledby="label-4" orientation="horizontal" name="radio-story">
    <span id="label-4" slot="label">Favorite Fruit</span>
    <fluent-radio value="apple">Apple</fluent-radio>
    <fluent-radio value="pear">Pear</fluent-radio>
    <fluent-radio value="banana">Banana</fluent-radio>
    <fluent-radio value="orange">Orange</fluent-radio>
  </fluent-radio-group>
`);

export const RadioGroupLayoutHorizontalStacked = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group stacked aria-labelledby="label-5" orientation="horizontal" name="radio-story">
    <span id="label-5" slot="label">Favorite Fruit</span>
    <fluent-radio value="apple">Apple</fluent-radio>
    <fluent-radio value="pear">Pear</fluent-radio>
    <fluent-radio value="banana">Banana</fluent-radio>
    <fluent-radio value="orange">Orange</fluent-radio>
  </fluent-radio-group>
`);

export const RadioGroupDefaultChecked = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group aria-labelledby="label-6" orientation="horizontal" name="radio-story">
    <span id="label-6" slot="label">Favorite Fruit</span>
    <fluent-radio value="apple">Apple</fluent-radio>
    <fluent-radio checked value="pear">Pear</fluent-radio>
    <fluent-radio value="banana">Banana</fluent-radio>
    <fluent-radio value="orange">Orange</fluent-radio>
  </fluent-radio-group>
`);

export const RadioGroupDisabled = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group disabled aria-labelledby="label-7" name="radio-story">
    <span id="label-7" slot="label">Favorite Fruit</span>
    <fluent-radio checked value="apple">Apple</fluent-radio>
    <fluent-radio checked value="pear">Pear</fluent-radio>
    <fluent-radio value="banana">Banana</fluent-radio>
    <fluent-radio value="orange">Orange</fluent-radio>
  </fluent-radio-group>
`);

export const RadioGroupDisabledItem = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group aria-labelledby="label-8" name="radio-story">
    <span id="label-8" slot="label">Favorite Fruit</span>
    <fluent-radio id="baby" checked value="apple">Apple</fluent-radio>
    <fluent-radio disabled value="pear">Pear</fluent-radio>
    <fluent-radio value="banana">Banana</fluent-radio>
    <fluent-radio value="orange">Orange</fluent-radio>
  </fluent-radio-group>
`);

const getLabelContent = (): string | undefined => {
  const radioGroup = document.querySelector('#radio-group-fruit') as FluentRadioGroup;

  if (!radioGroup) return; // add a check to make sure radioGroup exists

  const selectedRadio = radioGroup.value as string;

  if (selectedRadio) {
    return `Favorite fruit: ${selectedRadio.charAt(0).toUpperCase() + selectedRadio.slice(1)}`;
  } else {
    return 'Please select your favorite fruit';
  }
};

const handleChange = (event: CustomEvent) => {
  const radioGroup = document.querySelector('#radio-group-fruit') as FluentRadioGroup;

  if (!radioGroup) return; // add a check to make sure radioGroup exists

  const selectedRadio = radioGroup.value as string;
  const labelElement = radioGroup.querySelector('[slot="label"]') as HTMLSpanElement;
  if (selectedRadio) {
    const labelContent = selectedRadio.charAt(0).toUpperCase() + selectedRadio.slice(1);
    labelElement.textContent = `Favorite fruit: ${labelContent}`;
  }
};

export const RadioGroupChangeEvent = renderComponent(html<RadioGroupStoryArgs>`
  <fluent-radio-group
    id="radio-group-fruit"
    aria-labelledby="label-8"
    name="radio-story"
    @change="${(event: CustomEvent) => handleChange(event)}"
  >
    <span id="label-8" slot="label">${getLabelContent}</span>
    <fluent-radio checked value="apple">Apple</fluent-radio>
    <fluent-radio value="pear">Pear</fluent-radio>
    <fluent-radio value="Banana">Banana</fluent-radio>
    <fluent-radio value="Orange">Orange</fluent-radio>
  </fluent-radio-group>
`);
