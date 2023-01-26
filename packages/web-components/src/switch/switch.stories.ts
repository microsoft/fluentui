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
      labelposition=${x => x.labelPosition}
    >
      <div slot="checked-message">Checked</div>
      <div slot="unchecked-message">Unchecked</div>
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
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
} as SwitchStoryMeta;

export const Switch = renderComponent(storyTemplate).bind({});
