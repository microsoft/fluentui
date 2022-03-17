import { fluentBadge } from './index';

export default {
  title: 'Components/Badge',
  component: fluentBadge,
  argTypes: {
    appearance: {
      options: ['neutral', 'accent', 'lightweight'],
      control: { type: 'radio' },
    },
  },
};

const BadgeTemplate = ({ appearance, label }) => `
  <fluent-badge
    ${appearance ? `appearance="${appearance}"` : ''}
  >${label}</fluent-badge>`;

export const Badge = BadgeTemplate.bind({});

Badge.args = {
  label: 'Badge',
  appearance: 'accent',
};

Badge.parameters = {
  docs: {
    source: {
      code: `<fluent-badge appearance="accent">Text</fluent-badge>`,
    },
  },
};
