import './define.js';
import { PopoverAlignment, PopoverAppearance, PopoverPosition } from './popover.options.js';

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
    appearance: {
      options: [undefined, ...Object.values(PopoverAppearance)],
      control: { type: 'select' },
    },
  },
};

const PopoverTemplate = ({ open, position, popoverAlign, appearance }) => `
<fluent-popover
  ${open ? 'open' : ''}
  ${position ? `position="${position}"` : ''}
  ${popoverAlign ? `popover-align="${popoverAlign}"` : ''}
  ${appearance ? `appearance="${appearance}"` : ''}
  >
    <div slot="anchor" style="border: 1px dashed #ccc; height: 80px; width: 80px; line-height: 80px; text-align: center; margin: 40px auto">Anchor</div>
    <div>Popover content ${position || popoverAlign ? [position, popoverAlign].filter(Boolean).join('-') : ''}</div>
</fluent-popover>
`;

export const Popover = PopoverTemplate.bind({});

export const CustomAnchor = (): string => `
<button id="external-anchor-by-id" style="margin: 80px 200px">Custom Anchor</button>
<span id="alternate-anchor">alternate</span>
<fluent-popover open anchor="external-anchor-by-id">This popover is attached to the anchor by HTML id</fluent-popover>
`;
CustomAnchor.parameters = {
  docs: {
    description: {
      story: [
        'By default the anchor is slotted using an `anchor` slot.',
        "It is possible to attach the popover to an external anchor by passing the anchor' id to `anchor` attribute.",
      ].join('\n'),
    },
  },
};

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

export const Appearance = (): string => `
<div style="display: flex; justify-content: space-evenly; margin-top: 2em;">
  <fluent-popover open>
    <button slot="anchor">Default</button>
    <div>Default appearance</div>
  </fluent-popover>
  <fluent-popover open appearance="brand">
    <button slot="anchor">Brand</button>
    <div>Brand appearance</div>
  </fluent-popover>
  <fluent-popover open appearance="inverted">
    <button slot="anchor">Inverted</button>
    <div>Inverted appearance</div>
  </fluent-popover>
</div>
`;
Appearance.parameters = {
  docs: {
    description: {
      story: [
        'The appearance of the popover can be controlled using the `appearance` attribute.',
        'It can be default (not set), `brand` or `inverted`.',
      ].join('\n'),
    },
  },
};
