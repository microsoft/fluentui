import { fluentAnchor } from './index';

export default {
  title: 'Components/Anchor',
  component: fluentAnchor,
  argTypes: {
    appearance: {
      options: ['neutral', 'accent', 'hypertext', 'lightweight', 'outline', 'stealth'],
      control: { type: 'radio' },
    },
  },
};

const AnchorTemplate = ({ appearance, label }) => `<fluent-anchor appearance="${appearance}">${label}</fluent-anchor>`;

export const Anchor = AnchorTemplate.bind({});

Anchor.args = {
  label: 'Achor',
  appearance: 'neutral',
};
