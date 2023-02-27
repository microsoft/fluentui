import * as React from 'react';
import { Link, mergeStyles } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import {
  trackEvent,
  EventNames,
  randomEntry,
  getSiteArea,
  Page,
  IPageProps,
  IPageSectionProps,
} from '@fluentui/react-docsite-components/lib/index2';
import { SiteDefinition } from '../../SiteDefinition/index';
import { topNavHeight, mediaQuery } from '../../styles/constants';
import { cdnUrl } from '../../utilities/cdn';

const illustrations = [
  `${cdnUrl}/office-ui-fabric-react-assets/images/error/error1.svg`,
  `${cdnUrl}/office-ui-fabric-react-assets/images/error/error2.svg`,
  `${cdnUrl}/office-ui-fabric-react-assets/images/error/error3.svg`,
];

const rootClass = mergeStyles({
  backgroundRepeat: 'no-repeat',
  backgroundSize: '480px',
  backgroundPosition: '80% 80%',
  backgroundImage: `url(${randomEntry(illustrations)})`,
  minHeight: `calc(100vh - ${topNavHeight}px)`,

  selectors: {
    [mediaQuery.maxMobile]: {
      backgroundSize: '80%',
    },
  },
});

export interface INotFoundPageProps extends IPageProps {}

export class NotFoundPage extends React.Component<INotFoundPageProps, {}> {
  public componentDidMount(): void {
    trackEvent(EventNames.PageNotFound, {
      currentArea: getSiteArea(),
      currentPage: window.location.hash,
    });
  }

  public render() {
    return (
      <Page title="Page not found" className={rootClass} otherSections={this._otherSections()} showSideRail={false} />
    );
  }

  private _otherSections = (): IPageSectionProps[] => [
    {
      sectionName: 'Sorry, the page you requested cannot be found.',
      content: (
        <div>
          <p>The URL may be misspelled or the page you are looking for is no longer available.</p>
          <ul>
            <li>
              <Link href="#/" onClick={ev => this._onInternalLinkClick(ev, '#/')} underline>
                Fluent UI Home
              </Link>
            </li>
            {this._getAreaLink()}
          </ul>
          {this._renderBackButton()}
        </div>
      ),
    },
  ];

  /** Gets the top level page from the current URL and returns a link to it. */
  private _getAreaLink = (): JSX.Element | undefined => {
    const area = getSiteArea(SiteDefinition.pages);
    const pageForArea = SiteDefinition.pages.filter(page => page.title === area)[0];
    if (pageForArea) {
      const { title, url } = pageForArea;

      return (
        <li>
          <Link href={url} onClick={ev => this._onInternalLinkClick(ev, url!)} underline>
            {title}
          </Link>
        </li>
      );
    }
  };

  /** Renders a button to go back in the browser history only if there is a page to go back to. */
  private _renderBackButton = (): JSX.Element | undefined => {
    if (window.history.length > 1) {
      return (
        <p>
          <DefaultButton onClick={this._onGoBackClick}>Go back</DefaultButton>
        </p>
      );
    }
  };

  private _onGoBackClick = (): void => {
    trackEvent(EventNames.ClickedGoBack, {
      currentArea: getSiteArea(SiteDefinition.pages),
      currentPage: window.location.hash,
      context: 'NotFoundPage',
      referrer: document.referrer || undefined,
    });
    window.history.back();
  };

  private _onInternalLinkClick = (ev: React.MouseEvent<{}> | React.KeyboardEvent<{}>, url: string): void => {
    trackEvent(EventNames.ClickedInternalLink, {
      currentArea: getSiteArea(SiteDefinition.pages),
      nextArea: getSiteArea(SiteDefinition.pages, url),
      currentPage: window.location.hash,
      nextPage: url,
      context: 'NotFoundPage',
      referrer: document.referrer.length ? document.referrer : undefined,
    });
  };
}
