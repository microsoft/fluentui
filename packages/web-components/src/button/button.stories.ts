import { fluentButton } from './index';

export default {
  title: 'Components/Button',
  component: fluentButton,
  argTypes: {
    appearance: {
      description: 'This controls the basic appearances',
      options: ['neutral', 'accent', 'lighweight', 'outline', 'stealth'],
      control: { type: 'select' },
      default: 'neutral',
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

const ButtonTemplate = ({ appearance, disabled, label }) =>
  `<fluent-button ${disabled ? 'disabled' : ''} appearance="${appearance}">${label}</fluent-button>`;

export const Button = ButtonTemplate.bind({});

Button.args = {
  label: 'Button',
};
