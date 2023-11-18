import { fluentButton } from './index';

export default {
  title: 'Components/Button',
  component: fluentButton,
  argTypes: {
    appearance: {
      description: 'This controls the basic appearances',
      control: { type: 'select' },
      options: ['neutral', 'accent', 'lightweight', 'outline', 'stealth'],
      default: 'neutral',
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

const ButtonTemplate = ({ appearance, disabled, label }) =>
  `
    <fluent-button
      ${disabled ? 'disabled' : ''}
      ${appearance ? `appearance="${appearance}"` : ''}
    >
      ${label}
    </fluent-button>
  `;

export const Button = ButtonTemplate.bind({});

Button.args = {
  label: 'Button',
  disabled: false,
  appearance: 'accent',
};

const example = `
<fluent-button appearance="accent">Button</fluent-button>
`;

Button.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
