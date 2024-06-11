import * as React from 'react';
import { useLabel_unstable } from './useLabel';
import { renderLabel_unstable } from './renderLabel';
import { useLabelStyles_unstable } from './useLabelStyles.styles';
import type { LabelProps } from './Label.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * A label component provides a title or name to a component.
 */
export const Label: ForwardRefComponent<LabelProps> = React.forwardRef((props, ref) => {
  const state = useLabel_unstable(props, ref);

  useLabelStyles_unstable(state);

  useCustomStyleHook_unstable('useLabelStyles_unstable')(state);

  return renderLabel_unstable(state);
});

Label.displayName = 'Label';
