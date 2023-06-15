import * as React from 'react';
import { useInfoIcon_unstable } from './useInfoIcon';
import { renderInfoIcon_unstable } from './renderInfoIcon';
import { useInfoIconStyles_unstable } from './useInfoIconStyles.styles';
import type { InfoIconProps } from './InfoIcon.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * InfoIcon component - TODO: add more docs
 */
export const InfoIcon: ForwardRefComponent<InfoIconProps> = React.forwardRef((props, ref) => {
  const state = useInfoIcon_unstable(props, ref);

  useInfoIconStyles_unstable(state);
  return renderInfoIcon_unstable(state);
});

InfoIcon.displayName = 'InfoIcon';
