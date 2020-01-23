/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { ResizeGroup, OverflowSet, DefaultButton } from 'office-ui-fabric-react';

const list = {
  primary: [
    { key: 'item0', name: 'Item 0', iconProps: { iconName: 'Add' }, checked: false },
    { key: 'item1', name: 'Item 1', iconProps: { iconName: 'Share' }, checked: false },
    { key: 'item2', name: 'Item 2', iconProps: { iconName: 'Upload' }, checked: false },
    { key: 'item3', name: 'Item 3', iconProps: { iconName: 'Add' }, checked: false },
    { key: 'item4', name: 'Item 4', iconProps: { iconName: 'Share' }, checked: false },
    { key: 'item5', name: 'Item 5', iconProps: { iconName: 'Upload' }, checked: false }
  ],
  overflow: [
    { key: 'item6', name: 'Item 6', iconProps: { iconName: 'Add' }, checked: false },
    { key: 'item7', name: 'Item 7', iconProps: { iconName: 'Share' }, checked: false },
    { key: 'item8', name: 'Item 8', iconProps: { iconName: 'Upload' }, checked: false },
    { key: 'item9', name: 'Item 9', iconProps: { iconName: 'Add' }, checked: false },
    { key: 'item10', name: 'Item 10', iconProps: { iconName: 'Share' }, checked: false }
  ]
};

const noop = () => null;

storiesOf('ResizeGroup', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.OverflowButton')
        .hover('.OverflowButton')
        .snapshot('click overflow')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'Root',
    () => (
      <ResizeGroup
        data={list}
        onReduceData={noop}
        onRenderData={data => {
          return (
            <OverflowSet
              items={data.primary}
              overflowItems={data.overflow.length ? data.overflow : null}
              onRenderItem={item => {
                return (
                  <DefaultButton
                    text={item.name}
                    iconProps={item.iconProps}
                    onClick={item.onClick}
                    checked={item.checked}
                  />
                );
              }}
              onRenderOverflowButton={overflowItems => (
                <DefaultButton className="OverflowButton" menuProps={{ items: overflowItems! }} />
              )}
            />
          );
        }}
      />
    ),
    { rtl: true }
  );
