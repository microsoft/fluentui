import { mergeStyleSets } from '@uifabric/merge-styles/lib/index';
import { IClassNames } from './IClassNames';
import { IStyleFunction } from './IStyleFunction';

/**
 * Creates a getClassNames function which calls getStyles given the props, and injects them
 * into mergeStyleSets.
 */
export function classNamesFunction<TStyleProps extends {}, TStyles extends {}>(): (
  getStyles?: IStyleFunction<TStyleProps, TStyles>,
  styleProps?: TStyleProps
) => IClassNames<TStyles> {

  // TODO: memoize.
  return (
    getStyles?: IStyleFunction<TStyleProps, TStyles>,
    styleProps?: TStyleProps
  ): IClassNames<TStyles> => mergeStyleSets(getStyles && getStyles(styleProps!)
  );
}
