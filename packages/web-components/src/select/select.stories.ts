import '../listbox-option';
import { fluentSelect } from './index';

export default {
  title: 'Components/Select',
  component: fluentSelect,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    position: {
      options: ['above', 'below'],
      control: { type: 'radio' },
    },
  },
};

const SelectTemplate = ({ disabled, position }) => `
<fluent-select ${disabled ? 'disabled' : ''} position="${position}">
  <fluent-option>Option One</fluent-option>
  <fluent-option>Option Two</fluent-option>
  <fluent-option>Option Three</fluent-option>
  <fluent-option>Option Four</fluent-option>
</fluent-select>`;

export const Select = SelectTemplate.bind({});
Select.args = {
  disabled: false,
};
