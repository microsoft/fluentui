import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useColorSwatch_unstable } from './useColorSwatch';
import { renderColorSwatch_unstable } from './renderColorSwatch';
import { useColorSwatchStyles_unstable } from './useColorSwatchStyles.styles';
import type { ColorSwatchProps } from './ColorSwatch.types';

/**
 * ColorSwatch component - TODO: add more docs
 */
export const ColorSwatch: ForwardRefComponent<ColorSwatchProps> = React.forwardRef((props, ref) => {
  const state = useColorSwatch_unstable(props, ref);

  useColorSwatchStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('useColorSwatchStyles_unstable')(state);
  return renderColorSwatch_unstable(state);
});

ColorSwatch.displayName = 'ColorSwatch';
