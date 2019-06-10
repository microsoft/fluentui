import * as React from 'react';
import { IPageHeaderProps, IPageHeaderStyleProps, IPageHeaderStyles } from './PageHeader.types';
import { css, ScreenWidthMinUhfMobile, FontWeights, IStyleFunction, classNamesFunction, styled } from 'office-ui-fabric-react';
import { FontSizes } from '@uifabric/fluent-theme';
import { appPaddingSm, appPaddingLg, pageHeaderFullHeight } from '../../styles/constants';

const getStyles: IStyleFunction<IPageHeaderStyleProps, IPageHeaderStyles> = props => {
  const palette = props.theme!.palette;
  return {
    root: {
      position: 'relative',
      marginBottom: appPaddingSm,
      selectors: {
        [`@media screen and (min-width: ${ScreenWidthMinUhfMobile}px)`]: {
          marginBottom: 0,
          padding: `${appPaddingLg}px 0`,
          minHeight: pageHeaderFullHeight
        }
      }
    },
    title: {
      alignItems: 'baseline',
      color: palette.neutralPrimary,
      display: 'flex',
      fontSize: FontSizes.size32,
      fontWeight: FontWeights.semibold,
      lineHeight: '1', // must have quotes to prevent interpretation as px
      margin: 0
    },
    subTitle: {
      marginLeft: '1em',
      fontSize: FontSizes.size14,
      fontWeight: FontWeights.regular,
      color: palette.neutralSecondary
    }
  };
};

const getClassNames = classNamesFunction<IPageHeaderStyleProps, IPageHeaderStyles>();

const PageHeaderBase: React.StatelessComponent<IPageHeaderProps> = props => {
  const { pageTitle = 'Page title', pageSubTitle, theme } = props;
  const styles = getClassNames(getStyles, { theme });

  return (
    <header className={css(styles.root, props.className)}>
      <h1 className={styles.title}>
        {pageTitle}
        {pageSubTitle && <span className={styles.subTitle}>{pageSubTitle}</span>}
      </h1>
    </header>
  );
};

export const PageHeader: React.StatelessComponent<IPageHeaderProps> = styled<IPageHeaderProps, IPageHeaderStyleProps, IPageHeaderStyles>(
  PageHeaderBase,
  getStyles,
  undefined,
  { scope: 'PageHeader' }
);
