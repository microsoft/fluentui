import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Tabs as FluentTabs } from './tabs.js';
import { TabsAppearance as TabsAppearanceValues, TabsOrientation, TabsSize } from './tabs.options.js';

type TabsStoryArgs = Args & FluentTabs;
type TabsStoryMeta = Meta<TabsStoryArgs>;

const tabIds = ['first-tab', 'second-tab', 'third-tab', 'fourth-tab'];

const tabsDefault = html`
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
export const TabsDefault = renderComponent(tabsDefault).bind({});

const tabsHorizontal = html`
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
export const TabsHorizontal = renderComponent(tabsHorizontal).bind({});

const tabsVertical = html`
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
export const TabsVertical = renderComponent(tabsVertical).bind({});

const tabsAppearance = html`
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
export const TabsAppearance = renderComponent(tabsAppearance).bind({});

const tabsDisabledTabs = html`
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
export const TabsDisabled = renderComponent(tabsDisabledTabs).bind({});

const tabsSizeSmall = html`
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
export const TabsSizeSmall = renderComponent(tabsSizeSmall).bind({});

const tabsSizeMedium = html`
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
export const TabsSizeMedium = renderComponent(tabsSizeMedium).bind({});

const tabsSizeLarge = html`
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
export const TabsSizeLarge = renderComponent(tabsSizeLarge).bind({});

export default {
  title: 'Components/Tabs',
  args: {
    appearance: 'transparent',
    disabled: false,
    orientation: 'horizontal',
    size: 'medium',
  },
  argTypes: {
    appearance: {
      options: Object.values(TabsAppearanceValues),
      defaultValue: TabsAppearanceValues.transparent,
      control: {
        type: 'select',
      },
    },
    activeid: {
      options: tabIds,
      defaultValue: tabIds[0],
      control: { type: 'select' },
    },
    disabled: {
      options: [true, false],
      defaultValue: false,
      control: { type: 'select' },
    },
    size: {
      options: Object.values(TabsSize),
      defaultValue: TabsSize.medium,
      control: { type: 'select' },
    },
    orientation: {
      options: Object.values(TabsOrientation),
      defaultValue: TabsOrientation.horizontal,
      control: { type: 'select' },
    },
  },
} as TabsStoryMeta;
