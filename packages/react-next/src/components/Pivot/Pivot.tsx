import * as React from 'react';
import { styled, memoizeFunction, css } from '../../Utilities';
import { IPivotProps, IPivotStyleProps, IPivotStyles } from './Pivot.types';
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
  (theme: ITheme, className?: string, rootIsLarge?: boolean, rootIsTabs?: boolean) => {
    const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);

    const propControlledClasses = [rootIsLarge && classes.rootIsLarge, rootIsTabs && classes.rootIsTabs];

    const rootStaticClasses: string[] = [];

    return {
      root: css(className, classes.root, globalClassNames.root, ...rootStaticClasses, ...propControlledClasses),
      link: css(classes.link, globalClassNames.link, ...propControlledClasses),
      linkContent: css(classes.linkContent, globalClassNames.linkContent, ...propControlledClasses),
      linkIsSelected: css(classes.linkIsSelected, globalClassNames.linkIsSelected, ...propControlledClasses),
      text: css(classes.text, globalClassNames.text, ...propControlledClasses),
      count: css(classes.count, globalClassNames.count, ...propControlledClasses),
      icon: css(/*TODO classes.icon,*/ globalClassNames.icon, ...propControlledClasses),
      itemContainer: {} /*TODO ???*/,
    };
  },
);

const getStaticStyles = (props: IPivotStyleProps): Required<IPivotStyles> => {
  const { className, rootIsLarge, rootIsTabs, theme } = props;

  return getStaticStylesMemoized(theme!, className, rootIsLarge, rootIsTabs);
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
