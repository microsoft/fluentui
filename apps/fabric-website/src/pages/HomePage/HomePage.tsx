import * as React from 'react';
import { Async, css, registerIcons, Icon, Image, Link, PrimaryButton, TooltipHost } from 'office-ui-fabric-react';
import { trackEvent, EventNames, getSiteArea, Badge } from '@uifabric/example-app-base/lib/index2';
import { AndroidLogo, AppleLogo } from '../../utilities/index';

import * as styles from './HomePage.module.scss';

registerIcons({
  icons: {
    'AndroidLogo-home': AndroidLogo({ iconSize: 22 }),
    'AppleLogo-home': AppleLogo({ iconSize: 22 })
  }
});

const iconStyles = {
  root: {
    color: '#979593',
    fontSize: '20px',
    height: '20px'
  }
};

/**
 * List of App/Brand icon names that use UI Fabric.
 */
const fabricUseIcons = [
  { icon: 'OutlookLogoInverse', title: 'Outlook' },
  { icon: 'OneDriveLogo', title: 'OneDrive' },
  { icon: 'WordLogoInverse', title: 'Word' },
  { icon: 'ExcelLogoInverse', title: 'Excel' },
  { icon: 'PowerPointLogoInverse', title: 'PowerPoint' },
  { icon: 'OneNoteLogoInverse', title: 'OneNote' },
  { icon: 'SharePointLogoInverse', title: 'SharePoint' },
  { icon: 'TeamsLogoInverse', title: 'Teams' },
  { icon: 'YammerLogo', title: 'Yammer' },
  { icon: 'DelveLogoInverse', title: 'Delve' },
  { icon: 'ProjectLogoInverse', title: 'Project' },
  { icon: 'PlannerLogo', title: 'Planner' },
  { icon: 'MicrosoftFlowLogo', title: 'Flow' },
  { icon: 'PowerAppsLogo', title: 'PowerApps' },
  { icon: 'AzureLogo', title: 'Azure' }
];

export interface IHomePageProps {}

export interface IHomePageState {
  isMounted: boolean;
  isMountedOffset: boolean;
}

export class HomePage extends React.Component<IHomePageProps, IHomePageState> {
  public readonly state: IHomePageState = {
    isMounted: false,
    isMountedOffset: false
  };

  private _async = new Async();

  public componentDidMount() {
    this._async.setTimeout(() => {
      this.setState({ isMounted: true }, () => {
        this._async.setTimeout(() => {
          this.setState({ isMountedOffset: true });
        }, 10);
      });
    }, 10);
  }

  public componentWillUnmount() {
    this._async.dispose();
  }

  // tslint:disable jsx-no-lambda
  public render() {
    const { isMountedOffset } = this.state;

    return (
      <div className={css('homePage-wrapper', isMountedOffset && styles.isMountedOffset)}>
        <section className={css(styles.homePageSection, styles.heroSection)}>
          <div className={css(styles.sectionContent)}>
            <div className={css(styles.col, styles.oneHalf)}>
              <h2 className={css(styles.sectionTitle)}>Create amazing experiences</h2>
              <p>
                Together, we’ve created Microsoft UI Fabric, a collection of UX frameworks you can use to build experiences that fit
                seamlessly into a broad range of Microsoft products.
              </p>
              <p>Connect with the cross-platform principles, experiences, styles and controls you need to do amazing things. </p>
              <PrimaryButton
                href="#/about"
                title="Learn more"
                className={styles.getStarted}
                onClick={ev => this._onInternalLinkClick(ev, '#/about')}
              >
                Learn more
              </PrimaryButton>
            </div>
            <div className={css(styles.col, styles.oneHalf, styles.illustrationWrapper)}>
              <Image
                src="https://uifabric.azurewebsites.net/media/images/home/fabric-home-v2.svg"
                className={styles.illustration}
                alt="UI Fabric illustrated"
              />
            </div>
          </div>
        </section>
        <section className={css(styles.homePageSection, styles.platformsSection)}>
          <div className={css(styles.sectionContent)}>
            <div className={css(styles.col, styles.oneHalf)}>
              <div className={styles.invertedContent}>
                <h2 className={css(styles.sectionTitle)}>Build across platforms</h2>
                <p>
                  We're broadening our guidance to include more platforms and create an open source system, making it possible for us all to
                  evolve together.
                </p>
              </div>
            </div>
            <div className={css(styles.col, styles.oneHalf, styles.cardWrapper)}>
              <div className={styles.card}>
                <header className={styles.cardHeader}>
                  <h3>Web</h3>
                  <Icon iconName="TVMonitor" styles={iconStyles} className={styles.cardIcon} title="Web icon" />
                </header>
                <ul className={styles.cardList}>
                  <li>
                    <Link href="#/styles/web" onClick={ev => this._onInternalLinkClick(ev, '#/styles/web')}>
                      Styles
                    </Link>
                  </li>
                  <li>
                    <Link href="#/controls/web" onClick={ev => this._onInternalLinkClick(ev, '#/controls/web')}>
                      Controls
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={styles.card}>
                <header className={styles.cardHeader}>
                  <ul className={styles.iconList}>
                    <li className={styles.iconListIcon}>
                      <Icon iconName="AppleLogo-home" className={styles.customIcon} ariaLabel="Apple logo" />
                    </li>
                    <li className={styles.iconListIcon}>
                      <Icon iconName="AndroidLogo-home" className={styles.customIcon} ariaLabel="Android logo" />
                    </li>
                  </ul>
                  <Badge className={styles.comingSoon}>Coming soon</Badge>
                </header>
                <p>iOS and Android are in development.</p>
              </div>
            </div>
          </div>
        </section>
        <section className={css(styles.homePageSection, styles.resourcesSection)}>
          <div className={css(styles.sectionContent)}>
            <div className={css(styles.col, styles.oneHalf)}>
              <h2 className={css(styles.sectionTitle)}>Discover resources</h2>
              <p>Find design, inclusive and developer onboarding resources, and learn about how to become a contributor.</p>
              <PrimaryButton href="#/resources" title="UI Fabric resources" className={styles.getStarted} onClick={this._onCTAClick}>
                Get started
              </PrimaryButton>
            </div>
            <div className={css(styles.col, styles.oneHalf, styles.illustrationWrapper)}>
              <Image
                src="https://uifabric.azurewebsites.net/media/images/home/resources.svg"
                className={styles.illustration}
                alt="UI Fabric resources illustration"
              />
            </div>
          </div>
        </section>
        <section className={css(styles.homePageSection, styles.usageSection)}>
          <div className={css(styles.sectionContent)}>
            <div className={css(styles.col, styles.oneHalf)}>
              <div className={css(styles.invertedContent)}>
                <h2 className={css(styles.sectionTitle)}>Who in Microsoft uses Fabric?</h2>
                <p>From Word, PowerPoint and Excel to PowerBI, many teams in Microsoft utilize the functionality of Fabric.</p>
              </div>
            </div>
            <div className={css(styles.col, styles.oneHalf, styles.useIconListWrapper)}>
              <div className={css(styles.invertedContent)}>
                <ul className={css(styles.useIconList)}>
                  {fabricUseIcons.map((icon, iconIndex) => (
                    <li key={iconIndex} className={css(styles.useIconListItem)}>
                      <TooltipHost content={icon.title} id={icon.icon + iconIndex} styles={{ root: { display: 'inline-block' } }}>
                        <Icon iconName={icon.icon} className={css(styles.useIcon)} aria-describedby={icon.icon + iconIndex} />
                      </TooltipHost>
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>+45 additional Microsoft sites and products</strong>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  // tslint:disable jsx-no-lambda

  private _onCTAClick = (ev: React.MouseEvent<{}> | React.KeyboardEvent<{}>): void => {
    trackEvent(EventNames.ClickedGetStartedLink);
  };

  private _onInternalLinkClick = (ev: React.MouseEvent<{}> | React.KeyboardEvent<{}>, url: string): void => {
    trackEvent(EventNames.ClickedInternalLink, {
      topic: url, // @TODO: Remove topic when data is stale.
      currentArea: getSiteArea(),
      nextArea: getSiteArea(url),
      nextPage: url,
      currentPage: window.location.hash
    });
  };
}
