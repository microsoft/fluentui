import * as React from 'react';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderInfoButton_unstable } from './renderInfoButton';
import { useInfoButton_unstable } from './useInfoButton';
import { useInfoButtonStyles_unstable } from './useInfoButtonStyles.styles';
import type { InfoButtonProps } from './InfoButton.types';

/**
 * InfoButtons provide a way to display additional information about a form field or an area in the UI.
 */
export const InfoButton: ForwardRefComponent<InfoButtonProps> = React.forwardRef((props, ref) => {
  const state = useInfoButton_unstable(props, ref);

  useInfoButtonStyles_unstable(state);
  return renderInfoButton_unstable(state);
});

InfoButton.displayName = 'InfoButton';
