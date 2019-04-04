import * as React from 'react';
import { Nav, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';

export const NavCustomGroupHeadersExample: React.StatelessComponent = () => {
  return (
    <Nav
      onRenderGroupHeader={_onRenderGroupHeader}
      groups={[
        {
          name: 'Pages',
          links: [
            // prettier-ignore
            { name: 'Activity', url: 'http://msn.com', key: 'key1' },
            { name: 'News', url: 'http://msn.com', key: 'key2' }
          ]
        },
        {
          name: 'More pages',
          links: [
            // prettier-ignore
            { name: 'Settings', url: 'http://msn.com', key: 'key3' },
            { name: 'Notes', url: 'http://msn.com', key: 'key4' }
          ]
        }
      ]}
    />
  );
};

function _onRenderGroupHeader(group: INavLinkGroup): JSX.Element {
  return <h3>{group.name}</h3>;
}
