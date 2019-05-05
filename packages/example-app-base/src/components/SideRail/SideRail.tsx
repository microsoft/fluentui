import * as React from 'react';
import { css, FocusZone, FocusZoneDirection, Link, IProcessedStyleSet, classNamesFunction, styled } from 'office-ui-fabric-react';
import { isPageActive, jumpToAnchor, getUrlMinusLastHash } from '../../utilities/index2';
import { ISideRailProps, ISideRailLink, ISideRailStyles, ISideRailStyleProps } from './SideRail.types';
import { getStyles } from './SideRail.styles';

export interface ISideRailState {
  activeLink?: string;
}

const getClassNames = classNamesFunction<ISideRailStyleProps, ISideRailStyles>();

class SideRailBase extends React.Component<ISideRailProps, ISideRailState> {
  public readonly state: ISideRailState = {};
  private _classNames: IProcessedStyleSet<ISideRailStyles>;
  private _observer: IntersectionObserver;

  public componentDidMount(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      const { observe, jumpLinks } = this.props;
      if (observe) {
        this._observer = new IntersectionObserver(this._handleObserver, {
          threshold: [0.5]
        });

        if (jumpLinks) {
          jumpLinks.forEach((jumpLink: ISideRailLink) => {
            const element = document.getElementById(jumpLink.url);
            if (element) {
              this._observer.observe(element);
            }
          });
        }
      }
    }
  }

  public componentWillUnmount() {
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  public render(): JSX.Element | null {
    this._classNames = getClassNames(this.props.styles, { theme: this.props.theme });

    const jumpLinkList = this._renderJumpLinkList();
    const relatedLinkList = this._renderLinkList(this.props.relatedLinks, 'Related pages');
    const contactLinkList = this._renderLinkList(this.props.contactLinks, 'Contacts');

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

    if (!jumpLinks || !jumpLinks.length) {
      return null;
    }
    const links = jumpLinks.map((jumpLink: ISideRailLink) => (
      <li
        key={jumpLink.url}
        className={css(classNames.link, classNames.jumpLink, activeLink === jumpLink.url && classNames.jumpLinkActive)}
      >
        <Link href={this._getPageUrl(jumpLink.url)} data-anchor-url={jumpLink.url} onClick={this._onJumpLinkClick}>
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
  };

  private _renderLinkList(linksFromProps: ISideRailLink[] | JSX.Element | undefined, title: string): JSX.Element | null {
    const classNames = this._classNames;

    let links: JSX.Element | undefined;
    if (_isElement(linksFromProps)) {
      links = <div className={classNames.markdownList}>{linksFromProps}</div>;
    } else if (Array.isArray(linksFromProps)) {
      const linksToRender = linksFromProps.filter(link => !isPageActive(link.url));
      if (linksToRender.length) {
        links = (
          <ul>
            {linksToRender.map(link => (
              <li key={link.url} className={classNames.link}>
                <Link href={link.url}>{link.text}</Link>
              </li>
            ))}
          </ul>
        );
      }
    }

    if (links) {
      return (
        <div className={css(classNames.section)}>
          <h3 className={classNames.sectionTitle}>{title}</h3>
          {links}
        </div>
      );
    }
    return null;
  }

  // tslint:disable-next-line:no-any
  private _onJumpLinkClick = (ev?: React.MouseEvent<any>): void => {
    const target = ev && (ev.target as HTMLAnchorElement);
    const url = target && target.dataset && target.dataset.anchorUrl;
    if (url && ev) {
      ev.preventDefault();
    }
    return jumpToAnchor(url);
  };

  private _getPageUrl(url: string): string {
    // This makes sure that location hash changes don't append
    return `${getUrlMinusLastHash(location.hash)}#${url}`;
  }
}

// tslint:disable-next-line:no-any
function _isElement(x: any): x is JSX.Element {
  return !!(x && (x as JSX.Element).props && (x as JSX.Element).type);
}

export const SideRail: React.StatelessComponent<ISideRailProps> = styled<ISideRailProps, ISideRailStyleProps, ISideRailStyles>(
  SideRailBase,
  getStyles,
  undefined,
  { scope: 'SideRail' }
);
