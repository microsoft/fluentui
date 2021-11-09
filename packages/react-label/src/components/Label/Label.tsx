import * as React from 'react';
import { useLabel } from './useLabel';
import { renderLabel } from './renderLabel';
import { useLabelStyles } from './useLabelStyles';
import type { LabelProps } from './Label.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A label component provides a title or name to a component.
 */
export const Label: ForwardRefComponent<LabelProps> = React.forwardRef((props, ref) => {
  const state = useLabel(props, ref);

  useLabelStyles(state);
  return renderLabel(state);
});

Label.displayName = 'Label';
