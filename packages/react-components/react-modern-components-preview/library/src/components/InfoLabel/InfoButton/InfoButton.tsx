'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { InfoButtonProps } from './InfoButton.types';
import { renderInfoButton } from './renderInfoButton';
import { useInfoButton } from './useInfoButton';
import { useInfoButtonStyles } from './useInfoButtonStyles.styles';

/**
 * An InfoButton displays additional information in a popover.
 */
export const InfoButton: ForwardRefComponent<InfoButtonProps> = React.forwardRef((props, ref) => {
  const state = useInfoButton(props, ref);
  useInfoButtonStyles(state);
  return renderInfoButton(state);
});

InfoButton.displayName = 'InfoButton';
