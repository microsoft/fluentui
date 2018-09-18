/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, runStories } from '../utilities';
import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react';

const TestWrapperDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      .end()
    }
  >
    {story()}
  </Screener>
);

const pivotStories = {
  decorators: [FabricDecorator, TestWrapperDecorator],
  stories: {
    'Root': () => (
      <Pivot>
        <PivotItem linkText='My Files'>
          Content
        </PivotItem>
        <PivotItem linkText='Recent' />
        <PivotItem linkText='Shared with me' />
      </Pivot>
    ),
    'Count and icon': () => (
      <Pivot>
        <PivotItem linkText='My Files' itemCount={42} itemIcon='Emoji2'>
          Content
        </PivotItem>
        <PivotItem itemCount={23} itemIcon='Recent' />
        <PivotItem itemIcon='Globe' />
        <PivotItem linkText='Shared with me' itemIcon='Ringer' itemCount={1} />
      </Pivot>
    ),
    'Large': () => (
      <Pivot linkSize={PivotLinkSize.large}>
        <PivotItem linkText='My Files'>
          Content
            </PivotItem>
        <PivotItem linkText='Recent' />
        <PivotItem linkText='Shared with me' />
      </Pivot>
    ),
    'Tabs': () => (
      <Pivot linkFormat={PivotLinkFormat.tabs}>
        <PivotItem linkText='Foo'>
          Content
            </PivotItem>
        <PivotItem linkText='Bar' />
        <PivotItem linkText='Bas' />
        <PivotItem linkText='Biz' />
      </Pivot>
    ),
    'Tabs large': () => (
      <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large}>
        <PivotItem linkText='Foo'>
          Content
            </PivotItem>
        <PivotItem linkText='Bar' />
        <PivotItem linkText='Bas' />
        <PivotItem linkText='Biz' />
      </Pivot>
    )
  }
};

runStories('Pivot', pivotStories);