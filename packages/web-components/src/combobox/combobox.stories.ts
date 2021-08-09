import { fluentCombobox } from './index';

export default {
  title: 'Components/Combobox',
  component: fluentCombobox,
  argTypes: {
    appearance: {
      options: ['filled'],
      control: { type: 'radio' },
    },
    autocomplete: {
      options: ['inline', 'list', 'both'],
      control: { type: 'radio' },
    },
  },
};

const ComboboxTemplate = ({ appearance, value }) => `<fluent-combobox>
<fluent-option>Judge</fluent-option>
<fluent-combobox/>`;

export const Combobox = ComboboxTemplate.bind({});

Combobox.args = {
  value: 'Christopher Eccleston',
  appearance: 'accent',
};
