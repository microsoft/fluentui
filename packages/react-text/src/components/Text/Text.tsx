import * as React from 'react';
import { useText } from './useText';
import { renderText } from './renderText';
import { useTextStyles } from './useTextStyles';
import type { TextProps } from './Text.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Typography and styling abstraction component used to ensure consistency of text.
 */
export const Text: ForwardRefComponent<TextProps> = React.forwardRef((props, ref) => {
  const state = useText(props, ref);

  useTextStyles(state);

  return renderText(state);
  // Work around some small mismatches in inferred types which don't matter in practice
}) as ForwardRefComponent<TextProps>;

Text.displayName = 'Text';
