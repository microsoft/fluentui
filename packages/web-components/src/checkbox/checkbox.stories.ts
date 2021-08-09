import addons from '@storybook/addons';
import { STORY_RENDERED } from '@storybook/core-events';
import { Checkbox as FoundationCheckbox } from '@microsoft/fast-foundation';
import { fluentCheckbox } from './index';

addons.getChannel().addListener(STORY_RENDERED, (name: string) => {
  if (name.toLowerCase().startsWith('checkbox')) {
    document.querySelectorAll('.flag-indeterminate').forEach((el: FoundationCheckbox) => {
      el.indeterminate = true;
    });
  }
});

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
  label: 'Label',
  checked: false,
  disabled: false,
  required: false,
};
