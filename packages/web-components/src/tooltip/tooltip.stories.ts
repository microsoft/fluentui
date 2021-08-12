import { fluentTooltip } from './index';

export default {
  title: 'Components/Tooltip',
  components: fluentTooltip,
  argTypes: {
    position: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'radio' },
    },
  },
};

const TooltipTemplate = ({ label, position }) => `
  <fluent-tooltip 
    anchor="button" 
    ${position ? `position="${position}"` : ''}
  >
    ${label}
  </fluent-tooltip>
  <fluent-button id="button">Reveal Tooltip</fluent-button>
`;

export const Tooltip = TooltipTemplate.bind({});

Tooltip.args = {
  label: `I'm helping!`,
};
