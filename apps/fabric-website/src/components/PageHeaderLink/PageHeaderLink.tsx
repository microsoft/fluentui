import * as React from 'react';
import { Animate } from '../../utilities/animation/Animate';
import WindowWidthUtility from '../../utilities/WindowWidthUtility';

export interface IPageHeaderLink {
  text: string;
  href: string;
}

export class PageHeaderLink extends React.Component<IPageHeaderLink, {}> {
  private currentBreakpoint;
  private scrollDistance;

  private _els: {
    link?: HTMLAnchorElement
  } = {};

  public componentDidMount() {
    this._eventListener = this._eventListener.bind(this);
    this._getBreakpoint = this._getBreakpoint.bind(this);
    this._els.link.addEventListener('click', this._eventListener);
    window.addEventListener('resize', this._getBreakpoint);
    this._getBreakpoint();
  }

  public render() {
    return (
      <a ref={ (a) => { this._els.link = a; } } href={ this.props.href } data-title={ this.props.text }>{ this.props.text }</a>
    );
  }

  private _setScrollDistance(): number {
    return 160; // UHF header change the requirement
  }

  private _getBreakpoint() {
    let breakpoint = WindowWidthUtility.currentFabricBreakpoint();
    if (this.currentBreakpoint !== breakpoint) {
      this.currentBreakpoint = breakpoint;
      this.scrollDistance = this._setScrollDistance();
    }
  }

  private _eventListener(event) {
    event.preventDefault();
    history.pushState({}, '', this._els.link.getAttribute('href'));
    let hash = this._extractAnchorLink(window.location.hash);
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      hash = decodeURI(hash);
    }
    let el = document.getElementById(hash);
    let elRect = el.getBoundingClientRect();
    let bodySTop = document.body.scrollTop;
    let currentScrollPosition;

    currentScrollPosition = bodySTop + elRect.top;

    if (currentScrollPosition < 0) {
      currentScrollPosition = 0;
    }

    let scrollTarget = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) ?
      document.querySelector('html') :
      document.querySelector('body');

    Animate.scrollTo(scrollTarget as HTMLElement, {
      duration: 0.3,
      top: currentScrollPosition - this.scrollDistance
    });
  }

  private _extractAnchorLink(path) {
    let split = path.split('#');
    let cleanedSplit = split.filter((value) => {
      if (value === '') {
        return false;
      } else {
        return true;
      }
    });
    return cleanedSplit[cleanedSplit.length - 1];
  }
}