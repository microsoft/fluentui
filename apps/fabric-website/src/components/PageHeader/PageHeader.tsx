import * as React from 'react';
import { css, BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import * as stylesImport from './PageHeader.module.scss';
const styles: any = stylesImport;
import { getPageRouteFromState } from '../../utilities/pageroute';
import { PageHeaderLink } from '../../components/PageHeaderLink/PageHeaderLink';

const FULL_HEADER_HEIGHT = 236;
const ATTACHED_HEADER_HEIGHT = 128;

export interface IPageHeaderProps {
  componentRef?: () => void;

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
}

export class PageHeader extends BaseComponent<IPageHeaderProps, IPageHeaderState> {
  public static defaultProps: IPageHeaderProps = {
    pageTitle: 'Page title',
    backgroundColor: '#333333'
  };

  private _attachedScrollThreshold: number;

  constructor(props: IPageHeaderProps) {
    super(props);

    this.state = {
      isAttached: false
    };

  }

  public componentDidMount() {

    // Only attach the header if there are in-page nav items
    if (this.props.links) {
      this._events.on(window, 'scroll', this._onScroll, true);
      this._calculateAttachedScrollThreshold();
    }
  }

  public render() {
    let { pageTitle, links, backgroundColor, backgroundImage } = this.props;
    let { isAttached } = this.state;
    let baseRoute: string = getPageRouteFromState(
      this.props.pageTitle
    );

    let backgroundStyle;
    if (backgroundColor) {
      backgroundStyle = {
        backgroundColor: backgroundColor,
      };
    }

    if (backgroundImage) {
      backgroundStyle.backgroundImage = backgroundImage;
    }

    let inPageNav;
    if (links) {
      inPageNav = (
        <nav className={ styles.pageNav } aria-label='In page navigation'>
          <ul>
            { links.map((link, linkIndex) => (
              <li key={ linkIndex }>
                <PageHeaderLink href={ baseRoute + '#' + link.location } text={ link.text } />
              </li>
              // <li key={ linkIndex }><a>{ link.text }</a></li>
            )) }
          </ul>
        </nav>
      );
    }

    return (
      <div className={ css(styles.pageHeader,
        isAttached ? styles.isAttached : ''
      ) } style={ backgroundStyle }>
        <div className={ styles.content } style={ backgroundStyle }>
          <h1 className={ styles.pageTitle }>{ pageTitle }</h1>
          { inPageNav }
        </div>
      </div>
    );
  }

  private _onScroll() {
    let { isAttached } = this.state;

    if (window.scrollY >= this._attachedScrollThreshold) {
      isAttached = true;
    } else {
      isAttached = false;
    }

    this.setState({
      isAttached: isAttached
    });
  }

  private _calculateAttachedScrollThreshold() {
    let attachedScrollThreshold = FULL_HEADER_HEIGHT - ATTACHED_HEADER_HEIGHT;
    this._attachedScrollThreshold = attachedScrollThreshold;
  }
}
