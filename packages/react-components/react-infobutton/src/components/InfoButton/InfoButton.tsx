import * as React from 'react';
import { useInfoButton_unstable } from './useInfoButton';
import { renderInfoButton_unstable } from './renderInfoButton';
import { useInfoButtonStyles_unstable } from './useInfoButtonStyles';
import type { InfoButtonProps } from './InfoButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * InfoButton component - TODO: add more docs
 */
export const InfoButton: ForwardRefComponent<InfoButtonProps> = React.forwardRef((props, ref) => {
  const state = useInfoButton_unstable(props, ref);

  useInfoButtonStyles_unstable(state);
  return renderInfoButton_unstable(state);
});

InfoButton.displayName = 'InfoButton';
