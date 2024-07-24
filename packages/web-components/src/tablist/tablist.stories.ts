import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Tablist as FluentTablist } from './tablist.js';
import { TablistAppearance as TablistAppearanceValues, TablistOrientation, TablistSize } from './tablist.options.js';

type TablistStoryArgs = Args & FluentTablist;
type TablistStoryMeta = Meta<TablistStoryArgs>;

const tabIds = ['first-tab', 'second-tab', 'third-tab', 'fourth-tab'];

function changeTab() {
  const tablist = document.querySelector('fluent-tablist') as FluentTablist;
  const panelPlaceholder = document.querySelector('#panel-placeholder')!;
  // there's a million ways to do this, but this is the simplest
  panelPlaceholder.innerHTML = `
  <div role="tabpanel" aria-labelledby="tablist.activeid">
    Tab changed to ${tablist.activeid}
  </div>`;
}

const tabsDefault = html`
  <style>
    #demo-layout {
      display: grid;
      gap: 1rem;
    }
    #demo-layout:has(fluent-tablist[orientation='vertical']) {
      grid-template-columns: max-content 1fr;
    }
  </style>
  <div id="demo-layout">
    <fluent-tablist
      orientation=${x => x.orientation}
      appearance=${x => x.appearance}
      ?disabled=${x => x.disabled}
      size=${x => x.size}
      activeid=${x => x.activeid}
      @change="${() => changeTab()}"
    >
      <fluent-tab id=${tabIds[0]}> First Tab </fluent-tab>
      <fluent-tab id=${tabIds[1]}> Second Tab</fluent-tab>
      <fluent-tab id=${tabIds[2]}> Third Tab</fluent-tab>
      <fluent-tab id=${tabIds[3]}> Fourth Tab</fluent-tab>
    </fluent-tablist>

    <div id="panel-placeholder"></div>
  </div>
`;
export const TablistDefault = renderComponent(tabsDefault).bind({});

const tabsHorizontal = html`
  <fluent-tablist orientation="horizontal">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>
  </fluent-tablist>
`;
export const TablistHorizontal = renderComponent(tabsHorizontal).bind({});

const tabsVertical = html`
  <fluent-tablist orientation="vertical">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>
  </fluent-tablist>
`;
export const TablistVertical = renderComponent(tabsVertical).bind({});

const tabsAppearance = html`
  <fluent-tablist appearance="transparent">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>
  </fluent-tablist>
  <fluent-tablist appearance="subtle">
    <fluent-tab active> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>
  </fluent-tablist>
`;
export const TablistAppearance = renderComponent(tabsAppearance).bind({});

const tabsDisabledTablist = html`
  <fluent-tablist disabled>
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>
  </fluent-tablist>

  <fluent-tablist>
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab disabled> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>
  </fluent-tablist>
`;
export const TablistDisabled = renderComponent(tabsDisabledTablist).bind({});

const tabsSizeSmall = html`
  <fluent-tablist size="small">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>
  </fluent-tablist>
  <fluent-tablist size="small" orientation="vertical">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>
  </fluent-tablist>
`;
export const TablistSizeSmall = renderComponent(tabsSizeSmall).bind({});

const tabsSizeMedium = html`
  <fluent-tablist size="medium">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>
  </fluent-tablist>
  <fluent-tablist size="medium" orientation="vertical">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>
  </fluent-tablist>
`;
export const TablistSizeMedium = renderComponent(tabsSizeMedium).bind({});

const tabsSizeLarge = html`
  <fluent-tablist size="large">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>
  </fluent-tablist>
  <fluent-tablist size="large" orientation="vertical">
    <fluent-tab> First Tab </fluent-tab>
    <fluent-tab> Second Tab</fluent-tab>
    <fluent-tab> Third Tab</fluent-tab>
    <fluent-tab> Fourth Tab</fluent-tab>
  </fluent-tablist>
`;
export const TablistSizeLarge = renderComponent(tabsSizeLarge).bind({});

const rtl = html`
  <div dir="rtl">
    <fluent-tablist>
      <fluent-tab> First Tab </fluent-tab>
      <fluent-tab> Second Tab</fluent-tab>
      <fluent-tab> Third Tab</fluent-tab>
      <fluent-tab> Fourth Tab</fluent-tab>
    </fluent-tablist>
    <fluent-tablist orientation="vertical">
      <fluent-tab> First Tab </fluent-tab>
      <fluent-tab> Second Tab</fluent-tab>
      <fluent-tab> Third Tab</fluent-tab>
      <fluent-tab> Fourth Tab</fluent-tab>
    </fluent-tablist>
  </div>
`;
export const RTL = renderComponent(rtl).bind({});

export default {
  title: 'Components/Tablist',
  args: {
    appearance: 'transparent',
    disabled: false,
    orientation: 'horizontal',
    size: 'medium',
  },
  argTypes: {
    appearance: {
      options: Object.values(TablistAppearanceValues),
      defaultValue: TablistAppearanceValues.transparent,
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
      options: Object.values(TablistSize),
      defaultValue: TablistSize.medium,
      control: { type: 'select' },
    },
    orientation: {
      options: Object.values(TablistOrientation),
      defaultValue: TablistOrientation.horizontal,
      control: { type: 'select' },
    },
  },
} as TablistStoryMeta;
