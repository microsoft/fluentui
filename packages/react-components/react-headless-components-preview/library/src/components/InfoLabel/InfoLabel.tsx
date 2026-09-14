'use client';

import * as React from 'react';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { InfoLabelProps } from './InfoLabel.types';
import { renderInfoLabel } from './renderInfoLabel';
import { useInfoLabel } from './useInfoLabel';

/**
 * InfoLabel component
 */
export const InfoLabel: ForwardRefComponent<InfoLabelProps> = React.forwardRef((props, ref) => {
  const state = useInfoLabel(props, ref);

  return renderInfoLabel(state);
});

InfoLabel.displayName = 'InfoLabel';
