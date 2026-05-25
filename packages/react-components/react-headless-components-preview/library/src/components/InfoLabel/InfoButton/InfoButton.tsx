'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderInfoButton } from './renderInfoButton';
import { useInfoButton } from './useInfoButton';
import type { InfoButtonProps } from './InfoButton.types';

/**
 * InfoButtons provide a way to display additional information about a form field or an area in the UI.
 */
export const InfoButton: ForwardRefComponent<InfoButtonProps> = React.forwardRef((props, ref) => {
  const state = useInfoButton(props, ref);

  return renderInfoButton(state);
});

InfoButton.displayName = 'InfoButton';
