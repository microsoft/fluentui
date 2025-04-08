import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Divider as FluentDivider } from './divider.js';
import { DividerAlignContent, DividerAppearance, DividerOrientation, DividerRole } from './divider.options.js';

type Story = StoryObj<FluentDivider>;

const dividerTemplate = html<StoryArgs<FluentDivider>>`
  <fluent-divider
    align-content=${story => story.alignContent}
    appearance=${story => story.appearance}
    role=${story => story.role}
    ?inset=${story => story.inset}
    orientation="${story => story.orientation}"
  >
    ${story => story.slottedContent?.()}
  </fluent-divider>
`;

export default {
  title: 'Components/Divider',
  render: renderComponent(dividerTemplate),
  args: {
    slottedContent: () => '',
  },
  argTypes: {
    alignContent: {
      control: 'select',
      description: 'Align content',
      options: ['', ...Object.values(DividerAlignContent)],
      mapping: { '': null, ...DividerAlignContent },
      table: {
        category: 'attributes',
        type: { summary: Object.values(DividerAlignContent).join('|') },
      },
    },
    appearance: {
      control: 'select',
      description: 'Divider and text colors',
      options: ['', ...Object.values(DividerAppearance)],
      mapping: { '': null, ...DividerAppearance },
      table: {
        category: 'attributes',
        type: { summary: Object.values(DividerAppearance).join('|') },
      },
    },
    role: {
      control: 'select',
      description: 'Set role attribute',
      options: ['', ...Object.values(DividerRole)],
      mapping: { '': null, ...DividerRole },
      table: {
        category: 'attributes',
        type: { summary: Object.values(DividerRole).join('|') },
      },
    },
    inset: {
      control: 'boolean',
      description: 'Pad the ends of divider',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    orientation: {
      control: 'select',
      description: 'Divider layout',
      options: ['', ...Object.values(DividerOrientation)],
      mapping: { '': null, ...DividerOrientation },
      table: {
        category: 'attributes',
        type: { summary: Object.values(DividerOrientation).join('|') },
      },
    },
    slottedContent: {
      control: false,
      description: 'The default slot',
      name: '',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentDivider>;

export const Default: Story = {
  render: renderComponent(dividerTemplate),
};

export const DividerSvgTemplate: Story = {
  args: {
    slottedContent: () => html`<svg width="20px" height="20px" viewBox="0 0 32 33" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 22.0312C13 21.479 12.5523 21.0312 12 21.0312C11.4477 21.0312 11 21.479 11 22.0312V25.0312C11 25.5835 11.4477 26.0312 12 26.0312C12.5523 26.0312 13 25.5835 13 25.0312V22.0312ZM16 15.0312C16.5523 15.0312 17 15.479 17 16.0312V25.0312C17 25.5835 16.5523 26.0312 16 26.0312C15.4477 26.0312 15 25.5835 15 25.0312V16.0312C15 15.479 15.4477 15.0312 16 15.0312ZM21 19.0312C21 18.479 20.5523 18.0312 20 18.0312C19.4477 18.0312 19 18.479 19 19.0312V25.0312C19 25.5835 19.4477 26.0312 20 26.0312C20.5523 26.0312 21 25.5835 21 25.0312V19.0312ZM5 5.03125C5 3.3744 6.34315 2.03125 8 2.03125H18.1716C18.9672 2.03125 19.7303 2.34732 20.2929 2.90993L26.1213 8.73836C26.6839 9.30097 27 10.064 27 10.8597V27.0312C27 28.6881 25.6569 30.0312 24 30.0312H8C6.34315 30.0312 5 28.6881 5 27.0312V5.03125ZM8 4.03125C7.44772 4.03125 7 4.47897 7 5.03125V27.0312C7 27.5835 7.44772 28.0312 8 28.0312H24C24.5523 28.0312 25 27.5835 25 27.0312V12.0312H20C18.3431 12.0312 17 10.6881 17 9.03125V4.03125H8ZM20 10.0312H24.5858L19 4.44546V9.03125C19 9.58353 19.4477 10.0312 20 10.0312Z"
        fill="currentColor"
      />
    </svg>`,
  },
};

export const DividerSvgVerticalTemplate: Story = {
  args: {
    orientation: DividerOrientation.vertical,
    slottedContent: () => html`<svg width="20px" height="20px" viewBox="0 0 32 33" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 22.0312C13 21.479 12.5523 21.0312 12 21.0312C11.4477 21.0312 11 21.479 11 22.0312V25.0312C11 25.5835 11.4477 26.0312 12 26.0312C12.5523 26.0312 13 25.5835 13 25.0312V22.0312ZM16 15.0312C16.5523 15.0312 17 15.479 17 16.0312V25.0312C17 25.5835 16.5523 26.0312 16 26.0312C15.4477 26.0312 15 25.5835 15 25.0312V16.0312C15 15.479 15.4477 15.0312 16 15.0312ZM21 19.0312C21 18.479 20.5523 18.0312 20 18.0312C19.4477 18.0312 19 18.479 19 19.0312V25.0312C19 25.5835 19.4477 26.0312 20 26.0312C20.5523 26.0312 21 25.5835 21 25.0312V19.0312ZM5 5.03125C5 3.3744 6.34315 2.03125 8 2.03125H18.1716C18.9672 2.03125 19.7303 2.34732 20.2929 2.90993L26.1213 8.73836C26.6839 9.30097 27 10.064 27 10.8597V27.0312C27 28.6881 25.6569 30.0312 24 30.0312H8C6.34315 30.0312 5 28.6881 5 27.0312V5.03125ZM8 4.03125C7.44772 4.03125 7 4.47897 7 5.03125V27.0312C7 27.5835 7.44772 28.0312 8 28.0312H24C24.5523 28.0312 25 27.5835 25 27.0312V12.0312H20C18.3431 12.0312 17 10.6881 17 9.03125V4.03125H8ZM20 10.0312H24.5858L19 4.44546V9.03125C19 9.58353 19.4477 10.0312 20 10.0312Z"
        fill="currentColor"
      />
    </svg>`,
  },
};

export const Content: Story = {
  render: renderComponent(html<StoryArgs<FluentDivider>>`
    <fluent-divider align-content="center">
      <em>Wrap your content in an element to render</em>
    </fluent-divider>
  `),
};
export const AlignContent: Story = {
  render: renderComponent(html<StoryArgs<FluentDivider>>`
    <div>
      <fluent-divider align-content="center"><div>center</div></fluent-divider>
      <fluent-divider align-content="start"><div>start</div></fluent-divider>
      <fluent-divider align-content="end"><div>end</div></fluent-divider>
    </div>
  `),
};
export const Appearance: Story = {
  render: renderComponent(html<StoryArgs<FluentDivider>>`
    <div>
      <fluent-divider appearance="strong"><div>strong</div></fluent-divider>
      <fluent-divider appearance="brand"><div>brand</div></fluent-divider>
      <fluent-divider appearance="subtle"><div>subtle</div></fluent-divider>
      <fluent-divider appearance="default"><div>default</div></fluent-divider>
    </div>
  `),
};
export const Role: Story = {
  render: renderComponent(html<StoryArgs<FluentDivider>>`
    <div>
      <fluent-divider role="separator"><div>separator</div></fluent-divider>
      <fluent-divider role="presentation"><div>presentation</div></fluent-divider>
    </div>
  `),
};

// TODO: there is no visual difference between inset="true" and inset="false"
export const Inset: Story = {
  render: renderComponent(html<StoryArgs<FluentDivider>>`
    <div>
      <fluent-divider inset><div>I'm inset from the edges</div></fluent-divider>
      <fluent-divider><div>Default</div></fluent-divider>
    </div>
  `),
};
export const Orientation: Story = {
  render: renderComponent(html<StoryArgs<FluentDivider>>`
    <div>
      <fluent-divider orientation="vertical"><div>vertical</div></fluent-divider>
      <br />
      <fluent-divider orientation="horizontal"><div>horizontal</div></fluent-divider>
    </div>
  `),
};
