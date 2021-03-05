import * as React from 'react';
import { Nav, INavLinkGroup } from '@fluentui/react/lib/Nav';

const navLinkGroups: INavLinkGroup[] = [
  {
    name: 'Pages',
    links: [
      { name: 'Activity', url: 'http://msn.com', key: 'key1', target: '_blank' },
      { name: 'News', url: 'http://msn.com', key: 'key2', target: '_blank' },
    ],
  },
  {
    name: 'More pages',
    links: [
      { name: 'Settings', url: 'http://msn.com', key: 'key3', target: '_blank' },
      { name: 'Notes', url: 'http://msn.com', key: 'key4', target: '_blank' },
    ],
  },
];

export const NavCustomGroupHeadersExample: React.FunctionComponent = () => {
  return (
    <Nav
      onRenderGroupHeader={_onRenderGroupHeader}
      ariaLabel="Nav example with custom group headers"
      groups={navLinkGroups}
    />
  );
};

function _onRenderGroupHeader(group: INavLinkGroup): JSX.Element {
  return <h3>{group.name}</h3>;
}
