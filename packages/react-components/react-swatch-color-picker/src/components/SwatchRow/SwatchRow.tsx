import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useSwatchRow_unstable } from './useSwatchRow';
import { renderSwatchRow_unstable } from './renderSwatchRow';
import { useSwatchRowStyles_unstable } from './useSwatchRowStyles.styles';
import type { SwatchRowProps } from './SwatchRow.types';

/**
 * SwatchRow component - TODO: add more docs
 */
export const SwatchRow: ForwardRefComponent<SwatchRowProps> = React.forwardRef((props, ref) => {
  const state = useSwatchRow_unstable(props, ref);

  useSwatchRowStyles_unstable(state);
  return renderSwatchRow_unstable(state);
});

SwatchRow.displayName = 'SwatchRow';
