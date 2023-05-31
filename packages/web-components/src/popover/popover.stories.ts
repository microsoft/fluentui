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
      defaultValue: true,
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
    <div slot="anchor" style="border: 1px dashed #ccc; height: 80px; width: 80px; line-height: 80px; text-align: center; margin: 40px auto">Anchor</div>
    <div>Popover content ${position || popoverAlign ? [position, popoverAlign].filter(Boolean).join('-') : ''}</div>
</fluent-popover>
`;

export const Popover = PopoverTemplate.bind({});

export const Interactive = (): string => `<fuisb-popover-interactive></fuisb-popover-interactive>`;

export const Nested = (): string => `<fuisb-popover-nested></fuisb-popover-nested>`;
Nested.parameters = {
  docs: {
    description: {
      story: [
        'Popovers can be nested within each other. Too much nesting can result in',
        'extra accessibility considerations and are generally not a great user experience.',
      ].join('\n'),
    },
  },
};
