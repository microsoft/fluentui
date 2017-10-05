/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { ContextualMenu, ContextualMenuItemType } from 'office-ui-fabric-react';

const items = [
  {
    key: 'newItem',
    name: 'New'
  },
  {
    key: 'divider_1',
    itemType: ContextualMenuItemType.Divider
  },
  {
    key: 'rename',
    name: 'Rename'
  },
  {
    key: 'edit',
    name: 'Edit'
  },
  {
    key: 'properties',
    name: 'Properties'
  },
  {
    key: 'disabled',
    name: 'Disabled item',
    disabled: true
  }
];

const itemsWithIcons = [
  {
    key: 'newItem',
    iconProps: {
      iconName: 'Add'
    },
    name: 'New'
  },
  {
    key: 'upload',
    iconProps: {
      iconName: 'Upload',
      style: {
        color: 'salmon'
      }
    },
    name: 'Upload',
    title: 'Upload a file'
  },
  {
    key: 'divider_1',
    itemType: ContextualMenuItemType.Divider
  },
  {
    key: 'share',
    iconProps: {
      iconName: 'Share'
    },
    name: 'Share'
  },
  {
    key: 'print',
    iconProps: {
      iconName: 'Print'
    },
    name: 'Print'
  },
  {
    key: 'music',
    iconProps: {
      iconName: 'MusicInCollectionFill'
    },
    name: 'Music',
  }
];

const itemsWithSubmenu = [
  {
    key: 'newItem',
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          name: 'Email message',
          title: 'Create an email'
        },
        {
          key: 'calendarEvent',
          name: 'Calendar event',
          title: 'Create a calendar event',
        }
      ],
    },
    name: 'New'
  },
  {
    key: 'share',
    subMenuProps: {
      items: [
        {
          key: 'sharetotwitter',
          name: 'Share to Twitter',
        },
        {
          key: 'sharetofacebook',
          name: 'Share to Facebook',
        },
        {
          key: 'sharetoemail',
          name: 'Share to Email',
          subMenuProps: {
            items: [
              {
                key: 'sharetooutlook_1',
                name: 'Share to Outlook',
                title: 'Share to Outlook',
              },
              {
                key: 'sharetogmail_1',
                name: 'Share to Gmail',
                title: 'Share to Gmail',
              }
            ],
          },
        },
      ],
    },
    name: 'Share'
  }
];

const itemsWithHeaders = [
  {
    key: 'section',
    itemType: ContextualMenuItemType.Section,
    sectionProps: {
      topDivider: true,
      bottomDivider: true,
      title: 'Actions',
      items: [
        {
          key: 'newItem',
          name: 'New',
        },
        {
          key: 'deleteItem',
          name: 'Delete',
        }
      ]
    }
  },
  {
    key: 'section',
    itemType: ContextualMenuItemType.Section,
    sectionProps: {
      title: 'Social',
      items: [
        {
          key: 'share',
          name: 'Share'
        },
        {
          key: 'print',
          name: 'Print'
        }
      ]
    }
  }
];

storiesOf('ContextualMenu', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.ms-Layer' })
        .hover('.ms-ContextualMenu-linkContent')
        .snapshot('hover', { cropTo: '.ms-Layer' })
        .click('.ms-ContextualMenu-linkContent')
        .hover('.ms-ContextualMenu-linkContent')
        .snapshot('click', { cropTo: '.ms-Layer' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <ContextualMenu
      items={ items }
    />
  ))
  .add('With icons', () => (
    <ContextualMenu
      items={ itemsWithIcons }
    />
  ))
  .add('With submenu', () => (
    <ContextualMenu
      items={ itemsWithSubmenu }
    />
  ))
  .add('With headers', () => (
    <ContextualMenu
      items={ itemsWithHeaders }
    />
  ));