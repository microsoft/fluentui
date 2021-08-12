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
  value: 50,
};
