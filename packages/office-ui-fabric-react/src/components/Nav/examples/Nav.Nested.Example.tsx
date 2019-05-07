import * as React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

export const NavNestedExample: React.StatelessComponent = () => {
  return (
    <Nav
      expandButtonAriaLabel="Expand or collapse"
      groups={[
        {
          links: [
            {
              name: 'Parent link 1',
              url: 'http://example.com',
              links: [
                {
                  name: 'Child link 1',
                  url: 'http://example.com'
                },
                {
                  name: 'Child link 2',
                  url: 'http://example.com',
                  links: [
                    {
                      name: '3rd level link 1',
                      url: 'http://example.com'
                    },
                    {
                      name: '3rd level link 2',
                      url: 'http://example.com'
                    }
                  ]
                },
                {
                  name: 'Child link 3',
                  url: 'http://example.com'
                }
              ]
            },
            {
              name: 'Parent link 2',
              url: 'http://example.com',
              links: [
                {
                  name: 'Child link 4',
                  url: 'http://example.com'
                }
              ]
            }
          ]
        }
      ]}
    />
  );
};
