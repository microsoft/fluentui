import * as React from 'react';
import { ColorTokenSet } from '@fluentui/theme';

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
