import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useColorSwatch_unstable } from './useColorSwatch';
import { renderColorSwatch_unstable } from './renderColorSwatch';
import { useColorSwatchStyles_unstable } from './useColorSwatchStyles.styles';
import type { ColorSwatchProps } from './ColorSwatch.types';
import { useSwatchContextValues_unstable } from '../../contexts/swatch';

/**
 * ColorSwatch component - TODO: add more docs
 */
export const ColorSwatch: ForwardRefComponent<ColorSwatchProps> = React.forwardRef((props, ref) => {
  const state = useColorSwatch_unstable(props, ref);
  const contextValues = useSwatchContextValues_unstable(state);

  useColorSwatchStyles_unstable(state);
  useCustomStyleHook_unstable('useColorSwatchStyles_unstable')(state);
  return renderColorSwatch_unstable(state, contextValues);
});

ColorSwatch.displayName = 'ColorSwatch';
