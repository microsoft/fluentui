import * as React from 'react';
import {
  Fabric,
  Panel,
  PanelType
} from '../../../index';
import {
  Header
} from '../index';
import { Nav } from '../../../Nav';
import { AppState, ExampleStatus } from './AppState';
import { withResponsiveMode, ResponsiveMode } from '../../../utilities/decorators/withResponsiveMode';
import './App.scss';

export interface IAppProps extends React.Props<App> {
  responsiveMode?: ResponsiveMode;
}
export interface IAppState {
  isMenuVisible: boolean;
}

@withResponsiveMode
export class App extends React.Component<IAppProps, any> {

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      isMenuVisible: false
    };

    this._onIsMenuVisibleChanged = this._onIsMenuVisibleChanged.bind(this);
    this._onLinkClick = this._onLinkClick.bind(this);
  }

  public render() {
    let { responsiveMode } = this.props;
    let { isMenuVisible } = this.state;

    let navPanel = (
      <Nav groups={ AppState.examplePages } onLinkClick={ this._onLinkClick } onRenderLink={(link) => ([
        <span key={ 1 } className='Nav-linkText'>{ link.name }</span>,
        (link.status !== undefined ?
          <span key={ 2 } className={ 'Nav-linkFlair ' + 'is-state' + link.status } >{ ExampleStatus[link.status]}</span> :
          null)
      ]) }
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

        { (responsiveMode > ResponsiveMode.large) ? (
          <div className='App-nav'>
            { navPanel }
          </div>
        ) : (null) }

        <div className='App-content' data-is-scrollable='true'>
          { this.props.children }
        </div>

        { (responsiveMode <= ResponsiveMode.large) ? (
          <Panel
            className='App-navPanel ms-font-m'
            isOpen={ isMenuVisible }
            isLightDismiss={ true }
            type={ PanelType.smallFixedNear }
            onDismiss={ this._onIsMenuVisibleChanged.bind(this, false) }>
            { navPanel }
          </Panel>
        ) : (null) }
      </Fabric>
    );
  }

  private _onIsMenuVisibleChanged(isMenuVisible: boolean) {
    this.setState({ isMenuVisible });
  }

  private _onLinkClick() {
    this.setState({ isMenuVisible: false });
  }
}
