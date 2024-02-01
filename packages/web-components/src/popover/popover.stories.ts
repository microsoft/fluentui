import { html } from '@microsoft/fast-element';
import './define';
import { renderComponent } from '../helpers.stories.js';
import { PositioningShorthand } from './popover.js';

const template = html`
  <style>
    .popover-story-container {
      width: 600px;
      height: 600px;
      overflow: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      /* border: 1px solid black; */
    }

    .cropped-area-container {
      width: 1900px;
      height: 1900px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
  </style>

  <div class="popover-story-container">
    <!-- <div class="cropped-area-container"> -->
    <fluent-popover
      anchor-id="${x => x.anchorId}"
      overflow-boundary-selector=".popover-story-container"
      position="${x => x.position}"
      size="large"
      ?open="${x => x.open}"
      mode="${x => x.mode}"
    >
      <div slot="popover-content">${x => x.content}</div>
      <fluent-button slot="trigger" id="${x => x.anchorId}">Toggle Popover</fluent-button>
    </fluent-popover>
    <!-- </div> -->
  </div>
`;

function scrollContainerCenter() {
  const container = document.querySelector('.popover-story-container');
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
    open: false,
    anchorId: 'popover-anchor',
    targetId: 'popover-target',
    position: PositioningShorthand.aboveCenter,
    mode: 'auto',
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
    position: {
      description: 'Popover Position',
      control: { type: 'select' },
      options: Object.values(PositioningShorthand),
    },
    beak: {
      description: 'Enables triangular beak',
      control: {
        type: 'boolean',
      },
    },
    open: {
      description: 'Shows / hides the popover',
      control: {
        type: 'boolean',
      },
    },
    mode: {
      description: 'Popover mode',
      control: { type: 'select' },
      options: ['auto', 'manual'],
    },
  },
};

export const Popover = renderComponent(template).bind({}) as any;
Popover.args = {
  content: html` <div class="content">Popover content</div> `,
};

export const PopoverAboveStart = renderComponent(template).bind({}) as any;
PopoverAboveStart.args = {
  content: html` <div class="content">Popover content</div> `,
  position: PositioningShorthand.aboveStart,
  mode: 'manual',
  open: true,
};

export const PopoverAboveCenter = renderComponent(template).bind({}) as any;
PopoverAboveCenter.args = {
  content: html` <div class="content">Popover content</div> `,
  position: PositioningShorthand.aboveCenter,
  mode: 'manual',
  open: true,
};

export const PopoverAboveEnd = renderComponent(template).bind({}) as any;
PopoverAboveEnd.args = {
  content: html` <div class="content">Popover content</div> `,
  position: PositioningShorthand.aboveEnd,
  mode: 'manual',
  open: true,
};

export const PopoverBelowStart = renderComponent(template).bind({}) as any;
PopoverBelowStart.args = {
  content: html` <div class="content">Popover content</div> `,
  position: PositioningShorthand.belowStart,
  mode: 'manual',
  open: true,
};

export const PopoverBelowCenter = renderComponent(template).bind({}) as any;
PopoverBelowCenter.args = {
  content: html` <div class="content">Popover content</div> `,
  position: PositioningShorthand.belowCenter,
  mode: 'manual',
  open: true,
};

export const PopoverBelowEnd = renderComponent(template).bind({}) as any;
PopoverBelowEnd.args = {
  content: html` <div class="content">Popover content</div> `,
  position: PositioningShorthand.belowEnd,
  mode: 'manual',
  open: true,
};

export const PopoverStartTop = renderComponent(template).bind({}) as any;
PopoverStartTop.args = {
  content: html` <div class="content">Popover content</div> `,
  position: PositioningShorthand.startTop,
  mode: 'manual',
  open: true,
};

export const PopoverStartMiddle = renderComponent(template).bind({}) as any;
PopoverStartMiddle.args = {
  content: html` <div class="content">Popover content</div> `,
  position: PositioningShorthand.startMiddle,
  mode: 'manual',
  open: true,
};

export const PopoverStartBottom = renderComponent(template).bind({}) as any;
PopoverStartBottom.args = {
  content: html` <div class="content">Popover content</div> `,
  position: PositioningShorthand.startBottom,
  mode: 'manual',
  open: true,
};

export const PopoverEndTop = renderComponent(template).bind({}) as any;
PopoverEndTop.args = {
  content: html` <div class="content">Popover content</div> `,
  position: PositioningShorthand.endTop,
  mode: 'manual',
  open: true,
};

export const PopoverEndMiddle = renderComponent(template).bind({}) as any;
PopoverEndMiddle.args = {
  content: html` <div class="content">Popover content</div> `,
  position: PositioningShorthand.endMiddle,
  mode: 'manual',
  open: true,
};

export const PopoverEndBottom = renderComponent(template).bind({}) as any;
PopoverEndBottom.args = {
  content: html` <div class="content">Popover content</div> `,
  position: PositioningShorthand.endBottom,
  mode: 'manual',
  open: true,
};
