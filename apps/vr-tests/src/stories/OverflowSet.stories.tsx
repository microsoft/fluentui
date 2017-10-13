/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { OverflowSet, IconButton } from 'office-ui-fabric-react';

const onRenderItem = (item) => item.name;
const onRenderOverflowButton = (overflowItems) => {
  return (
    <IconButton
      iconProps={ { iconName: 'More' } }
      menuProps={ { items: overflowItems! } }
    />
  );
};

storiesOf('OverflowSet', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-Button-flexContainer')
        .hover('.ms-Button-flexContainer')
        .snapshot('default')
        .end()
      }
    >
      { story() }
    </Screener>
  )).add('Root', () => (
    <OverflowSet
      items={ [
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
      ] }
      overflowItems={ [
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
      onRenderOverflowButton={ onRenderOverflowButton }
      onRenderItem={ onRenderItem }
    />
  ));