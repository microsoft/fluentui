import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { ContextualMenu, ContextualMenuItemType, IContextualMenuItem } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';

const items: IContextualMenuItem[] = [
  {
    key: 'newItem',
    text: 'New',
  },
  {
    key: 'divider_1',
    itemType: ContextualMenuItemType.Divider,
  },
  {
    key: 'rename',
    text: 'Rename',
  },
  {
    key: 'edit',
    text: 'Edit',
  },
  {
    key: 'properties',
    text: 'Properties',
  },
  {
    key: 'disabled',
    text: 'Disabled item',
    disabled: true,
  },
  {
    key: 'isDisabled',
    text: 'isDisabled item',
    isDisabled: true,
  },
];

const itemsWithIcons: IContextualMenuItem[] = [
  {
    key: 'newItem',
    iconProps: { iconName: 'Add' },
    text: 'New',
  },
  {
    key: 'upload',
    iconProps: {
      iconName: 'Upload',
      style: { color: 'salmon' },
    },
    text: 'Upload',
    title: 'Upload a file',
  },
  {
    key: 'divider_1',
    itemType: ContextualMenuItemType.Divider,
  },
  {
    key: 'share',
    iconProps: { iconName: 'Share' },
    text: 'Share',
  },
  {
    key: 'print',
    iconProps: { iconName: 'Print' },
    text: 'Print',
  },
  {
    key: 'music',
    iconProps: { iconName: 'MusicInCollectionFill' },
    text: 'Music',
  },
];

const itemsWithSecondaryText: IContextualMenuItem[] = [
  {
    key: 'Later Today',
    iconProps: { iconName: 'Clock' },
    text: 'Later Today',
    secondaryText: '7:00 PM',
  },
  {
    key: 'Tomorrow',
    iconProps: { iconName: 'Coffeescript' },
    text: 'Tomorrow',
    secondaryText: 'Thu. 8:00 AM',
  },
  {
    key: 'This Weekend',
    iconProps: { iconName: 'Vacation' },
    text: 'This Weekend',
    secondaryText: 'Sat. 10:00 AM',
  },
  {
    key: 'Next Week',
    iconProps: { iconName: 'Suitcase' },
    text: 'Next Week',
    secondaryText: 'Mon. 8:00 AM',
  },
];

const itemsWithSubmenu: IContextualMenuItem[] = [
  {
    key: 'newItem',
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          text: 'Email message',
          title: 'Create an email',
        },
        {
          key: 'calendarEvent',
          text: 'Calendar event',
          title: 'Create a calendar event',
        },
      ],
    },
    text: 'New',
  },
  {
    key: 'share',
    subMenuProps: {
      items: [
        {
          key: 'sharetotwitter',
          text: 'Share to Twitter',
        },
        {
          key: 'sharetofacebook',
          text: 'Share to Facebook',
        },
        {
          key: 'sharetoemail',
          text: 'Share to Email',
          subMenuProps: {
            items: [
              {
                key: 'sharetooutlook_1',
                text: 'Share to Outlook',
                title: 'Share to Outlook',
              },
              {
                key: 'sharetogmail_1',
                text: 'Share to Gmail',
                title: 'Share to Gmail',
              },
            ],
          },
        },
      ],
    },
    text: 'Share',
  },
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
          text: 'New',
        },
        {
          key: 'deleteItem',
          text: 'Delete',
        },
      ],
    },
  },
  {
    key: 'section',
    itemType: ContextualMenuItemType.Section,
    sectionProps: {
      title: 'Social',
      items: [
        {
          key: 'share',
          text: 'Share',
        },
        {
          key: 'print',
          text: 'Print',
        },
      ],
    },
  },
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
          text: 'Share to Twitter',
        },
        {
          key: 'sharetofacebook',
          text: 'Share to Facebook',
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
                title: 'Share to Outlook',
              },
              {
                key: 'sharetogmail_1',
                text: 'Share to Gmail',
                title: 'Share to Gmail',
              },
            ],
          },
        },
      ],
    },
    text: 'Share',
  },
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
                href: 'http://bing.com',
              },
            ],
          },
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
                href: 'http://bing.com',
              },
            ],
          },
        },
      ],
    },
  },
];

export default {
  title: 'ContextualMenu',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.ms-Layer' })
        .hover('.ms-ContextualMenu-linkContent')
        .snapshot('hover', { cropTo: '.ms-Layer' })
        .click('.ms-ContextualMenu-linkContent')
        .hover('.ms-ContextualMenu-linkContent')
        .snapshot('click', { cropTo: '.ms-Layer' })
        .end(),
    ),
  ],
};

export const Root = () => <ContextualMenu items={items} />;
export const WithIcons = () => <ContextualMenu items={itemsWithIcons} />;

WithIcons.storyName = 'With icons';

export const WithSecondaryText = () => <ContextualMenu items={itemsWithSecondaryText} />;
WithSecondaryText.storyName = 'With secondaryText';

export const WithSecondaryTextRTL = getStoryVariant(WithSecondaryText, RTL);

export const WithSubmenu = () => <ContextualMenu items={itemsWithSubmenu} />;

WithSubmenu.storyName = 'With submenu';

export const WithSubmenuRTL = getStoryVariant(WithSubmenu, RTL);

export const WithHeaders = () => <ContextualMenu items={itemsWithHeaders} />;

WithHeaders.storyName = 'With headers';

export const WithSplitButtonSubmenu = () => <ContextualMenu items={itemsWithSplitButtonSubmenu} />;

WithSplitButtonSubmenu.storyName = 'With split button submenu';

export const WithSubmenusWithHrefs = () => (
  <DefaultButton
    id="button"
    text="Click for ContextualMenu"
    menuProps={{ items: itemsWithSubmenuHrefs }}
  />
);

WithSubmenusWithHrefs.storyName = 'With submenus with hrefs';
WithSubmenusWithHrefs.parameters = {
  steps: new Steps()
    .click('#button')
    .snapshot('menu opened', { cropTo: '.ms-Layer' })
    .hover('#parent')
    .snapshot('parent hovered', { cropTo: '.ms-Layer' })
    .hover('#item1')
    .snapshot('item1 hovered', { cropTo: '.ms-Layer' })
    .hover('#item2')
    .snapshot('item2 hovered', { cropTo: '.ms-Layer' })
    .end(),
};
