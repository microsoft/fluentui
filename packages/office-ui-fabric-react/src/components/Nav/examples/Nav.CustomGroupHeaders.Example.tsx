import * as React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { INavLinkGroup } from 'office-ui-fabric-react/lib/components/Nav/Nav.types';

export class NavCustomGroupHeadersExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <Nav
        onRenderGroupHeader={this._onRenderGroupHeader}
        groups={[
          {
            name: 'Pages',
            links: [
              {
                name: 'Activity',
                url: 'http://msn.com',
                key: 'key1'
              },
              {
                name: 'News',
                url: 'http://msn.com',
                key: 'key2'
              }
            ]
          }
        ]}
      />
    );
  }

  private _onRenderGroupHeader(group: INavLinkGroup): JSX.Element {
    return <h3>{group.name}</h3>;
  }
}
