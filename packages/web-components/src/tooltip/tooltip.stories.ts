import { html, render, repeat } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import { Meta, renderComponent, Story } from '../helpers.stories.js';
import { definition } from './tooltip.definition.js';
import { Tooltip } from './tooltip.js';
import { TooltipPositioningOption } from './tooltip.options.js';

const storyTemplate = () => {
  const id = uniqueId('anchor-');

  return html`
    <div>
      <fluent-link id="${id}" href="#">Hover me</fluent-link>
      <fluent-tooltip anchor="${id}" positioning="${story => story.positioning}" delay="${story => story.delay}">
        ${story => story.slottedContent?.()}
      </fluent-tooltip>
    </div>
  `;
};

export default {
  title: 'Components/Tooltip',
  component: definition.name,
  render: renderComponent(storyTemplate()),
  argTypes: {
    anchor: {
      description: 'The target element for the tooltip to anchor on',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    slottedContent: {
      control: false,
      description: 'The default slot',
      table: { category: 'slots', type: {} },
    },
    delay: {
      control: 'number',
      description: 'Number of milliseconds to delay the tooltip from showing/hiding on hover. Default is 250ms',
      table: { category: 'attributes', type: { summary: 'number' } },
    },
    positioning: {
      control: 'select',
      description: 'Controls the positioning of the tooltip',
      mapping: { '': null, ...Object.keys(TooltipPositioningOption) },
      options: ['', ...Object.keys(TooltipPositioningOption)],
      table: {
        category: 'attributes',
        type: { summary: Object.keys(TooltipPositioningOption).join('|') },
      },
    },
  },
} as unknown as Meta<Tooltip>;

export const Default: Story<Tooltip> = args => {
  return renderComponent(html`${render(args, storyTemplate)}`)(args);
};
Default.args = {
  slottedContent: () => html`Really long tooltip content goes here. lorem ipsum dolor sit amet.`,
};

const iconArrowRight = (rotation = 0) => html`<svg
  style="transform: rotate(${rotation}deg)"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="currentColor"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12.149 3.14636C11.9537 3.34158 11.9536 3.65816 12.1489 3.85347L15.2939 7H10.0001C7.06756 7 4.40686 8.63986 3.06365 11.0427C2.92891 11.2838 3.01508 11.5884 3.25612 11.7231C3.49716 11.8579 3.80179 11.7717 3.93653 11.5307C5.10604 9.43851 7.43601 8 10.0001 8H15.2928L12.1489 11.1454C11.9536 11.3407 11.9537 11.6573 12.149 11.8525C12.3443 12.0478 12.6609 12.0477 12.8561 11.8524L16.8396 7.86711C16.9383 7.77577 17.0001 7.6451 17.0001 7.5V7.5C17.0002 7.37199 16.9514 7.24367 16.8537 7.14598L12.8561 3.14653C12.6609 2.95122 12.3443 2.95115 12.149 3.14636ZM12.0001 15C12.0001 13.8954 11.1047 13 10.0001 13C8.89552 13 8.00009 13.8954 8.00009 15C8.00009 16.1046 8.89552 17 10.0001 17C11.1047 17 12.0001 16.1046 12.0001 15ZM10.0001 14C10.5524 14 11.0001 14.4477 11.0001 15C11.0001 15.5523 10.5524 16 10.0001 16C9.4478 16 9.00009 15.5523 9.00009 15C9.00009 14.4477 9.4478 14 10.0001 14Z"
  />
</svg>`;

const iconArrowLeft = (rotation = 0) => html`<svg
  style="transform: rotate(${rotation}deg)"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="currentColor"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M7.85107 3.14636C8.04638 3.34158 8.04645 3.65816 7.85124 3.85347L4.70617 7H10C12.9325 7 15.5932 8.63986 16.9364 11.0427C17.0712 11.2838 16.985 11.5884 16.744 11.7231C16.5029 11.8579 16.1983 11.7717 16.0636 11.5307C14.894 9.43851 12.5641 8 10 8H4.70725L7.85124 11.1454C8.04645 11.3407 8.04638 11.6573 7.85107 11.8525C7.65577 12.0478 7.33918 12.0477 7.14397 11.8524L3.16054 7.86711C3.06181 7.77577 3 7.6451 3 7.5C3 7.50009 3 7.49991 3 7.5C2.99993 7.37199 3.04872 7.24367 3.14636 7.14598L7.14397 3.14653C7.33918 2.95122 7.65577 2.95115 7.85107 3.14636ZM8 15C8 13.8954 8.89543 13 10 13C11.1046 13 12 13.8954 12 15C12 16.1046 11.1046 17 10 17C8.89543 17 8 16.1046 8 15ZM10 14C9.44772 14 9 14.4477 9 15C9 15.5523 9.44772 16 10 16C10.5523 16 11 15.5523 11 15C11 14.4477 10.5523 14 10 14Z"
  />
</svg>`;

const iconArrowUp = (rotation = 0) => html`<svg
  style="transform: rotate(${rotation}deg)"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="currentColor"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12.75 13.75C12.75 14.1642 12.4142 14.5 12 14.5C11.5858 14.5 11.25 14.1642 11.25 13.75V4.49365L7.76581 7.79446C7.46511 8.07934 6.99041 8.06651 6.70554 7.76581C6.42066 7.46511 6.43349 6.99041 6.73419 6.70554L11.4842 2.20554C11.7735 1.93149 12.2265 1.93149 12.5158 2.20554L17.2658 6.70554C17.5665 6.99041 17.5793 7.46511 17.2945 7.76581C17.0096 8.06651 16.5349 8.07934 16.2342 7.79446L12.75 4.49365V13.75ZM15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19C9 17.3431 10.3431 16 12 16C13.6569 16 15 17.3431 15 19ZM10.5 19C10.5 19.8284 11.1716 20.5 12 20.5C12.8284 20.5 13.5 19.8284 13.5 19C13.5 18.1716 12.8284 17.5 12 17.5C11.1716 17.5 10.5 18.1716 10.5 19Z"
  />
</svg>`;

const glyphs = {
  'above-start': iconArrowRight(-90),
  above: iconArrowUp(),
  'above-end': iconArrowLeft(90),
  'below-start': iconArrowLeft(-90),
  below: iconArrowUp(180),
  'below-end': iconArrowRight(90),
  'before-top': iconArrowLeft(0),
  before: iconArrowUp(-90),
  'before-bottom': iconArrowRight(180),
  'after-top': iconArrowRight(),
  after: iconArrowUp(90),
  'after-bottom': iconArrowLeft(180),
};

const positionButtonTemplate = html`
  <fluent-button id="btn-${x => x.id}" style="grid-area: ${x => x.id}">
    ${x => glyphs[x.id as keyof typeof glyphs]}
  </fluent-button>
`;

const positionTooltipTemplate = html`
  <fluent-tooltip anchor="btn-${x => x.id}" positioning="${x => x.id}"> ${x => x.id} </fluent-tooltip>
`;

export const Positioning: Story<Tooltip> = renderComponent(html`
  <div>
    <style>
      .grid {
        box-sizing: border-box;
        display: grid;
        gap: 4px;
        max-width: min-content;
        grid-template-areas:
          '. above-start above above-end .'
          'before-top . . . after-top'
          'before . . . after'
          'before-bottom . . . after-bottom'
          '. below-start below below-end .';
      }
      .grid fluent-button {
        aspect-ratio: 1;
        min-width: 44px;
      }
    </style>
    <div class="grid">${repeat(x => x.storyItems, positionButtonTemplate)}</div>

    ${repeat(x => x.storyItems, positionTooltipTemplate)}
  </div>
`).bind({});

Positioning.args = {
  storyItems: Object.keys(TooltipPositioningOption).map(id => ({ id })),
};
