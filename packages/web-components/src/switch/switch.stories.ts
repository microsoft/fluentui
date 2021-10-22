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

const SwitchTemplate = ({ checked, disabled }) => `
<fluent-switch
  ${checked ? 'checked' : ''}
  ${disabled ? 'disabled' : ''}
>
  <span slot="checked-message">On</span>
  <span slot="unchecked-message">Off</span>
  <label for="direction-switch">Captions:</label>
</fluent-switch>
`;

export const Switch = SwitchTemplate.bind({});

Switch.args = {
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
