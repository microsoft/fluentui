import * as React from 'react';
import { ColorTokenSet } from '@fluentui/theme';

export { Theme, PartialTheme } from '@fluentui/theme';

/**
 * A token set can provide a single string or object, mapping additional sub-parts of a token set.
 */
export type TokenSetType = { [key: string]: TokenSetType | string | number | undefined };

/**
 * Recursive partial type.
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer I> ? Array<RecursivePartial<I>> : RecursivePartial<T[P]>;
};

/**
 * Typing containing the definition for the `style` and `tokens` props that will be extended for the calculation of the
 * style prop.
 */
export interface StyleProps<TTokens extends ColorTokenSet = ColorTokenSet> {
  style?: React.CSSProperties;
  tokens?: TTokens;
}

export interface StyleOptions<TProps> {
  slotProps: ((props: TProps) => Record<string, object>)[];
}
