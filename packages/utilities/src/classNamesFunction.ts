import { mergeStyleSets, IStyle } from '@uifabric/merge-styles';
import { IClassNames } from './IClassNames';
import { IStyleFunction } from './IStyleFunction';
import { IStyleFunctionOrObject } from './styled';

/**
 * Creates a getClassNames function which calls getStyles given the props, and injects them
 * into mergeStyleSets.
 */
export function classNamesFunction<TStyleProps extends {}, TStyles extends { [P in keyof TStyles]: IStyle }>(): (
  getStyles?: IStyleFunctionOrObject<TStyleProps, TStyles>,
  styleProps?: TStyleProps
) => IClassNames<TStyles> {

  // TODO: memoize.
  return (
    getStyles?: IStyleFunctionOrObject<TStyleProps, TStyles>,
    styleProps?: TStyleProps
  ): IClassNames<TStyles> => mergeStyleSets(getStyles && (typeof getStyles === 'function' ? getStyles(styleProps!) : getStyles)
  );
}
