import { html } from '@microsoft/fast-element';
import './define';
import { renderComponent } from '../helpers.stories.js';
import { Popover as FluentPopover } from './popover.js';
import { PositioningShorthand } from './popover.options.js';

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

    /* .cropped-area-container {
      width: 1900px;
      height: 1900px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    } */

    fluent-popover {
      inset: 0;
      margin: auto;
    }
  </style>

  <div class="popover-story-container">
    <!-- <div class="cropped-area-container"> -->
    <fluent-popover
      overflow-boundary-selector="#storybook-preview-iframe"
      position="${x => x.position}"
      mode="${x => x.mode}"
      size="${x => x.size}"
    >
      <div slot="popover-content">${x => x.content}</div>
      <fluent-button slot="trigger">Toggle Popover</fluent-button>
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

function openPopover(id: string) {
  const popover = document.querySelector(`#${id}`) as FluentPopover;
  if (popover) {
    popover.open = true;
  }
}

export default {
  title: 'Components/Popover',
  tags: ['autodocs'],
  args: {
    id: 'popoverId',
    size: 'medium',
    beak: true,
    open: false,
    anchorId: 'popover-anchor-above-center',
    targetId: undefined,
    position: PositioningShorthand.aboveCenter,
    mode: 'auto',
  },
  decorators: [
    (storyFn: any, context: any) => {
      const story = storyFn();
      setTimeout(scrollContainerCenter, 0);

      if (context.args.open) {
        setTimeout(() => openPopover(context.args.id), 1000);
      }
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

// export const PopoverAboveStart = renderComponent(template).bind({}) as any;
// PopoverAboveStart.args = {
//   id: 'popover-element-above-start',
//   content: html` <div class="content">Popover content</div> `,
//   position: PositioningShorthand.aboveStart,
//   mode: 'manual',
//   open: true,
//   anchorId: 'popover-anchor-above-start',
// };

// export const PopoverAboveCenter = renderComponent(template).bind({}) as any;
// PopoverAboveCenter.args = {
//   id: 'popover-element-above-center',
//   content: html` <div class="content">Popover content</div> `,
//   position: PositioningShorthand.aboveCenter,
//   mode: 'manual',
//   open: true,
//   anchorId: 'popover-anchor-above-center',
// };

// export const PopoverAboveEnd = renderComponent(template).bind({}) as any;
// PopoverAboveEnd.args = {
//   id: 'popover-element-above-end',
//   content: html` <div class="content">Popover content</div> `,
//   position: PositioningShorthand.aboveEnd,
//   mode: 'manual',
//   open: true,
//   anchorId: 'popover-anchor-above-end',
// };

// export const PopoverBelowStart = renderComponent(template).bind({}) as any;
// PopoverBelowStart.args = {
//   id: 'popover-element-below-start',
//   content: html` <div class="content">Popover content</div> `,
//   position: PositioningShorthand.belowStart,
//   mode: 'manual',
//   open: true,
//   anchorId: 'popover-anchor-below-start',
// };

// export const PopoverBelowCenter = renderComponent(template).bind({}) as any;
// PopoverBelowCenter.args = {
//   id: 'popover-element-below-center',
//   content: html` <div class="content">Popover content</div> `,
//   position: PositioningShorthand.belowCenter,
//   mode: 'manual',
//   open: true,
//   anchorId: 'popover-anchor-below-center',
// };

// export const PopoverBelowEnd = renderComponent(template).bind({}) as any;
// PopoverBelowEnd.args = {
//   id: 'popover-element-below-end',
//   content: html` <div class="content">Popover content</div> `,
//   position: PositioningShorthand.belowEnd,
//   mode: 'manual',
//   open: true,
//   anchorId: 'popover-anchor-below-end',
// };

// export const PopoverStartTop = renderComponent(template).bind({}) as any;
// PopoverStartTop.args = {
//   id: 'popover-element-start-top',
//   content: html` <div class="content">Popover content</div> `,
//   position: PositioningShorthand.startTop,
//   mode: 'manual',
//   open: true,
//   anchorId: 'popover-anchor-start-top',
// };

// export const PopoverStartMiddle = renderComponent(template).bind({}) as any;
// PopoverStartMiddle.args = {
//   id: 'popover-element-start-middle',
//   content: html` <div class="content">Popover content</div> `,
//   position: PositioningShorthand.startMiddle,
//   mode: 'manual',
//   open: true,
//   anchorId: 'popover-anchor-start-middle',
// };

// export const PopoverStartBottom = renderComponent(template).bind({}) as any;
// PopoverStartBottom.args = {
//   id: 'popover-element-start-bottom',
//   content: html` <div class="content">Popover content</div> `,
//   position: PositioningShorthand.startBottom,
//   mode: 'manual',
//   open: true,
//   anchorId: 'popover-anchor-start-bottom',
// };

// export const PopoverEndTop = renderComponent(template).bind({}) as any;
// PopoverEndTop.args = {
//   id: 'popover-element-end-top',
//   content: html` <div class="content">Popover content</div> `,
//   position: PositioningShorthand.endTop,
//   mode: 'manual',
//   open: true,
//   anchorId: 'popover-anchor-end-top',
// };

// export const PopoverEndMiddle = renderComponent(template).bind({}) as any;
// PopoverEndMiddle.args = {
//   id: 'popover-element-end-middle',
//   content: html` <div class="content">Popover content</div> `,
//   position: PositioningShorthand.endMiddle,
//   mode: 'manual',
//   open: true,
//   anchorId: 'popover-anchor-end-middle',
// };

// export const PopoverEndBottom = renderComponent(template).bind({}) as any;
// PopoverEndBottom.args = {
//   id: 'popover-element-end-bottom',
//   content: html` <div class="content">Popover content</div> `,
//   position: PositioningShorthand.endBottom,
//   mode: 'manual',
//   open: true,
//   anchorId: 'popover-anchor-end-bottom',
// };
