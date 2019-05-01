import * as React from 'react';
import { Animate } from '../../utilities/animation/Animate';
import WindowWidthUtility from '../../utilities/WindowWidthUtility';
import { extractAnchorLink } from '@uifabric/example-app-base/lib/utilities/extractAnchorLink';

export interface IPageHeaderLink {
  text: string;
  href: string;
}

export class PageHeaderLink extends React.Component<IPageHeaderLink, {}> {
  private currentBreakpoint;
  private scrollDistance;

  private _els: {
    link?: HTMLAnchorElement;
  } = {};

  public componentDidMount(): void {
    this._eventListener = this._eventListener.bind(this);
    this._getBreakpoint = this._getBreakpoint.bind(this);
    this._els.link.addEventListener('click', this._eventListener);
    window.addEventListener('resize', this._getBreakpoint);
    this._getBreakpoint();
  }

  public render(): JSX.Element {
    return (
      <a
        ref={a => {
          this._els.link = a;
        }}
        href={this.props.href}
        data-title={this.props.text}
      >
        {this.props.text}
      </a>
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

  private _eventListener(event): void {
    event.preventDefault();
    history.pushState({}, '', this._els.link.getAttribute('href'));
    let navigatorUserAgent = navigator.userAgent.toLowerCase();
    let anchor = extractAnchorLink(window.location.hash);
    if (navigatorUserAgent.indexOf('firefox') > -1) {
      anchor = decodeURI(anchor);
    }
    if (!anchor) {
      return;
    }
    let el = document.getElementById(anchor);
    let elRect = el.getBoundingClientRect();
    let bodySTop = document.body.scrollTop;
    let currentScrollPosition = bodySTop + elRect.top;
    let scrollTarget: HTMLBodyElement | HTMLHtmlElement = document.querySelector('body');

    if (
      navigatorUserAgent.indexOf('firefox') > -1 ||
      (navigatorUserAgent.indexOf('chrome') > -1 && navigatorUserAgent.indexOf('edge') < 0)
    ) {
      currentScrollPosition += window.scrollY;
      scrollTarget = document.querySelector('html');
    }

    if (currentScrollPosition < 0) {
      currentScrollPosition = 0;
    }

    Animate.scrollTo(scrollTarget, {
      duration: 0.3,
      top: currentScrollPosition - this.scrollDistance
    });
  }
}
