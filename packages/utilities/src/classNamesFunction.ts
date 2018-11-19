import { mergeStyleSets, IStyle, IStyleSet, IProcessedStyleSet } from '@uifabric/merge-styles';
import { IStyleFunctionOrObject } from '@uifabric/merge-styles';

/**
 * Creates a getClassNames function which calls getStyles given the props, and injects them
 * into mergeStyleSets.
 */
export function classNamesFunction<TStyleProps extends {}, TStyleSet extends IStyleSet<TStyleSet>>(): (
  getStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined,
  styleProps?: TStyleProps
) => IProcessedStyleSet<TStyleSet> {
  // TODO: memoize.

  const getClassNames = (
    styleFunctionOrObject: IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined,
    styleProps: TStyleProps = {} as TStyleProps
  ): IProcessedStyleSet<TStyleSet> => {
    // styleSet might be undefined if styleFunctionOrObject is undefined, but getStyles should never
    // ordinarily be undefined (it would hardly make any sense).
    // However, because we usually use `props.styles` as the argument to an invocation of this method, and
    // `props.styles` itself is defined as optional, this avoids the need to use `!` at all invocation points.
    if (styleFunctionOrObject === undefined) {
      return {} as IProcessedStyleSet<TStyleSet>;
    }

    const styleSet =
      styleFunctionOrObject && (typeof styleFunctionOrObject === 'function' ? styleFunctionOrObject(styleProps!) : styleFunctionOrObject);

    return mergeStyleSets(styleSet as TStyleSet);
  };

  return getClassNames;
}
