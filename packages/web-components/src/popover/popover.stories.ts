import { html } from '@microsoft/fast-element';
import { renderComponent } from '../../util/render';
import './define';

const template = html`
  <style>
    .content {
      width: 200px;
      height: 150px;
    }
    .popover-button:hover {
      cursor: pointer;
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
    <hwc-popover
      size="${x => x.size}"
      ?beak="${x => x.disabled}"
      ?open="${x => x.show}"
      anchor="${x => x.anchor}"
      placement="${x => x.placement}"
    >
      <button id="${x => x.anchor}" tabindex="0" class="popover-button" aria-describedby="popover">
        Popover button
      </button>
      ${x => x.content}
    </hwc-popover>
  </div>
`;

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
  title: 'Horizon Web Components/Popover',
  tags: ['autodocs'],
  args: {
    size: 'medium',
    beak: true,
    show: false,
    anchor: 'popover-anchor',
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

export const Popover = renderComponent(template).bind({});
Popover.args = {
  content: html` <div class="content" slot="popover-content">Popover content</div> `,
};

// Popover.parameters = {
//   docs: {
//     source: {
//       code: html``,
//     },
//   },
// };
