import * as React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

export const NavNestedExample: React.FunctionComponent = () => {
  return (
    <Nav
      expandButtonAriaLabel="Expand or collapse"
      ariaLabel="Nav example with nested links"
      groups={[
        {
          links: [
            {
              name: 'Parent link 1',
              url: 'http://example.com',
              target: '_blank',
              links: [
                {
                  name: 'Child link 1',
                  url: 'http://example.com',
                  target: '_blank'
                },
                {
                  name: 'Child link 2',
                  url: 'http://example.com',
                  target: '_blank',
                  links: [
                    {
                      name: '3rd level link 1',
                      url: 'http://example.com',
                      target: '_blank'
                    },
                    {
                      name: '3rd level link 2',
                      url: 'http://example.com',
                      target: '_blank'
                    }
                  ]
                },
                {
                  name: 'Child link 3',
                  url: 'http://example.com',
                  target: '_blank'
                }
              ]
            },
            {
              name: 'Parent link 2',
              url: 'http://example.com',
              target: '_blank',
              links: [
                {
                  name: 'Child link 4',
                  url: 'http://example.com',
                  target: '_blank'
                }
              ]
            }
          ]
        }
      ]}
    />
  );
};
