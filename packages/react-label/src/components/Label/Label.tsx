import * as React from 'react';
import { useLabel } from './useLabel';
import { LabelProps } from './Label.types';
import { renderLabel } from './renderLabel';
import { useLabelStyles } from './useLabelStyles';

/**
 * Label component
 */
export const Label = React.forwardRef<HTMLElement, LabelProps>((props, ref) => {
  const state = useLabel(props, ref);

  useLabelStyles(state);
  return renderLabel(state);
});

Label.displayName = 'Label';
