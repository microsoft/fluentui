import * as React from 'react';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import './Nav.Basic.Example.scss';

export class NavBasicExample extends React.Component<any, any> {
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
                  links: [
                    {
                      name: 'Activity',
                      url: 'http://msn.com',
                      key: 'key1'
                    },
                    {
                      name: 'MSN',
                      url: 'http://msn.com',
                      key: 'key2'
                    }
                  ],
                  isExpanded: true
                },
                {
                  name: 'Documents',
                  url: 'http://example.com',
                  key: 'key3',
                  isExpanded: true
                },
                {
                  name: 'Pages',
                  url: 'http://msn.com',
                  key: 'key4'
                },
                {
                  name: 'Notebook',
                  url: 'http://msn.com',
                  key: 'key5'
                },
                {
                  name: 'Communication and Media',
                  url: 'http://msn.com',
                  key: 'key6'
                },
                {
                  name: 'News',
                  url: 'http://cnn.com',
                  icon: 'News',
                  key: 'key7'
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
