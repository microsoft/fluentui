import * as React from 'react';
import './App.scss';
import { AppState } from './AppState';
import AttachedScrollUtility from '../../utilities/AttachedScrollUtility';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Nav } from '../Nav/Nav';

export interface IAppProps extends React.Props<App> {}

export interface IAppState {
  isAttached: boolean;
  navHeight: number;
}

export class App extends React.Component<IAppProps, any> {
  private _attachedScrollThreshold: number;
  private _appContent: HTMLDivElement;
  private _appContentRect: ClientRect;

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      isAttached: false
    };
  }

  public componentDidMount(): void {
    window.addEventListener('scroll', this._handleNavPositioning);
    window.addEventListener('resize', this._handleNavPositioning);

    this._attachedScrollThreshold = AttachedScrollUtility.calculateAttachedScrollThreshold();
    this._handleNavPositioning();
  }

  public componentWillUnmount(): void {
    window.removeEventListener('scroll', this._handleNavPositioning);
    window.removeEventListener('resize', this._handleNavPositioning);
  }

  public componentWillReceiveProps(nextProps: IAppProps): void {
    if (nextProps && nextProps.children !== this.props.children) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }

  public render(): JSX.Element {
    let { navHeight } = this.state;
    let navPosition: 'fixed' | 'absolute' = this.state.isAttached ? 'fixed' : 'absolute';
    let navStyle = {
      height: navHeight,
      position: navPosition
    };

    return (
      <Fabric className="App">
        <div className="App-wrapper">
          <div className="App-nav" style={navStyle}>
            <Nav pages={AppState.pages} />
          </div>
          <div
            className="App-content"
            data-is-scrollable="true"
            ref={el => (this._appContent = el)}
            data-app-content-div="true"
          >
            {this.props.children}
          </div>
        </div>
      </Fabric>
    );
  }

  private _handleNavPositioning = () => {
    let { isAttached, navHeight } = this.state;
    this._appContentRect = this._appContent && this._appContent.getBoundingClientRect();
    const viewPortHeight = window.innerHeight;
    isAttached = AttachedScrollUtility.shouldComponentAttach(isAttached, this._attachedScrollThreshold);
    navHeight = this._calculateNavHeight(viewPortHeight, this._appContentRect, navHeight);
    this.setState({
      isAttached: isAttached,
      navHeight: navHeight
    });
  };

  private _calculateNavHeight(viewPortHeight: number, appContentRect: ClientRect, height: number): number {
    if (!appContentRect) {
      return height;
    }
    if (appContentRect.top >= 0) {
      // This case accounts for space taken up by the UHF header in the viewport.
      height = viewPortHeight - appContentRect.top;
      if (appContentRect.height < appContentRect.bottom && viewPortHeight > appContentRect.bottom) {
        // This case might only exist in the UHF testing environment, when content isn't rendering properly and its height is weird.
        height = appContentRect.height;
      }
    } else if (viewPortHeight < appContentRect.bottom && appContentRect.top < 0) {
      // For pages with content that's longer than the viewport, the viewport is the height.
      // Takes effect when you scroll past the header.
      height = viewPortHeight;
    } else if (appContentRect.bottom < 0) {
      // In smaller screens when you scroll till the footer takes the whole page, collapse the nav.
      height = 0;
    } else {
      // Once the footer is in view, match nav bottom to content bottom.
      height = appContentRect.bottom;
    }
    return height;
  }
}
