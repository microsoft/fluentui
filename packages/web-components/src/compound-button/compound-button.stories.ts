import { fluentCompoundButton } from './index';

export default {
  title: 'Components/Compound Button',
  component: fluentCompoundButton,
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

const ButtonTemplate = ({ appearance, disabled, description, label }) =>
  `
    <fluent-compound-button
      ${disabled ? 'disabled' : ''}
      ${appearance ? `appearance="${appearance}"` : ''}
    >
      ${label}
      <span slot="end">${description}</span>
    </fluent-compound-button>
  `;

export const Button = ButtonTemplate.bind({});

Button.args = {
  label: 'Compound Button',
  description: 'Description passed to the end slot',
  disabled: false,
  appearance: 'accent',
};

const example = `
<fluent-compound-button appearance="accent">Compound Button <span slot="end">Description passed to the end slot</span></fluent-compound-button>
`;

Button.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
