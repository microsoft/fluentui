import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useSwatchPickerRow_unstable } from './useSwatchPickerRow';
import { renderSwatchPickerRow_unstable } from './renderSwatchPickerRow';
import { useSwatchPickerRowStyles_unstable } from './useSwatchPickerRowStyles.styles';
import type { SwatchPickerRowProps } from './SwatchPickerRow.types';

/**
 * SwatchPickerRow component - TODO: add more docs
 */
export const SwatchPickerRow: ForwardRefComponent<SwatchPickerRowProps> = React.forwardRef((props, ref) => {
  const state = useSwatchPickerRow_unstable(props, ref);

  useSwatchPickerRowStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // useCustomStyleHook_unstable('useSwatchPickerRowStyles_unstable')(state);
  return renderSwatchPickerRow_unstable(state);
});

SwatchPickerRow.displayName = 'SwatchPickerRow';
