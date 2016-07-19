import * as React from 'react';
import { AppState, ExampleStatus } from '../../../components/App/AppState';
import {
  Nav
} from '../../../../index';

export class NavFabricDemoAppExample extends React.Component<any, any> {
  public render() {
    return (
      <Nav groups={ AppState.examplePages } onRenderLink={(link) => ([
        <span key={ 1 } className='Nav-linkText'>{ link.name }</span>,
        (link.status !== undefined ?
          <span key={ 2 } className={ 'Nav-linkFlair ' + 'is-state' + link.status } >{ ExampleStatus[link.status] }</span> :
          null)
        ])}
      />
    );
  }

}
