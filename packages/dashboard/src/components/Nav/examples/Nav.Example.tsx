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
            name: 'Home - no action supported',
            url: 'http://example.com',
            isExpanded: true,
            icon: 'Home',
            key: 'key1',
            links: [
              { name: 'Activity', url: 'http://msn.com', key: 'key2' },
              {
                name: 'News - test with long name to show ellipse',
                url: 'http://msn.com',
                target: '_blank',
                key: 'key3'
              }
            ]
          },
          { name: 'Documents', url: 'http://example.com', key: 'key4', icon: 'Document', isHidden: true },
          { name: 'Pages', url: 'http://msn.com', target: '_blank', key: 'key5', icon: 'Page' },
          {
            name: 'Notebook - test with long name to show ellipse',
            url: 'http://msn.com',
            target: '_blank',
            key: 'key6',
            icon: 'DietPlanNotebook'
          },
          {
            name: 'Test nodes - test nodes',
            url: 'http://example.com',
            isExpanded: false,
            icon: 'Home',
            key: 'key17',
            links: [
              { name: 'Activity', url: 'http://msn.com', key: 'key18' },
              {
                name: 'News - test with long name to show ellipse',
                url: 'http://msn.com',
                target: '_blank',
                key: 'key19'
              }
            ]
          }
        ],
        groupType: NavGroupType.MenuGroup
      },
      {
        name: 'named menu group',
        links: [
          {
            name: 'Home - no action supported',
            url: 'http://example.com',
            isExpanded: false,
            icon: 'Home',
            key: 'key7',
            links: [
              { name: 'Activity', url: 'http://msn.com', key: 'key8' },
              {
                name: 'News - test with long name to show ellipse',
                url: 'http://msn.com',
                target: '_blank',
                key: 'key9'
              }
            ]
          },
          { name: 'Documents', url: 'http://example.com', key: 'key10', icon: 'Document' },
          { name: 'Pages', url: 'http://msn.com', target: '_blank', key: 'key11', icon: 'Page' },
          {
            name: 'Notebook - test with long name to show ellipse',
            url: 'http://msn.com',
            target: '_blank',
            key: 'key12',
            icon: 'DietPlanNotebook'
          }
        ],
        groupType: NavGroupType.MenuGroup
      },
      {
        links: [
          { name: 'Edit', url: '#', onClick: this._onEditClick, icon: 'Edit', key: 'key13' },
          { name: 'Show less', alternateText: 'Show more', url: '#', isShowMoreLink: true, icon: 'More', key: 'key14' }
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
