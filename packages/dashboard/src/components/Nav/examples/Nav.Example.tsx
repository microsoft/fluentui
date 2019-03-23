import * as React from 'react';
import { INavLinkGroup, mergeStyles } from 'office-ui-fabric-react';
import { Nav } from '../Nav';

export class NavExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    const navLinkGroups: INavLinkGroup[] = [
      {
        links: [
          {
            name: 'Home',
            url: 'http://example.com',
            isExpanded: false,
            icon: 'Home'
          },
          {
            name: 'Users',
            url: 'http://example.com',
            isExpanded: true,
            icon: 'Contact',
            links: [
              { name: 'Active users', url: 'http://msn.com', isSelected: true },
              {
                name: 'Contacts - test with long name to show ellipse',
                url: 'http://msn.com',
                target: '_blank'
              },
              { name: 'Guest users', url: '#/examples/nav' },
              { name: 'Deleted users', url: '#/examples/nav' }
            ]
          },
          { name: 'Groups', url: '#/examples/nav', icon: 'Group', isHidden: true },
          { name: 'Resources', url: '#/examples/nav', target: '_blank', icon: 'Devices4' },
          {
            name: 'Billing - test with long name to show ellipse',
            url: 'http://msn.com',
            target: '_blank',
            icon: 'PaymentCard'
          },
          {
            name: 'Support',
            url: 'http://example.com',
            isExpanded: false,
            icon: 'Headset',
            links: [
              { name: 'Chat', url: 'http://msn.com' },
              {
                name: 'Email - test with long name to show ellipse',
                url: 'http://msn.com',
                target: '_blank'
              }
            ]
          },
          { name: 'Settings', url: 'http://example.com', icon: 'Settings' },
          { name: 'Setup', url: 'http://msn.com', target: '_blank', icon: 'Repair' },
          { name: 'Reports', url: 'http://example.com', icon: 'Chart' },
          { name: 'Health', url: 'http://msn.com', target: '_blank', icon: 'Health' }
        ]
      },
      {
        name: 'Other admin centers',
        links: [
          {
            name: 'Other admin centers',
            url: 'http://example.com',
            isExpanded: false,
            icon: 'Home',
            links: [
              { name: 'Security Center', url: 'http://msn.com', target: '_blank' },
              { name: 'Device Management', url: 'http://msn.com', target: '_blank' },
              { name: 'Azure Active Directory', url: 'http://msn.com', target: '_blank' },
              { name: 'Exchange', url: 'http://msn.com', target: '_blank' },
              { name: 'SharePoint', url: 'http://msn.com', target: '_blank' }
            ]
          }
        ]
      }
    ];
    const mainStyle = mergeStyles({ display: 'flex', height: '800px' });
    const contentStyle = mergeStyles({ flex: '1 1 auto', padding: '24px', backgroundColor: 'pink' });
    return (
      <div className={mainStyle}>
        <Nav
          groups={navLinkGroups}
          dataHint="PrimaryNavigation"
          enableCustomization={true}
          showMore={true}
          editString={'Edit navigation'}
          showMoreString={'Show more'}
          showLessString={'Show less'}
        />
        <div className={contentStyle}>Content Here</div>
      </div>
    );
  }
}
