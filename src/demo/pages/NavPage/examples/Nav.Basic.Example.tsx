import * as React from 'react';
import {
  Nav
} from '../../../../index';

export class NavBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <Nav
        groups={ [ { name: 'LINK GROUP', links: [ { name: 'A link', url: 'http://example.com' }, {name: 'Add a link', url: 'http://msn.com', plusIconLink: 'true'} ]}]}
        />
    );
  }

}