import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities/index';
import { Icon, Fabric } from '@fluentui/react';
import { Tabs, TabItem, TabItemProps } from '@fluentui/react-tabs';

storiesOf('Tabs', module)
  .addDecorator(FabricDecorator)
  .addDecorator((story) => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Tabs-tab.is-selected')
        .snapshot('hover-selected', { cropTo: '.testWrapper' })
        .hover('.ms-Tabs-tab:not(.is-selected)')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Tabs-tab:not(.is-selected)')
        .hover('.ms-Tabs-tab.is-selected')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Root', () => (
    <Tabs>
      <TabItem headerText="My Files">
        <p>Tab #1</p>
      </TabItem>
      <TabItem headerText="Recent">
        <p>Tab #2</p>
      </TabItem>
      <TabItem headerText="Shared with me">
        <p>Tab #3</p>
      </TabItem>
    </Tabs>
  ))
  .addStory(
    'Count and icon',
    () => (
      <Tabs>
        <TabItem headerText="My Files" itemCount={42} itemIcon="Emoji2">
          <p>Tab #1</p>
        </TabItem>
        <TabItem itemCount="20+" itemIcon="Recent">
          <p>Tab #2</p>
        </TabItem>
        <TabItem itemIcon="Globe">
          <p>Tab #3</p>
        </TabItem>
        <TabItem headerText="Shared with me" itemIcon="Ringer" itemCount={1}>
          <p>Tab #4</p>
        </TabItem>
        <TabItem
          headerText="Customized Rendering"
          itemIcon="Airplane"
          itemCount={10}
          onRenderTab={_customRenderer}
        >
          <p>Customized Rendering</p>
        </TabItem>
      </Tabs>
    ),
    { rtl: true },
  )
  .addStory('Large links', () => (
    <Tabs tabSize="large">
      <TabItem headerText="My Files">
        <p>Tab #1</p>
      </TabItem>
      <TabItem headerText="Recent">
        <p>Tab #2</p>
      </TabItem>
      <TabItem headerText="Shared with me">
        <p>Tab #3</p>
      </TabItem>
    </Tabs>
  ))
  .addStory(
    'Tab format',
    () => (
      <Tabs tabFormat="tabs">
        <TabItem headerText="Foo">
          <p>Tab #1</p>
        </TabItem>
        <TabItem headerText="Bar">
          <p>Tab #2</p>
        </TabItem>
        <TabItem headerText="Bas">
          <p>Tab #3</p>
        </TabItem>
        <TabItem headerText="Biz">
          <p>Tab #4</p>
        </TabItem>
      </Tabs>
    ),
    { rtl: true },
  )
  .addStory('Large tab format', () => (
    <Tabs tabFormat="tabs" tabSize="large">
      <TabItem headerText="Foo">
        <p>Tab #1</p>
      </TabItem>
      <TabItem headerText="Bar">
        <p>Tab #2</p>
      </TabItem>
      <TabItem headerText="Bas">
        <p>Tab #3</p>
      </TabItem>
      <TabItem headerText="Biz">
        <p>Tab #4</p>
      </TabItem>
    </Tabs>
  ));

storiesOf('Tabs - Overflow', module)
  .addDecorator((story) => (
    <div style={{ display: 'flex' }}>
      <div id="testWrapper" className="testWrapper" style={{ padding: '10px 10px 200px' }}>
        {story()}
      </div>
    </div>
  ))
  .addDecorator((story) => (
    <Screener
      steps={new Screener.Steps()
        .executeScript('document.getElementById("testWrapper").style.width = "500px"')
        .snapshot('Medium', { cropTo: '.testWrapper' })
        .executeScript('document.getElementById("testWrapper").style.width = "750px"')
        .snapshot('Wide', { cropTo: '.testWrapper' })
        .executeScript('document.getElementById("testWrapper").style.width = "250px"')
        .click('.ms-Tabs-overflowMenuButton')
        .click('.ms-Tabs-tabInMenu[data-last-tab]')
        .snapshot('Narrow - Last tab selected', { cropTo: '.testWrapper' })
        .click('.ms-Tabs-overflowMenuButton')
        .hover('.ms-Tabs-overflowMenuButton')
        .snapshot('Narrow - Overflow menu', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Root', () => (
    <Tabs overflowBehavior="menu">
      <TabItem headerText="My Files">
        <p>Tab #1</p>
      </TabItem>
      <TabItem itemCount={23} itemIcon="Recent">
        <p>Tab #2</p>
      </TabItem>
      <TabItem headerText="Placeholder" itemIcon="Globe">
        <p>Tab #3</p>
      </TabItem>
      <TabItem headerText="Shared with me" itemIcon="Ringer" itemCount={1}>
        <p>Tab #4</p>
      </TabItem>
      <TabItem headerText="Custom Renderer" itemIcon="Airplane" onRenderTab={_customRenderer}>
        <p>Tab #5</p>
      </TabItem>
      <TabItem headerText="The Last Tab" headerButtonProps={{ 'data-last-tab': 'true' }}>
        <p>Tab #6</p>
      </TabItem>
    </Tabs>
  ))
  .addStory('RTL - Tab format', () => (
    <Fabric dir="rtl">
      <Tabs overflowBehavior="menu" tabFormat="tabs">
        <TabItem headerText="My Files">
          <p>Tab #1</p>
        </TabItem>
        <TabItem itemCount={23} itemIcon="Recent">
          <p>Tab #2</p>
        </TabItem>
        <TabItem headerText="Placeholder" itemIcon="Globe">
          <p>Tab #3</p>
        </TabItem>
        <TabItem headerText="Shared with me" itemIcon="Ringer" itemCount={1}>
          <p>Tab #4</p>
        </TabItem>
        <TabItem headerText="Custom Renderer" itemIcon="Airplane" onRenderTab={_customRenderer}>
          <p>Tab #5</p>
        </TabItem>
        <TabItem headerText="The Last Tab" headerButtonProps={{ 'data-last-tab': 'true' }}>
          <p>Tab #6</p>
        </TabItem>
      </Tabs>
    </Fabric>
  ));

function _customRenderer(
  tab: TabItemProps,
  defaultRenderer: (tab: TabItemProps) => JSX.Element,
): JSX.Element {
  return (
    <span style={{ flex: '0 1 100%' }}>
      {defaultRenderer({ ...tab, itemIcon: undefined })}
      <Icon iconName={tab.itemIcon} style={{ color: 'red' }} />
    </span>
  );
}
