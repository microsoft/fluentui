import * as React from 'react';

import AppState from './AppState';
import Header from '../Header';
import NavBar from '../NavBar';
import './App.css';

export default class App extends React.Component<any, any> {

  public render() {
    return (
      <div className='App ms-font-m'>

        <div className='App-header'>
          <Header title={ AppState.appTitle } sideLinks={ AppState.headerLinks } />
        </div>

        <div className='App-navBar'>
          <NavBar groups={ AppState.examplePages } />
        </div>

        <div className='App-content'>
          { this.props.children }
        </div>

      </div>
    );
  }

}
