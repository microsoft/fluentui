import * as React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

export class NavNestedExample extends React.Component<any, any> {
  public render() {
    return (
      <Nav
        groups={ [{
          links: [
            {
              name: 'Parent link', url: 'http://example.com', links: [
                { name: 'Child link', url: 'http://example.com' },
                {
                  name: 'Child link', url: 'http://example.com', links: [
                    { name: 'Child link', url: 'http://example.com' },
                    { name: 'Child link', url: 'http://example.com' }
                  ]
                },
                { name: 'Child link', url: 'http://example.com' }
              ]
            },
            {
              name: 'Parent link', url: 'http://example.com', links: [
                { name: 'Child link', url: 'http://example.com' },
              ]
            }
          ]
        }] }
      />
    );
  }

}
