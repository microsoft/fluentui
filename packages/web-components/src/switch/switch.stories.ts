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
></fluent-switch>
`;

export const Switch = SwitchTemplate.bind({});

const example = `
<fluent-switch></fluent-switch>
`;

Switch.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
