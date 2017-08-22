import * as React from 'react';
import {
  css
} from 'office-ui-fabric-react/lib/Utilities';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { withResponsiveMode, ResponsiveMode } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
import { INavLink, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { Header } from '../Header/Header';
import './App.scss';

export enum ExampleStatus {
  placeholder = 0,
  started = 1,
  beta = 2,
  release = 3
}

export interface IAppLink extends INavLink {
  getComponent?: (cb: (obj: any) => void) => any;
  component?: any;
}

export interface IAppLinkGroup extends INavLinkGroup {
  links: IAppLink[];
}

export interface IAppDefinition {
  appTitle: string;
  testPages: IAppLink[];
  examplePages: IAppLinkGroup[];
  headerLinks: IAppLink[];
}

export interface IAppProps extends React.Props<App> {
  responsiveMode?: ResponsiveMode;
  appDefinition: IAppDefinition;
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
    let { appDefinition, responsiveMode } = this.props;
    let { isMenuVisible } = this.state;

    if (responsiveMode === undefined) {
      responsiveMode = ResponsiveMode.large;
    }

    let navPanel = (
      <Nav
        groups={ appDefinition.examplePages }
        onLinkClick={ this._onLinkClick }
        onRenderLink={ (link: INavLink) => ([
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
            title={ appDefinition.appTitle }
            sideLinks={ appDefinition.headerLinks }
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
            className='ms-App-navPanel'
            isOpen={ isMenuVisible }
            isLightDismiss={ true }
            type={ PanelType.smallFixedNear }
            onDismiss={ this._onIsMenuVisibleChanged.bind(this, false) }
          >
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
