/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Fabric, OverflowSet, IconButton, IOverflowSetItemProps } from 'office-ui-fabric-react';

const onRenderItem = (item: IOverflowSetItemProps) => item.name;
const onRenderOverflowButton = (overflowItems: any[]) => {
  return <IconButton menuProps={{ items: overflowItems! }} />;
};

storiesOf('OverflowSet', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-Button-flexContainer')
        .hover('.ms-Button-flexContainer')
        .snapshot('default')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'Root',
    () => (
      <Fabric>
        <OverflowSet
          items={[
            { key: 'item1', name: 'Link 1' },
            { key: 'item2', name: 'Link 2' },
            { key: 'item3', name: 'Link 3' }
          ]}
          overflowItems={[
            { key: 'item4', name: 'Overflow Link 1' },
            { key: 'item5', name: 'Overflow Link 2' }
          ]}
          onRenderOverflowButton={onRenderOverflowButton}
          onRenderItem={onRenderItem}
        />
      </Fabric>
    ),
    { rtl: true }
  );

storiesOf('OverflowSet variant', module)
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
  .addStory('Vertical Direction', () => (
    <Fabric>
      <OverflowSet
        vertical
        items={[
          { key: 'item1', name: 'Link 1' },
          { key: 'item2', name: 'Link 2' },
          { key: 'item3', name: 'Link 3' }
        ]}
        overflowItems={[
          { key: 'item4', name: 'Overflow Link 1' },
          { key: 'item5', name: 'Overflow Link 2' }
        ]}
        onRenderOverflowButton={onRenderOverflowButton}
        onRenderItem={onRenderItem}
      />
    </Fabric>
  ));
