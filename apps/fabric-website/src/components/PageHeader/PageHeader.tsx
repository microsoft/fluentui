import * as React from 'react';
import { css, BaseComponent, IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import * as stylesImport from './PageHeader.module.scss';
const styles: any = stylesImport;
import AttachedScrollUtility from '../../utilities/AttachedScrollUtility';
import { getPathMinusLastHash } from '../../utilities/pageroute';
import { PageHeaderLink } from '../../components/PageHeaderLink/PageHeaderLink';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';

export interface IPageHeaderProps extends IBaseProps {
  /**
   * The title of the current page.
   * @default 'Page title'
   */
  pageTitle: string;

  /**
   * Optional links to show in the in-page navigation menu.
   * @default No links
   */
  links?: IPageHeaderLinkProps[];

  /**
   * Background color for the header.
   * @default '#333333''
   */
  backgroundColor?: string;
  backgroundImage?: string;
}

export interface IPageHeaderLinkProps {
  /**
   * The text of the link.
   */
  text: string;

  /**
   * The ID the link should navigate to within the page, without the # symbol
   */
  location: string;
}

export interface IPageHeaderState {
  /**
   * The section title area is in a collapsed state.
   */
  isAttached: boolean;
  headerBottom: string;
  headerTop: string;
}

export class PageHeader extends BaseComponent<IPageHeaderProps, IPageHeaderState> {
  public static defaultProps: IPageHeaderProps = {
    pageTitle: 'Page title',
    backgroundColor: '#333333'
  };

  private _attachedScrollThreshold: number;
  private _appContent: HTMLDivElement;
  private _appContentRect: ClientRect;

  constructor(props: IPageHeaderProps) {
    super(props);

    this.state = {
      isAttached: false,
      headerBottom: 'unset',
      headerTop: '0'
    };
  }

  public componentDidMount(): void {
    // Only attach the header if there are in-page nav items
    if (this.props.links) {
      this._events.on(window, 'scroll', this._onScroll, true);
      this._appContent = document.querySelector('[data-app-content-div]');
      this._attachedScrollThreshold = AttachedScrollUtility.calculateAttachedScrollThreshold();
    }
  }

  public render(): JSX.Element {
    let { pageTitle, links, backgroundColor, backgroundImage } = this.props;
    let { isAttached } = this.state;
    let inPageNav;
    let backgroundStyle = {
      bottom: this.state.headerBottom,
      top: this.state.headerTop,
      backgroundColor: backgroundColor,
      backgroundImage: backgroundImage
    };

    if (links) {
      inPageNav = (
        <FocusZone>
          <nav className={styles.pageNav} aria-label="In page navigation">
            <ul>
              {links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <PageHeaderLink href={this._getPagePath(link)} text={link.text} />
                </li>
              ))}
            </ul>
          </nav>
        </FocusZone>
      );
    }

    return (
      <div className={css(styles.pageHeader, isAttached ? styles.isAttached : '')} style={backgroundStyle}>
        <div className={styles.content} style={backgroundStyle}>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          {inPageNav}
        </div>
      </div>
    );
  }

  private _onScroll() {
    let { isAttached, headerBottom, headerTop } = this.state;
    this._appContentRect = this._appContent && this._appContent.getBoundingClientRect();
    isAttached = AttachedScrollUtility.shouldComponentAttach(isAttached, this._attachedScrollThreshold);

    if (this._appContent && this._appContentRect.bottom < AttachedScrollUtility.attachedHeaderHeight) {
      // This causes the header to bump into the footer instead of overlapping it, usually on narrow screens.
      headerBottom = (window.innerHeight - this._appContentRect.bottom).toString();
      headerTop = 'unset';
    } else {
      headerBottom = 'unset';
      headerTop = '0';
    }

    this.setState({
      isAttached: isAttached,
      headerBottom: headerBottom,
      headerTop: headerTop
    });
  }

  private _getPagePath(link): string {
    let path = location.hash;
    // This makes sure that location hash changes don't append
    path = getPathMinusLastHash(path);

    return path + '#' + link.location;
  }
}
