import * as React from 'react';
import { styled, memoizeFunction, css } from '../../Utilities';
import { IPivotProps, IPivotStyleProps, IPivotStyles, PivotLinkSizeType, PivotLinkFormatType } from './Pivot.types';
import { PivotBase } from './Pivot.base';
import { getGlobalClassNames, ITheme } from '../../Styling';
import * as classes from './Pivot.scss';

const GlobalClassNames = {
  count: 'ms-Pivot-count',
  icon: 'ms-Pivot-icon',
  linkIsSelected: 'is-selected',
  link: 'ms-Pivot-link',
  linkContent: 'ms-Pivot-linkContent',
  root: 'ms-Pivot',
  rootIsLarge: 'ms-Pivot--large',
  rootIsTabs: 'ms-Pivot--tabs',
  text: 'ms-Pivot-text',
};

const getStaticStylesMemoized = memoizeFunction(
  (theme: ITheme, className?: string, linkSize?: PivotLinkSizeType, linkFormat?: PivotLinkFormatType) => {
    const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);

    const rootModifiers = [
      linkSize === 'large' && classes.linkSize_large,
      linkFormat === 'tabs' && classes.linkFormat_tabs,
    ];
    return {
      root: css(className, classes.root, globalClassNames.root, ...rootModifiers),
      link: css(classes.link, globalClassNames.link),
      linkContent: css(classes.linkContent, globalClassNames.linkContent),
      linkIsSelected: css(classes.linkIsSelected, globalClassNames.linkIsSelected),
      text: css(classes.text, globalClassNames.text),
      count: css(classes.count, globalClassNames.count),
      icon: css(globalClassNames.icon),
      itemContainer: css(classes.itemContainer),
    };
  },
);

const getStaticStyles = (props: IPivotStyleProps): Required<IPivotStyles> => {
  const { className, linkSize, linkFormat, theme } = props;

  return getStaticStylesMemoized(theme!, className, linkSize, linkFormat);
};

/**
 * The Pivot control and related tabs pattern are used for navigating frequently accessed,
 * distinct content categories. Pivots allow for navigation between two or more content
 * views and relies on text headers to articulate the different sections of content.
 */
export const Pivot: React.FunctionComponent<IPivotProps> = styled<IPivotProps, IPivotStyleProps, IPivotStyles>(
  PivotBase,
  getStaticStyles,
  undefined,
  {
    scope: 'Pivot',
  },
);
