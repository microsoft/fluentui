'use client';

import type * as React from 'react';
import { useAriaLive_unstable } from './useAriaLive';
import { renderAriaLive_unstable } from './renderAriaLive';
import { useAriaLiveStyles_unstable } from './useAriaLiveStyles.styles';
import type { AriaLiveProps } from './AriaLive.types';

/**
 * A component that manages aria live announcements imperatively
 */
export const AriaLive: React.FC<AriaLiveProps> = props => {
  let state = useAriaLive_unstable(props);

  state = useAriaLiveStyles_unstable(state);
  return renderAriaLive_unstable(state);
};

AriaLive.displayName = 'AriaLive';
