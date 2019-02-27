import * as React from 'react';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import './Nav.Basic.Example.scss';

export class NavDisabledItemsExample extends React.Component<any, any> {
  public onLinkClick = (ev: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    if (item && item.name === 'News') {
      alert('News link clicked');
    }
  };

  public render(): JSX.Element {
    return (
      <div className="ms-NavExample-LeftPane">
        <Nav
          groups={[
            {
              links: [
                {
                  name: 'Home',
                  url: 'http://example.com',
                  disabled: true,
                  links: [
                    {
                      name: 'Activity',
                      url: 'http://msn.com',
                      key: 'key1'
                    },
                    {
                      name: 'MSN',
                      url: 'http://msn.com',
                      key: 'key2',
                      disabled: true,
                      altText: 'The link is temporary disabled'
                    }
                  ],
                  isExpanded: true
                },
                {
                  name: 'Documents',
                  url: 'http://example.com',
                  key: 'key3'
                },
                {
                  name: 'Unavailable Item',
                  url: 'http://cnn.com',
                  icon: 'News',
                  disabled: true,
                  key: 'key4'
                }
              ]
            }
          ]}
          onLinkClick={this.onLinkClick}
          expandedStateText={'expanded'}
          collapsedStateText={'collapsed'}
          selectedKey={'key3'}
          expandButtonAriaLabel={'Expand or collapse'}
        />
      </div>
    );
  }
}
