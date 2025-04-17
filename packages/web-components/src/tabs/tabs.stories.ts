import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Tabs as FluentTabs } from './tabs.js';
import { TabsAppearance as TabsAppearanceValues, TabsOrientation, TabsSize } from './tabs.options.js';

type Story = StoryObj<FluentTabs>;

const tabIds = ['first-tab', 'second-tab', 'third-tab', 'fourth-tab'];

const tabsDefault = html<StoryArgs<FluentTabs>>`
  <fluent-tabs
    orientation=${x => x.orientation}
    appearance=${x => x.appearance}
    ?disabled=${x => x.disabled}
    size=${x => x.size}
    activeid=${x => x.activeid}
  >
    <fluent-tab id=${tabIds[0]}> First Tab </fluent-tab>
    <fluent-tab id=${tabIds[1]}> Second Tab</fluent-tab>
    <fluent-tab id=${tabIds[2]}> Third Tab</fluent-tab>
    <fluent-tab id=${tabIds[3]}> Fourth Tab</fluent-tab>

    <fluent-tab-panel id=${tabIds[0] + '-panel'}>Tab One Content</fluent-tab-panel>
    <fluent-tab-panel id=${tabIds[1] + '-panel'}>Tab Two Content</fluent-tab-panel>
    <fluent-tab-panel id=${tabIds[2] + '-panel'}>Tab Three Content</fluent-tab-panel>
    <fluent-tab-panel id=${tabIds[3] + '-panel'}>Tab Four Content</fluent-tab-panel>
  </fluent-tabs>
`;

export default {
  title: 'Components/Tabs (Deprecated)',
  render: renderComponent(tabsDefault),
  argTypes: {
    appearance: {
      control: 'select',
      description: 'Indicates the styled appearance of the tabs.',
      mapping: { '': null, ...TabsAppearanceValues },
      options: ['', ...Object.values(TabsAppearanceValues)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(TabsAppearanceValues).join('|') },
      },
    },
    activeid: {
      options: tabIds,
      defaultValue: tabIds[0],
      control: { type: 'select' },
    },
    disabled: {
      control: 'boolean',
      description: 'Sets the tabs disabled state.',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    size: {
      control: 'select',
      description: 'Indicates the size of the tabs.',
      mapping: { '': null, ...TabsSize },
      options: ['', ...Object.values(TabsSize)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(TabsSize).join('|') },
      },
    },
    orientation: {
      control: 'select',
      description: 'Indicates the orientation of the tabs.',
      mapping: { '': null, ...TabsOrientation },
      options: ['', ...Object.values(TabsOrientation)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(TabsOrientation).join('|') },
      },
    },
  },
} as Meta<FluentTabs>;

export const TabsDefault: Story = {};

const tabsHorizontal = html<StoryArgs<FluentTabs>>`
  <fluent-tabs orientation="horizontal">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>

    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsHorizontal: Story = { render: renderComponent(tabsHorizontal) };

const tabsVertical = html<StoryArgs<FluentTabs>>`
  <fluent-tabs orientation="vertical">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>

    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsVertical: Story = { render: renderComponent(tabsVertical) };

const tabsAppearance = html<StoryArgs<FluentTabs>>`
  <fluent-tabs appearance="transparent">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>

    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
  </fluent-tabs>
  <fluent-tabs appearance="subtle">
    <fluent-tab active> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>

    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsAppearance: Story = { render: renderComponent(tabsAppearance) };

const tabsDisabledTabs = html<StoryArgs<FluentTabs>>`
  <fluent-tabs disabled>
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>

    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
  </fluent-tabs>

  <fluent-tabs>
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab disabled> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>

    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsDisabled: Story = { render: renderComponent(tabsDisabledTabs) };

const tabsSizeSmall = html<StoryArgs<FluentTabs>>`
  <fluent-tabs size="small">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>

    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
  </fluent-tabs>
  <fluent-tabs size="small" orientation="vertical">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>

    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsSizeSmall: Story = { render: renderComponent(tabsSizeSmall) };

const tabsSizeMedium = html<StoryArgs<FluentTabs>>`
  <fluent-tabs size="medium">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>

    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
  </fluent-tabs>
  <fluent-tabs size="medium" orientation="vertical">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>

    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsSizeMedium: Story = { render: renderComponent(tabsSizeMedium) };

const tabsSizeLarge = html<StoryArgs<FluentTabs>>`
  <fluent-tabs size="large">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>

    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
  </fluent-tabs>
  <fluent-tabs size="large" orientation="vertical">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>

    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
    <fluent-tab-panel></fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsSizeLarge: Story = { render: renderComponent(tabsSizeLarge) };
