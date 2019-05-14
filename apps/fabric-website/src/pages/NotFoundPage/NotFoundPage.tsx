import * as React from 'react';
import { Link, DefaultButton, mergeStyles } from 'office-ui-fabric-react';
import {
  trackEvent,
  EventNames,
  randomEntry,
  getSiteArea,
  Page,
  IPageProps,
  IPageSectionProps
} from '@uifabric/example-app-base/lib/index2';
import { SiteDefinition } from '../../SiteDefinition/index';
import { topNavHeight } from '../../styles/constants';

const illustrations = [
  'https://uifabric.azurewebsites.net/media/images/notfound/empty_discover.svg',
  'https://uifabric.azurewebsites.net/media/images/notfound/empty_recyclebin.svg',
  'https://uifabric.azurewebsites.net/media/images/notfound/empty_search.svg',
  'https://uifabric.azurewebsites.net/media/images/notfound/error2.svg',
  'https://uifabric.azurewebsites.net/media/images/notfound/error3.svg'
];

const rootClass = mergeStyles({
  backgroundRepeat: 'no-repeat',
  backgroundSize: '480px',
  backgroundPosition: '80% 80%',
  backgroundImage: `url(${randomEntry(illustrations)})`,
  minHeight: `calc(100vh - ${topNavHeight}px)`
});

export interface INotFoundPageProps extends IPageProps {}

export class NotFoundPage extends React.Component<INotFoundPageProps, {}> {
  public componentDidMount(): void {
    trackEvent(EventNames.PageNotFound, {
      currentArea: getSiteArea(),
      currentPage: window.location.hash
    });
  }

  public render() {
    return <Page title="Page not found" className={rootClass} otherSections={this._otherSections()} showSideRail={false} />;
  }

  private _otherSections = (): IPageSectionProps[] => [
    {
      sectionName: 'Sorry, the page you requested cannot be found.',
      content: (
        <div>
          <p>The URL may be misspelled or the page you are looking for is no longer available.</p>
          <ul>
            <li>
              <Link
                href="#/"
                onClick={
                  // tslint:disable-next-line jsx-no-lambda
                  ev => this._onInternalLinkClick(ev, '#/')
                }
              >
                UI Fabric Home
              </Link>
            </li>
            {this._getAreaLink()}
          </ul>
          {this._renderBackButton()}
        </div>
      )
    }
  ];

  /** Gets the top level page from the current URL and returns a link to it. */
  private _getAreaLink = (): JSX.Element => {
    // const area = getSiteArea(SiteDefinition.pages);
    const hash = window.location.hash;
    const area = hash.indexOf('#/') > -1 && '#/' + hash.split('#/')[1].split('/')[0];
    const SiteDefinitionFilter = SiteDefinition.pages.filter(page => page.url === area);
    if (SiteDefinitionFilter.length) {
      const SiteDefinitionPage = SiteDefinitionFilter[0];
      const { title, url } = SiteDefinitionPage;

      return (
        <li>
          <Link
            href={url}
            onClick={
              // tslint:disable-next-line jsx-no-lambda
              ev => this._onInternalLinkClick(ev, url)
            }
          >
            {title}
          </Link>
        </li>
      );
    }
  };

  /** Renders a button to go back in the browser history only if there is a page to go back to. */
  private _renderBackButton = (): JSX.Element => {
    if (window.history.length > 1) {
      return (
        <p>
          <DefaultButton onClick={this._onGoBackClick}>Go back</DefaultButton>
        </p>
      );
    }
  };

  private _onGoBackClick = (): void => {
    // trackEvent(EventNames.ClickedGoBack, {
    //   currentArea: getSiteArea(SiteDefinition.pages),
    //   currentPage: window.location.hash,
    //   context: 'NotFoundPage',
    //   referrer: document.referrer.length ? document.referrer : undefined
    // });
    window.history.back();
  };

  private _onInternalLinkClick = (ev: React.MouseEvent<{}> | React.KeyboardEvent<{}>, url: string): void => {
    // trackEvent(EventNames.ClickedInternalLink, {
    //   currentArea: getSiteArea(SiteDefinition.pages),
    //   nextArea: getSiteArea(SiteDefinition.pages, url),
    //   currentPage: window.location.hash,
    //   nextPage: url,
    //   context: 'NotFoundPage',
    //   referrer: document.referrer.length ? document.referrer : undefined
    // });
  };
}
