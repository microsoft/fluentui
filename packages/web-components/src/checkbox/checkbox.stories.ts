import { fluentCheckbox } from './index';

export default {
  title: 'Components/Checkbox',
  component: fluentCheckbox,
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
  parameters: {
    actions: {
      handles: ['mouseover', 'click'],
    },
  },
};

const CheckboxTemplate = ({ checked, disabled, label, required }) =>
  `<fluent-checkbox
    ${checked ? 'checked' : ''}
    ${disabled ? 'disabled' : ''}
    ${required ? 'required' : ''}
    >${label}</fluent-checkbox>`;

export const Checkbox = CheckboxTemplate.bind({});

Checkbox.args = {
  label: 'Label string',
  checked: false,
  disabled: false,
  required: false,
};

const example = `
<fluent-checkbox>Label string</fluent-checkbox>
`;

Checkbox.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
