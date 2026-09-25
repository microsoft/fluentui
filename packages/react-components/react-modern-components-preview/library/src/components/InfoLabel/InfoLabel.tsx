'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { InfoLabelProps } from './InfoLabel.types';
import { renderInfoLabel } from './renderInfoLabel';
import { useInfoLabel } from './useInfoLabel';
import { useInfoLabelStyles } from './useInfoLabelStyles.styles';

/**
 * An InfoLabel pairs a label with an optional InfoButton.
 */
export const InfoLabel: ForwardRefComponent<InfoLabelProps> = React.forwardRef((props, ref) => {
  const state = useInfoLabel(props, ref);
  useInfoLabelStyles(state);
  return renderInfoLabel(state);
});

InfoLabel.displayName = 'InfoLabel';
