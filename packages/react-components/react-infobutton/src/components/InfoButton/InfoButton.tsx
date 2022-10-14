import * as React from 'react';
import { useInfoButton_unstable } from './useInfoButton';
import { renderInfoButton_unstable } from './renderInfoButton';
import { useInfoButtonStyles_unstable } from './useInfoButtonStyles';
import type { InfoButtonProps } from './InfoButton.types';

/**
 * InfoButtons provide a way to display additional information about a form field or an area in the UI.
 */
export const InfoButton: React.FC<InfoButtonProps> = props => {
  const state = useInfoButton_unstable(props);

  useInfoButtonStyles_unstable(state);
  return renderInfoButton_unstable(state);
};

InfoButton.displayName = 'InfoButton';
