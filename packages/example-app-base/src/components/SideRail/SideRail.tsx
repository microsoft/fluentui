import * as React from 'react';
import { css, FocusZone, FocusZoneDirection, Link, IProcessedStyleSet } from 'office-ui-fabric-react';
import { isPageActive, jumpToAnchor, getPathMinusLastHash } from '../../utilities/index';
import { ISideRailProps, ISideRailLink } from './SideRail.types';
import { ISideRailStyles, getClassNames, sideRailClassNames } from './SideRail.styles';

export interface ISideRailState {
  activeLink?: string;
}

export class SideRail extends React.Component<ISideRailProps, ISideRailState> {
  public readonly state: ISideRailState = {};
  private _classNames: IProcessedStyleSet<ISideRailStyles>;

  public componentDidMount(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      const { observe, jumpLinks } = this.props;
      if (observe) {
        const options: IntersectionObserverInit = {
          threshold: [0.5]
        };

        const observer: IntersectionObserver = new IntersectionObserver(this._handleObserver, options);

        if (jumpLinks) {
          jumpLinks.forEach((jumpLink: ISideRailLink) => {
            const element = document.getElementById(jumpLink.url);
            if (element) {
              observer.observe(element);
            }
          });
        }
      }
    }
  }

  public render(): JSX.Element | null {
    const jumpLinkList = this._renderJumpLinkList();
    const relatedLinkList = this._renderRelatedLinkList();
    const contactLinkList = this._renderContactList();

    this._classNames = getClassNames({ theme: this.props.theme! });

    return jumpLinkList || relatedLinkList || contactLinkList ? (
      <FocusZone direction={FocusZoneDirection.vertical} className={this._classNames.root}>
        {jumpLinkList}
        {relatedLinkList}
        {contactLinkList}
      </FocusZone>
    ) : null;
  }

  private _handleObserver = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      const { intersectionRatio, target } = entry;
      if (intersectionRatio > 0.5) {
        this.setState({
          activeLink: target.id
        });
        break;
      }
    }
  };

  private _renderJumpLinkList = (): JSX.Element | null => {
    const { activeLink } = this.state;
    const { jumpLinks } = this.props;
    const classNames = this._classNames;

    if (jumpLinks && jumpLinks.length > 0) {
      const links = jumpLinks.map((jumpLink: ISideRailLink) => (
        <li
          key={jumpLink.url}
          className={css(classNames.link, classNames.jumpLink, jumpLink.url === activeLink && sideRailClassNames.isActive)}
        >
          <Link href={this._getPagePath(jumpLink.url)} data-anchor-url={jumpLink.url} onClick={this._onJumpLinkClick}>
            {jumpLink.text}
          </Link>
        </li>
      ));
      return (
        <div className={css(classNames.section, classNames.jumpLinkSection)}>
          <h3 className={classNames.sectionTitle}>On this page</h3>
          <ul>{links}</ul>
        </div>
      );
    }
    return null;
  };

  private _renderRelatedLinkList = (): JSX.Element | null => {
    const { relatedLinks } = this.props;
    const classNames = this._classNames;

    let links: JSX.Element | undefined;
    if (_isElement(relatedLinks)) {
      links = <div className={classNames.markdownList}>{relatedLinks}</div>;
    } else if (Array.isArray(relatedLinks) && relatedLinks.length) {
      links = (
        <ul>
          {relatedLinks.map(
            (relatedLink: ISideRailLink) =>
              !isPageActive(relatedLink.url) && (
                <li key={relatedLink.url} className={classNames.link}>
                  <Link href={relatedLink.url}>{relatedLink.text}</Link>
                </li>
              )
          )}
        </ul>
      );
    }

    if (links) {
      return (
        <div className={css(classNames.section)}>
          <h3 className={classNames.sectionTitle}>Related pages</h3>
          {links}
        </div>
      );
    }
    return null;
  };

  private _renderContactList = (): JSX.Element | null => {
    const { contactLinks } = this.props;
    const classNames = this._classNames;

    let links: JSX.Element | undefined;
    if (_isElement(contactLinks)) {
      links = <div className={classNames.markdownList}>{contactLinks}</div>;
    } else if (Array.isArray(contactLinks) && contactLinks.length) {
      links = (
        <ul>
          {contactLinks.map((contactLink: ISideRailLink) => (
            <li key={contactLink.url} className={classNames.link}>
              <Link href={contactLink.url}>{contactLink.text}</Link>
            </li>
          ))}
        </ul>
      );
    }

    if (links) {
      return (
        <div className={css(classNames.section)}>
          <h3 className={classNames.sectionTitle}>Contacts</h3>
          {links}
        </div>
      );
    }

    return null;
  };

  // tslint:disable-next-line:no-any
  private _onJumpLinkClick = (ev?: React.MouseEvent<any>): void => {
    const target = ev && (ev.target as HTMLAnchorElement);
    const url = target && target.dataset && target.dataset.anchorUrl;
    if (url && ev) {
      ev.preventDefault();
    }
    return jumpToAnchor(url);
  };

  private _getPagePath(url: string): string {
    let path = location.hash;
    // This makes sure that location hash changes don't append
    path = getPathMinusLastHash(path);

    return path + '#' + url;
  }
}

// tslint:disable-next-line:no-any
function _isElement(x: any): x is JSX.Element {
  return !!(x && (x as JSX.Element).props && (x as JSX.Element).type);
}
