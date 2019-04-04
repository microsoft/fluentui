import * as React from 'react';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';

export const NavBasicExample: React.StatelessComponent = () => {
  return (
    <Nav
      onLinkClick={_onLinkClick}
      expandedStateText="expanded"
      collapsedStateText="collapsed"
      selectedKey="key3"
      expandButtonAriaLabel="Expand or collapse"
      styles={{
        root: {
          width: 208,
          height: 350,
          boxSizing: 'border-box',
          border: '1px solid #eee',
          overflowY: 'auto'
        }
      }}
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
                  disabled: true,
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
              key: 'key5',
              disabled: true
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
    />
  );
};

function _onLinkClick(ev: React.MouseEvent<HTMLElement>, item?: INavLink) {
  if (item && item.name === 'News') {
    alert('News link clicked');
  }
}
