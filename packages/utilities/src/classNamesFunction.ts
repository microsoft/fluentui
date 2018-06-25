import { mergeStyleSets, IStyleOrStyleFunction, IStyleSet } from '@uifabric/merge-styles';
import { IClassNames } from './IClassNames';
import { IStyleFunctionOrObject } from './styled';

/**
 * Creates a getClassNames function which calls getStyles given the props, and injects them
 * into mergeStyleSets.
 */
export function classNamesFunction<TStyleProps extends {}, TStyles extends IStyleSet<TStyles>>(): (
  getStyles?: IStyleFunctionOrObject<TStyleProps, TStyles>,
  styleProps?: TStyleProps
) => IClassNames<TStyleProps, TStyles> {
  // TODO: memoize.
  return (
    getStyles?: IStyleFunctionOrObject<TStyleProps, TStyles>,
    styleProps?: TStyleProps
  ): IClassNames<TStyleProps, TStyles> => {
    const styleSet = getStyles && (typeof getStyles === 'function' ? getStyles(styleProps!) : getStyles);

    // styleSet might be undefined if getStyles is undefined, but getStyles should never
    // ordinarily be undefined (it would hardly make any sense).
    // However, because we usually use `props.styles` as the argument to an invocation of this method, and
    // `props.styles` itself is defined as optional, this avoids the need to use `!` at all invocation points.

    return styleSet ? (mergeStyleSets(styleSet) as IClassNames<TStyleProps, TStyles>) : {};
  };
}
