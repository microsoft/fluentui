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

const ProgressRingTemplate = ({ paused, value }) => `
  <fluent-progress-ring
    ${value ? `value="${value}"` : ''}
  ></fluent-progress-ring>
  <fluent-progress-ring
    ${paused ? `paused="${paused}"` : ''}
  ></fluent-progress-ring>
`;

export const ProgressRing = ProgressRingTemplate.bind({});

ProgressRing.args = {
  paused: false,
  value: 65,
};

const defaultExample = `
<fluent-progress-ring min="0" max="100" value="${ProgressRing.args.value}"></fluent-progress-ring>
`;

const animatedExample = `
<fluent-progress-ring></fluent-progress-ring>
`;

ProgressRing.parameters = {
  docs: {
    source: {
      code: defaultExample + animatedExample,
    },
  },
};
