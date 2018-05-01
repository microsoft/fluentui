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
            name: 'Home - no action supported', url: 'http://example.com', isExpanded: true, icon: 'Home', key: 'key1',
            links: [
              { name: 'Activity', url: 'http://msn.com', key: 'key2' },
              { name: 'News - test with long name to show ellipse', url: 'http://msn.com', target: '_blank', key: 'key3' }
            ]
          },
          { name: 'Documents', url: 'http://example.com', key: 'key4', icon: 'Document' },
          { name: 'Pages', url: 'http://msn.com', target: '_blank', key: 'key5', icon: 'Page' },
          {
            name: 'Notebook - test with long name to show ellipse',
            url: 'http://msn.com',
            target: '_blank',
            key: 'key6',
            icon: 'DietPlanNotebook'
          },
        ]
      },
      {
        name: 'named menu group',
        links: [
          {
            name: 'Home - no action supported', url: 'http://example.com', isExpanded: false, icon: 'Home', key: 'key7',
            links: [
              { name: 'Activity', url: 'http://msn.com', key: 'key8' },
              { name: 'News - test with long name to show ellipse', url: 'http://msn.com', target: '_blank', key: 'key9' }
            ]
          },
          { name: 'Documents', url: 'http://example.com', key: 'key10', icon: 'Document' },
          { name: 'Pages', url: 'http://msn.com', target: '_blank', key: 'key11', icon: 'Page' },
          {
            name: 'Notebook - test with long name to show ellipse',
            url: 'http://msn.com',
            target: '_blank',
            key: 'key12',
            icon: 'DietPlanNotebook'
          },
        ]
      }
    ];

    return (
      <div>
        <NavToggler groups={ navLinkGroups } dataHint='LeftNav' />
      </div>
    );
  }
}