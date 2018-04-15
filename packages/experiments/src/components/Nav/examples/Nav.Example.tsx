import * as React from 'react';
import { INavLinkGroup } from 'office-ui-fabric-react/lib/components/Nav';
import { NavToggler } from '../NavToggler';

export class NavExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    const navLinkGroups: INavLinkGroup[] = [
      {
        name: 'default group',
        links: [
          {
            name: 'Home - no action supported', url: 'http://example.com', isExpanded: true, icon: 'Home',
            links: [
              { name: 'Activity', url: 'http://msn.com', key: 'key1' },
              { name: 'News - test with long name to show ellipse', url: 'http://msn.com', target: '_blank', key: 'key2' }
            ]
          },
          { name: 'Documents', url: 'http://example.com', key: 'key3', icon: 'Document' },
          { name: 'Pages', url: 'http://msn.com', target: '_blank', key: 'key4', icon: 'Page' },
          {
            name: 'Notebook - test with long name to show ellipse',
            url: 'http://msn.com',
            target: '_blank',
            key: 'key5',
            icon: 'DietPlanNotebook'
          },
        ]
      },
      {
        name: 'named menu group',
        links: [
          {
            name: 'Home - no action supported', url: 'http://example.com', isExpanded: false, icon: 'Home',
            links: [
              { name: 'Activity', url: 'http://msn.com', key: 'key6' },
              { name: 'News - test with long name to show ellipse', url: 'http://msn.com', target: '_blank', key: 'key7' }
            ]
          },
          { name: 'Documents', url: 'http://example.com', key: 'key8', icon: 'Document' },
          { name: 'Pages', url: 'http://msn.com', target: '_blank', key: 'key9', icon: 'Page' },
          {
            name: 'Notebook - test with long name to show ellipse',
            url: 'http://msn.com',
            target: '_blank',
            key: 'key10',
            icon: 'DietPlanNotebook'
          },
        ]
      }
    ];

    return (
      <div>
        <NavToggler groups={ navLinkGroups } />
      </div>
    );
  }
}