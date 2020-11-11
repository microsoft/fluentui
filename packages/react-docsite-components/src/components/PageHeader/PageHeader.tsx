import * as React from 'react';
import { IPageHeaderProps, IPageHeaderStyleProps, IPageHeaderStyles } from './PageHeader.types';
import {
  classNamesFunction,
  css,
  styled,
  DirectionalHint,
  FontWeights,
  IContextualMenuItem,
  IStyleFunction,
  ScreenWidthMinUhfMobile,
} from '@fluentui/react';
import { ActionButton } from '@fluentui/react/lib/compat/Button';
import { FontSizes } from '@fluentui/theme';
import { appPaddingSm, appPaddingLg, pageHeaderFullHeight } from '../../styles/constants';
import * as pageHeaderStyles from './PageHeader.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reactPackageData = require<any>('@fluentui/react/package.json');

const getStyles: IStyleFunction<IPageHeaderStyleProps, IPageHeaderStyles> = props => {
  const palette = props.theme!.palette;
  return {
    root: {
      alignItems: 'center',
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

const CURRENT_VERSION = '8';
const VERSIONS = ['8', '7', '6', '5'];
const fabricVersionOptions: IContextualMenuItem[] = VERSIONS.map(version => ({
  key: version,
  text: `${Number(version) >= 7 ? 'Fluent UI React' : 'Fabric React'} ${version}`,
  checked: version === CURRENT_VERSION,
}));

const PageHeaderBase: React.FunctionComponent<IPageHeaderProps> = props => {
  const { pageTitle = 'Page title', pageSubTitle, theme } = props;
  const styles = getClassNames(getStyles, { theme });

  const monoFont =
    '"Segoe UI Mono",Consolas,"Andale Mono WT","Andale Mono","Lucida Console","Lucida Sans Typewriter",' +
    '"DejaVu Sans Mono","Bitstream Vera Sans Mono","Liberation Mono","Nimbus Mono L",Monaco,"Courier New",Courier,' +
    'monospace';

  return (
    <header className={css(styles.root, pageHeaderStyles.root, props.className)}>
      <h1 className={styles.title}>
        {pageTitle}
        {pageSubTitle && <span className={styles.subTitle}>{pageSubTitle}</span>}
      </h1>
      <ActionButton
        allowDisabledFocus={true}
        styles={{
          root: { height: '1em', padding: '12px 0' },
          flexContainer: { fontFamily: monoFont },
          rootHovered: { borderBottom: '1px solid black' },
        }}
        menuProps={{
          gapSpace: 3,
          beakWidth: 8,
          isBeakVisible: true,
          shouldFocusOnMount: true,
          items: fabricVersionOptions,
          directionalHint: DirectionalHint.bottomCenter,
          onItemClick: onVersionMenuClick,
          styles: {
            root: { minWidth: 100 },
          },
        }}
      >
        Fluent UI React {reactPackageData.version}
      </ActionButton>
    </header>
  );
};

const onVersionMenuClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, item: IContextualMenuItem): void => {
  const restOfPath = location.href.substr(location.href.indexOf('#'));
  if (item.key !== CURRENT_VERSION) {
    // Reload the page to switch versions
    location.href = `${location.protocol}//${location.host}${location.pathname}?fabricVer=${item.key}${restOfPath}`;
  }
};

export const PageHeader: React.FunctionComponent<IPageHeaderProps> = styled<
  IPageHeaderProps,
  IPageHeaderStyleProps,
  IPageHeaderStyles
>(PageHeaderBase, getStyles, undefined, { scope: 'PageHeader' });
