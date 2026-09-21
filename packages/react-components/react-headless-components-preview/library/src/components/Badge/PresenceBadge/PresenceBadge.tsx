'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { PresenceBadgeProps } from './PresenceBadge.types';
import { renderPresenceBadge } from './renderPresenceBadge';
import { usePresenceBadge } from './usePresenceBadge';

/**
 * A headless badge that exposes presence status to assistive technology.
 */
export const PresenceBadge: ForwardRefComponent<PresenceBadgeProps> = React.forwardRef((props, ref) => {
  const state = usePresenceBadge(props, ref);

  return renderPresenceBadge(state);
});

PresenceBadge.displayName = 'PresenceBadge';
