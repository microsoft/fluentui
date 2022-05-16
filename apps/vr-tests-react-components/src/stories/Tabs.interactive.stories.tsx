import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { TabList, Tab } from '@fluentui/react-tabs';

storiesOf('TabList and Tab Converged', module)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .hover('.mouse-target')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.mouse-target')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.mouse-target')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStoryInteractive(
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
  .addStoryInteractive('Vertical', () => (
    <TabList vertical>
      <Tab value="1">First</Tab>
      <Tab className="mouse-target" value="2">
        Second
      </Tab>
      <Tab value="3">Third</Tab>
    </TabList>
  ))
  .addStoryInteractive(
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
  .addStoryInteractive(
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
  .addStoryInteractive(
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
  .addStoryInteractive(
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
  .addStoryInteractive(
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
  .addStoryInteractive(
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
  .addStoryInteractive(
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
  .addStoryInteractive(
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
  .addStoryInteractive(
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
