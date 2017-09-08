import * as React from 'react';
import './App.scss';
import { AppState } from './AppState';
import { css } from 'office-ui-fabric-react/lib/Utilities';
<<<<<<< HEAD
import { Fabric } from 'office-ui-fabric-react/lib/components/Fabric';
=======
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
>>>>>>> fabric-website-v5.0
import { Nav } from '../Nav/Nav';

export interface IAppProps extends React.Props<App> {
}

export interface IAppState {
  isNavOpen: boolean;
}

export class App extends React.Component<IAppProps, any> {

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      isNavOpen: false
    };
  }

  public render() {
    let { isNavOpen } = this.state;

    let toggleIcon;
    let siteTitle;
    if (isNavOpen) {
<<<<<<< HEAD
      toggleIcon = <i className='ms-Icon ms-Icon--ChromeClose'></i>;
    } else {
      toggleIcon = <i className='ms-Icon ms-Icon--GlobalNavButton'></i>;
=======
      toggleIcon = <i className='ms-Icon ms-Icon--ChromeClose' />;
      siteTitle = '';
    } else {
      toggleIcon = <i className='ms-Icon ms-Icon--GlobalNavButton' />;
      siteTitle = <div className='siteTitle'>Fabric</div>;
>>>>>>> fabric-website-v5.0
    }

    return (
      <Fabric className={ css(
        'App',
        isNavOpen && 'is-navOpen'
      ) }>
        <div className='App-wrapper'>
<<<<<<< HEAD
=======
          <div className='App-mobileNavBar'>
            <button className='menuButton' onClick={ this._onNavToggleClicked.bind(this) }>
              { toggleIcon }
            </button>
            { siteTitle }
          </div>
          <div className='App-mobileNavOverlay' onClick={ this._onOverlayClicked.bind(this) } />
>>>>>>> fabric-website-v5.0
          <div className='App-nav'>
            <Nav pages={ AppState.pages } onLinkClick={ this._onNavItemClicked.bind(this) } />
          </div>
          <div className='App-content' data-is-scrollable='true'>
            { this.props.children }
          </div>
        </div>
      </Fabric>
    );
  }

  private _onNavToggleClicked(ev: MouseEvent) {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  private _onOverlayClicked(ev: MouseEvent) {
    this.setState({
      isNavOpen: false
    });
  }

  private _onNavItemClicked(ev: MouseEvent) {
    this.setState({
      isNavOpen: false
    });
  }
}