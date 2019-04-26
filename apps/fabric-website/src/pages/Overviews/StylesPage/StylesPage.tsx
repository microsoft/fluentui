import * as React from 'react';
import { Link, Icon } from 'office-ui-fabric-react';
import { withPlatform, Page, IPageProps, IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { getSubTitle } from '../../../utilities/index';
import * as styles from './StylesPage.module.scss';
import { Platforms } from '../../../interfaces/Platforms';

const StylesPageBase: React.StatelessComponent<IPageProps<Platforms>> = props => {
  const { platform } = props;
  return (
    <Page
      title="Styles"
      platform={platform}
      subTitle={getSubTitle(platform)}
      otherSections={_otherSections(platform)}
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
                <h2 id="colors" className={styles.cardTitle}>
                  Colors
                </h2>
                <Icon iconName="Color" className={styles.cardIcon} />
              </div>
            </Link>
          )
        },
        {
          className: styles.card,
          content: (
            <Link href="#/styles/web/elevation" className={styles.cardLink}>
              <div className={styles.cardContent}>
                <h2 id="elevation" className={styles.cardTitle}>
                  Elevation
                </h2>
                <Icon iconName="ArrangeSendBackward" className={styles.cardIcon} />
              </div>
            </Link>
          )
        },
        {
          className: styles.card,
          content: (
            <Link href="#/styles/web/icons" className={styles.cardLink}>
              <div className={styles.cardContent}>
                <h2 id="iconography" className={styles.cardTitle}>
                  Iconography
                </h2>
                <Icon iconName="EmojiTabSymbols" className={styles.cardIcon} />
              </div>
            </Link>
          )
        },
        {
          className: styles.card,
          content: (
            <Link href="#/styles/web/layout" className={styles.cardLink}>
              <div className={styles.cardContent}>
                <h2 id="layout" className={styles.cardTitle}>
                  Layout
                </h2>
                <Icon iconName="Tiles" className={styles.cardIcon} />
              </div>
            </Link>
          )
        },
        {
          className: styles.card,
          content: (
            <Link href="#/styles/web/motion" className={styles.cardLink}>
              <div className={styles.cardContent}>
                <h2 id="motion" className={styles.cardTitle}>
                  Motion
                </h2>
                <Icon iconName="MiniExpand" className={styles.cardIcon} />
              </div>
            </Link>
          )
        },
        {
          className: styles.card,
          content: (
            <Link href="#/styles/web/typography" className={styles.cardLink}>
              <div className={styles.cardContent}>
                <h2 id="typography" className={styles.cardTitle}>
                  Typography
                </h2>
                <Icon iconName="FontSize" className={styles.cardIcon} />
              </div>
            </Link>
          )
        },
        {
          className: styles.card,
          content: (
            <Link href="#/styles/web/localization" className={styles.cardLink}>
              <div className={styles.cardContent}>
                <h2 id="localization" className={styles.cardTitle}>
                  Localization
                </h2>
                <Icon iconName="World" className={styles.cardIcon} />
              </div>
            </Link>
          )
        }
      ];

    default:
      return [
        {
          sectionName: 'Coming soon',
          content: '...'
        }
      ];
  }
}

export const StylesPage: React.StatelessComponent<IPageProps<Platforms>> = withPlatform<Platforms>(StylesPageBase);
