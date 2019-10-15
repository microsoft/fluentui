/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react';

storiesOf('Pivot', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  )
  .addStory('Root', () => (
    <Pivot>
      <PivotItem headerText="My Files">Content</PivotItem>
      <PivotItem headerText="Recent" />
      <PivotItem headerText="Shared with me" />
    </Pivot>
  ))
  .addStory(
    'Count and icon',
    () => (
      <Pivot>
        <PivotItem headerText="My Files" itemCount={42} itemIcon="Emoji2">
          Content
        </PivotItem>
        <PivotItem itemCount="20+" itemIcon="Recent" />
        <PivotItem itemIcon="Globe" />
        <PivotItem headerText="Shared with me" itemIcon="Ringer" itemCount={1} />
      </Pivot>
    ),
    { rtl: true }
  )
  .addStory('Large', () => (
    <Pivot linkSize={PivotLinkSize.large}>
      <PivotItem headerText="My Files">Content</PivotItem>
      <PivotItem headerText="Recent" />
      <PivotItem headerText="Shared with me" />
    </Pivot>
  ))
  .addStory(
    'Tabs',
    () => (
      <Pivot linkFormat={PivotLinkFormat.tabs}>
        <PivotItem headerText="Foo">Content</PivotItem>
        <PivotItem headerText="Bar" />
        <PivotItem headerText="Bas" />
        <PivotItem headerText="Biz" />
      </Pivot>
    ),
    { rtl: true }
  )
  .addStory('Tabs large', () => (
    <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large}>
      <PivotItem headerText="Foo">Content</PivotItem>
      <PivotItem headerText="Bar" />
      <PivotItem headerText="Bas" />
      <PivotItem headerText="Biz" />
    </Pivot>
  ));
