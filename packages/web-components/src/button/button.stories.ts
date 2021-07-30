import { fluentButton } from './index';

export default {
  title: 'Button',
  component: fluentButton,
  argTypes: {
    appearance: {
      options: ['neutral', 'accent', 'lighweight', 'outline', 'stealth'],
      control: { type: 'radio' },
    },
  },
};

const ButtonTemplate = ({ appearance, label }) => `<fluent-button appearance="${appearance}">${label}</fluent-button>`;

export const Button = ButtonTemplate.bind({});

Button.args = {
  label: 'Button',
  appearance: 'accent',
};
