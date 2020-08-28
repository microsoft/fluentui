/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities';
import {
  Pivot,
  PivotLinkSize,
  PivotLinkFormat,
  PivotItem,
  IPivotItemProps,
  Label,
  Icon,
  Fabric,
} from '@fluentui/react-next';

storiesOf('Pivot Next', module)
  .addDecorator(story => (
    <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>{story()}</div>
  ))
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Pivot-link.is-selected')
        .snapshot('hover-selected', { cropTo: '.testWrapper' })
        .hover('.ms-Pivot-link:not(.is-selected)')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Pivot-link:not(.is-selected)')
        .hover('.ms-Pivot-link.is-selected')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Basic', () => (
    <Pivot aria-label="Basic Pivot Example">
      <PivotItem headerText="My Files">
        <Label>Pivot #1</Label>
      </PivotItem>
      <PivotItem headerText="Recent">
        <Label>Pivot #2</Label>
      </PivotItem>
      <PivotItem headerText="Shared with me">
        <Label>Pivot #3</Label>
      </PivotItem>
    </Pivot>
  ))
  .addStory('Icon count', () => (
    <Pivot aria-label="Count and Icon Pivot Example">
      <PivotItem headerText="My Files" itemCount={42} itemIcon="Emoji2">
        <Label>Pivot #1</Label>
      </PivotItem>
      <PivotItem itemCount={23} itemIcon="Recent">
        <Label>Pivot #2</Label>
      </PivotItem>
      <PivotItem headerText="Placeholder" itemIcon="Globe">
        <Label>Pivot #3</Label>
      </PivotItem>
      <PivotItem headerText="Shared with me" itemIcon="Ringer" itemCount={1}>
        <Label>Pivot #4</Label>
      </PivotItem>
      <PivotItem
        headerText="Customized Rendering"
        itemIcon="Airplane"
        itemCount={10}
        onRenderItemLink={_customRenderer}
      >
        <Label>Customized Rendering</Label>
      </PivotItem>
    </Pivot>
  ))
  .addStory('Large links', () => (
    <Pivot aria-label="Large Link Size Pivot Example" linkSize={PivotLinkSize.large}>
      <PivotItem headerText="My Files">
        <Label>Pivot #1</Label>
      </PivotItem>
      <PivotItem headerText="Recent">
        <Label>Pivot #2</Label>
      </PivotItem>
      <PivotItem headerText="Shared with me">
        <Label>Pivot #3</Label>
      </PivotItem>
    </Pivot>
  ))
  .addStory('Tabs', () => (
    <Pivot aria-label="Links of Tab Style Pivot Example" linkFormat={PivotLinkFormat.tabs}>
      <PivotItem headerText="Foo">
        <Label>Pivot #1</Label>
      </PivotItem>
      <PivotItem headerText="Bar">
        <Label>Pivot #2</Label>
      </PivotItem>
      <PivotItem headerText="Bas">
        <Label>Pivot #3</Label>
      </PivotItem>
      <PivotItem headerText="Biz">
        <Label>Pivot #4</Label>
      </PivotItem>
    </Pivot>
  ))
  .addStory('Large tabs', () => (
    <Pivot
      aria-label="Links of Large Tabs Pivot Example"
      linkFormat={PivotLinkFormat.tabs}
      linkSize={PivotLinkSize.large}
    >
      <PivotItem headerText="Foo">
        <Label>Pivot #1</Label>
      </PivotItem>
      <PivotItem headerText="Bar">
        <Label>Pivot #2</Label>
      </PivotItem>
      <PivotItem headerText="Bas">
        <Label>Pivot #3</Label>
      </PivotItem>
      <PivotItem headerText="Biz">
        <Label>Pivot #4</Label>
      </PivotItem>
    </Pivot>
  ));

storiesOf('Pivot Next Overflow', module)
  .addDecorator(story => (
    <div style={{ display: 'flex' }}>
      <div id="testWrapper" className="testWrapper" style={{ padding: '10px 10px 200px' }}>
        {story()}
      </div>
    </div>
  ))
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .executeScript('document.getElementById("testWrapper").style.width = "500px"')
        .snapshot('Medium', { cropTo: '.testWrapper' })
        .executeScript('document.getElementById("testWrapper").style.width = "750px"')
        .snapshot('Wide', { cropTo: '.testWrapper' })
        .executeScript('document.getElementById("testWrapper").style.width = "250px"')
        .click('.ms-Pivot-overflowMenuButton')
        .click('.ms-Pivot-linkInMenu[data-last-tab]')
        .snapshot('Narrow - Last tab selected', { cropTo: '.testWrapper' })
        .click('.ms-Pivot-overflowMenuButton')
        .hover('.ms-Pivot-overflowMenuButton')
        .snapshot('Narrow - Overflow menu', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Basic', () => (
    <Pivot aria-label="Pivot Overflow Menu" overflowBehavior="menu">
      <PivotItem headerText="My Files">
        <Label>Pivot #1</Label>
      </PivotItem>
      <PivotItem itemCount={23} itemIcon="Recent">
        <Label>Pivot #2</Label>
      </PivotItem>
      <PivotItem headerText="Placeholder" itemIcon="Globe">
        <Label>Pivot #3</Label>
      </PivotItem>
      <PivotItem headerText="Shared with me" itemIcon="Ringer" itemCount={1}>
        <Label>Pivot #4</Label>
      </PivotItem>
      <PivotItem
        headerText="Custom Renderer"
        itemIcon="Airplane"
        onRenderItemLink={_customRenderer}
      >
        <Label>Pivot #5</Label>
      </PivotItem>
      <PivotItem headerText="The Last Tab" headerButtonProps={{ 'data-last-tab': 'true' }}>
        <Label>Pivot #6</Label>
      </PivotItem>
    </Pivot>
  ))
  .addStory('Tabs - RTL', () => (
    <Fabric dir="rtl">
      <Pivot aria-label="Pivot Overflow Menu" overflowBehavior="menu" linkFormat="tabs">
        <PivotItem headerText="My Files">
          <Label>Pivot #1</Label>
        </PivotItem>
        <PivotItem itemCount={23} itemIcon="Recent">
          <Label>Pivot #2</Label>
        </PivotItem>
        <PivotItem headerText="Placeholder" itemIcon="Globe">
          <Label>Pivot #3</Label>
        </PivotItem>
        <PivotItem headerText="Shared with me" itemIcon="Ringer" itemCount={1}>
          <Label>Pivot #4</Label>
        </PivotItem>
        <PivotItem
          headerText="Custom Renderer"
          itemIcon="Airplane"
          onRenderItemLink={_customRenderer}
        >
          <Label>Pivot #5</Label>
        </PivotItem>
        <PivotItem headerText="The Last Tab" headerButtonProps={{ 'data-last-tab': 'true' }}>
          <Label>Pivot #6</Label>
        </PivotItem>
      </Pivot>
    </Fabric>
  ));

function _customRenderer(
  link: IPivotItemProps,
  defaultRenderer: (link: IPivotItemProps) => JSX.Element,
): JSX.Element {
  return (
    <span style={{ flex: '0 1 100%' }}>
      {defaultRenderer({ ...link, itemIcon: undefined })}
      <Icon iconName={link.itemIcon} style={{ color: 'red' }} />
    </span>
  );
}
