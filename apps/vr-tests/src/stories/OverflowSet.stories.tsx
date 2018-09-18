/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, runStories } from '../utilities';
import { OverflowSet, IconButton } from 'office-ui-fabric-react';

const onRenderItem = (item) => item.name;
const onRenderOverflowButton = (overflowItems) => {
  return (
    <IconButton
      menuProps={{ items: overflowItems! }}
    />
  );
};

const OverflowSetDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      .click('.ms-Button-flexContainer')
      .hover('.ms-Button-flexContainer')
      .snapshot('default')
      .end()
    }
  >
    {story()}
  </Screener>
);

const overflowSetStories = {
  decorators: [FabricDecorator, OverflowSetDecorator],
  stories: {
    'Root': () => (
      <OverflowSet
        items={[
          {
            key: 'item1',
            name: 'Link 1'
          },
          {
            key: 'item2',
            name: 'Link 2'
          },
          {
            key: 'item3',
            name: 'Link 3'
          }
        ]}
        overflowItems={[
          {
            key: 'item4',
            name: 'Overflow Link 1'
          },
          {
            key: 'item5',
            name: 'Overflow Link 2'
          }
        ]
        }
        onRenderOverflowButton={onRenderOverflowButton}
        onRenderItem={onRenderItem}
      />
    )
  }
};

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

const overflowSetVariantStories = {
  decorators: [FabricDecorator, TestWrapperDecorator],
  stories: {
    'Vertical Direction': () => (
      <OverflowSet
        vertical
        items={[
          {
            key: 'item1',
            name: 'Link 1'
          },
          {
            key: 'item2',
            name: 'Link 2'
          },
          {
            key: 'item3',
            name: 'Link 3'
          }
        ]}
        overflowItems={[
          {
            key: 'item4',
            name: 'Overflow Link 1'
          },
          {
            key: 'item5',
            name: 'Overflow Link 2'
          }
        ]
        }
        onRenderOverflowButton={onRenderOverflowButton}
        onRenderItem={onRenderItem}
      />
    )
  }
};

runStories('OverflowSet', overflowSetStories);
runStories('OverflowSet variant', overflowSetVariantStories);