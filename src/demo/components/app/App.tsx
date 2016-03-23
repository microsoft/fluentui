import * as React from 'react';
import {
  Fabric
} from '../../../components/index';
import {
  Header,
  NavBar
} from '../index';
import './App.scss';
import AppState from './AppState';

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

        <div className='App-navBar'>
          <NavBar groups={ AppState.examplePages } />
        </div>

        <div className='App-content'>
          { this.props.children }
        </div>

      </Fabric>
    );
  }

}
