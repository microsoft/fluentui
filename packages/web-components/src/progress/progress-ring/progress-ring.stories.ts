import { fluentProgressRing } from './index';

export default {
  title: 'Components/Progress Ring',
  component: fluentProgressRing,
  argTypes: {
    paused: {
      control: { type: 'boolean' },
    },
  },
};

const ProgressRingTemplate = ({ paused }) => `
  <fluent-progress-ring 
    ${paused ? `paused="${paused}"` : ''}
  ></fluent-progress-ring>
`;

export const ProgressRing = ProgressRingTemplate.bind({});

ProgressRing.args = {
  paused: false,
};
