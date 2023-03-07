import * as React from 'react';
import { useInfoLabel_unstable } from './useInfoLabel';
import { renderInfoLabel_unstable } from './renderInfoLabel';
import { useInfoLabelStyles_unstable } from './useInfoLabelStyles';
import type { InfoLabelProps } from './InfoLabel.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * InfoLabel component - TODO: add more docs
 */
export const InfoLabel: ForwardRefComponent<InfoLabelProps> = React.forwardRef((props, ref) => {
  const state = useInfoLabel_unstable(props, ref);

  useInfoLabelStyles_unstable(state);
  return renderInfoLabel_unstable(state);
});

InfoLabel.displayName = 'InfoLabel';
