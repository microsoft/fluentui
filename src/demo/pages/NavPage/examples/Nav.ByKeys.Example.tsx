import * as React from 'react';
import {
  Nav
} from '../../../../index';

export class NavByKeysExample extends React.Component<any, any> {
  public render() {
    return (
      <Nav
        groups={ [ { links: [
          { name: 'Home', key: 'Home', url: '' },
          { name: 'Activity', key: 'Activity', url: '' },
          { name: 'News', key: 'News', url: '' },
          { name: 'Documents', key: 'Documents', url: '' },
        ] } ] }
      />
    );
  }
}
