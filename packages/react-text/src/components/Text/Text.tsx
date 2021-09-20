import * as React from 'react';
import { useText } from './useText';
import { renderText } from './renderText';
import { useTextStyles } from './useTextStyles';
import type { TextProps } from './Text.types';

/**
 * Typography and styling abstraction component used to ensure consistency of text.
 */
export const Text = React.forwardRef<
  HTMLSpanElement | HTMLParagraphElement | HTMLHeadingElement | HTMLPreElement,
  TextProps
>((props, ref) => {
  const state = useText(props, ref);

  useTextStyles(state);

  return renderText(state);
});

Text.displayName = 'Text';
