import * as React from 'react';
import { INavLinkGroup, mergeStyles, DefaultButton } from 'office-ui-fabric-react';
import { Nav } from '../Nav';

export class NavExample extends React.Component<{}, { isNavCollapsed: boolean; dir: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { isNavCollapsed: true, dir: 'ltr' };
    this._onNavCollapsed = this._onNavCollapsed.bind(this);
    this._switchRTL = this._switchRTL.bind(this);
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
            title: 'Users menu item',
            links: [
              { name: 'Active users', url: 'http://msn.com', isSelected: true },
              {
                name: 'Contacts - test with long name to show ellipse',
                url: 'http://msn.com',
                target: '_blank',
                onClick: () => {
                  console.log('some telemetry here');
                },
                title: 'contacs stuff'
              },
              {
                name: 'Item with click and force <a>',
                url: 'http://msn.com',
                target: '_blank',
                onClick: () => {
                  console.log('some telemetry here');
                },
                forceAnchor: true
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
      <div className={mainStyle} dir={this.state.dir}>
        <Nav
          groups={navLinkGroups}
          dataHint="PrimaryNavigation"
          enableCustomization={true}
          showMore={true}
          isNavCollapsed={this.state.isNavCollapsed}
          onNavCollapsed={this._onNavCollapsed}
        />
        <div className={contentStyle}>
          <h1>Content Here</h1>
          <DefaultButton onClick={this._switchRTL}>Switch Dir</DefaultButton>
        </div>
      </div>
    );
  }

  // handle onNavCollapsed since we are using the managed pattern
  // the callback passes the internal state of isNavCollapsed back but since
  // we are handling it on our own we don't need it hence the "_"
  private _onNavCollapsed(_isNavCollapsed: boolean): void {
    this.setState({ isNavCollapsed: !this.state.isNavCollapsed });
  }

  private _switchRTL(): void {
    this.setState({ dir: this.state.dir === 'ltr' ? 'rtl' : 'ltr' });
  }
}
