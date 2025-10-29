'use client';

import * as React from 'react';
import { renderResultOption_unstable } from './renderResultOption';
import type { ResultOptionProps } from './ResultOption.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useResultOptionStyles_unstable } from './useResultOptionStyles.styles';

/**
 * Result Option component: a styled child option of a searchbox result list
 */
export const ResultOption: ForwardRefComponent<ResultOptionProps> = React.forwardRef((props, ref) => {
  const state = useResultOption_unstable(props, ref);

  useResultOptionStyles_unstable(state);

  useCustomStyleHook_unstable('useResultOptionStyles_unstable')(state);

  return renderResultOption_unstable(state);
});

ResultOption.displayName = 'ResultOption';
