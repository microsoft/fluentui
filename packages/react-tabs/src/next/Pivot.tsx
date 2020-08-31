import * as React from 'react';
import { styled, memoizeFunction, css } from '@uifabric/utilities';
import {
  IPivotProps,
  IPivotStyleProps,
  IPivotStyles,
  PivotLinkSizeType,
  PivotLinkFormatType,
  PivotBase,
} from '../index';
import { getGlobalClassNames, ITheme } from '@uifabric/styling';
import * as classes from './Pivot.scss';

const GlobalClassNames = {
  count: 'ms-Pivot-count',
  icon: 'ms-Pivot-icon',
  link: 'ms-Pivot-link',
  linkInMenu: 'ms-Pivot-linkInMenu',
  linkIsSelected: 'is-selected',
  linkContent: 'ms-Pivot-linkContent',
  overflowMenuButton: 'ms-Pivot-overflowMenuButton',
  root: 'ms-Pivot',
  rootIsLarge: 'ms-Pivot--large',
  rootIsTabs: 'ms-Pivot--tabs',
  text: 'ms-Pivot-text',
};

const getStaticStylesMemoized = memoizeFunction(
  (theme: ITheme, className?: string, linkSize?: PivotLinkSizeType, linkFormat?: PivotLinkFormatType) => {
    const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);

    const modifierClasses = [
      linkSize === 'large' && classes.linkSize_large,
      linkFormat === 'tabs' && classes.linkFormat_tabs,
    ];

    return {
      root: css(
        className,
        classes.root,
        globalClassNames.root,
        linkSize === 'large' && globalClassNames.rootIsLarge,
        linkFormat === 'tabs' && globalClassNames.rootIsTabs,
        ...modifierClasses,
      ),
      link: css(classes.link, globalClassNames.link, ...modifierClasses),
      linkInMenu: css(classes.linkInMenu, globalClassNames.linkInMenu, ...modifierClasses),
      // linkIsSelected should not include ...modifierClasses. It is itself a modifier class for link or linkInMenu
      linkIsSelected: css(classes.linkIsSelected, globalClassNames.linkIsSelected),
      linkContent: css(classes.linkContent, globalClassNames.linkContent, ...modifierClasses),
      text: css(classes.text, globalClassNames.text, ...modifierClasses),
      count: css(classes.count, globalClassNames.count, ...modifierClasses),
      icon: css(globalClassNames.icon, ...modifierClasses),
      itemContainer: css(classes.itemContainer, ...modifierClasses),
      overflowMenuButton: css(classes.overflowMenuButton, globalClassNames.overflowMenuButton, ...modifierClasses),
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
