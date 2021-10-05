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
  <fluent-progress style="margin-top:10px;"
    ${paused ? `paused="${paused}"` : ''}
  ></fluent-progress>
`;

export const Progress = ProgressTemplate.bind({});

Progress.args = {
  value: 50,
  paused: false,
};

const defaultExample = `
<fluent-progress min="0" max="100" value="${Progress.args.value}"></fluent-progress>
`;

const animatedExample = `
<fluent-progress></fluent-progress>
`;

Progress.parameters = {
  docs: {
    source: {
      code: defaultExample + animatedExample,
    },
  },
};
