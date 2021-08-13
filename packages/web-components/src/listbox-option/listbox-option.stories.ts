import { fluentOption } from './index';

export default {
  title: 'Components/Listbox Option',
  component: fluentOption,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    selected: {
      control: { type: 'boolean' },
    },
    value: {
      control: { type: 'text' },
    },
  },
};

const listBoxTemplate = ({ disabled, label, selected, value }) => `
  <fluent-option 
    ${disabled ? 'disabled' : ''}
    ${selected ? 'selected' : ''}
    ${value ? `value="${value}"` : ''}
  >${label}</fluent-option>
`;

export const ListboxOption = listBoxTemplate.bind({});

ListboxOption.args = {
  label: 'This is an Option',
  selected: false,
};

const example = `
<fluent-option> Text content is the value when the value attribute is absent. </fluent-option>
`;

ListboxOption.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
