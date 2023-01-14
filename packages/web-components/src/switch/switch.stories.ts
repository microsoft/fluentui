import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { Switch as DCSSwitch } from './switch.js';
import './define.js';

type SwitchStoryArgs = Args & DCSSwitch;
type SwitchStoryMeta = Meta<SwitchStoryArgs>;

const storyTemplate = html<SwitchStoryArgs>`
  <div>
    <dcs-switch data-testid="enabled-checked" isChecked="true">
      <span slot="checked-message">On</span>
      <span slot="unchecked-message">Off</span>
      Enabled and Checked
    </dcs-switch>

    <br />

    <dcs-switch data-testid="enabled-unchecked">
      <span slot="checked-message">On</span>
      <span slot="unchecked-message">Off</span>
      Enabled and unchecked
    </dcs-switch>
    <br />

    <dcs-switch data-testid="disabled-checked" isChecked="true" isDisabled="true">
      Disabled and checked
      <span slot="checked-message">On</span>
      <span slot="unchecked-message">Off</span>
    </dcs-switch>

    <br />

    <dcs-switch data-testid="disabled-unchecked" isDisabled="true">
      Disabled and unchecked
      <span slot="checked-message">On</span>
      <span slot="unchecked-message">Off</span>
    </dcs-switch>

    <br />

    <dcs-switch data-testid="enabled-unchecked--static-label">
      <span slot="static-message">With inline label and without on and off text</span>
    </dcs-switch>

    <br />

    <dcs-switch data-testid="disabled-unchecked--static-label" isDisabled="true">
      <span slot="static-message">Disabled with inline label and without on and off text</span>
    </dcs-switch>
  </div>
`;

export default {
  title: 'Components/Switch',
} as SwitchStoryMeta;

export const Switch = renderComponent(storyTemplate).bind({});
