import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { TabList, Tab } from '@fluentui/react-tabs';

storiesOf('TabList and Tab Converged', module)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.mouse-target')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.mouse-target')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.mouse-target')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory(
    'Default',
    () => (
      <TabList>
        <Tab value="1">First</Tab>
        <Tab className="mouse-target" value="2">
          Second
        </Tab>
        <Tab value="3">Third</Tab>
      </TabList>
    ),
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory('Vertical', () => (
    <TabList vertical>
      <Tab value="1">First</Tab>
      <Tab className="mouse-target" value="2">
        Second
      </Tab>
      <Tab value="3">Third</Tab>
    </TabList>
  ))
  .addStory(
    'Subtle appearance',
    () => (
      <TabList appearance="subtle">
        <Tab value="1">First</Tab>
        <Tab className="mouse-target" value="2">
          Second
        </Tab>
        <Tab value="3">Third</Tab>
      </TabList>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Small size',
    () => (
      <TabList size="small">
        <Tab value="1">First</Tab>
        <Tab className="mouse-target" value="2">
          Second
        </Tab>
        <Tab value="3">Third</Tab>
      </TabList>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Vertical and small size',
    () => (
      <TabList size="small" vertical>
        <Tab value="1">First</Tab>
        <Tab className="mouse-target" value="2">
          Second
        </Tab>
        <Tab value="3">Third</Tab>
      </TabList>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Large size',
    () => (
      <TabList size="large">
        <Tab value="1">First</Tab>
        <Tab className="mouse-target" value="2">
          Second
        </Tab>
        <Tab value="3">Third</Tab>
      </TabList>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Vertical and large size',
    () => (
      <TabList size="large" vertical>
        <Tab value="1">First</Tab>
        <Tab className="mouse-target" value="2">
          Second
        </Tab>
        <Tab value="3">Third</Tab>
      </TabList>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Tab Selected (default)',
    () => (
      <TabList defaultSelectedValue="2">
        <Tab value="1">First</Tab>
        <Tab className="mouse-target" value="2">
          Second
        </Tab>
        <Tab value="3">Third</Tab>
      </TabList>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Tab Selected',
    () => (
      <TabList selectedValue="2">
        <Tab value="1">First</Tab>
        <Tab className="mouse-target" value="2">
          Second
        </Tab>
        <Tab value="3">Third</Tab>
      </TabList>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'With icon',
    () => (
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
    {
      includeRtl: true,
    },
  )
  .addStory(
    'With icon and vertical',
    () => (
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
    {
      includeRtl: true,
    },
  )
  .addStory(
    'With icon only',
    () => (
      <TabList>
        <Tab icon="A" value="1" />
        <Tab icon="B" className="mouse-target" value="2" />
        <Tab icon="C" value="3" />
      </TabList>
    ),
    {
      includeRtl: false,
    },
  )
  .addStory(
    'With icon only and vertical',
    () => (
      <TabList vertical>
        <Tab icon="A" value="1" />
        <Tab icon="B" className="mouse-target" value="2" />
        <Tab icon="C" value="3" />
      </TabList>
    ),
    {
      includeRtl: false,
    },
  );
