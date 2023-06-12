import * as React from 'react';
import { useInfoButtonLabel_unstable } from './useInfoButtonLabel';
import { renderInfoButtonLabel_unstable } from './renderInfoButtonLabel';
import { useInfoButtonLabelStyles_unstable } from './useInfoButtonLabelStyles.styles';
import type { InfoButtonLabelProps } from './InfoButtonLabel.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * InfoButtonLabel component - TODO: add more docs
 */
export const InfoButtonLabel: ForwardRefComponent<InfoButtonLabelProps> = React.forwardRef((props, ref) => {
  const state = useInfoButtonLabel_unstable(props, ref);

  useInfoButtonLabelStyles_unstable(state);
  return renderInfoButtonLabel_unstable(state);
});

InfoButtonLabel.displayName = 'InfoButtonLabel';
