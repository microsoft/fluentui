import * as React from 'react';
import { ExampleStatus } from '@uifabric/example-app-base';
import { AppDefinition } from '../../../demo/AppDefinition';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

export class NavFabricDemoAppExample extends React.Component<any, any> {
  public render() {
    return (
      <Nav groups={ AppDefinition.examplePages } onRenderLink={ (link: any) => ([
        <span key={ 1 } className='Nav-linkText'>{ link.name }</span>,
        (link.status !== undefined ?
          <span key={ 2 } className={ 'Nav-linkFlair ' + 'is-state' + link.status } >{ ExampleStatus[link.status] }</span> :
          null)
      ]) }
      />
    );
  }

}
