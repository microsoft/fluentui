import { html, ref, when } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Tablist as FluentTablist } from './tablist.js';
import { TablistAppearance as TablistAppearanceValues, TablistOrientation, TablistSize } from './tablist.options.js';

type Story = StoryObj<FluentTablist>;

const storyTemplate = html<StoryArgs<FluentTablist>>`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <fluent-tablist
      orientation="${story => story.orientation}"
      appearance="${story => story.appearance}"
      ?disabled="${story => story.disabled}"
      size="${story => story.size}"
      activeid="${story => story.activeid}"
      @change="${(x, c) => {
        x.panel.textContent = `Panel changed to ${(c.event.target as FluentTablist).activetab?.textContent}`;
      }}"
      ${ref('tablist')}
    >
      <fluent-tab id="first-tab">First Tab</fluent-tab>
      <fluent-tab id="second-tab">
        ${when(
          story => story.hasStartSlot,
          html`<span slot="start">
            <svg
              fill="currentColor"
              aria-hidden="true"
              width="20px"
              height="20px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
                fill="currentColor"
              ></path>
            </svg>
          </span> `,
        )}
        Second Tab
      </fluent-tab>
      <fluent-tab id="third-tab">Third Tab</fluent-tab>
      <fluent-tab id="fourth-tab">Fourth Tab</fluent-tab>
    </fluent-tablist>
    <div ${ref('panel')}></div>
  </div>
`;

export default {
  title: 'Components/Tablist',
  render: renderComponent(storyTemplate),
  argTypes: {
    activeid: {
      control: 'text',
      description: 'The id of the active tab',
      name: 'active-id',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the tablist',
      name: 'disabled',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    orientation: {
      control: 'select',
      description: 'The orientation of the tablist.',
      mapping: { '': null, ...TablistOrientation },
      options: ['', ...Object.values(TablistOrientation)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(TablistOrientation).join('|') },
      },
    },
    appearance: {
      control: 'select',
      description: 'The appearance of the tablist.',
      mapping: { '': null, ...TablistAppearanceValues },
      options: ['', ...Object.values(TablistAppearanceValues)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(TablistAppearanceValues).join('|') },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the tablist.',
      mapping: { '': null, ...TablistSize },
      options: ['', ...Object.values(TablistSize)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(TablistSize).join('|') },
      },
    },
  },
} as Meta<FluentTablist>;

export const Default: Story = {};

export const HorizontalWithStartSlot: Story = {
  args: {
    hasStartSlot: true,
  },
};

export const VerticalOrientation: Story = {
  args: {
    orientation: TablistOrientation.vertical,
  },
  decorators: [
    Story => {
      const story = Story() as HTMLDivElement;
      story.style.flexDirection = 'row';
      return story;
    },
  ],
};

export const VerticalOrientationWithStartSlot: Story = {
  args: {
    orientation: TablistOrientation.vertical,
    hasStartSlot: true,
  },
  decorators: [
    Story => {
      const story = Story() as HTMLDivElement;
      story.style.flexDirection = 'row';
      return story;
    },
  ],
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const ActiveId: Story = {
  args: {
    activeid: 'third-tab',
  },
};

export const SubtleAppearance: Story = {
  args: {
    appearance: 'subtle',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'small',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'small',
  },
};

export const SmallSizeVerticalOrientation: Story = {
  args: {
    orientation: TablistOrientation.vertical,
    size: 'small',
  },
  decorators: [
    Story => {
      const story = Story() as HTMLDivElement;
      story.style.flexDirection = 'row';
      return story;
    },
  ],
};

export const LargeSizeVerticalOrientation: Story = {
  args: {
    orientation: TablistOrientation.vertical,
    size: 'large',
  },
  decorators: [
    Story => {
      const story = Story() as HTMLDivElement;
      story.style.flexDirection = 'row';
      return story;
    },
  ],
};

export const AutoPanelAssociation: Story = {
  render: renderComponent(html<StoryArgs<FluentTablist>>`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <fluent-tablist>
        <fluent-tab aria-controls="panel1">First Tab</fluent-tab>
        <fluent-tab aria-controls="panel2">Second Tab</fluent-tab>
        <fluent-tab aria-controls="panel3">Third Tab</fluent-tab>
        <fluent-tab aria-controls="panel4">Fourth Tab</fluent-tab>
      </fluent-tablist>
      <div id="panel1">First panel</div>
      <div id="panel2">Second panel</div>
      <div id="panel3">Third panel</div>
      <div id="panel4">Fourth panel</div>
    </div>
  `),
};
