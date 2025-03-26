import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { TabList, Tab } from '@fluentui/react-tabs';

import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL, withStoryWrightSteps } from '../utilities';

export default {
  title: 'TabList and Tab Converged',

  decorators: [
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps()
          .snapshot('default')
          .hover('.mouse-target')
          .snapshot('hover')
          .mouseDown('.mouse-target')
          .snapshot('pressed')
          .mouseUp('.mouse-target')
          .end(),
      }),
  ],
} satisfies Meta<typeof TabList>;

export const Default = () => (
  <TabList>
    <Tab value="1">First</Tab>
    <Tab className="mouse-target" value="2">
      Second
    </Tab>
    <Tab value="3">Third</Tab>
  </TabList>
);

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

export const SubtleAppearance = () => (
  <TabList appearance="subtle">
    <Tab value="1">First</Tab>
    <Tab className="mouse-target" value="2">
      Second
    </Tab>
    <Tab value="3">Third</Tab>
  </TabList>
);
SubtleAppearance.storyName = 'Subtle appearance';

export const SubtleAppearanceHighContrast = getStoryVariant(SubtleAppearance, HIGH_CONTRAST);

export const SubtleAppearanceDarkMode = getStoryVariant(SubtleAppearance, DARK_MODE);

export const SmallSize = () => (
  <TabList size="small">
    <Tab value="1">First</Tab>
    <Tab className="mouse-target" value="2">
      Second
    </Tab>
    <Tab value="3">Third</Tab>
  </TabList>
);
SmallSize.storyName = 'Small size';

export const SmallSizeHighContrast = getStoryVariant(SmallSize, HIGH_CONTRAST);

export const SmallSizeDarkMode = getStoryVariant(SmallSize, DARK_MODE);

export const VerticalAndSmallSize = () => (
  <TabList size="small" vertical>
    <Tab value="1">First</Tab>
    <Tab className="mouse-target" value="2">
      Second
    </Tab>
    <Tab value="3">Third</Tab>
  </TabList>
);
VerticalAndSmallSize.storyName = 'Vertical and small size';

export const VerticalAndSmallSizeHighContrast = getStoryVariant(VerticalAndSmallSize, HIGH_CONTRAST);

export const VerticalAndSmallSizeDarkMode = getStoryVariant(VerticalAndSmallSize, DARK_MODE);

export const LargeSize = () => (
  <TabList size="large">
    <Tab value="1">First</Tab>
    <Tab className="mouse-target" value="2">
      Second
    </Tab>
    <Tab value="3">Third</Tab>
  </TabList>
);
LargeSize.storyName = 'Large size';

export const LargeSizeHighContrast = getStoryVariant(LargeSize, HIGH_CONTRAST);

export const LargeSizeDarkMode = getStoryVariant(LargeSize, DARK_MODE);

export const VerticalAndLargeSize = () => (
  <TabList size="large" vertical>
    <Tab value="1">First</Tab>
    <Tab className="mouse-target" value="2">
      Second
    </Tab>
    <Tab value="3">Third</Tab>
  </TabList>
);
VerticalAndLargeSize.storyName = 'Vertical and large size';

export const VerticalAndLargeSizeHighContrast = getStoryVariant(VerticalAndLargeSize, HIGH_CONTRAST);

export const VerticalAndLargeSizeDarkMode = getStoryVariant(VerticalAndLargeSize, DARK_MODE);

export const TabSelectedDefault = () => (
  <TabList defaultSelectedValue="2">
    <Tab value="1">First</Tab>
    <Tab className="mouse-target" value="2">
      Second
    </Tab>
    <Tab value="3">Third</Tab>
  </TabList>
);
TabSelectedDefault.storyName = 'Tab Selected (default)';

export const TabSelectedDefaultHighContrast = getStoryVariant(TabSelectedDefault, HIGH_CONTRAST);

export const TabSelectedDefaultDarkMode = getStoryVariant(TabSelectedDefault, DARK_MODE);

export const TabSelected = () => (
  <TabList selectedValue="2">
    <Tab value="1">First</Tab>
    <Tab className="mouse-target" value="2">
      Second
    </Tab>
    <Tab value="3">Third</Tab>
  </TabList>
);

export const TabSelectedHighContrast = getStoryVariant(TabSelected, HIGH_CONTRAST);

export const TabSelectedDarkMode = getStoryVariant(TabSelected, DARK_MODE);

export const WithIcon = () => (
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
);
WithIcon.storyName = 'With icon';

export const WithIconRTL = getStoryVariant(WithIcon, RTL);

export const WithIconAndVertical = () => (
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
);
WithIconAndVertical.storyName = 'With icon and vertical';

export const WithIconAndVerticalRTL = getStoryVariant(WithIconAndVertical, RTL);

export const WithIconOnly = () => (
  <TabList>
    <Tab icon="A" value="1" />
    <Tab icon="B" className="mouse-target" value="2" />
    <Tab icon="C" value="3" />
  </TabList>
);
WithIconOnly.storyName = 'With icon only';

export const WithIconOnlyAndVertical = () => (
  <TabList vertical>
    <Tab icon="A" value="1" />
    <Tab icon="B" className="mouse-target" value="2" />
    <Tab icon="C" value="3" />
  </TabList>
);

WithIconOnlyAndVertical.storyName = 'With icon only and vertical';

export const SubtleCircularAppearance = () => (
  <TabList appearance="subtle-circular" defaultSelectedValue="1">
    <Tab value="1">First</Tab>
    <Tab className="mouse-target" value="2">
      Second
    </Tab>
    <Tab value="3">Third</Tab>
  </TabList>
);

export const SubtleCircularAppearanceDarkMode = getStoryVariant(SubtleCircularAppearance, DARK_MODE);

export const SubtleCircularAppearanceHighContrast = getStoryVariant(SubtleCircularAppearance, HIGH_CONTRAST);

export const FilledCircularAppearance = () => (
  <TabList appearance="filled-circular" defaultSelectedValue="1">
    <Tab value="1">First</Tab>
    <Tab className="mouse-target" value="2">
      Second
    </Tab>
    <Tab value="3">Third</Tab>
  </TabList>
);

export const FilledCircularAppearanceDarkMode = getStoryVariant(FilledCircularAppearance, DARK_MODE);

export const FilledCircularAppearanceHighContrast = getStoryVariant(FilledCircularAppearance, HIGH_CONTRAST);
