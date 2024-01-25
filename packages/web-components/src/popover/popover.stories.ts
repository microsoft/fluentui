import { html } from '@microsoft/fast-element';
import './define';
import { renderComponent } from '../helpers.stories.js';

const template = html`
  <style>
    .content {
      width: 200px;
      height: 150px;
      background: yellow;
    }
    .container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>

  <div class="container">
    <fluent-popover anchor-id="${x => x.anchorId}">
      <div slot="popover-content">${x => x.content}</div>
      <fluent-button slot="trigger" id="${x => x.anchorId}">Toggle Popover</fluent-button>
    </fluent-popover>
  </div>
`;

// size="${x => x.size}"
// ?beak="${x => x.beak}"
// ?open="${x => x.show}"
// placement="${x => x.placement}"

const placementOptions = [
  'top-start',
  'top-end',
  'right-start',
  'right-end',
  'bottom-start',
  'bottom-end',
  'left-start',
  'left-end',
];

export default {
  title: 'Components/Popover',
  tags: ['autodocs'],
  args: {
    size: 'medium',
    beak: true,
    show: false,
    anchorId: 'popover-anchor',
    targetId: 'popover-target',
  },
  argTypes: {
    size: {
      description: 'Popover size',
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    placement: {
      description: 'Popover Position',
      control: { type: 'select' },
      options: placementOptions,
    },
    beak: {
      description: 'Enables triangular beak',
      control: {
        type: 'boolean',
      },
    },
    show: {
      description: 'Shows / hides the popover',
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Popover = renderComponent(template).bind({}) as any;
Popover.args = {
  content: html` <div class="content">Popover content</div> `,
};
