/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { getTallWideDecorator } from '../utilities';
import { CommandBar } from 'office-ui-fabric-react';

const items = [
  {
    key: 'newItem',
    name: 'New',
    iconProps: {
      iconName: 'Add'
    },
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          name: 'Email message',
          iconProps: {
            iconName: 'Mail'
          }
        },
        {
          key: 'calendarEvent',
          name: 'Calendar event',
          iconProps: {
            iconName: 'Calendar'
          }
        }
      ],
    },
  },
  {
    key: 'upload',
    name: 'Upload',
    iconProps: {
      iconName: 'Upload'
    }
  },
  {
    key: 'share',
    name: 'Share',
    iconProps: {
      iconName: 'Share'
    }
  },
  {
    key: 'download',
    name: 'Download',
    iconProps: {
      iconName: 'Download'
    }
  },
  {
    key: 'disabled',
    name: 'Disabled...',
    iconProps: {
      iconName: 'Cancel'
    },
    disabled: true
  }
];

const farItems = [
  {
    key: 'sort',
    name: 'Sort',
    iconProps: {
      iconName: 'SortLines'
    }
  },
  {
    key: 'tile',
    name: 'Grid view',
    iconProps: {
      iconName: 'Tiles'
    }
  },
  {
    key: 'info',
    name: 'Info',
    iconProps: {
      iconName: 'Info'
    }
  }
];

storiesOf('CommandBar', module)
  .addDecorator(getTallWideDecorator('750px'))
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
      items={ items.map(item => ({ ...item, iconProps: undefined })) }
      farItems={ farItems.map(item => ({ ...item, iconProps: undefined })) }
    />
  ))
  .add('Icons only', () => (
    <CommandBar
      isSearchBoxVisible={ false }
      items={ items.map(item => ({ ...item, name: '' })) }
      farItems={ farItems.map(item => ({ ...item, name: '' })) }
    />
  ));