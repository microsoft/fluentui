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
  `<fluent-flipper ${disabled ? 'disabled' : ''} direction="${direction}"></fluent-flipper>`;

export const Flipper = FlipperTemplate.bind({});

Flipper.args = {
  disabled: false,
  direction: 'next',
};
