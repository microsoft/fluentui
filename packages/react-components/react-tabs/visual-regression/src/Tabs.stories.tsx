import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Steps, type StoryParameters } from 'storywright';
import { TabList, Tab } from '@fluentui/react-tabs';

import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL } from '@fluentui/visual-regression-utilities';

export default {
  title: 'TabList and Tab Converged',
  decorators: [
    Story => (
      <div className="testWrapper" style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    storyWright: {
      steps: new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.mouse-target')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.mouse-target')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof TabList>;

export const Default = {
  render: () => (
    <TabList>
      <Tab value="1">First</Tab>
      <Tab className="mouse-target" value="2">
        Second
      </Tab>
      <Tab value="3">Third</Tab>
    </TabList>
  ),
  name: 'Default',
} satisfies StoryObj;

export const DefaultRTL = getStoryVariant(Default, RTL);

export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);

export const Vertical = () => (
  <TabList vertical>
    <Tab value="1">First</Tab>
    <Tab className="mouse-target" value="2">
      Second
    </Tab>
    <Tab value="3">Third</Tab>
  </TabList>
);

export const SubtleAppearance = {
  render: () => (
    <TabList appearance="subtle">
      <Tab value="1">First</Tab>
      <Tab className="mouse-target" value="2">
        Second
      </Tab>
      <Tab value="3">Third</Tab>
    </TabList>
  ),
  name: 'Subtle appearance',
} satisfies StoryObj;

export const SubtleAppearanceHighContrast = getStoryVariant(SubtleAppearance, HIGH_CONTRAST);

export const SubtleAppearanceDarkMode = getStoryVariant(SubtleAppearance, DARK_MODE);

export const SmallSize = {
  render: () => (
    <TabList size="small">
      <Tab value="1">First</Tab>
      <Tab className="mouse-target" value="2">
        Second
      </Tab>
      <Tab value="3">Third</Tab>
    </TabList>
  ),
  name: 'Small size',
} satisfies StoryObj;

export const SmallSizeHighContrast = getStoryVariant(SmallSize, HIGH_CONTRAST);

export const SmallSizeDarkMode = getStoryVariant(SmallSize, DARK_MODE);

export const VerticalAndSmallSize = {
  render: () => (
    <TabList size="small" vertical>
      <Tab value="1">First</Tab>
      <Tab className="mouse-target" value="2">
        Second
      </Tab>
      <Tab value="3">Third</Tab>
    </TabList>
  ),
  name: 'Vertical and small size',
} satisfies StoryObj;

export const VerticalAndSmallSizeHighContrast = getStoryVariant(VerticalAndSmallSize, HIGH_CONTRAST);

export const VerticalAndSmallSizeDarkMode = getStoryVariant(VerticalAndSmallSize, DARK_MODE);

export const LargeSize = {
  render: () => (
    <TabList size="large">
      <Tab value="1">First</Tab>
      <Tab className="mouse-target" value="2">
        Second
      </Tab>
      <Tab value="3">Third</Tab>
    </TabList>
  ),
  name: 'Large size',
} satisfies StoryObj;

export const LargeSizeHighContrast = getStoryVariant(LargeSize, HIGH_CONTRAST);

export const LargeSizeDarkMode = getStoryVariant(LargeSize, DARK_MODE);

export const VerticalAndLargeSize = {
  render: () => (
    <TabList size="large" vertical>
      <Tab value="1">First</Tab>
      <Tab className="mouse-target" value="2">
        Second
      </Tab>
      <Tab value="3">Third</Tab>
    </TabList>
  ),
  name: 'Vertical and large size',
} satisfies StoryObj;

export const VerticalAndLargeSizeHighContrast = getStoryVariant(VerticalAndLargeSize, HIGH_CONTRAST);

export const VerticalAndLargeSizeDarkMode = getStoryVariant(VerticalAndLargeSize, DARK_MODE);

export const TabSelectedDefault = {
  render: () => (
    <TabList defaultSelectedValue="2">
      <Tab value="1">First</Tab>
      <Tab className="mouse-target" value="2">
        Second
      </Tab>
      <Tab value="3">Third</Tab>
    </TabList>
  ),
  name: 'Tab Selected (default)',
} satisfies StoryObj;

export const TabSelectedDefaultHighContrast = getStoryVariant(TabSelectedDefault, HIGH_CONTRAST);

export const TabSelectedDefaultDarkMode = getStoryVariant(TabSelectedDefault, DARK_MODE);

export const TabSelected = {
  render: () => (
    <TabList selectedValue="2">
      <Tab value="1">First</Tab>
      <Tab className="mouse-target" value="2">
        Second
      </Tab>
      <Tab value="3">Third</Tab>
    </TabList>
  ),
  name: 'Tab Selected',
};

export const TabSelectedHighContrast = getStoryVariant(TabSelected, HIGH_CONTRAST);

export const TabSelectedDarkMode = getStoryVariant(TabSelected, DARK_MODE);

export const WithIcon = {
  render: () => (
    <TabList>
      <Tab icon="A" value="1">
        First
      </Tab>
      <Tab icon="B" className="mouse-target" value="2">
        Second
      </Tab>
      <Tab icon="C" value="3">
        Third
      </Tab>
    </TabList>
  ),
  name: 'With icon',
} satisfies StoryObj;

export const WithIconRTL = getStoryVariant(WithIcon, RTL);

export const WithIconAndVertical = {
  render: () => (
    <TabList vertical>
      <Tab icon="A" value="1">
        First
      </Tab>
      <Tab icon="B" className="mouse-target" value="2">
        Second
      </Tab>
      <Tab icon="C" value="3">
        Third
      </Tab>
    </TabList>
  ),
  name: 'With icon and vertical',
} satisfies StoryObj;

export const WithIconAndVerticalRTL = getStoryVariant(WithIconAndVertical, RTL);

export const WithIconOnly = {
  render: () => (
    <TabList>
      <Tab icon="A" value="1" />
      <Tab icon="B" className="mouse-target" value="2" />
      <Tab icon="C" value="3" />
    </TabList>
  ),
  name: 'With icon only',
} satisfies StoryObj;

export const WithIconOnlyAndVertical = {
  render: () => (
    <TabList vertical>
      <Tab icon="A" value="1" />
      <Tab icon="B" className="mouse-target" value="2" />
      <Tab icon="C" value="3" />
    </TabList>
  ),
  name: 'With icon only and vertical',
} satisfies StoryObj;

export const SubtleCircularAppearance = {
  render: () => (
    <TabList appearance="subtle-circular" defaultSelectedValue="1">
      <Tab value="1">First</Tab>
      <Tab className="mouse-target" value="2">
        Second
      </Tab>
      <Tab value="3">Third</Tab>
    </TabList>
  ),
};

export const SubtleCircularAppearanceDarkMode = getStoryVariant(SubtleCircularAppearance, DARK_MODE);

export const SubtleCircularAppearanceHighContrast = getStoryVariant(SubtleCircularAppearance, HIGH_CONTRAST);

export const FilledCircularAppearance = {
  render: () => (
    <TabList appearance="filled-circular" defaultSelectedValue="1">
      <Tab value="1">First</Tab>
      <Tab className="mouse-target" value="2">
        Second
      </Tab>
      <Tab value="3">Third</Tab>
    </TabList>
  ),
};

export const FilledCircularAppearanceDarkMode = getStoryVariant(FilledCircularAppearance, DARK_MODE);

export const FilledCircularAppearanceHighContrast = getStoryVariant(FilledCircularAppearance, HIGH_CONTRAST);
