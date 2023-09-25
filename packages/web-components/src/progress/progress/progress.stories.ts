import { fluentProgress } from './index';

export default {
  title: 'Components/Progress',
  component: fluentProgress,
  argTypes: {
    paused: {
      control: { type: 'boolean' },
    },
  },
};

const ProgressTemplate = ({ paused, value }) => `
  <fluent-progress
    ${paused ? `paused="${paused}"` : ''}
    ${value ? `value=${value}` : ''}
  ></fluent-progress>
`;

export const Progress = ProgressTemplate.bind({});

Progress.args = {
  paused: false,
  value: 50,
};

const defaultExample = `
<fluent-progress min="0" max="100" value="${Progress.args.value}"></fluent-progress>
`;

Progress.parameters = {
  docs: {
    source: {
      code: defaultExample,
    },
  },
};

export const ProgressAnimated = ProgressTemplate.bind({});

ProgressAnimated.args = {
  paused: false,
};

export const ProgressPaused = ProgressTemplate.bind({});

ProgressPaused.args = {
  paused: true,
};

const animatedExample = `
<fluent-progress></fluent-progress>
`;

const pausedExample = `
<fluent-progress paused></fluent-progress>
`;

ProgressAnimated.parameters = {
  docs: {
    source: {
      code: animatedExample,
    },
  },
};

ProgressPaused.parameters = {
  docs: {
    source: {
      code: pausedExample,
    },
  },
};
