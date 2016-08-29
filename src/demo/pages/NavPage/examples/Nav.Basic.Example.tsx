import * as React from 'react';
import {
  Nav
} from '../../../../index';

export class NavBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <Nav
        navbarAriaLabel='use up and down arrow keys to navigate'
        groups={ [ { name: 'LINK GROUP', links: [ { name: 'A link to New Tab', url: 'http://example.com',iconClassName:'', target: '_blank' }, {name: 'Edit', url: 'http://msn.com', iconClassName: 'ms-Icon--pencil'} ]}]}
        />
    );
  }

}