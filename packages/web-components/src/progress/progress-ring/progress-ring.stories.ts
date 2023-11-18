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

ProgressRing.parameters = {
  docs: {
    source: {
      code: defaultExample,
    },
  },
};

export const ProgressRingAnimated = ProgressRingTemplate.bind({});

ProgressRingAnimated.args = {
  paused: false,
};

export const ProgressRingPaused = ProgressRingTemplate.bind({});

ProgressRingPaused.args = {
  paused: true,
};

const animatedExample = `
<fluent-progress-ring></fluent-progress-ring>
`;

const pausedExample = `
<fluent-progress-ring paused></fluent-progress-ring>
`;

ProgressRingAnimated.parameters = {
  docs: {
    source: {
      code: animatedExample,
    },
  },
};

ProgressRingPaused.parameters = {
  docs: {
    source: {
      code: pausedExample,
    },
  },
};
