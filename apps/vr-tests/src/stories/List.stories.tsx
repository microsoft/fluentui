/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { List } from 'office-ui-fabric-react';
import { createListItems } from '@uifabric/example-app-base';

const items = createListItems(10);
const onRenderCell = (item) => (
  <div>{ item.name }</div>
);

storiesOf('List', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <List items={ items } onRenderCell={ onRenderCell } />
  ));