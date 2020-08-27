import { useInlineTokens } from '@fluentui/react-theme-provider';
import * as React from 'react';

import { TextProps } from './Text.types';
import { useText } from './useText';
import { useTextClasses } from './useTextClasses';

export const Text = React.forwardRef<HTMLElement, TextProps>((props, ref) => {
  const { render, state } = useText(props, ref);

  useTextClasses(state);
  useInlineTokens(state, '--text');

  return render(state);
});

Text.displayName = 'Text';
