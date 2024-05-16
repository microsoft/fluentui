import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useSwatchPickerRow_unstable } from './useSwatchPickerRow';
import { renderSwatchPickerRow_unstable } from './renderSwatchPickerRow';
import { useSwatchPickerRowStyles_unstable } from './useSwatchPickerRowStyles.styles';
import type { SwatchPickerRowProps } from './SwatchPickerRow.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * SwatchPickerRow component is used to render a row of swatches.
 */
export const SwatchPickerRow: ForwardRefComponent<SwatchPickerRowProps> = React.forwardRef((props, ref) => {
  const state = useSwatchPickerRow_unstable(props, ref);

  useSwatchPickerRowStyles_unstable(state);
  useCustomStyleHook_unstable('useSwatchPickerRowStyles_unstable')(state);
  return renderSwatchPickerRow_unstable(state);
});

SwatchPickerRow.displayName = 'SwatchPickerRow';
