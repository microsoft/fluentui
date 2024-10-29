import { html, ref } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
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
      <fluent-tab aria-controls="${story => story.panelId}" id="first-tab">First Tab</fluent-tab>
      <fluent-tab aria-controls="${story => story.panelId}" id="second-tab">Second Tab</fluent-tab>
      <fluent-tab aria-controls="${story => story.panelId}" id="third-tab">Third Tab</fluent-tab>
      <fluent-tab aria-controls="${story => story.panelId}" id="fourth-tab">Fourth Tab</fluent-tab>
    </fluent-tablist>
    <div ${ref('panel')} role="tabpanel" id="${story => story.panelId}"></div>
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
    panelId: { table: { disalbe: true } },
  },
} as Meta<FluentTablist>;

export const Default: Story = {
  args: {
    panelId: uniqueId('tabpanel-'),
  },
};

export const VerticalOrientation: Story = {
  args: {
    orientation: TablistOrientation.vertical,
    panelId: uniqueId('tabpanel-'),
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
    panelId: uniqueId('tabpanel-'),
  },
};

export const ActiveId: Story = {
  args: {
    activeid: 'third-tab',
    panelId: uniqueId('tabpanel-'),
  },
};

export const SubtleAppearance: Story = {
  args: {
    appearance: 'subtle',
    panelId: uniqueId('tabpanel-'),
  },
};

export const SmallSize: Story = {
  args: {
    size: 'small',
    panelId: uniqueId('tabpanel-'),
  },
};

export const LargeSize: Story = {
  args: {
    size: 'small',
    panelId: uniqueId('tabpanel-'),
  },
};

export const SmallSizeVerticalOrientation: Story = {
  args: {
    orientation: TablistOrientation.vertical,
    size: 'small',
    panelId: uniqueId('tabpanel-'),
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
    panelId: uniqueId('tabpanel-'),
  },
  decorators: [
    Story => {
      const story = Story() as HTMLDivElement;
      story.style.flexDirection = 'row';
      return story;
    },
  ],
};
