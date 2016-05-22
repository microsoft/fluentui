import * as React from 'react';
import {
  Nav
} from '../../../../index';

export class NavBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <Nav
        groups={ [ { name: 'Link group', links: [ { name: 'A link', url: 'http://example.com' } ] } ] }
        />
    );
  }

}

