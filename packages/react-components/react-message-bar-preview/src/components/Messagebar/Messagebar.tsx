import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMessagebar_unstable } from './useMessagebar';
import { renderMessagebar_unstable } from './renderMessagebar';
import { useMessagebarStyles_unstable } from './useMessagebarStyles.styles';
import type { MessagebarProps } from './Messagebar.types';

/**
 * Messagebar component - TODO: add more docs
 */
export const Messagebar: ForwardRefComponent<MessagebarProps> = React.forwardRef((props, ref) => {
  const state = useMessagebar_unstable(props, ref);

  useMessagebarStyles_unstable(state);
  return renderMessagebar_unstable(state);
});

Messagebar.displayName = 'Messagebar';
