import { css, html, repeat } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { definition } from './tooltip.definition.js';
import type { Tooltip as FluentTooltip } from './tooltip.js';
import { TooltipPositioningOption } from './tooltip.options.js';

type Story = StoryObj<FluentTooltip>;

const tooltipTemplate = html<StoryArgs<FluentTooltip>>`
  <fluent-tooltip
    anchor="${story => story.id}"
    positioning="${story => story.positioning}"
    delay="${story => story.delay}"
  >
    ${story => story.slottedContent?.()}
  </fluent-tooltip>
`;

const storyTemplate = html<StoryArgs<FluentTooltip>>`
  <fluent-link id="${story => story.id}" href="#">Hover me</fluent-link>
  ${tooltipTemplate}
`;

export default {
  title: 'Components/Tooltip',
  component: definition.name,
  render: renderComponent(storyTemplate),
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
} as Meta<FluentTooltip>;

export const Default: Story = {
  args: {
    slottedContent: () => 'Really long tooltip content goes here. Lorem ipsum dolor sit amet.',
  },
  decorators: [
    (Story, { canvasElement }) => {
      const story = Story() as DocumentFragment;
      const id = uniqueId('anchor-');
      const link = story.querySelector('fluent-link');
      link?.setAttribute('id', link.id || id);

      const tooltip = story.querySelector<FluentTooltip>('fluent-tooltip');
      tooltip?.setAttribute('anchor', tooltip.anchor || id);

      canvasElement.style.textAlign = 'center';
      return story;
    },
  ],
};

export const Positioning: Story = {
  render: renderComponent(html<StoryArgs<FluentTooltip>>`
    ${repeat(
      [
        {
          href: '#arrow-step-back-20-regular',
          id: 'above-start',
          positioning: 'above-start',
          transform: 'rotate(-90deg) scaleX(-1)',
          slottedContent: () => 'above-start',
        },
        {
          href: '#arrow-step-out-20-regular',
          id: 'above',
          positioning: 'above',
          transform: 'rotate(0deg)',
          slottedContent: () => 'above',
        },
        {
          href: '#arrow-step-back-20-regular',
          id: 'above-end',
          positioning: 'above-end',
          transform: 'rotate(90deg)',
          slottedContent: () => 'above-end',
        },
        {
          href: '#arrow-step-back-20-regular',
          id: 'before-top',
          positioning: 'before-top',
          transform: 'rotate(0deg)',
          slottedContent: () => 'before-top',
        },
        {
          href: '#arrow-step-out-20-regular',
          id: 'before',
          positioning: 'before',
          transform: 'rotate(-90deg)',
          slottedContent: () => 'before',
        },
        {
          href: '#arrow-step-back-20-regular',
          id: 'before-bottom',
          positioning: 'before-bottom',
          transform: 'rotate(180deg) scaleX(-1)',
          slottedContent: () => 'before-bottom',
        },
        {
          href: '#arrow-step-back-20-regular',
          id: 'after-top',
          positioning: 'after-top',
          transform: 'rotate(0deg) scaleX(-1)',
          slottedContent: () => 'after-top',
        },
        {
          href: '#arrow-step-out-20-regular',
          id: 'after',
          positioning: 'after',
          transform: 'rotate(90deg)',
          slottedContent: () => 'after',
        },
        {
          href: '#arrow-step-back-20-regular',
          id: 'after-bottom',
          positioning: 'after-bottom',
          transform: 'rotate(180deg)',
          slottedContent: () => 'after-bottom',
        },
        {
          href: '#arrow-step-back-20-regular',
          id: 'below-start',
          positioning: 'below-start',
          transform: 'rotate(-90deg)',
          slottedContent: () => 'below-start',
        },
        {
          href: '#arrow-step-out-20-regular',
          id: 'below',
          positioning: 'below',
          transform: 'rotate(180deg)',
          slottedContent: () => 'below',
        },
        {
          href: '#arrow-step-back-20-regular',
          id: 'below-end',
          positioning: 'below-end',
          transform: 'rotate(90deg) scaleX(-1)',
          slottedContent: () => 'below-end',
        },
      ],

      html`
        <fluent-button
          icon-only
          id="${story => story.id}"
          size="large"
          style="grid-area: ${story => story.positioning}"
        >
          <svg style="transform: ${story => story.transform}"><use href="${story => story.href}"></svg>
        </fluent-button>
        ${tooltipTemplate}
      `,
    )}
  `),
  decorators: [
    (Story, context) => {
      const { args, canvasElement } = context;
      const story = Story() as DocumentFragment;

      const styles = css`
        .grid {
          display: grid;
          margin: auto;
          gap: 4px;
          width: min-content;
          grid-template-areas:
            '. above-start above above-end .'
            'before-top . . . after-top'
            'before . . . after'
            'before-bottom . . . after-bottom'
            '. below-start below below-end .';
        }
      `;
      styles.addStylesTo(canvasElement);
      canvasElement.classList.add('grid');

      // Rendering the sprite sheet here prevents it from being included in the code snippet
      html`
        <svg style="display: none">
          <symbol id="arrow-step-out-20-regular" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              d="M10 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0a2 2 0 0 1-4 0m2-4a.5.5 0 0 0 .5-.5V3.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L9.5 3.707V11.5a.5.5 0 0 0 .5.5"
            />
          </symbol>
          <symbol id="arrow-step-back-20-regular" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              d="M7.851 3.146a.5.5 0 0 1 0 .707L4.706 7H10c2.932 0 5.593 1.64 6.936 4.043a.5.5 0 1 1-.872.488C14.894 9.439 12.564 8 10 8H4.707l3.144 3.145a.5.5 0 0 1-.707.707L3.161 7.867a.5.5 0 0 1-.014-.721l3.997-4a.5.5 0 0 1 .707 0M8 15a2 2 0 1 1 4 0a2 2 0 0 1-4 0m2-1a1 1 0 1 0 0 2a1 1 0 0 0 0-2"
            />
          </symbol>
        </svg>
      `.render(args, story);

      return story;
    },
  ],
};
