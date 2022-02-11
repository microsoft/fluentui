import * as React from 'react';
import { useText_unstable } from './useText';
import type { TextProps } from './Text.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Typography and styling abstraction component used to ensure consistency of text.
 */
export const Text: ForwardRefComponent<TextProps> = React.forwardRef((props, ref) => {
  const [state, render] = useText_unstable(props, ref);
  return render(state);
  // Work around some small mismatches in inferred types which don't matter in practice
}) as ForwardRefComponent<TextProps>;

Text.displayName = 'Text';
