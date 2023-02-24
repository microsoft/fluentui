import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../../helpers.stories.js';
import type { TabList as FluentTabList } from './tab-list.js';
import './define.js';
import '../tab/define.js';
import '../tab-panel/define.js';

type TabListStoryArgs = Args & FluentTabList;
type TabListStoryMeta = Meta<TabListStoryArgs>;

export default {
  title: 'Components/TabList',
} as TabListStoryMeta;

const storyTemplate = html`
  <fluent-tab-list>
    <fluent-tab>Tab One</fluent-tab>
    <fluent-tab>Tab Two</fluent-tab>
    <fluent-tab>Tab Three</fluent-tab>

    <fluent-tab-panel>Tab One Content</fluent-tab-panel>
    <fluent-tab-panel>Tab Two Content</fluent-tab-panel>
    <fluent-tab-panel>Tab Three Content</fluent-tab-panel>
  </fluent-tab-list>
`;

export const TabList = renderComponent(storyTemplate).bind({});
