// import Examples from './fixtures/radio.html';
import { fluentRadio } from './index';

export default {
  title: 'Components/Radio',
  component: fluentRadio,
  argTypes: {
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
  },
};

const RadioTemplate = ({ checked, disabled, required, label }) => `
  <fluent-radio
    ${checked ? 'checked' : ''}
    ${disabled ? 'disabled' : ''}
    ${required ? 'required' : ''}
  >${label}</fluent-radio>
`;

export const Radio = RadioTemplate.bind({});

Radio.args = {
  label: 'Label',
  checked: false,
  disabled: false,
  required: false,
};

const example = `
<fluent-radio></fluent-radio>
`;

Radio.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
