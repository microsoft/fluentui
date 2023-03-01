import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../../helpers.stories.js';
import type { TabList as FluentTabList } from './tab-list.js';
import './define.js';
import '../tab/define.js';
import '../tab-panel/define.js';

type TabListStoryArgs = Args & FluentTabList;
type TabListStoryMeta = Meta<TabListStoryArgs>;

const defaultTabIds = ['tab-one', 'tab-two', 'tab-three'];

const tabListDefault = html`
  <fluent-tab-list
    orientation=${component => component.orientation}
    appearance=${component => component.appearance}
    disabled=${component => component.disabled}
    size=${component => component.size}
    reserve-selected-tab-space=${component => component['reserve-selected-tab-space']}
    activeid=${component => component.activeid}
  >
    <fluent-tab id=${defaultTabIds[0]}>Tab One</fluent-tab>
    <fluent-tab id=${defaultTabIds[1]}>Tab Two</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}>Tab Three</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}>Tab One Content</fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}>Tab Two Content</fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}>Tab Three Content</fluent-tab-panel>
  </fluent-tab-list>
`;
export const TabListDefault = renderComponent(tabListDefault).bind({});

const tabListDisabledTabs = html`
  <fluent-tab-list>
    <fluent-tab id=${defaultTabIds[0]}>Tab One</fluent-tab>
    <fluent-tab id=${defaultTabIds[1]} disabled>Tab Two</fluent-tab>
    <fluent-tab id=${defaultTabIds[2]}>Tab Three</fluent-tab>

    <fluent-tab-panel id=${defaultTabIds[0] + '-panel'}>Tab One Content</fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[1] + '-panel'}>Tab Two Content</fluent-tab-panel>
    <fluent-tab-panel id=${defaultTabIds[2] + '-panel'}>Tab Three Content</fluent-tab-panel>
  </fluent-tab-list>
`;
export const TabListDisabled = renderComponent(tabListDisabledTabs).bind({});

export default {
  title: 'Components/TabList',
  args: {
    appearance: 'transparent',
    disabled: true,
    orientation: 'horizontal',
    'reserve-selected-tab-space': true,
    size: 'medium',
  },
  argTypes: {
    appearance: {
      options: ['subtle', 'transparent'],
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
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
      control: { type: 'select' },
    },
    orientation: {
      options: ['vertical', 'horizontal'],
      defaultValue: 'horizontal',
      control: { type: 'select' },
    },
  },
} as TabListStoryMeta;
