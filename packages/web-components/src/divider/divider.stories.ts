import { fluentDivider } from './index';

export default {
  title: 'Components/Divider',
  component: fluentDivider,
};

const DividerTemplate = () => `<fluent-divider role="presentation"></fluent-divider>`;

export const Divider = DividerTemplate.bind({});
