import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../../helpers.stories.js';
import type { TabList as FluentTabList } from './tab-list.js';
import './define.js';

type TabListStoryArgs = Args & FluentTabList;
type TabListStoryMeta = Meta<TabListStoryArgs>;

export default {
  title: 'Components/TabList',
} as TabListStoryMeta;

const storyTemplate = html` <fluent-tab-list> </fluent-tab-list> `;

export const TabList = renderComponent(storyTemplate).bind({});
