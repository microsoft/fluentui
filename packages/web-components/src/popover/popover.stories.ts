import { definition } from './popover.definition';

definition.define();

export default {
  title: 'Components/Popover',
  argTypes: {
    position: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
    arrow: {
      control: { type: 'boolean' },
    },
  },
};

const PopoverTemplate = ({ arrow, position }) => `
<fluent-popover
  open
  id="default-popover"
  ${position ? `position="${position}"` : ''}
  ${arrow ? `arrow` : ''}  
  >
    <div slot="anchor" style="display: inline-block; border: 1px dashed #ccc; height: 80px; width: 80px; margin: 30px 200px">Anchor</div>
    <div>Popover ${position}</div>
</fluent-popover>
`;

export const Popover = PopoverTemplate.bind({});
Popover.args = {
  position: 'top',
};

export const Interactive = (): string => `<fuisb-popover-interactive></fuisb-popover-interactive>`;
