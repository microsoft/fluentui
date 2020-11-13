import * as React from 'react';
import { IPageHeaderProps, IPageHeaderStyleProps, IPageHeaderStyles } from './PageHeader.types';
import {
  classNamesFunction,
  css,
  styled,
  DirectionalHint,
  FontWeights,
  IStyleFunction,
  ScreenWidthMinUhfMobile,
  IContextualMenuItem,
} from '@fluentui/react';
import { ActionButton } from '@fluentui/react/lib/compat/Button';
import { FontSizes } from '@fluentui/theme';
import { appPaddingSm, appPaddingLg, pageHeaderFullHeight } from '../../styles/constants';
import * as pageHeaderStyles from './PageHeader.module.scss';

const getStyles: IStyleFunction<IPageHeaderStyleProps, IPageHeaderStyles> = props => {
  const palette = props.theme!.palette;
  return {
    root: {
      alignItems: 'flex-end',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: appPaddingSm,
      position: 'relative',
      selectors: {
        [`@media screen and (min-width: ${ScreenWidthMinUhfMobile}px)`]: {
          marginBottom: 0,
          padding: `${appPaddingLg}px 0`,
          minHeight: pageHeaderFullHeight,
        },
      },
    },
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
  };
};

const getClassNames = classNamesFunction<IPageHeaderStyleProps, IPageHeaderStyles>();

const PageHeaderBase: React.FunctionComponent<IPageHeaderProps> = props => {
  const { pageTitle = 'Page title', pageSubTitle, theme, versionSwitcherDefinition } = props;
  const styles = getClassNames(getStyles, { theme });

  const versionOptions: IContextualMenuItem[] | undefined =
    versionSwitcherDefinition && versionSwitcherDefinition.versions
      ? versionSwitcherDefinition.versions.map(version => ({
          key: version,
          text: version,
          checked: version === versionSwitcherDefinition.currentVersion,
        }))
      : undefined;

  return (
    <header className={css(styles.root, pageHeaderStyles.root, props.className)}>
      <h1 className={styles.title}>
        {pageTitle}
        {pageSubTitle && <span className={styles.subTitle}>{pageSubTitle}</span>}
      </h1>
      {versionSwitcherDefinition && versionOptions && (
        <ActionButton
          allowDisabledFocus={true}
          styles={{
            root: { height: '1em', padding: '12px 0' },
            rootHovered: { borderBottom: '1px solid black' },
          }}
          menuProps={{
            gapSpace: 3,
            beakWidth: 8,
            isBeakVisible: true,
            shouldFocusOnMount: true,
            items: versionOptions,
            directionalHint: DirectionalHint.bottomCenter,
            onItemClick: versionSwitcherDefinition.onVersionMenuClick,
            styles: {
              root: { minWidth: 100 },
            },
          }}
        >
          Fluent UI React {versionSwitcherDefinition.currentVersionNumber}
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
