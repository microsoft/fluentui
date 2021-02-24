import * as React from 'react';

import { TextProps } from './Text.types';
import { useText } from './useText';
import { useTextStyles } from './useTextStyles';

export const Text = React.forwardRef<HTMLElement, TextProps>((props, ref) => {
  const { render, state } = useText(props, ref);

  useTextStyles(state);

  return render(state);
});

Text.displayName = 'Text';
