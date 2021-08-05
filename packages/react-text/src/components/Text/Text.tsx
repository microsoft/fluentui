import * as React from 'react';
import { useText } from './useText';
import { TextProps } from './Text.types';
import { renderText } from './renderText';
import { useTextStyles } from './useTextStyles';

/**
 * Typography and styling abstraction component used to ensure consistency of text.
 */
export const Text = React.forwardRef<HTMLElement, TextProps>((props, ref) => {
  const state = useText(props, ref);

  useTextStyles(state);
  return renderText(state);
});

Text.displayName = 'Text';
