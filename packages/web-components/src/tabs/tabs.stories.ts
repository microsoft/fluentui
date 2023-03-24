import { html } from '@microsoft/fast-element';
import { TabsOrientation } from '@microsoft/fast-foundation';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Tabs as FluentTabs } from './tabs.js';
import './define.js';
import '../tab/define.js';
import '../tab-panel/define.js';
import { TabsAppearance as TabsAppearanceValues, TabsSize } from './tabs.options.js';

type TabsStoryArgs = Args & FluentTabs;
type TabsStoryMeta = Meta<TabsStoryArgs>;

const defaultTabIds = ['first-tab', 'second-tab', 'third-tab', 'fourth-tab'];

const tabsDefault = html`
  <fluent-tabs
    orientation=${component => component.orientation}
    appearance=${component => component.appearance}
    ?disabled=${component => component.disabled}
    size=${component => component.size}
    reserve-selected-tab-space=${component => component['reserve-selected-tab-space']}
    activeid=${component => component.activeid}
  >
    <fluent-tab id=${defaultTabIds[0]}> First Tab </fluent-tab>
    <fluent-tab id=${defaultTabIds[1]}> Second Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}> Third Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[3]}> Fourth Tab</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}>Tab One Content</fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}>Tab Two Content</fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}>Tab Three Content</fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[3] + '-panel'}>Tab Four Content</fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsDefault = renderComponent(tabsDefault).bind({});

const tabsHorizontal = html`
  <fluent-tabs orientation="horizontal">
    <fluent-tab id=${defaultTabIds[0]}> First Tab </fluent-tab>
    <fluent-tab id=${defaultTabIds[1]}> Second Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}> Third Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[3]}> Fourth Tab</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[3] + '-panel'}></fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsHorizontal = renderComponent(tabsHorizontal).bind({});

const tabsVertical = html`
  <fluent-tabs orientation="vertical">
    <fluent-tab id=${defaultTabIds[0]}> First Tab </fluent-tab>
    <fluent-tab id=${defaultTabIds[1]}> Second Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}> Third Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[3]}> Fourth Tab</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[3] + '-panel'}></fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsVertical = renderComponent(tabsVertical).bind({});

const tabsAppearance = html`
  <fluent-tabs appearance="transparent">
    <fluent-tab id=${defaultTabIds[0]}> First Tab </fluent-tab>
    <fluent-tab id=${defaultTabIds[1]}> Second Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}> Third Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[3]}> Fourth Tab</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[3] + '-panel'}></fluent-tab-panel>
  </fluent-tabs>
  <fluent-tabs appearance="subtle">
    <fluent-tab id=${defaultTabIds[0]} active> First Tab </fluent-tab>
    <fluent-tab id=${defaultTabIds[1]}> Second Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}> Third Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[3]}> Fourth Tab</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[3] + '-panel'}></fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsAppearance = renderComponent(tabsAppearance).bind({});

const tabsDisabledTabs = html`
  <fluent-tabs disabled>
    <fluent-tab id=${defaultTabIds[0]}> First Tab </fluent-tab>
    <fluent-tab id=${defaultTabIds[1]}> Second Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}> Third Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[3]}> Fourth Tab</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[3] + '-panel'}></fluent-tab-panel>
  </fluent-tabs>

  <fluent-tabs>
    <fluent-tab id=${defaultTabIds[0]}> First Tab </fluent-tab>
    <fluent-tab id=${defaultTabIds[1]} disabled> Second Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}> Third Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[3]}> Fourth Tab</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[3] + '-panel'}></fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsDisabled = renderComponent(tabsDisabledTabs).bind({});

const tabsSizeSmall = html`
  <fluent-tabs size="small">
    <fluent-tab id=${defaultTabIds[0]}> First Tab </fluent-tab>
    <fluent-tab id=${defaultTabIds[1]}> Second Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}> Third Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[3]}> Fourth Tab</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[3] + '-panel'}></fluent-tab-panel>
  </fluent-tabs>
  <fluent-tabs size="small" orientation="vertical">
    <fluent-tab id=${defaultTabIds[0]}> First Tab </fluent-tab>
    <fluent-tab id=${defaultTabIds[1]}> Second Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}> Third Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[3]}> Fourth Tab</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[3] + '-panel'}></fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsSizeSmall = renderComponent(tabsSizeSmall).bind({});

const tabsSizeMedium = html`
  <fluent-tabs size="medium">
    <fluent-tab id=${defaultTabIds[0]}> First Tab </fluent-tab>
    <fluent-tab id=${defaultTabIds[1]}> Second Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}> Third Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[3]}> Fourth Tab</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[3] + '-panel'}></fluent-tab-panel>
  </fluent-tabs>
  <fluent-tabs size="medium" orientation="vertical">
    <fluent-tab id=${defaultTabIds[0]}> First Tab </fluent-tab>
    <fluent-tab id=${defaultTabIds[1]}> Second Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}> Third Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[3]}> Fourth Tab</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[3] + '-panel'}></fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsSizeMedium = renderComponent(tabsSizeMedium).bind({});

const tabsSizeLarge = html`
  <fluent-tabs size="large">
    <fluent-tab id=${defaultTabIds[0]}> First Tab </fluent-tab>
    <fluent-tab id=${defaultTabIds[1]}> Second Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}> Third Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[3]}> Fourth Tab</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[3] + '-panel'}></fluent-tab-panel>
  </fluent-tabs>
  <fluent-tabs size="large" orientation="vertical">
    <fluent-tab id=${defaultTabIds[0]}> First Tab </fluent-tab>
    <fluent-tab id=${defaultTabIds[1]}> Second Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}> Third Tab</fluent-tab>
    <fluent-tab id=${defaultTabIds[3]}> Fourth Tab</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}></fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[3] + '-panel'}></fluent-tab-panel>
  </fluent-tabs>
`;
export const TabsSizeLarge = renderComponent(tabsSizeLarge).bind({});

export default {
  title: 'Components/Tabs',
  args: {
    appearance: 'transparent',
    disabled: false,
    orientation: 'horizontal',
    'reserve-selected-tab-space': false,
    size: 'medium',
  },
  argTypes: {
    appearance: {
      options: Object.values(TabsAppearanceValues),
      defaultValue: 'transparent',
      control: {
        type: 'select',
      },
    },
    'reserve-selected-tab-space': {
      options: [true, false],
      control: {
        type: 'select',
      },
    },
    activeid: {
      options: defaultTabIds,
      defaultValue: defaultTabIds[0],
      control: { type: 'select' },
    },
    disabled: {
      options: [true, false],
      defaultValue: false,
      control: { type: 'select' },
    },
    size: {
      options: Object.values(TabsSize),
      defaultValue: 'medium',
      control: { type: 'select' },
    },
    orientation: {
      options: Object.values(TabsOrientation),
      defaultValue: 'horizontal',
      control: { type: 'select' },
    },
  },
} as TabsStoryMeta;
