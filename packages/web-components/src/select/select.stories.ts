import '../listbox-option';
import { fluentSelect } from './index';

export default {
  title: 'Components/Select',
  component: fluentSelect,
  argTypes: {
    appearance: {
      options: ['filled', 'outline', 'stealth'],
      control: { type: 'radio' },
      defaultValue: 'outline',
    },
    disabled: {
      control: { type: 'boolean' },
    },
    position: {
      options: ['above', 'below'],
      control: { type: 'radio' },
      defaultValue: 'below',
    },
  },
};

const SelectTemplate = ({ appearance, disabled, position }) => `
  <fluent-select
    ${appearance ? `appearance="${appearance}"` : ''}
    ${disabled ? 'disabled' : ''} 
    ${position ? `position="${position}"` : ''}
    style="margin-bottom: 200px;"
  >
    <fluent-option>Option One</fluent-option>
    <fluent-option>Option Two</fluent-option>
    <fluent-option>Option Three</fluent-option>
    <fluent-option>Option Four</fluent-option>
  </fluent-select>
`;

export const Select = SelectTemplate.bind({});
Select.args = {
  disabled: false,
};

const example = `
<fluent-select>
  <fluent-option>This option has no value</fluent-option>
  <fluent-option disabled>This option is disabled</fluent-option>
  <fluent-option value="hi">This option has a value</fluent-option>
  <fluent-option selected>This option is selected by default</fluent-option>
</fluent-select>
`;

Select.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
