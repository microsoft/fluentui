import * as React from 'react';
import { IPageHeaderProps, IPageHeaderStyleProps, IPageHeaderStyles } from './PageHeader.types';
import {
  classNamesFunction,
  styled,
  DirectionalHint,
  FontWeights,
  IStyleFunction,
  ScreenWidthMinUhfMobile,
  ActionButton,
  getScreenSelector,
  ScreenWidthMaxMedium,
  ScreenWidthMaxLarge,
  FontSizes,
} from '@fluentui/react';
import { appPaddingSm, appPaddingLg, contentWidth, pageHeaderFullHeight } from '../../styles/constants';

const getStyles: IStyleFunction<IPageHeaderStyleProps, IPageHeaderStyles> = props => {
  const { className, pageTitle, theme } = props;
  const palette = theme!.palette;
  const isLongTitle = pageTitle.length > 20;
  return {
    root: [
      {
        alignItems: 'baseline',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: appPaddingSm,
        position: 'relative',
        [getScreenSelector(ScreenWidthMinUhfMobile, undefined)]: {
          marginBottom: 0,
          padding: `${appPaddingLg}px 0`,
          minHeight: pageHeaderFullHeight,
        },
        [getScreenSelector(1360, undefined)]: {
          maxWidth: contentWidth + appPaddingSm * 2,
        },
      },
      className,
    ],
    title: {
      alignItems: 'baseline',
      color: palette.neutralPrimary,
      display: 'flex',
      fontSize: FontSizes.size32,
      fontWeight: FontWeights.semibold,
      lineHeight: '1', // must have quotes to prevent interpretation as px
      margin: 0,
    },
    subTitle: {
      marginLeft: '1em',
      fontSize: FontSizes.size14,
      fontWeight: FontWeights.regular,
      color: palette.neutralSecondary,
    },
    versionSelector: {
      color: palette.neutralSecondary,
      height: '1em',
      marginBottom: -4,
      padding: '12px 0',
      // Hide the version selector at certain widths where it's likely to not work well
      // (these are rough estimates based on the length of the title)
      [getScreenSelector(undefined, isLongTitle ? ScreenWidthMaxLarge : ScreenWidthMaxMedium)]: {
        display: 'none',
      },
      [getScreenSelector(ScreenWidthMinUhfMobile, isLongTitle ? ScreenWidthMaxLarge : 850)]: {
        display: 'none',
      },
    },
  };
};

const getClassNames = classNamesFunction<IPageHeaderStyleProps, IPageHeaderStyles>();

const PageHeaderBase: React.FunctionComponent<IPageHeaderProps> = props => {
  const { className, pageTitle = 'Page title', pageSubTitle, theme, versionSwitcherDefinition } = props;
  const styles = getClassNames(getStyles, { className, pageTitle, theme });

  return (
    <header className={styles.root}>
      <h1 className={styles.title}>
        {pageTitle}
        {pageSubTitle && <span className={styles.subTitle}>{pageSubTitle}</span>}
      </h1>
      {versionSwitcherDefinition && (
        <ActionButton
          className={styles.versionSelector}
          menuProps={{
            gapSpace: 3,
            beakWidth: 8,
            isBeakVisible: true,
            shouldFocusOnMount: true,
            items: versionSwitcherDefinition.versions,
            directionalHint: DirectionalHint.bottomCenter,
            styles: {
              root: { minWidth: 100 },
            },
          }}
        >
          {versionSwitcherDefinition.selectedMajorName}
        </ActionButton>
      )}
    </header>
  );
};

export const PageHeader: React.FunctionComponent<IPageHeaderProps> = styled<
  IPageHeaderProps,
  IPageHeaderStyleProps,
  IPageHeaderStyles
>(PageHeaderBase, getStyles, undefined, { scope: 'PageHeader' });
