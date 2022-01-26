import { fluentFlipper } from './index';

export default {
  title: 'Components/Flipper',
  component: fluentFlipper,
  argTypes: {
    direction: {
      options: ['previous', 'next'],
      control: { type: 'select' },
    },
    disabled: { type: 'boolean' },
  },
};

const FlipperTemplate = ({ direction, disabled, content }) =>
  `<fluent-flipper 
    ${disabled ? 'disabled' : ''} 
    ${direction ? `direction="${direction}"` : ''}
  ></fluent-flipper>`;

export const Flipper = FlipperTemplate.bind({});

Flipper.args = {
  disabled: false,
  direction: 'next',
};

const example = `
<fluent-flipper direction="previous"></fluent-flipper>
`;

Flipper.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
