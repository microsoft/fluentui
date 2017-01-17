import * as React from 'react';
import { css } from '@uifabric/utilities';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { withResponsiveMode, ResponsiveMode } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
import { Header } from '../Header/Header';
import { AppState, ExampleStatus } from './AppState';
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
      <Nav groups={ AppState.examplePages } onLinkClick={ this._onLinkClick } onRenderLink={ (link) => ([
        <span key={ 1 } className='Nav-linkText'>{ link.name }</span>,
        (link.status !== undefined ?
          <span key={ 2 } className={ 'Nav-linkFlair ' + 'is-state' + link.status } >{ ExampleStatus[link.status] }</span> :
          null)
      ]) }
      />
    );

    return (
      <Fabric className={ css('ms-App', 'ms-App--' + ResponsiveMode[responsiveMode]) }>

        <div className='ms-App-header'>
          <Header
            title={ AppState.appTitle }
            sideLinks={ AppState.headerLinks }
            isMenuVisible={ isMenuVisible }
            onIsMenuVisibleChanged={ this._onIsMenuVisibleChanged }
          />
        </div>

        { (responsiveMode > ResponsiveMode.large) ? (
          <div className='ms-App-nav'>
            { navPanel }
          </div>
        ) : (null) }

        <div className='ms-App-content' data-is-scrollable='true'>
          { this.props.children }
        </div>

        { (responsiveMode <= ResponsiveMode.large) ? (
          <Panel
            className='ms-App-navPanel ms-font-m'
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
