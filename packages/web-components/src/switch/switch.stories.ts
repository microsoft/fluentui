import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { Switch as DCSSwitch } from './switch.js';
import './define.js';
import { SwitchLabelPosition } from './switch.options.js';

type SwitchStoryArgs = Args & DCSSwitch;
type SwitchStoryMeta = Meta<SwitchStoryArgs>;

const storyTemplate = html<SwitchStoryArgs>`
  <div>
    <fluent-switch
      ?checked=${x => x.checked}
      ?disabled=${x => x.disabled}
      ?required=${x => x.required}
      label-position=${x => x.labelPosition}
    >
      This is a switch
    </fluent-switch>
  </div>
`;

export default {
  title: 'Components/Switch',
  argTypes: {
    labelPosition: {
      options: Object.values(SwitchLabelPosition),
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'Sets the position of label',
        },
        defaultValue: {
          summary: 'after',
        },
      },
    },
    checked: {
      control: 'boolean',
      table: {
        type: {
          summary: 'Sets checked state',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: {
          summary: 'Sets disabled state',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    required: {
      control: 'boolean',
      table: {
        type: {
          summary: 'Sets required state',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
} as SwitchStoryMeta;

export const Switch = renderComponent(storyTemplate).bind({});
