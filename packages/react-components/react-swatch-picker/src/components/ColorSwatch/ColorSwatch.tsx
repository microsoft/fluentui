import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useColorSwatch_unstable } from './useColorSwatch';
import { renderColorSwatch_unstable } from './renderColorSwatch';
import { useColorSwatchStyles_unstable } from './useColorSwatchStyles.styles';
import type { ColorSwatchProps } from './ColorSwatch.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * ColorSwatch component is used to render a colors, icons and gradients.
 */
export const ColorSwatch: ForwardRefComponent<ColorSwatchProps> = React.forwardRef((props, ref) => {
  const state = useColorSwatch_unstable(props, ref);

  useColorSwatchStyles_unstable(state);
  useCustomStyleHook_unstable('useColorSwatchStyles_unstable')(state);

  return renderColorSwatch_unstable(state);
});

ColorSwatch.displayName = 'ColorSwatch';
