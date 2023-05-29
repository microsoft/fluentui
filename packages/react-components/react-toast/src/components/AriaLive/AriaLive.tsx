import * as React from 'react';
import { useAriaLive_unstable } from './useAriaLive';
import { renderAriaLive_unstable } from './renderAriaLive';
import { useAriaLiveStyles_unstable } from './useAriaLiveStyles.styles';
import type { AriaLiveProps } from './AriaLive.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A component that manages aria live announcements imperatively
 */
export const AriaLive: ForwardRefComponent<AriaLiveProps> = React.forwardRef((props, ref) => {
  const state = useAriaLive_unstable(props, ref);

  useAriaLiveStyles_unstable(state);
  return renderAriaLive_unstable(state);
});

AriaLive.displayName = 'AriaLive';
