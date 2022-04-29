import * as React from 'react';
import { useText_unstable } from './useText';
import { renderText_unstable } from './renderText';
import { useTextStyles_unstable } from './useTextStyles';
import type { TextProps } from './Text.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Typography and styling abstraction component used to ensure consistency of text.
 */
export const Text: ForwardRefComponent<TextProps> = React.forwardRef((props, ref) => {
  const state = useText_unstable(props, ref);

  useTextStyles_unstable(state);

  return renderText_unstable(state);
  // Work around some small mismatches in inferred types which don't matter in practice
}) as ForwardRefComponent<TextProps>;

Text.displayName = 'Text';
