import * as React from 'react';
import { useInfoIconLabel_unstable } from './useInfoIconLabel';
import { renderInfoIconLabel_unstable } from './renderInfoIconLabel';
import { useInfoIconLabelStyles_unstable } from './useInfoIconLabelStyles.styles';
import type { InfoIconLabelProps } from './InfoIconLabel.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * InfoIconLabel component - TODO: add more docs
 */
export const InfoIconLabel: ForwardRefComponent<InfoIconLabelProps> = React.forwardRef((props, ref) => {
  const state = useInfoIconLabel_unstable(props, ref);

  useInfoIconLabelStyles_unstable(state);
  return renderInfoIconLabel_unstable(state);
});

InfoIconLabel.displayName = 'InfoIconLabel';
