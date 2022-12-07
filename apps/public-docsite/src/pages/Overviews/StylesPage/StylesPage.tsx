import * as React from 'react';
import { Link, Icon } from '@fluentui/react';
import {
  PlatformContext,
  Page,
  IPageProps,
  IPageSectionProps,
  MarkdownHeader,
} from '@fluentui/react-docsite-components/lib/index2';
import { getSubTitle } from '../../../utilities/index';
import * as styles from './StylesPage.module.scss';
import { Platforms } from '../../../interfaces/Platforms';

const StylesPageBase: React.FunctionComponent<IPageProps<Platforms>> = props => {
  const { platform } = props;
  return (
    <Page
      title="Styles"
      platform={platform}
      subTitle={getSubTitle(platform!)}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
      showSideRail={false}
      sectionWrapperClassName={styles.cardWrapper}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps[] {
  switch (platform) {
    case 'web':
      return [
        {
          className: styles.card,
          content: (
            <Link href="#/styles/web/colors/products" className={styles.cardLink}>
              <div className={styles.cardContent}>
                <MarkdownHeader as="h2" id="colors" className={styles.cardTitle}>
                  Colors
                </MarkdownHeader>
                <Icon iconName="Color" className={styles.cardIcon} />
              </div>
            </Link>
          ),
        },
        {
          className: styles.card,
          content: (
            <Link href="#/styles/web/elevation" className={styles.cardLink}>
              <div className={styles.cardContent}>
                <MarkdownHeader as="h2" id="elevation" className={styles.cardTitle}>
                  Elevation
                </MarkdownHeader>
                <Icon iconName="ArrangeSendBackward" className={styles.cardIcon} />
              </div>
            </Link>
          ),
        },
        {
          className: styles.card,
          content: (
            <Link href="#/styles/web/icons" className={styles.cardLink}>
              <div className={styles.cardContent}>
                <MarkdownHeader as="h2" id="iconography" className={styles.cardTitle}>
                  Iconography
                </MarkdownHeader>
                <Icon iconName="EmojiTabSymbols" className={styles.cardIcon} />
              </div>
            </Link>
          ),
        },
        {
          className: styles.card,
          content: (
            <Link href="#/styles/web/layout" className={styles.cardLink}>
              <div className={styles.cardContent}>
                <MarkdownHeader as="h2" id="layout" className={styles.cardTitle}>
                  Layout
                </MarkdownHeader>
                <Icon iconName="Tiles" className={styles.cardIcon} />
              </div>
            </Link>
          ),
        },
        {
          className: styles.card,
          content: (
            <Link href="#/styles/web/motion" className={styles.cardLink}>
              <div className={styles.cardContent}>
                <MarkdownHeader as="h2" id="motion" className={styles.cardTitle}>
                  Motion
                </MarkdownHeader>
                <Icon iconName="MiniExpand" className={styles.cardIcon} />
              </div>
            </Link>
          ),
        },
        {
          className: styles.card,
          content: (
            <Link href="#/styles/web/typography" className={styles.cardLink}>
              <div className={styles.cardContent}>
                <MarkdownHeader as="h2" id="typography" className={styles.cardTitle}>
                  Typography
                </MarkdownHeader>
                <Icon iconName="FontSize" className={styles.cardIcon} />
              </div>
            </Link>
          ),
        },
        {
          className: styles.card,
          content: (
            <Link href="#/styles/web/localization" className={styles.cardLink}>
              <div className={styles.cardContent}>
                <MarkdownHeader as="h2" id="localization" className={styles.cardTitle}>
                  Localization
                </MarkdownHeader>
                <Icon iconName="World" className={styles.cardIcon} />
              </div>
            </Link>
          ),
        },
      ];

    default:
      return [
        {
          sectionName: 'Coming soon',
          content: '...',
        },
      ];
  }
}

export const StylesPage: React.FunctionComponent<IPageProps<Platforms>> = (props: IPageProps<Platforms>) => (
  <PlatformContext.Consumer>
    {(platform: Platforms) => <StylesPageBase platform={platform} {...props} />}
  </PlatformContext.Consumer>
);
