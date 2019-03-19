/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import {
  ContextualMenu,
  ContextualMenuItemType,
  IContextualMenuItem,
  DefaultButton
} from 'office-ui-fabric-react';

const items: IContextualMenuItem[] = [
  {
    key: 'newItem',
    text: 'New'
  },
  {
    key: 'divider_1',
    itemType: ContextualMenuItemType.Divider
  },
  {
    key: 'rename',
    text: 'Rename'
  },
  {
    key: 'edit',
    text: 'Edit'
  },
  {
    key: 'properties',
    text: 'Properties'
  },
  {
    key: 'disabled',
    text: 'Disabled item',
    disabled: true
  },
  {
    key: 'isDisabled',
    text: 'isDisabled item',
    isDisabled: true
  }
];

const itemsWithIcons: IContextualMenuItem[] = [
  {
    key: 'newItem',
    iconProps: { iconName: 'Add' },
    text: 'New'
  },
  {
    key: 'upload',
    iconProps: {
      iconName: 'Upload',
      style: { color: 'salmon' }
    },
    text: 'Upload',
    title: 'Upload a file'
  },
  {
    key: 'divider_1',
    itemType: ContextualMenuItemType.Divider
  },
  {
    key: 'share',
    iconProps: { iconName: 'Share' },
    text: 'Share'
  },
  {
    key: 'print',
    iconProps: { iconName: 'Print' },
    text: 'Print'
  },
  {
    key: 'music',
    iconProps: { iconName: 'MusicInCollectionFill' },
    text: 'Music'
  }
];

const itemsWithSecondaryText: IContextualMenuItem[] = [
  {
    key: 'Later Today',
    iconProps: { iconName: 'Clock' },
    text: 'Later Today',
    secondaryText: '7:00 PM'
  },
  {
    key: 'Tomorrow',
    iconProps: { iconName: 'Coffeescript' },
    text: 'Tomorrow',
    secondaryText: 'Thu. 8:00 AM'
  },
  {
    key: 'This Weekend',
    iconProps: { iconName: 'Vacation' },
    text: 'This Weekend',
    secondaryText: 'Sat. 10:00 AM'
  },
  {
    key: 'Next Week',
    iconProps: { iconName: 'Suitcase' },
    text: 'Next Week',
    secondaryText: 'Mon. 8:00 AM'
  }
];

const itemsWithSubmenu: IContextualMenuItem[] = [
  {
    key: 'newItem',
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          text: 'Email message',
          title: 'Create an email'
        },
        {
          key: 'calendarEvent',
          text: 'Calendar event',
          title: 'Create a calendar event'
        }
      ]
    },
    text: 'New'
  },
  {
    key: 'share',
    subMenuProps: {
      items: [
        {
          key: 'sharetotwitter',
          text: 'Share to Twitter'
        },
        {
          key: 'sharetofacebook',
          text: 'Share to Facebook'
        },
        {
          key: 'sharetoemail',
          text: 'Share to Email',
          subMenuProps: {
            items: [
              {
                key: 'sharetooutlook_1',
                text: 'Share to Outlook',
                title: 'Share to Outlook'
              },
              {
                key: 'sharetogmail_1',
                text: 'Share to Gmail',
                title: 'Share to Gmail'
              }
            ]
          }
        }
      ]
    },
    text: 'Share'
  }
];

const itemsWithHeaders: IContextualMenuItem[] = [
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
          text: 'New'
        },
        {
          key: 'deleteItem',
          text: 'Delete'
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
          text: 'Share'
        },
        {
          key: 'print',
          text: 'Print'
        }
      ]
    }
  }
];

const itemsWithSplitButtonSubmenu: IContextualMenuItem[] = [
  {
    key: 'share',
    split: true,
    onClick: () => undefined,
    subMenuProps: {
      items: [
        {
          key: 'sharetotwitter',
          text: 'Share to Twitter'
        },
        {
          key: 'sharetofacebook',
          text: 'Share to Facebook'
        },
        {
          key: 'sharetoemail',
          split: true,
          onClick: () => undefined,
          text: 'Share to Email',
          subMenuProps: {
            items: [
              {
                key: 'sharetooutlook_1',
                text: 'Share to Outlook',
                title: 'Share to Outlook'
              },
              {
                key: 'sharetogmail_1',
                text: 'Share to Gmail',
                title: 'Share to Gmail'
              }
            ]
          }
        }
      ]
    },
    text: 'Share'
  }
];

const itemsWithSubmenuHrefs: IContextualMenuItem[] = [
  {
    key: 'parent',
    id: 'parent',
    name: 'Parent',
    subMenuProps: {
      items: [
        {
          key: 'item1',
          id: 'item1',
          name: 'Item 1',
          href: 'http://bing.com',
          subMenuProps: {
            items: [
              {
                key: 'sub1',
                name: 'Sub-item 1',
                href: 'http://bing.com'
              }
            ]
          }
        },
        {
          key: 'item2',
          id: 'item2',
          name: 'Item 2',
          href: 'http://bing.com',
          subMenuProps: {
            items: [
              {
                key: 'sub2',
                name: 'Sub-item 2',
                href: 'http://bing.com'
              }
            ]
          }
        }
      ]
    }
  }
];

storiesOf('ContextualMenu', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.ms-Layer' })
        .hover('.ms-ContextualMenu-linkContent')
        .snapshot('hover', { cropTo: '.ms-Layer' })
        .click('.ms-ContextualMenu-linkContent')
        .hover('.ms-ContextualMenu-linkContent')
        .snapshot('click', { cropTo: '.ms-Layer' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Root', () => <ContextualMenu items={items} />)
  .addStory('With icons', () => <ContextualMenu items={itemsWithIcons} />)
  .addStory('With secondaryText', () => <ContextualMenu items={itemsWithSecondaryText} />, {
    rtl: true
  })
  .addStory('With submenu', () => <ContextualMenu items={itemsWithSubmenu} />, { rtl: true })
  .addStory('With headers', () => <ContextualMenu items={itemsWithHeaders} />)
  .addStory('With split button submenu', () => (
    <ContextualMenu items={itemsWithSplitButtonSubmenu} />
  ))
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .click('#button')
        .snapshot('menu opened', { cropTo: '.ms-Layer' })
        .hover('#parent')
        .snapshot('parent hovered', { cropTo: '.ms-Layer' })
        .hover('#item1')
        .snapshot('item1 hovered', { cropTo: '.ms-Layer' })
        .hover('#item2')
        .snapshot('item2 hovered', { cropTo: '.ms-Layer' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('With submenus with hrefs', () => (
    <DefaultButton
      id="button"
      text="Click for ContextualMenu"
      menuProps={{ items: itemsWithSubmenuHrefs }}
    />
  ));
