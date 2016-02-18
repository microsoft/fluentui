import * as React from 'react';
import Fabric from '../../../components/Fabric/index';
import AppState from './AppState';
import Header from '../Header/index';
import NavBar from '../NavBar/index';
import './App.scss';

export default class App extends React.Component<any, any> {

  public render() {
    return (
      <Fabric className='App'>

        <div className='App-header'>
          <Header title={ AppState.appTitle } sideLinks={ AppState.headerLinks } />
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
