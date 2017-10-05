/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities';
import { CommandBar } from 'office-ui-fabric-react';

const items = [
  {
    key: 'newItem',
    name: 'New',
    icon: 'Add',
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          name: 'Email message',
          icon: 'Mail'
        },
        {
          key: 'calendarEvent',
          name: 'Calendar event',
          icon: 'Calendar'
        }
      ],
    },
  },
  {
    key: 'upload',
    name: 'Upload',
    icon: 'Upload'
  },
  {
    key: 'share',
    name: 'Share',
    icon: 'Share'
  },
  {
    key: 'download',
    name: 'Download',
    icon: 'Download'
  },
  {
    key: 'disabled',
    name: 'Disabled...',
    icon: 'Cancel',
    disabled: true
  }
];

const farItems = [
  {
    key: 'sort',
    name: 'Sort',
    icon: 'SortLines'
  },
  {
    key: 'tile',
    name: 'Grid view',
    icon: 'Tiles'
  },
  {
    key: 'info',
    name: 'Info',
    icon: 'Info'
  }
];

storiesOf('CommandBar', module)
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-CommandBarItem-link')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-CommandBarItem-link')
        .hover('.ms-CommandBarItem-link')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <CommandBar
      isSearchBoxVisible
      items={ items }
      farItems={ farItems }
    />
  ))
  .add('Without search bar', () => (
    <CommandBar
      isSearchBoxVisible={ false }
      items={ items }
      farItems={ farItems }
    />
  ))
  .add('Text only', () => (
    <CommandBar
      isSearchBoxVisible={ false }
      items={ items.map(item => ({ ...item, icon: '' })) }
      farItems={ farItems.map(item => ({ ...item, icon: '' })) }
    />
  ))
  .add('Icons only', () => (
    <CommandBar
      isSearchBoxVisible={ false }
      items={ items.map(item => ({ ...item, name: '' })) }
      farItems={ farItems.map(item => ({ ...item, name: '' })) }
    />
  ));