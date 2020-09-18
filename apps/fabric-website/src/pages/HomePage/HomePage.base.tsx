import * as React from 'react';
import {
  Async,
  Icon,
  Image,
  Link,
  TooltipHost,
  classNamesFunction,
  registerIcons,
  IProcessedStyleSet,
  IContextualMenuItem,
  DirectionalHint,
  ActionButton,
  Stack,
  IRawStyle,
  css,
  IStackProps,
} from 'office-ui-fabric-react';
import { trackEvent, EventNames, getSiteArea, MarkdownHeader } from '@uifabric/example-app-base/lib/index2';
import {
  androidLogoColor,
  appleLogoColor,
  webLogoColor,
  windowsLogoColor,
  macLogoColor,
  crossPlatformLogoColor,
} from '../../utilities/index';
import { IHomePageProps, IHomePageStyles, IHomePageStyleProps } from './HomePage.types';
import { monoFont } from './HomePage.styles';
const reactPackageData = require<any>('office-ui-fabric-react/package.json');

const getClassNames = classNamesFunction<IHomePageStyleProps, IHomePageStyles>();

registerIcons({
  icons: {
    'AndroidLogo-homePage': androidLogoColor({ iconSize: 64 }),
    'AppleLogo-homePage': appleLogoColor({ iconSize: 64 }),
    'WebLogo-homePage': webLogoColor({ iconSize: 64 }),
    'WindowsLogo-homePage': windowsLogoColor({ iconSize: 64 }),
    'MacLogo-homePage': macLogoColor({ iconSize: 64 }),
    'CrossPlatformLogo-homePage': crossPlatformLogoColor({ iconSize: 64 }),
  },
});

const fabricUsageIconBaseUrl = 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/';

/**
 * List of App/Brand icon names that use Fluent UI.
 */
const fabricUsageIcons = [
  { src: fabricUsageIconBaseUrl + 'outlook_48x1.svg', title: 'Outlook' },
  { src: fabricUsageIconBaseUrl + 'onedrive_48x1.svg', title: 'OneDrive' },
  { src: fabricUsageIconBaseUrl + 'word_48x1.svg', title: 'Word' },
  { src: fabricUsageIconBaseUrl + 'excel_48x1.svg', title: 'Excel' },
  { src: fabricUsageIconBaseUrl + 'powerpoint_48x1.svg', title: 'PowerPoint' },
  { src: fabricUsageIconBaseUrl + 'onenote_48x1.svg', title: 'OneNote' },
  { src: fabricUsageIconBaseUrl + 'sharepoint_48x1.svg', title: 'SharePoint' },
  { src: fabricUsageIconBaseUrl + 'teams_48x1.svg', title: 'Teams' },
];

const CURRENT_VERSION = '7';
const VERSIONS = ['7', '6', '5'];
const fabricVersionOptions: IContextualMenuItem[] = VERSIONS.map(version => ({
  key: version,
  text: `${Number(version) >= 7 ? 'Fluent UI React' : 'Fabric React'} ${version}`,
  checked: version === CURRENT_VERSION,
}));

const TitleStack: React.FunctionComponent<IStackProps> = props => (
  <Stack style={{ marginBottom: 8 }} horizontal verticalAlign="center" tokens={{ childrenGap: 16 }} {...props} />
);

interface IRenderLinkOptions {
  disabled?: boolean;
  isCTA?: boolean;
  icon?: string;
  dark?: boolean;
}

export interface IHomePageState {
  isMountedOffset: boolean;
}

export class HomePageBase extends React.Component<IHomePageProps, IHomePageState> {
  private _async = new Async();
  private _classNames: IProcessedStyleSet<IHomePageStyles>;

  constructor(props: IHomePageProps) {
    super(props);

    this.state = {
      isMountedOffset: false,
    };
  }

  public componentDidMount(): void {
    // Delay adding section transition styles after page is mounted.
    this._async.setTimeout(() => {
      this.forceUpdate(() => {
        this._async.setTimeout(() => {
          this.setState({ isMountedOffset: true });
        }, 10);
      });
    }, 10);
  }

  public componentWillUnmount(): void {
    this._async.dispose();
  }

  public render() {
    const { isMountedOffset } = this.state;
    const { theme, styles } = this.props;

    this._classNames = getClassNames(styles, {
      theme,
      isMountedOffset,
    });

    return (
      <div className={this._classNames.root}>
        {this._renderHeroSection()}
        {this._renderPlatformCardsSection()}
        {this._renderPlatformsSection()}
        {this._renderResourcesSection()}
        {this._renderUsageSection()}
      </div>
    );
  }

  private _renderHeroSection = (): JSX.Element => {
    return (
      <section className={this._classNames.heroSection}>
        <div className={this._classNames.sectionContent}>
          <div className={this._classNames.oneHalf}>
            <h2 className={this._classNames.heroTitle}>
              Fluent{' '}
              <svg width="128" height="92" viewBox="0 0 128 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="90" fill="url(#paint0_linear)">
                  UI
                </text>
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="-10"
                    y1="-43"
                    x2="129.319"
                    y2="-32.448"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4FE5FF" />
                    <stop offset="1" stopColor="#69E56E" />
                  </linearGradient>
                </defs>
              </svg>
            </h2>
          </div>
          <div className={this._classNames.oneFourth} style={{ flexBasis: '31%' }}>
            <p>
              A collection of UX frameworks for creating beautiful, cross-platform apps that share code, design, and
              interaction behavior.
            </p>
            <p>Build for one platform or for all. Everything you need is here.</p>
          </div>
        </div>
      </section>
    );
  };

  private _renderPlatformCardsSection = (): JSX.Element => {
    const { isMountedOffset } = this.state;
    const { theme, styles } = this.props;

    const classNames = getClassNames(styles, {
      theme,
      isMountedOffset,
      isInverted: true,
    });

    const versionSwitcherColor: IRawStyle = { color: theme.palette.white };
    const versionSwitcherActiveColor: IRawStyle = { color: theme.palette.white };

    return (
      <div className={classNames.platformCardsSection}>
        <div className={classNames.inner}>
          <div className={classNames.card} style={{}}>
            <TitleStack>
              <Icon iconName="WebLogo-homePage" className={classNames.cardIcon} />
              <MarkdownHeader as="h3" className={classNames.cardTitle}>
                Web
              </MarkdownHeader>
            </TitleStack>
            <ul className={classNames.cardList}>
              <li className={classNames.cardListItem}>{this._renderLink('#/styles/web', 'Styles')}</li>
              <li className={classNames.cardListItem}>{this._renderLink('#/controls/web', 'Controls')}</li>
              <li className={classNames.cardListItem}>{this._renderLink('#/get-started/web', 'Get started')}</li>
              <li>
                <ActionButton
                  allowDisabledFocus={true}
                  className={classNames.versionSwitcher}
                  styles={{
                    root: { ...versionSwitcherColor, padding: '12px 0' },
                    flexContainer: { fontFamily: monoFont },
                    menuIcon: versionSwitcherColor,
                    rootHovered: { ...versionSwitcherActiveColor, borderBottom: '1px solid white' },
                    rootPressed: versionSwitcherActiveColor,
                    rootExpanded: versionSwitcherActiveColor,
                  }}
                  menuProps={{
                    gapSpace: 3,
                    beakWidth: 8,
                    isBeakVisible: true,
                    shouldFocusOnMount: true,
                    items: fabricVersionOptions,
                    directionalHint: DirectionalHint.bottomCenter,
                    onItemClick: this._onVersionMenuClick,
                    styles: {
                      root: { minWidth: 100 },
                    },
                  }}
                >
                  Fluent UI React {reactPackageData.version}
                </ActionButton>
              </li>
            </ul>
          </div>
          <div className={classNames.card} style={{}}>
            <TitleStack>
              <Icon iconName="WindowsLogo-homePage" className={classNames.cardIcon} />
              <MarkdownHeader as="h3" className={classNames.cardTitle}>
                Windows
              </MarkdownHeader>
            </TitleStack>
            <ul className={classNames.cardList}>
              <li className={classNames.cardListItem}>{this._renderLink('#/controls/windows', 'Controls')}</li>
              <li className={classNames.cardListItem}>{this._renderLink('#/get-started/windows', 'Get started')}</li>
            </ul>
          </div>
          <div className={classNames.card} style={{}}>
            <TitleStack>
              <Icon iconName="AppleLogo-homePage" className={classNames.cardIcon} />
              <MarkdownHeader as="h3" className={classNames.cardTitle}>
                iOS
              </MarkdownHeader>
            </TitleStack>
            <ul className={classNames.cardList}>
              <li className={classNames.cardListItem}>{this._renderLink('#/controls/ios', 'Controls')}</li>
              <li className={classNames.cardListItem}>{this._renderLink('#/get-started/ios', 'Get started')}</li>
            </ul>
          </div>
          <div className={classNames.card} style={{}}>
            <TitleStack>
              <Icon iconName="AndroidLogo-homePage" className={classNames.cardIcon} />
              <MarkdownHeader as="h3" className={classNames.cardTitle}>
                Android
              </MarkdownHeader>
            </TitleStack>
            <ul className={classNames.cardList}>
              <li className={classNames.cardListItem}>{this._renderLink('#/controls/android', 'Controls')}</li>
              <li className={classNames.cardListItem}>{this._renderLink('#/get-started/android', 'Get started')}</li>
            </ul>
          </div>

          <div className={classNames.card} style={{}}>
            <TitleStack>
              <Icon iconName="MacLogo-homePage" className={classNames.cardIcon} />
              <MarkdownHeader as="h3" className={classNames.cardTitle}>
                macOS
              </MarkdownHeader>
            </TitleStack>
            <ul className={classNames.cardList}>
              <li className={classNames.cardListItem}>{this._renderLink('#/controls/mac', 'Controls')}</li>
              <li className={classNames.cardListItem}>{this._renderLink('#/get-started/mac', 'Get started')}</li>
            </ul>
          </div>
          <div className={classNames.card} style={{}}>
            <TitleStack>
              <Icon iconName="CrossPlatformLogo-homePage" className={classNames.cardIcon} />
              <MarkdownHeader as="h3" className={classNames.cardTitle}>
                Cross-platform
              </MarkdownHeader>
            </TitleStack>
            <ul className={classNames.cardList}>
              <li className={classNames.cardListItem}>{this._renderLink('#/controls/crossplatform', 'Controls')}</li>
              <li className={classNames.cardListItem}>
                {this._renderLink('#/get-started/crossplatform', 'Get started')}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  private _renderPlatformsSection = (): JSX.Element => {
    const { isMountedOffset } = this.state;
    const { theme, styles } = this.props;

    // We need to get classNames within this method for offset transitions and inverted sections.
    const classNames = getClassNames(styles, {
      theme,
      isMountedOffset,
      isInverted: true,
    });

    return (
      <section className={classNames.platformsSection}>
        <div className={classNames.sectionContent}>
          <div className={classNames.oneHalf}>
            <h2 className={classNames.platformsTitle}>Powering Microsoft 365 apps</h2>
          </div>
          <div className={classNames.oneThird}>
            <p>
              Build your own apps using the same open source components we do—with accessibility, internationalization,
              and performance included.
            </p>
          </div>
        </div>
      </section>
    );
  };

  private _renderResourcesSection = (): JSX.Element => {
    return (
      <section className={this._classNames.resourcesSection}>
        <div className={this._classNames.sectionContent}>
          <div className={this._classNames.oneHalf}>
            <Image
              src="https://static2.sharepointonline.com/files/fabric/fabric-website/images/discover-resources-1x.png"
              srcSet="https://static2.sharepointonline.com/files/fabric/fabric-website/images/discover-resources-1x.png 1x, https://static2.sharepointonline.com/files/fabric/fabric-website/images/discover-resources-2x.png 2x"
              alt="Resources illustration"
              className={this._classNames.illustration}
            />
          </div>
          <div className={this._classNames.oneFourth}>
            <h2 className={this._classNames.resourcesTitle}>Discover more</h2>
            <p>
              From tutorials to a fun collection of API references, find what you need to design and develop your own
              Fluent experience.
            </p>
            <p>{this._renderLink('#/resources', 'Browse resources', { dark: false })}</p>
          </div>
        </div>
      </section>
    );
  };

  private _renderUsageSection = (): JSX.Element => {
    return (
      <section className={this._classNames.usageSection}>
        <div className={this._classNames.sectionContent} style={{ justifyContent: 'space-between' }}>
          <div className={this._classNames.oneFourth} style={{ flexBasis: '33%' }}>
            <h2 className={this._classNames.usageTitle}>
              Who at Microsoft <br /> uses Fluent UI?
            </h2>
            <p>From Word and Excel to PowerBI and Teams, many Microsoft apps utilize Fluent UI functionality.</p>
          </div>
          <figure style={{ alignSelf: 'flex-end' }} className={this._classNames.oneHalf}>
            <ul className={this._classNames.usageIconList}>{this._renderUsageIconList()}</ul>
            <figcaption>
              <strong>+ many more apps and services</strong>
            </figcaption>
          </figure>
        </div>
      </section>
    );
  };

  /** Renders a link with an icon */
  private _renderLink = (url: string, text: React.ReactNode, options: IRenderLinkOptions = {}): JSX.Element => {
    const { disabled, isCTA, icon = 'Forward', dark = true } = options;
    return (
      <Link
        className={css(this._classNames.link, dark && this._classNames.linkDark)}
        href={url}
        disabled={!!disabled}
        onClick={ev => (isCTA ? this._onCTAClick(ev) : this._onInternalLinkClick(ev, url))}
      >
        <Icon iconName={icon} className={this._classNames.linkIcon} />
        <span className={this._classNames.linkText}>{text}</span>
      </Link>
    );
  };

  /** Renders list of app/brand icons that use Fabric. */
  private _renderUsageIconList = (): JSX.Element[] => {
    return fabricUsageIcons.map((icon, iconIndex) => (
      <li key={icon.title + iconIndex} className={this._classNames.usageIconListItem}>
        <TooltipHost content={icon.title} id={icon.title + iconIndex} styles={{ root: { display: 'inline-block' } }}>
          <Image src={icon.src} className={this._classNames.usageIcon} alt={`${icon.title} icon`} />
        </TooltipHost>
      </li>
    ));
  };

  private _onCTAClick = (ev: React.MouseEvent<{}> | React.KeyboardEvent<{}>): void => {
    trackEvent(EventNames.ClickedGetStartedLink);
  };

  private _onInternalLinkClick = (ev: React.MouseEvent<{}> | React.KeyboardEvent<{}>, url: string): void => {
    trackEvent(EventNames.ClickedInternalLink, {
      topic: url, // @TODO: Remove topic when data is stale.
      currentArea: getSiteArea(),
      nextArea: getSiteArea(undefined, url),
      nextPage: url,
      currentPage: window.location.hash,
    });
  };

  private _onVersionMenuClick = (event: any, item: IContextualMenuItem): void => {
    if (item.key !== CURRENT_VERSION) {
      // Reload the page to switch versions
      location.href = `${location.protocol}//${location.host}${location.pathname}?fabricVer=${item.key}`;
    }
  };
}
