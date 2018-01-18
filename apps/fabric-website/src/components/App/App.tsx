import * as React from 'react';
import './App.scss';
import { AppState } from './AppState';
import { css, autobind } from 'office-ui-fabric-react/lib/Utilities';
import AttachedScrollThresholdUtility from '../../utilities/AttachedScrollThresholdUtility';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Nav } from '../Nav/Nav';

export interface IAppProps extends React.Props<App> {
}

export interface IAppState {
  isAttached: boolean;
  navHeight: number;
}

export class App extends React.Component<IAppProps, any> {

  private _attachedScrollThreshold: number;
  private _height: number;
  private _appContent: HTMLDivElement;

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      isAttached: false
    };
  }

  public componentDidMount() {
    window.addEventListener('scroll', this._handleNavPositioning);
    window.addEventListener('resize', this._handleNavPositioning);

    let { isAttached } = this.state;
    const appContentRect = this._appContent.getBoundingClientRect();
    const viewPortHeight = window.innerHeight;
    this._attachedScrollThreshold = AttachedScrollThresholdUtility.calculateAttachedScrollThreshold();
    this._height = this._calculateNavHeight(viewPortHeight, appContentRect, this._height);
    isAttached = this._attachNav(this.state.isAttached, viewPortHeight, appContentRect);

    this.setState({
      isAttached: isAttached,
      navHeight: this._height
    })
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this._handleNavPositioning);
    window.removeEventListener('resize', this._handleNavPositioning);
  }

  public render() {
    let { navHeight } = this.state;
    let navTop: string = this.state.isAttached ? '0' : 'unset';
    let navStyle = {
      top: navTop,
      height: this.state.navHeight
    };

    return (
      <Fabric
        className='App'
      >
        <div className='App-wrapper'>
          <div
            className='App-nav'
            style={ navStyle }
          >
            <Nav
              pages={ AppState.pages }
            />
          </div>
          <div
            className='App-content'
            data-is-scrollable='true'
            ref={ (el) => this._appContent = el }
            data-app-content-div='true'
          >
            { this.props.children }
          </div>
        </div>
      </Fabric>
    );
  }

  @autobind
  private _handleNavPositioning() {
    let { isAttached } = this.state;
    const appContentRect = this._appContent.getBoundingClientRect();
    const viewPortHeight = window.innerHeight;
    isAttached = this._attachNav(isAttached, viewPortHeight, appContentRect);
    this._height = this._calculateNavHeight(viewPortHeight, appContentRect, this._height);
    this.setState({
      isAttached: isAttached,
      navHeight: this._height
    });
  }

  private _attachNav(isAttached, viewPortHeight, appContentRect): boolean {
    if (window.scrollY >= this._attachedScrollThreshold) {
      isAttached = true;
    } else {
      isAttached = false;
    }
    return isAttached;
  }

  private _calculateNavHeight(viewPortHeight: number, appContentRect: ClientRect, height: number): number {
    if (!appContentRect) {
      return height;
    }
    if (appContentRect.top >= 0) {
      // This case accounts for space taken up by the UHF header
      height = viewPortHeight - appContentRect.top;
    } else if (viewPortHeight < appContentRect.bottom && appContentRect.top < 0) {
      // For pages with content that's longer than the viewport, the viewport is the height.
      // Takes effect when you scroll past the header.
      height = viewPortHeight;
    } else if (appContentRect.bottom < 0) {
      // In smaller screens when you scroll till the footer takes the whole page, collapse the nav.
      height = 0;
    } else if (appContentRect.height < appContentRect.bottom) {
      // This case might only exist in the UHF testing environment, when content isn't rendering properly.
      height = appContentRect.height;
    } else {
      // Once the footer is in view, match nav bottom to content bottom.
      height = appContentRect.bottom;
    }
    return height;
  }
}