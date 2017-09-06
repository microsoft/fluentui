import * as React from 'react';
import './App.scss';
import { AppState } from './AppState';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { Fabric } from 'office-ui-fabric-react/lib/components/Fabric';
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
      toggleIcon = <i className='ms-Icon ms-Icon--ChromeClose'></i>;
    } else {
      toggleIcon = <i className='ms-Icon ms-Icon--GlobalNavButton'></i>;
    }

    return (
      <Fabric className={ css(
        'App',
        isNavOpen && 'is-navOpen'
      ) }>
        <div className='App-wrapper'>
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