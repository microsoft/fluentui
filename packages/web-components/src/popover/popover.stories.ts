import './define.js';
import { PopoverAlignment, PopoverPosition } from './popover.options.js';

export default {
  title: 'Components/Popover',
  argTypes: {
    position: {
      options: Object.values(PopoverPosition),
      control: { type: 'radio' },
    },
    popoverAlign: {
      name: 'popover-align',
      options: Object.values(PopoverAlignment),
      control: { type: 'radio' },
    },
    open: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
  },
};

const PopoverTemplate = ({ open, position, popoverAlign }) => `
<fluent-popover
  ${open ? 'open' : ''}
  id="default-popover"
  ${position ? `position="${position}"` : ''}
  ${popoverAlign ? `popover-align="${popoverAlign}"` : ''}
  >
    <div slot="anchor" style="display: inline-block; border: 1px dashed #ccc; height: 80px; width: 80px; margin: 30px 200px">Anchor</div>
    <div>Popover ${position}</div>
</fluent-popover>
`;

export const Popover = PopoverTemplate.bind({});

export const Interactive = (): string => `<fuisb-popover-interactive></fuisb-popover-interactive>`;
