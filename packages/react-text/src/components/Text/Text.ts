import * as React from 'react';

import { renderText } from './renderText';
import { TextProps } from './Text.types';
import { useText } from './useText';
import { useTextStyles } from './useTextStyles';

export const Text: React.FunctionComponent<TextProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  TextProps
>((props, ref) => {
  const state = useText(props, ref);

  useTextStyles(state);

  return renderText(state);
});

Text.displayName = 'Text';
