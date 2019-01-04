import { __assign } from 'tslib';
import { IStyleSet, ITheme } from '@uifabric/styling';
import { IStylesFunctionOrObject } from './IComponent';

export const assign = __assign;

/**
 * Evaluate styles based on type to return consistent TStyleSet.
 */
// TODO: remove when old createComponent is removed
// TODO: or move to slots if only used in slots
export function _evaluateStyle<TViewProps, TTokens, TStyleSet extends IStyleSet<TStyleSet>>(
  props: TViewProps,
  theme: ITheme,
  styles?: IStylesFunctionOrObject<TViewProps, TTokens, TStyleSet>
): Partial<TStyleSet> | undefined {
  if (typeof styles === 'function') {
    return styles(props, theme, {} as TTokens);
  }

  return styles;
}
