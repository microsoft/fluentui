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

const calendarFilled = html`<svg
  width="18"
  height="18"
  viewBox="0 0 18 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M18 5.5V14.75C18 16.5449 16.5449 18 14.75 18H3.25C1.45507 18 0 16.5449 0 14.75V5.5H18ZM4.25 12C3.55964 12 3 12.5596 3 13.25C3 13.9404 3.55964 14.5 4.25 14.5C4.94036 14.5 5.5 13.9404 5.5 13.25C5.5 12.5596 4.94036 12 4.25 12ZM9 12C8.30964 12 7.75 12.5596 7.75 13.25C7.75 13.9404 8.30964 14.5 9 14.5C9.69036 14.5 10.25 13.9404 10.25 13.25C10.25 12.5596 9.69036 12 9 12ZM4.25 7.5C3.55964 7.5 3 8.05964 3 8.75C3 9.44036 3.55964 10 4.25 10C4.94036 10 5.5 9.44036 5.5 8.75C5.5 8.05964 4.94036 7.5 4.25 7.5ZM9 7.5C8.30964 7.5 7.75 8.05964 7.75 8.75C7.75 9.44036 8.30964 10 9 10C9.69036 10 10.25 9.44036 10.25 8.75C10.25 8.05964 9.69036 7.5 9 7.5ZM13.75 7.5C13.0596 7.5 12.5 8.05964 12.5 8.75C12.5 9.44036 13.0596 10 13.75 10C14.4404 10 15 9.44036 15 8.75C15 8.05964 14.4404 7.5 13.75 7.5ZM14.75 0C16.5449 0 18 1.45507 18 3.25V4H0V3.25C0 1.45507 1.45507 0 3.25 0H14.75Z"
    fill="#0078D4"
  />
</svg>`;

const calendar = html`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M14.75 0C16.5449 0 18 1.45507 18 3.25V14.75C18 16.5449 16.5449 18 14.75 18H3.25C1.45507 18 0 16.5449 0 14.75V3.25C0 1.45507 1.45507 0 3.25 0H14.75ZM16.5 5.5H1.5V14.75C1.5 15.7165 2.2835 16.5 3.25 16.5H14.75C15.7165 16.5 16.5 15.7165 16.5 14.75V5.5ZM4.75 11.5C5.44036 11.5 6 12.0596 6 12.75C6 13.4404 5.44036 14 4.75 14C4.05964 14 3.5 13.4404 3.5 12.75C3.5 12.0596 4.05964 11.5 4.75 11.5ZM9 11.5C9.69036 11.5 10.25 12.0596 10.25 12.75C10.25 13.4404 9.69036 14 9 14C8.30964 14 7.75 13.4404 7.75 12.75C7.75 12.0596 8.30964 11.5 9 11.5ZM4.75 7.5C5.44036 7.5 6 8.05964 6 8.75C6 9.44036 5.44036 10 4.75 10C4.05964 10 3.5 9.44036 3.5 8.75C3.5 8.05964 4.05964 7.5 4.75 7.5ZM9 7.5C9.69036 7.5 10.25 8.05964 10.25 8.75C10.25 9.44036 9.69036 10 9 10C8.30964 10 7.75 9.44036 7.75 8.75C7.75 8.05964 8.30964 7.5 9 7.5ZM13.25 7.5C13.9404 7.5 14.5 8.05964 14.5 8.75C14.5 9.44036 13.9404 10 13.25 10C12.5596 10 12 9.44036 12 8.75C12 8.05964 12.5596 7.5 13.25 7.5ZM14.75 1.5H3.25C2.2835 1.5 1.5 2.2835 1.5 3.25V4H16.5V3.25C16.5 2.2835 15.7165 1.5 14.75 1.5Z"
    fill="#424242"
  />
</svg> `;

const tabListDefault = html`
  <fluent-tab-list
    orientation=${component => component.orientation}
    appearance=${component => component.appearance}
    disabled=${component => component.disabled}
    size=${component => component.size}
    reserve-selected-tab-space=${component => component['reserve-selected-tab-space']}
    activeid=${component => component.activeid}
  >
    <fluent-tab id=${defaultTabIds[0]}>
      <span slot="start">${calendarFilled}</span>
      Tab One
    </fluent-tab>
    <fluent-tab id=${defaultTabIds[1]}>
      <span slot="start">${calendar}</span>
      Tab Two</fluent-tab
    >
    <fluent-tab id=${defaultTabIds[2]}>
      <span slot="start">${calendar}</span>
      Tab Three</fluent-tab
    >

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
    disabled: false,
    orientation: 'horizontal',
    'reserve-selected-tab-space': false,
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
