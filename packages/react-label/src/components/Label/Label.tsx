import * as React from 'react';
import { useLabel } from './useLabel';
import { LabelProps } from './Label.types';
import { renderLabel } from './renderLabel';
import { useLabelStyles } from './useLabelStyles';

/**
 * A label component provides a title or name to a component.
 * {@docCategory Label}
 */
export const Label = React.forwardRef<HTMLElement, LabelProps>((props, ref) => {
  const state = useLabel(props, ref);

  useLabelStyles(state);
  return renderLabel(state);
});

Label.displayName = 'Label';
