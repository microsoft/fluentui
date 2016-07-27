import * as React from 'react';
import {
  Nav
} from '../../../../index';
import './Nav.Basic.Example.scss';

export class NavBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-NavExample-LeftPane'>
        <Nav
          groups={ [ { name: 'LINK GROUP', links: [{ name: 'A link', url: 'http://example.com', links: [{name: 'A Child Link is a very long name', url: 'http://msn.com'} ], isExpanded: true}, { name: 'B link', url: 'http://example.com', links: [{name: 'B Child Link is a very long name', url: 'http://msn.com'} ], isExpanded: true}, {name: 'C Link no chid', url: 'http://msn.com'} ]}]}
          expandedStateText={ 'expanded' }
          collapsedStateText={ 'collapsed' }
          />
       </div>
    );
  }

}