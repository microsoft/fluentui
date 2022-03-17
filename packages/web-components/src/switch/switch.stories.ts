import { fluentSwitch } from './index';

export default {
  title: 'Components/Switch',
  component: fluentSwitch,
  argTypes: {
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

const SwitchTemplate = ({ checked, disabled, label }) => `
<fluent-switch
  ${checked ? 'checked' : ''}
  ${disabled ? 'disabled' : ''}
>${label}
  <span slot="checked-message">On</span>
  <span slot="unchecked-message">Off</span>
</fluent-switch>
`;

export const Switch = SwitchTemplate.bind({});

Switch.args = {
  label: 'Label',
  checked: false,
  disabled: false,
};

const example = `
<fluent-switch>
  <span slot="checked-message">On</span>
  <span slot="unchecked-message">Off</span>
  <label for="direction-switch">Captions:</label>
</fluent-switch>
`;

Switch.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
