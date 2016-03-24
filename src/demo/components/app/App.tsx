import * as React from 'react';
import {
  Fabric
} from '../../../components/index';
import {
  Header
} from '../index';
import Nav from '../../../components/Nav/index';
import './App.scss';
import AppState, { ExampleStatus } from './AppState';

export default class App extends React.Component<any, any> {

  public render() {
    return (
      <Fabric className='App'>

        <div className='App-header'>
          <Header
            title={ AppState.appTitle }
            sideLinks={ AppState.headerLinks }
            />
        </div>

        <div className='App-Nav'>
          <Nav groups={ AppState.examplePages } onRenderLink={(link) => ([
            <span key={ 1 } className='Nav-linkText'>{ link.name }</span>,
            (link.status !== undefined ?
              <span key={ 2 } className={ 'Nav-linkFlair ' + 'is-state' + link.status } >{ ExampleStatus[link.status] }</span> :
              null)
            ])}
          />
        </div>

        <div className='App-content'>
          { this.props.children }
        </div>

      </Fabric>
    );
  }

}
