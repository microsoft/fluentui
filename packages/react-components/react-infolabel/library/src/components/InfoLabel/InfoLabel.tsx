import * as React from 'react';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { InfoLabelProps } from './InfoLabel.types';
import { renderInfoLabel_unstable } from './renderInfoLabel';
import { useInfoLabel_unstable } from './useInfoLabel';
import { useInfoLabelStyles_unstable } from './useInfoLabelStyles.styles';

/**
 * InfoLabel component
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const InfoLabel: ForwardRefComponent<InfoLabelProps> = React.forwardRef((props, ref) => {
  const state = useInfoLabel_unstable(props, ref);

  useInfoLabelStyles_unstable(state);
  return renderInfoLabel_unstable(state);
});

InfoLabel.displayName = 'InfoLabel';
