import * as React from 'react';
import { ICustomNavLinkGroup, NavGroupType } from '../Nav.types';
import { NavToggler } from '../NavToggler';

export class NavExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    const navLinkGroups: ICustomNavLinkGroup[] = [
      {
        links: [{ name: 'Collapsed', alternateText: 'Expanded', url: '#', icon: 'GlobalNavButton', key: 'key' }],
        groupType: NavGroupType.ToggleGroup
      },
      {
        name: 'default group',
        links: [
          {
            name: 'Home',
            url: 'http://example.com',
            isExpanded: false,
            icon: 'Home',
            key: 'key1'
          },
          {
            name: 'Users',
            url: 'http://example.com',
            isExpanded: true,
            icon: 'Contact',
            key: 'key2',
            links: [
              { name: 'Active users', url: 'http://msn.com', key: 'key3' },
              {
                name: 'Contacts - test with long name to show ellipse',
                url: 'http://msn.com',
                target: '_blank',
                key: 'key4'
              },
              { name: 'Guest users', url: 'http://msn.com', key: 'key4' },
              { name: 'Deleted users', url: 'http://msn.com', key: 'key5' }
            ]
          },
          { name: 'Groups', url: 'http://example.com', key: 'key6', icon: 'Group', isHidden: true },
          { name: 'Resources', url: 'http://msn.com', target: '_blank', key: 'key7', icon: 'Devices4' },
          {
            name: 'Billing - test with long name to show ellipse',
            url: 'http://msn.com',
            target: '_blank',
            key: 'key9',
            icon: 'PaymentCard'
          },
          {
            name: 'Support',
            url: 'http://example.com',
            isExpanded: false,
            icon: 'Headset',
            key: 'key10',
            links: [
              { name: 'Chat', url: 'http://msn.com', key: 'key11' },
              {
                name: 'Email - test with long name to show ellipse',
                url: 'http://msn.com',
                target: '_blank',
                key: 'key12'
              }
            ]
          },
          { name: 'Settings', url: 'http://example.com', key: 'key13', icon: 'Settings' },
          { name: 'Setup', url: 'http://msn.com', target: '_blank', key: 'key14', icon: 'Repair' },
          { name: 'Reports', url: 'http://example.com', key: 'key15', icon: 'Chart' },
          { name: 'Health', url: 'http://msn.com', target: '_blank', key: 'key16', icon: 'Health' }
        ],
        groupType: NavGroupType.MenuGroup
      },
      {
        name: 'Group heading',
        links: [
          {
            name: 'Other admin centers',
            url: 'http://example.com',
            isExpanded: false,
            icon: 'Home',
            key: 'key17',
            links: [
              { name: 'Security Center', url: 'http://msn.com', key: 'key18' },
              { name: 'Device Management', url: 'http://msn.com', key: 'key19' },
              { name: 'Azure Active Directory', url: 'http://msn.com', key: 'key20' },
              { name: 'Exchange', url: 'http://msn.com', key: 'key21' },
              { name: 'SharePoint', url: 'http://msn.com', key: 'key22' }
            ]
          },
          { name: 'Edit navigation pane', url: '#', onClick: this._onEditClick, icon: 'Edit', key: 'key23' },
          { name: 'Show less', alternateText: 'Show more', url: '#', isShowMoreLink: true, icon: 'More', key: 'key24' }
        ],
        groupType: NavGroupType.CustomizationGroup
      }
    ];

    return (
      <div>
        <NavToggler groups={navLinkGroups} dataHint="LeftNav" enableCustomization={true} selectedKey="key3" />
      </div>
    );
  }

  private _onEditClick(): void {
    alert('open edit nav view / flyout');
  }
}
