import * as React from 'react';
import {
  Fabric,
  Panel,
} from '../../../components/index';
import {
  Header
} from '../index';
import Nav from '../../../components/Nav/index';
import './App.scss';
import AppState, { ExampleStatus } from './AppState';
import { withResponsiveMode, ResponsiveMode } from '../../../utilities/decorators/withResponsiveMode';

export interface IAppProps extends React.Props<App> {
  responsiveMode?: ResponsiveMode;
}
export interface IAppState {
  isMenuVisible: boolean;
}

@withResponsiveMode
export default class App extends React.Component<IAppProps, any> {

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      isMenuVisible: false
    };

    this._onIsMenuVisibleChanged = this._onIsMenuVisibleChanged.bind(this);
  }

  public render() {
    let { responsiveMode } = this.props;
    let { isMenuVisible } = this.state;

    let navPanel = (
      <Nav groups={ AppState.examplePages } onRenderLink={(link) => ([
        <span key={ 1 } className='Nav-linkText'>{ link.name }</span>,
        (link.status !== undefined ?
          <span key={ 2 } className={ 'Nav-linkFlair ' + 'is-state' + link.status } >{ ExampleStatus[link.status] }</span> :
          null)
        ])}
        />
    );

    return (
      <Fabric className='App'>

        <div className='App-header'>
          <Header
            title={ AppState.appTitle }
            sideLinks={ AppState.headerLinks }
            isMenuVisible={ isMenuVisible }
            onIsMenuVisibleChanged={ this._onIsMenuVisibleChanged }
            />
        </div>

        { (responsiveMode > ResponsiveMode.medium) ? (
          <div className='App-nav'>
            { navPanel }
          </div>
        ) : ( null ) }

        <div className='App-content'>
          { this.props.children }
        </div>

        { (responsiveMode <= ResponsiveMode.medium) ? (
          <Panel className='App-navPanel ms-font-m' isOpen={isMenuVisible} onDismiss={ this._onIsMenuVisibleChanged.bind(this, false) }>
            { navPanel }
          </Panel>
        ) : (null) }
      </Fabric>
    );
  }

  private _onIsMenuVisibleChanged(isMenuVisible: boolean) {
    this.setState({ isMenuVisible });
  }
}
