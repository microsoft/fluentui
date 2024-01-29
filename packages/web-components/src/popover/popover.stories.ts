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

    .popover-container {
      width: 600px;
      height: 600px;
      overflow: auto;
      border: 1px solid black;
    }

    .cropped-area-container {
      width: 1900px;
      height: 1900px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>

  <div class="popover-container">
    <div class="cropped-area-container">
      <fluent-popover
        anchor-id="${x => x.anchorId}"
        anchor-bounds-selector=".popover-container"
        placement="${x => x.placement}"
      >
        <div slot="popover-content">${x => x.content}</div>
        <fluent-button slot="trigger" id="${x => x.anchorId}">Toggle Popover</fluent-button>
      </fluent-popover>
    </div>
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

function scrollContainerCenter() {
  const container = document.querySelector('.popover-container');
  if (container) {
    container.scrollTop = (container.scrollHeight - container.clientHeight) / 2;
    container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
  }
}

export default {
  title: 'Components/Popover',
  tags: ['autodocs'],
  args: {
    size: 'medium',
    beak: true,
    show: false,
    anchorId: 'popover-anchor',
    targetId: 'popover-target',
    placement: 'top-start',
  },
  decorators: [
    (storyFn: any) => {
      const story = storyFn();
      setTimeout(scrollContainerCenter, 0);
      return story;
    },
  ],
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
