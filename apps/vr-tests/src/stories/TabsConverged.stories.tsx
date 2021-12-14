import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { TabList, Tab } from '@fluentui/react-tabs';

storiesOf('TabList and Tab Converged', module)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.test-class')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.test-class')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.test-class')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'Default',
    () => (
      <TabList>
        <Tab value="1">First</Tab>
        <Tab className="test-class" value="2">
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
      <Tab className="test-class" value="2">
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
        <Tab className="test-class" value="2">
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
        <Tab className="test-class" value="2">
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
        <Tab className="test-class" value="2">
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
        <Tab className="test-class" value="2">
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
        <Tab className="test-class" value="2">
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
        <Tab icon="B" className="test-class" value="2">
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
        <Tab icon="B" className="test-class" value="2" />
        <Tab icon="C" value="3" />
      </TabList>
    ),
    {
      includeRtl: true,
    },
  );
