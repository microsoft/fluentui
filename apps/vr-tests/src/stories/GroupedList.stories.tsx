/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { GroupedList } from 'office-ui-fabric-react';
import {
  createListItems,
  createGroups
} from '@uifabric/example-app-base';

const groupCount = 2;
const groupDepth = 2;
const items = createListItems(Math.pow(groupCount, groupDepth));
const groups = createGroups(groupCount, groupDepth, 0, groupCount);

let onRenderCell = (nestingDepth: number, item: any, itemIndex: number) => {
  return (
    <div>{ item.name }</div>
  );
};

storiesOf('GroupedList', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-GroupHeader-expand')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-GroupHeader-expand')
        .hover('.ms-GroupHeader-expand')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <GroupedList
      groups={ groups }
      items={ items }
      onRenderCell={ onRenderCell }
    />
  ))
  ;