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
  ThemeProvider,
} from '@fluentui/react-next';

storiesOf('Pivot Next', module)
  .addDecorator(story => (
    <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>{story()}</div>
  ))
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <ThemeProvider>
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
    </ThemeProvider>
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
        itemIcon="Globe"
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

function _customRenderer(
  link: IPivotItemProps,
  defaultRenderer: (link: IPivotItemProps) => JSX.Element,
): JSX.Element {
  return (
    <span>
      {defaultRenderer(link)}
      <Icon iconName="Airplane" style={{ color: 'red' }} />
    </span>
  );
}
