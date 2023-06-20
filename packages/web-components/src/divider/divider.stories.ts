import { fluentDivider } from './index';

export default {
  title: 'Components/Divider',
  component: fluentDivider,
  argTypes: {
    orientation: {
      description: 'This controls the orientation',
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      default: 'horizontal',
    },
    role: {
      description: 'This controls the role',
      control: { type: 'select' },
      options: ['presentation', 'separator'],
      default: 'presentation',
    },
  },
};

const DividerTemplate = ({ orientation, role }) =>
  `<div style="height: 40px; width: 100%;"><fluent-divider 
    ${orientation ? `orientation="${orientation}"` : ''}
    ${role ? `role="${role}"` : ''}
  >
  </fluent-divider></div>`;

export const Divider = DividerTemplate.bind({});

Divider.args = {
  orientation: 'horizontal',
  role: 'presentation',
};

const example = `
<fluent-divider></fluent-divider>
`;

Divider.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
